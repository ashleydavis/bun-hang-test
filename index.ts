#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

program
  .addHelpText('after', `\n${pc.bold('x')}`);

async function main() {
  await program.parseAsync(process.argv);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
