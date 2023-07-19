import cac from 'cac';
import pkg from '../package.json';
import { createProject } from './command';

const { version } = pkg;

const cli = cac();
cli
  .command('new [project-name]', 'create a new project')
  .alias('create')
  .action(async projectName => {
    createProject(projectName);
  });

cli.help().version(version).parse();
