#!/usr/bin/env bun
import { program } from 'commander';

program
  .name('psi')
  .description('Minimal commander repro')
  .exitOverride();

program
  .command('add')
  .description('Add files')
  .action(() => console.log('add'));

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
