import { $ } from 'bun';
import { dirname } from 'path';
import { parseArgs } from 'util';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    tag: {
      type: 'string',
      default: 'SNAPSHOT'
    },
    src: {
      type: 'string',
      default: 'src'
    },
    dest: {
      type: 'string',
      default: 'dist'
    },
    templates: {
      type: 'string',
      default: 'project,static,shared'
    },
  },
  allowPositionals: true,
});

const main = async ({ tag, src, dest, templates }) => {
  console.log(`cleaning up ${dest}...\n\n`);

  await $`rm -rfv ${dest}`;
  await $`mkdir -p ${dest}`;

  console.log(`\n\nparsing templates from ${src}...`);

  for (const template of templates.split(',')) {
    console.log(`\n\nparsing ${template}...\n\n`);

    await $`rsync -r --exclude-from=${src}/${template}/.gitignore ${src}/${template} ${dest}`;
    await $`rsync -r ${src}/${template}/.vscode ${dest}/${template}`

    const makefile = await parseMakefile(`${src}/${template}/makefile`);
    await $`echo ${makefile} | tee makefile`.cwd(`${dest}/${template}`);

    console.log(`packing ${template} with tag ${tag}...\n\n`);

    await $`tar -czvf ${template}-${tag}.tar.gz ${template}`.cwd(dest)
    await $`md5sum ${template}-${tag}.tar.gz > ${template}-${tag}.tar.gz.md5`.cwd(dest);
    await $`sha1sum ${template}-${tag}.tar.gz > ${template}-${tag}.tar.gz.sha1`.cwd(dest);

    console.log(`\n\ncleaning up ${template}...\n\n`);

    await $`rm -rfv ${template}`.cwd(dest)
  }
};

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

await main(values);
