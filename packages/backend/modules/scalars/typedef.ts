/* This file was generated by baeta. Do not edit it directly. */

/* eslint-disable */
/* prettier-ignore */

import * as Types from "../../__generated__/types";
import { DocumentNode } from "graphql";
import * as Baeta from "@baeta/core/sdk";
import baetaExtensions from "../../extensions";


export namespace ModuleMetadata {
  export const id = 'scalars';
  export const dirname = './scalars';
  export const typedef = {"kind":"Document","definitions":[{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"DateTime","loc":{"start":7,"end":15}},"directives":[],"loc":{"start":0,"end":15}}]} as unknown as DocumentNode;
  
  export function createManager(module: Baeta.ModuleBuilder) {
    return {
      ...module.createModuleMethods<Types.ContextType>(),
      Scalar: {
        DateTime: module.createScalarBuilder("DateTime"),
      },
    };
  }
}

export const createScalarsModule = () => Baeta.createModuleManager(ModuleMetadata, baetaExtensions);
export const getScalarsModule = Baeta.createSingletonModule(createScalarsModule);
