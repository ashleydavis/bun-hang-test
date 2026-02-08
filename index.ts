#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

const dbOption: [string, string] = ['--db <path>', 'Database directory'];
const verboseOption: [string, string, boolean] = ['-v, --verbose', 'Verbose', false];
const yesOption: [string, string, boolean] = ['-y, --yes', 'Non-interactive', false];

const MAIN_EXAMPLES = [
  { command: 'psi add --db ./photos ~/Pictures', description: 'Adds files from ~/Pictures.' },
];

program
  .name('psi')
  .description('Minimal commander repro')
  .addHelpText('after', `

Getting help:
  ${pc.bold('psi <command> --help')}    Shows help for a particular command.
  ${pc.bold('psi --help')}              Shows help for all commands.

Examples:
${MAIN_EXAMPLES.map((ex) => `  ${ex.command.padEnd(46)} ${ex.description}`).join('\n')}`)
  .exitOverride()
  .addHelpCommand(false);

program.command('add').alias('a').description('Add files').argument('<files...>').option(...dbOption).option(...verboseOption).option(...yesOption).action(() => console.log('add'));
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
