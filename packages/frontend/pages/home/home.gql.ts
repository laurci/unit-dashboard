import * as Types from '../../__generated__/types';

import { TypedDocumentNode as DocumentNode } from '@apollo/client';
export type GetClientsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, name?: string | null, connected?: boolean | null, lastConnected?: any | null }> };

export type ClientFragment = { __typename?: 'Client', id: string, name?: string | null, connected?: boolean | null, lastConnected?: any | null };

export const Client = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}},{"kind":"Field","name":{"kind":"Name","value":"lastConnected"}}]}}]} as unknown as DocumentNode<ClientFragment, unknown>;
export const GetClients = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Client"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Client"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Client"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}},{"kind":"Field","name":{"kind":"Name","value":"lastConnected"}}]}}]} as unknown as DocumentNode<GetClientsQuery, GetClientsQueryVariables>;