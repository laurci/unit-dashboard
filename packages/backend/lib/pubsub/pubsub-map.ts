export interface PubSubMap {
  'client-connected': string;
  'client-disconnected': string;
  [t0: `client-updated-${string}`]: string;
}

export type Channel = keyof PubSubMap;
