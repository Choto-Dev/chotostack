#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { packageJson } from './utils/package-json.js';

// Terminate process on `SIGINT` and `SIGTERM` signal.
const handleSigTerm = () => process.exit(0);
process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version, '-v, --version')
  .action(() => {
    program.help();
  })
  .addCommand(initCommand)
  .parse();
