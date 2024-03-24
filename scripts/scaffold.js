import { $ } from 'bun';
import { parseArgs } from 'util';
import { Templates, cleanupDir, exportTemplate, readJSON, writeJSON } from './utils';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    src: {
      type: 'string',
      default: 'src',
    },
    dest: {
      type: 'string',
      default: 'dist',
    },
    projects: {
      type: 'string',
      default: 'kernel memoria cpu filesystem',
    },
    staticLib: {
      type: 'string',
      default: 'utils',
    },
    externalLibs: {
      type: 'string',
      default: 'commons pthread readline m',
    },
  },
  allowPositionals: true,
});

const main = async ({ src, dest, projects, staticLib, externalLibs }) => {
  const projectsList = projects.split(' ');

  await cleanupDir(dest);

  console.log(`\n\nparsing static libs from ${src}...\n\n`);

  await exportTemplate(src, dest, Templates.STATIC);
  await $`mv -v ${dest}/${Templates.STATIC} ${dest}/${staticLib}`;
  await configureSettings(`${dest}/${staticLib}/settings.mk`, {
    LIBS: externalLibs,
  });

  console.log(`\n\nparsing projects from ${src}...\n\n`);

  for (const project of projectsList) {
    await exportTemplate(src, dest, Templates.PROJECT);
    await $`mv -v ${dest}/${Templates.PROJECT} ${dest}/${project}`;
    await updateCCppProperties(`${dest}/${project}`, staticLib);
    await configureSettings(`${dest}/${project}/settings.mk`, {
      LIBS: `${staticLib} ${externalLibs}`,
      STATIC_LIBPATHS: `../${staticLib}`,
    });
  }

  console.log(`\n\ncreating workspace folder...\n\n`);

  await createWorkspaceFolder(src, dest, [...projectsList, staticLib]);

  console.log(`\n\ncopying root directory files...\n\n`);

  await $`cp -av ${src}/configs/scaffold/. ${dest}`;

  console.log(`\n\nadding deploy flags to README...\n\n`);

  await configureDeployFlags(`${dest}/README.md`, projectsList);

  console.log(`\n\nscaffolding complete!\n\n`);
}

const updateCCppProperties = async (projectDir, staticLib) => {
  const contents = await readJSON(`${projectDir}/.vscode/c_cpp_properties.json`);

  contents.configurations.forEach((config) => {
    config.includePath = [...config.includePath, `\${workspaceFolder}/../${staticLib}/src`];
  })

  await writeJSON(`${projectDir}/.vscode/c_cpp_properties.json`, contents);
}

const createWorkspaceFolder = async (src, dest, folders) => {
  await writeJSON(`${dest}/tp.code-workspace`, {
    folders: folders.map((folder) => ({ name: folder, path: folder })),
    settings: await readJSON(`${src}/configs/vscode/settings.json`),
  });
}

const configureSettings = async (file, settings) => {
  for (const [key, value] of Object.entries(settings)) {
    await $`sed -i 's@${key}=.*$@'${key}'='${value}'@' ${file}`;
  }
}

const configureDeployFlags = async (file, projects) => {
  const flags = projects.map(p => `-p=${p}`).join(' ');
  await $`sed -i 's@{{ deployFlags }}@'${flags}'@' ${file}`;
}

await main(values);
