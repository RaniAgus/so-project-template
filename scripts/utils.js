import { $ } from 'bun';
import { dirname } from 'path';

export const copyTrackedFiles = async (src, dest) => {
  await $`rsync -r --exclude-from=${src}/.gitignore ${src} ${dest}`;
}

export const exportMakefile = async (src, dest) => {
  await $`echo ${await parseMakefile(`${src}/makefile`)} | tee makefile`.cwd(dest);
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

export const compressAndGenerateChecksums = async (tag, dir) => {
  await $`tar -czvf ${dir}-${tag}.tar.gz ${dir}`
  await $`md5sum ${dir}-${tag}.tar.gz > ${dir}-${tag}.tar.gz.md5`;
  await $`sha1sum ${dir}-${tag}.tar.gz > ${dir}-${tag}.tar.gz.sha1`;
}
