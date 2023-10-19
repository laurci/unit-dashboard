import { createExtensions } from '@baeta/core';
import { UnauthenticatedError } from '@baeta/errors';
import { authExtension } from '@baeta/extension-auth';
import { env } from '@lib/env';
import { Context } from './typings/context';

declare global {
  export namespace AuthExtension {
    export interface Scopes {
      isPublic: boolean;
      isAuthenticated: boolean;
    }
  }
}

function isAuthenticated(ctx: Context) {
  return () => {
    if (ctx.authToken !== `Bearer ${env.authToken}`) {
      throw new UnauthenticatedError();
    }
    return true;
  };
}

const auth = authExtension<Context>(
  async (ctx) => {
    return {
      isPublic: true,
      isAuthenticated: isAuthenticated(ctx),
    };
  },
  {
    defaultScopes: {
      Query: {
        isAuthenticated: true,
      },
      Mutation: {
        isAuthenticated: true,
      },
    },
  }
);

export default createExtensions(auth);
