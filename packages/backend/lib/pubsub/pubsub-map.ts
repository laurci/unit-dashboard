export interface PubSubMap {
  [c: `client-connected-${string}`]: string;
  [c: `client-disconnected-${string}`]: string;
  [c: `client-created-${string}`]: string;
}

export type Channel = keyof PubSubMap;
