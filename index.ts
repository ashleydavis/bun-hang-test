#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

program
  .name('x')
  .addHelpText('after', `\n${pc.bold('x')}`)
  .exitOverride();

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
