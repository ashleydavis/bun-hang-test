#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

program
  .addHelpText('after', `\n${pc.bold('x')}`);

program.parseAsync(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
