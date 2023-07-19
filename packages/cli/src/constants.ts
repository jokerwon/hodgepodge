import { black, cyan, gray, green, reset } from 'kolorist';
import { Framework, FrameworkType } from './types';

export const DEFAULT_TARGET_DIR = 'new-preject';

export const FRAMEWORKS: Framework[] = [
  {
    name: FrameworkType.REACT,
    display: 'React',
    color: cyan,
    variants: [
      {
        name: 'starter-vite-react',
        display: 'starter-vite-react',
        color: gray,
        url: 'https://github.com/jokerwon/starter-vite-react/archive/refs/heads/main.zip',
      },
    ],
  },
  {
    name: FrameworkType.VUE,
    display: 'Vue',
    color: green,
    variants: [
      {
        name: 'vitesse',
        display: 'vitesse',
        color: black,
        url: 'https://github.com/antfu/vitesse/archive/refs/heads/main.zip',
      },
      {
        name: 'vitesse-lite',
        display: 'vitesse-lite',
        color: gray,
        url: 'https://github.com/antfu/vitesse-lite/archive/refs/heads/main.zip',
      },
    ],
  },
  {
    name: FrameworkType.OTHERS,
    display: 'Others',
    color: reset,
    variants: [
      {
        name: 'create-vite-extra',
        display: 'create-vite-extra ↗',
        color: reset,
        customCommand: 'npm create vite-extra@latest TARGET_DIR',
      },
      {
        name: 'create-electron-vite',
        display: 'create-electron-vite ↗',
        color: reset,
        customCommand: 'npm create electron-vite@latest TARGET_DIR',
      },
    ],
  },
];
