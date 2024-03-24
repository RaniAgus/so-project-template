import { $ } from 'bun';
import { dirname } from 'path';

export const Templates = {
  PROJECT: 'project',
  STATIC: 'static',
  SHARED: 'shared',
};

export const cleanupDir = async (dir) => {
  console.log(`cleaning up ${dir}...\n\n`);

  await $`rm -rfv ${dir}`;
  await $`mkdir -p ${dir}`;
}

export const exportTemplate = async (src, dest, template) => {
  console.log(`copying ${template} files...\n\n`);

  await copyTrackedFiles(`${src}/templates/${template}`, dest);

  await $`cp -rv ${src}/configs/vscode ${dest}/${template}/.vscode`;
  if (template !== Templates.PROJECT) {
    await $`rm -fv ${dest}/${template}/.vscode/launch.json`;
  }

  console.log(`\n\nexporting ${template} Makefile...\n\n`);

  await exportMakefile(`${src}/templates/${template}`, `${dest}/${template}`);
  await exportMakefile(`${src}/templates/${template}`, `${dest}/${template}`, 'settings.mk');
}

const copyTrackedFiles = async (src, dest) => {
  await $`rsync -rv --exclude-from=${src}/.gitignore ${src} ${dest}`;
}

const exportMakefile = async (src, dest, name = 'Makefile') => {
  await $`echo ${await parseMakefile(`${src}/${name}`)} | tee ${name}`.cwd(dest);
}

const parseMakefile = async (file) => {
  const lines = []
  for await(const line of $`cat ${file}`.lines()) {
    lines.push(await parseMakefileLine(file, line));
  }
  return lines.join('\n');
}

const parseMakefileLine = async (file, line) => {
  const [_, include] = line.split('include ../');
  return include ? $`cat ${dirname(file)}/../${include}`.text() : line;
}

export const readJSON = async (file) => {
  return JSON.parse(await $`cat ${file}`.text());
}

export const writeJSON = async (file, data) => {
  await $`echo ${JSON.stringify(data, null, 2)} > ${file}`;
}
