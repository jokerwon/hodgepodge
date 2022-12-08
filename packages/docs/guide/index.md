# 快速开始

## 安装

```bash
npm install @jokerwon/utils
```

## 简单使用

```ts
import { omit } from '@jokerwon/utils';

const fullUserInfo = {
  name: 'Joker Won',
  age: 25,
  gender: 'male',
  hobbits: ['games', 'programming'],
};

omit(fullUserInfo, ['hobbits']); // { name: 'Joker Won', age: 25, gender: 'male' }

```
