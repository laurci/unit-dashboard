import { Client } from '@modules/client/typedef';
import { Log } from '@modules/log/typedef';
import { Message } from '@modules/message/typedef';

export interface PubSubMap {
  'client-connected': Client;
  'client-disconnected': Client;
  'client-created': Client;
  'message-created': Message;
  'log-created': Log;
}

export type Channel = keyof PubSubMap;
