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
      default: 'kernel,memoria,cpu,filesystem',
    },
    staticLibs: {
      type: 'string',
      default: 'utils',
    },
  },
  allowPositionals: true,
});

const main = async ({ src, dest, staticLibs, projects }) => {
  await cleanupDir(dest);

  console.log(`\n\nparsing static libs from ${src}...\n\n`);

  for (const lib of staticLibs.split(',')) {
    await exportTemplate(src, dest, Templates.STATIC);
    await $`mv -v ${dest}/${Templates.STATIC} ${dest}/${lib}`;
  }

  console.log(`\n\nparsing projects from ${src}...\n\n`);

  for (const project of projects.split(',')) {
    await exportTemplate(src, dest, Templates.PROJECT);
    await $`mv -v ${dest}/${Templates.PROJECT} ${dest}/${project}`;
    await updateCCppProperties(`${dest}/${project}`, staticLibs.split(','));
  }

  console.log(`\n\ncreating workspace folder...\n\n`);

  await createWorkspaceFolder(src, dest, [...projects.split(','), ...staticLibs.split(',')]);

  console.log(`\n\ncopying root directory files...\n\n`);

  await $`cp -av ${src}/configs/scaffold/. ${dest}`;

  console.log(`\n\nscaffolding complete!\n\n`);
}

const updateCCppProperties = async (projectDir, staticLibs) => {
  const contents = await readJSON(`${projectDir}/.vscode/c_cpp_properties.json`);
  const staticLibIncludePaths = staticLibs.map((lib) => `\${workspaceFolder}/../${lib}/src`);

  contents.configurations.forEach((config) => {
    config.includePath = [...config.includePath, ...staticLibIncludePaths];
  })

  await writeJSON(`${projectDir}/.vscode/c_cpp_properties.json`, contents);
}

const createWorkspaceFolder = async (src, dest, folders) => {
  await writeJSON(`${dest}/tp.code-workspace`, {
    folders: folders.map((folder) => ({ name: folder, path: folder })),
    settings: await readJSON(`${src}/configs/vscode/settings.json`),
  });
}

await main(values);
