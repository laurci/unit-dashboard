import * as Types from '../../__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@apollo/client';
export type TryLoginQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TryLoginQuery = { __typename?: 'Query', tryLogin?: boolean | null };


export const TryLogin = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TryLogin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tryLogin"}}]}}]} as unknown as DocumentNode<TryLoginQuery, TryLoginQueryVariables>;