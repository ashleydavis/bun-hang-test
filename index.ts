#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

const dbOption: [string, string] = ['--db <path>', 'Database directory'];
const verboseOption: [string, string, boolean] = ['-v, --verbose', 'Verbose', false];
const yesOption: [string, string, boolean] = ['-y, --yes', 'Non-interactive', false];

const version = '0.0.8';

function initContext<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => fn(...args);
}

program
  .name('psi')
  .description('Minimal commander repro')
  .option('--version', 'output the version number', () => {
    console.log(version);
    process.exit(0);
  })
  .option('--debug', 'Enable debug REST API server')
  .addHelpText('after', `

Getting help:
  ${pc.bold('psi <command> --help')}    Shows help for a particular command.
  ${pc.bold('psi --help')}              Shows help for all commands.`)
  .exitOverride()
  .addHelpCommand(false);

program.command('add').alias('a').description('Add files').argument('<files...>').option(...dbOption).option(...verboseOption).option(...yesOption).action(initContext(() => console.log('add')));
program.command('bug').description('Bug report').option(...verboseOption).option(...yesOption).action(() => console.log('bug'));
program.command('check').alias('chk').description('Check files').argument('<files...>').option(...dbOption).option(...verboseOption).action(initContext(() => console.log('check')));
program.command('clear-cache').description('Clear hash cache').action(() => console.log('clear-cache'));
program.command('compare').alias('cmp').description('Compare databases').option(...dbOption).option('--dest <path>', 'Dest').option(...verboseOption).action(() => console.log('compare'));
program.command('config').description('Config').option(...dbOption).action(() => console.log('config'));
program.command('database-id').description('Database ID').option(...dbOption).action(() => console.log('database-id'));
program.command('debug').description('Debug').option(...dbOption).action(() => console.log('debug'));
program.command('examples').description('Examples').action(() => console.log('examples'));
program.command('export').description('Export').option(...dbOption).action(() => console.log('export'));
program.command('find-orphans').description('Find orphans').option(...dbOption).action(() => console.log('find-orphans'));
program.command('hash').description('Hash').option(...dbOption).action(() => console.log('hash'));
program.command('hash-cache').description('Hash cache').action(() => console.log('hash-cache'));
program.command('info').description('Info').option(...dbOption).action(() => console.log('info'));
program.command('init').description('Init').argument('<path>').option(...dbOption).action(() => console.log('init'));
program.command('list').description('List').option(...dbOption).action(() => console.log('list'));
program.command('origin').description('Origin').option(...dbOption).action(() => console.log('origin'));
program.command('remove').description('Remove').option(...dbOption).argument('<files...>').action(() => console.log('remove'));
program.command('remove-orphans').description('Remove orphans').option(...dbOption).action(() => console.log('remove-orphans'));
program.command('repair').description('Repair').option(...dbOption).option('--source <path>').action(() => console.log('repair'));
program.command('replicate').description('Replicate').option(...dbOption).action(() => console.log('replicate'));
program.command('root-hash').description('Root hash').option(...dbOption).action(() => console.log('root-hash'));
program.command('set-origin').description('Set origin').option(...dbOption).action(() => console.log('set-origin'));
program.command('summary').description('Summary').option(...dbOption).action(() => console.log('summary'));
program.command('sync').description('Sync').option(...dbOption).action(() => console.log('sync'));
program.command('tools').description('Tools').action(() => console.log('tools'));
program.command('upgrade').description('Upgrade').option(...dbOption).action(() => console.log('upgrade'));
program.command('verify').description('Verify').option(...dbOption).action(() => console.log('verify'));
program.command('version').description('Version').action(() => console.log('version'));

async function main() {
  if (process.argv.includes('--debug')) {
    try {
      await Promise.resolve({ url: 'http://localhost:0' });
    } catch (_) {}
  }

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
