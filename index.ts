#!/usr/bin/env bun
import { program } from 'commander';
import pc from 'picocolors';

program
  .addHelpText('after', pc.bold('x'));

program.parseAsync(process.argv);
