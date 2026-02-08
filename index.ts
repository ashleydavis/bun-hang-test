#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

const MAIN_EXAMPLES = [
  { command: 'a', description: 'b' },
];

program
  .name('x')
  .description('')
  .addHelpText('after', `

Examples:
${MAIN_EXAMPLES.map((ex) => `  ${pc.bold(ex.command)} ${ex.description}`).join('\n')}`)
  .exitOverride()
  .addHelpCommand(false);

program.command('add').description('').action(() => console.log('add'));
async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (err: any) {
    if (err.code === 'commander.help' || err.code === 'commander.helpDisplayed') {
      process.exit(0);
    }
    throw err;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
