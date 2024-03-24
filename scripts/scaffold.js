import { $ } from 'bun';
import { parseArgs } from 'util';
import { Templates, cleanupDir, replaceInterpolation, replaceConfig, exportTemplate, readJSON, writeJSON } from './utils';

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

  await replaceConfig(`${dest}/${staticLib}/settings.mk`, {
    LIBS: externalLibs,
  });

  console.log(`\n\nparsing projects from ${src}...\n\n`);

  for (const project of projectsList) {
    await exportTemplate(src, dest, Templates.PROJECT);
    await $`mv -v ${dest}/${Templates.PROJECT} ${dest}/${project}`;

    await $`cp ${src}/configs/main/main.c ${dest}/${project}/src/main.c`;
    await replaceInterpolation(`${dest}/${project}/src/main.c`, { project });

    await configureCCppProperties(`${dest}/${project}`, staticLib);
    await replaceConfig(`${dest}/${project}/settings.mk`, {
      LIBS: `${staticLib} ${externalLibs}`,
      STATIC_LIBPATHS: `../${staticLib}`,
    });
  }

  console.log(`\n\ncreating workspace folder...\n\n`);

  await createWorkspaceFolder(src, dest, [...projectsList, staticLib]);

  console.log(`\n\ncopying root directory files...\n\n`);

  await $`cp -av ${src}/configs/scaffold/. ${dest}`;

  console.log(`\n\nadding deploy flags to README...\n\n`);

  await replaceInterpolation(`${dest}/README.md`, {
    deployFlags: projectsList.map(p => `-p=${p}`).join(' '),
  });

  console.log(`\n\nscaffolding complete!\n\n`);
}

const configureCCppProperties = async (projectDir, staticLib) => {
  const properties = await readJSON(`${projectDir}/.vscode/c_cpp_properties.json`);

  for (const config of properties.configurations) {
    config.includePath.push(`\${workspaceFolder}/../${staticLib}/include`);
  }

  await writeJSON(`${projectDir}/.vscode/c_cpp_properties.json`, properties);
}

const createWorkspaceFolder = async (src, dest, folders) => {
  await writeJSON(`${dest}/tp.code-workspace`, {
    folders: folders.map((folder) => ({ name: folder, path: folder })),
    settings: await readJSON(`${src}/configs/vscode/settings.json`),
  });
}

await main(values);
