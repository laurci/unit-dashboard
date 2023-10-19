/* This file was generated by baeta. Do not edit it directly. */

/* eslint-disable */
/* prettier-ignore */

import * as Types from "../../__generated__/types";
import { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions";


interface DefinedFields {
  Query: 'tryLogin';
};

export type Query = Pick<Types.Query, DefinedFields['Query']>;

export namespace ModuleMetadata {
  export const id = 'authentication';
  export const dirname = './authentication';
  export const typedef = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":5,"end":10}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"tryLogin","loc":{"start":15,"end":23}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":25,"end":32}},"loc":{"start":25,"end":32}},"directives":[],"loc":{"start":15,"end":32}}],"loc":{"start":0,"end":34}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      Query: {
        ...module.createTypeMethods<{}, Types.ContextType>("Query"),
        tryLogin: module.createResolverBuilder<Types.Maybe<Types.Scalars["Boolean"]>, {}, Types.ContextType, {}>("Query", "tryLogin"),
      },
    };
  }
}

export const createAuthenticationModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getAuthenticationModule = Baeta.createSingletonModule(createAuthenticationModule);
