import { $ } from 'bun';
import { parseArgs } from 'util';
import { Templates, cleanupDir, exportTemplate } from './utils';

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
  await cleanupDir(dest);

  console.log(`\n\nparsing templates from ${src}...`);

  for (const template of Object.values(Templates)) {
    await exportTemplate(src, dest, template);

    if (!tag) {
      continue;
    }

    console.log(`packing ${template} with tag ${tag}...\n\n`);

    await $`tar -czvf ${template}-${tag}.tar.gz ${template}`.cwd(dest)
    await $`md5sum ${template}-${tag}.tar.gz > ${template}-${tag}.tar.gz.md5`.cwd(dest);
    await $`sha1sum ${template}-${tag}.tar.gz > ${template}-${tag}.tar.gz.sha1`.cwd(dest);

    console.log(`\n\ncleaning up ${template}...\n\n`);

    await $`rm -rfv ${template}`.cwd(dest);
  }
};

await main(values);
