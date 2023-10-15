import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';
import { directivesPlugin } from '@baeta/plugin-directives';
import { prismaPlugin } from '@baeta/plugin-prisma';
import { esbuildPrismaPlugin } from './baeta.prisma';

export default defineConfig({
  graphql: {
    schemas: ['**/*.gql'],
    modulesDir: 'modules',
    baseTypesPath: '__generated__/types.ts',
    contextType: 'typings/context#Context',
    scalars: {
      DateTime: 'Date',
    },
    extensions: 'extensions',
  },
  compiler: {
    src: './app',
    dist: 'dist',
    bundleDeps: true,
    bundleWorkspaces: true,
    esbuild: {
      format: 'esm',
      plugins: [esbuildPrismaPlugin()],
      banner: {
        js: `import { createRequire as __createRequire__ } from 'module';const require = __createRequire__(import.meta.url);`,
      },
    },
  },
  plugins: [
    prismaPlugin({
      prismaSchema: 'schema.prisma',
      generateCommand: 'yarn prisma generate',
      generatedSchemaPath: '__generated__/prisma/schema.prisma',
    }),
    autoloadPlugin({
      resolvers: {
        suffix: ['resolver', 'auth', 'query', 'mutation', 'subscription'],
      },
    }),
    directivesPlugin(),
  ],
});
