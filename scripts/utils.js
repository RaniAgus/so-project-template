import { $ } from 'bun';
import { dirname } from 'path';

export const Templates = {
  PROJECT: 'project',
  STATIC: 'static',
  SHARED: 'shared',
};

export const exportTemplate = async (src, dest, template) => {
  await copyTrackedFiles(`${src}/templates/${template}`, dest);

  await $`cp -rv ${src}/configs/vscode ${dest}/${template}/.vscode`;
  if (template !== Templates.PROJECT) {
    await $`rm -fv ${dest}/${template}/.vscode/launch.json`;
  }

  await exportMakefile(`${src}/templates/${template}`, `${dest}/${template}`);
  await exportMakefile(`${src}/templates/${template}`, `${dest}/${template}`, 'settings.mk');
}

const copyTrackedFiles = async (src, dest) => {
  await $`rsync -r --exclude-from=${src}/.gitignore ${src} ${dest}`;
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
