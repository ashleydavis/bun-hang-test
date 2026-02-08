#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

const MAIN_EXAMPLES = [
  { command: 'psi add --db ./photos ~/Pictures', description: 'Adds files from ~/Pictures.' },
];

program
  .name('psi')
  .description('')
  .addHelpText('after', `

Getting help:
  ${pc.bold('psi --help')}              Shows help for all commands.

Examples:
${MAIN_EXAMPLES.map((ex) => `  ${ex.command.padEnd(46)} ${ex.description}`).join('\n')}`)
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
