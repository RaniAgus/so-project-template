import { $ } from 'bun';
import { parseArgs } from 'util';
import { copyTrackedFiles, compressAndGenerateChecksums, exportMakefile } from './utils';

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
  },
  allowPositionals: true,
});

const main = async ({ tag, src, dest }) => {
  console.log(`cleaning up ${dest}...\n\n`);

  await $`rm -rfv ${dest}`;
  await $`mkdir -p ${dest}`;

  console.log(`\n\nparsing templates from ${src}...`);

  for (const template of ['project', 'static', 'shared']) {
    console.log(`\n\nparsing ${template}...\n\n`);

    await copyTrackedFiles(`${src}/templates/${template}`, dest);

    await $`cp -rv ${src}/configs/vscode ${dest}/${template}/.vscode`;
    if (template !== 'project') {
      await $`rm -fv ${dest}/${template}/.vscode/launch.json`;
    }

    await exportMakefile(`${src}/templates/${template}`, `${dest}/${template}`);

    console.log(`packing ${template} with tag ${tag}...\n\n`);

    await compressAndGenerateChecksums(tag, `${dest}/${template}`);

    console.log(`\n\ncleaning up ${template}...\n\n`);

    await $`rm -rfv ${template}`.cwd(dest);
  }
};

await main(values);
