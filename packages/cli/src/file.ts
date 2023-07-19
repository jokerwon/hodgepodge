import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';
import AdmZip from 'adm-zip';
import { resolveFilename } from './util';

export const download = async (url: string, targetPath = './') => {
  const response = await fetch(url);
  const filename = resolveFilename(response.headers) || 'template.zip';
  return new Promise<string>((resolve, reject) => {
    const fileStream = fs.createWriteStream(path.resolve(targetPath, filename));
    if (!response.body) {
      reject(new Error('Failed to download file, response.body is null.'));
      return;
    }
    response.body.pipe(fileStream);
    response.body.on('error', reject);
    fileStream.on('error', reject);
    fileStream.on('finish', () => resolve(filename));
  });
};

export const extract = (filePath: string, targetPath = './') => {
  // const zip = new AdmZip('./vitesse-lite-main.zip');
  return new Promise<void>((resolve, reject) => {
    try {
      const zip = new AdmZip(filePath);
      zip.extractAllTo(targetPath, true);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
