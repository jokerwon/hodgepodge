import fs from 'node:fs';
import path from 'node:path';
import type { Headers } from 'node-fetch';

export function resolveFilename(headers: Headers) {
  if (!headers) {
    return null;
  }
  const disposition = headers.get('content-disposition');
  if (!disposition) {
    return null;
  }
  // 'content-disposition': 'attachment; filename=vitesse-lite-main.zip'
  const match = disposition.match(/filename=(.+)/);
  return match?.[1] || null;
}

export function formatTargetDir(targetDir: string | undefined) {
  // 去除结尾的 /
  return targetDir?.trim().replace(/\/+$/g, '');
}

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  );
}

export function isEmptyDir(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function reviseNpmCommand(command: string) {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.');

  return command
    .replace(/^npm create /, () => {
      // `bun create` uses it's own set of templates,
      // the closest alternative is using `bun x` directly on the package
      if (pkgManager === 'bun') {
        return 'bun x create-';
      }
      return `${pkgManager} create `;
    })
    .replace('@latest', () => (isYarn1 ? '' : '@latest'))
    .replace(/^npm exec/, () => {
      // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
      if (pkgManager === 'pnpm') {
        return 'pnpm dlx';
      }
      if (pkgManager === 'yarn' && !isYarn1) {
        return 'yarn dlx';
      }
      if (pkgManager === 'bun') {
        return 'bun x';
      }
      // Use `npm exec` in all other cases,
      // including Yarn 1.x and other custom npm clients.
      return 'npm exec';
    });
}
