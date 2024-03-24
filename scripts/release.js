import { $ } from 'bun';
import { parseArgs } from 'util';
import { Templates, exportTemplate } from './utils';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    tag: {
      type: 'string',
    },
    src: {
      type: 'string',
      default: 'src'
    },
    dest: {
      type: 'string',
      default: 'dist'
    },
  },
  allowPositionals: true,
});

const main = async ({ tag, src, dest }) => {
  console.log(`cleaning up ${dest}...\n\n`);

  await $`rm -rfv ${dest}`;
  await $`mkdir -p ${dest}`;

  console.log(`\n\nparsing templates from ${src}...`);

  for (const template of Object.values(Templates)) {
    await exportTemplate(src, dest, template);

    if (!tag) {
      continue;
    }

    console.log(`packing ${template} with tag ${tag}...\n\n`);

    await compressAndGenerateChecksums(tag, `${dest}/${template}`);

    console.log(`\n\ncleaning up ${template}...\n\n`);

    await $`rm -rfv ${template}`.cwd(dest);
  }
};

const compressAndGenerateChecksums = async (tag, dir) => {
  await $`tar -czvf ${dir}-${tag}.tar.gz ${dir}`
  await $`md5sum ${dir}-${tag}.tar.gz > ${dir}-${tag}.tar.gz.md5`;
  await $`sha1sum ${dir}-${tag}.tar.gz > ${dir}-${tag}.tar.gz.sha1`;
}

await main(values);
