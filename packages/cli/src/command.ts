import path from 'node:path';
import fs from 'node:fs';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import { reset } from 'kolorist';
import ora from 'ora';
import {
  emptyDir,
  formatTargetDir,
  isEmptyDir,
  isValidPackageName,
  reviseNpmCommand,
  toValidPackageName,
} from './util';
import { DEFAULT_TARGET_DIR, FRAMEWORKS } from './constants';
import { Framework, FrameworkVariant } from './types';
import { download, extract } from './file';

export const createProject = async (argTargetDir?: string) => {
  const cwd = process.cwd();
  let targetDir = formatTargetDir(argTargetDir) || DEFAULT_TARGET_DIR;
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir;

  const answers = await inquirer.prompt([
    // 如果命令行没有指定项目名则询问
    {
      type: 'input',
      name: 'projectName',
      message: reset('Project name:'),
      default: targetDir,
      filter(input) {
        return (targetDir = formatTargetDir(input)!);
      },
      when() {
        return !argTargetDir;
      },
    },
    // 文件夹存在时询问是否覆盖
    {
      type: 'confirm',
      name: 'overwrite',
      message: () =>
        `Target directory "${targetDir}"` +
        ` is not empty. Remove existing files and continue?`,
      when() {
        return fs.existsSync(targetDir) && !isEmptyDir(targetDir);
      },
    },
    // 项目名无法作为 package.json 的 name 字段时询问
    {
      type: 'input',
      name: 'packageName',
      message: reset('Package name:'),
      default: () => toValidPackageName(getProjectName()),
      validate: dir => isValidPackageName(dir) || 'Invalid package.json name',
      when() {
        return !isValidPackageName(getProjectName());
      },
    },
    // 指定框架
    {
      type: 'list',
      name: 'framework',
      default: 0,
      choices: FRAMEWORKS.filter(f => f.variants.length > 0).map(framework => {
        const color = framework.color;
        return {
          name: color(framework.display),
          value: framework,
        };
      }),
    },
    // 指定模板
    {
      type: 'list',
      name: 'variant',
      message: reset('Select a variant:'),
      choices: ({ framework }) =>
        (framework as Framework).variants.map(variant => {
          const color = variant.color;
          return {
            name: color(variant.display || variant.name),
            value: variant,
          };
        }),
    },
  ]);

  const { overwrite, variant } = answers;
  const { url, customCommand } = variant as FrameworkVariant;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  if (customCommand) {
    const fullCustomCommand = reviseNpmCommand(customCommand);
    const [command, ...args] = fullCustomCommand.split(' ');
    // we replace TARGET_DIR here because targetDir may include a space
    const replacedArgs = args.map((arg: string) =>
      arg.replace('TARGET_DIR', targetDir),
    );
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: 'inherit',
    });
    process.exit(status ?? 0);
  } else if (url) {
    const spinner = ora('Downloading template....').start();
    let filename: string;
    try {
      filename = await download(url, root);
      const zip = path.resolve(root, filename);
      await extract(zip);
      fs.unlinkSync(zip);
    } catch (error) {
      spinner.fail('Failed to download/extract template.');
      console.error('\n', error);
      process.exit(1);
    }
    spinner.succeed();
  }
};
