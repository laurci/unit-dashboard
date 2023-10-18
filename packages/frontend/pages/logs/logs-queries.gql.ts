import * as Types from '../../__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@apollo/client';
export type GetLogsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLogsQuery = { __typename?: 'Query', logs: Array<{ __typename?: 'Log', id: string, type: Types.LogType, title: string, clientId?: string | null, description: string, createdAt: any }> };


export const GetLogs = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Log"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Log"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetLogsQuery, GetLogsQueryVariables>;