import { Plugin } from '@baeta/compiler/esbuild';
import fs from 'fs/promises';

export const esbuildPrismaPlugin = (): Plugin => ({
  name: 'prisma-resolver',
  async setup(build) {
    let finish = Promise.resolve();
    const dist = build.initialOptions.outdir + '/prisma';

    build.onStart(() => {
      finish = fs.cp('./__generated__/prisma', dist, {
        recursive: true,
      });
    });

    build.onEnd(() => {
      return finish;
    });

    build.onResolve({ filter: /__generated__\/prisma$/ }, () => {
      return {
        path: './prisma/index.js',
        external: true,
        watchFiles: ['./__generated__/prisma/index.js'],
      };
    });
  },
});
