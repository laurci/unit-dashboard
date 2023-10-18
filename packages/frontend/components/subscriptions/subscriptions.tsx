import { useSubscription } from '@apollo/client';
import { ClientFragment } from '@schemas/client-fragment.gql';
import { LogFragment } from '@schemas/log-fragment.gql';
import { MessageFragment } from '@schemas/message-fragment.gql';
import {
  ClientConnected,
  ClientCreated,
  ClientDisconnected,
  LogCreated,
  MessageCreated,
} from './subscriptions.gql';

interface Props {
  skipClient?: boolean;
  skipMessage?: boolean;
  skipLog?: boolean;

  onClientCreated?: (client: ClientFragment) => void;
  onMessageCreated?: (message: MessageFragment) => void;
  onLogCreated?: (log: LogFragment) => void;
}

export function Subscriptions(props: Props) {
  useSubscription(ClientConnected, {
    skip: props.skipClient,
    onData(options) {
      if (!options.data.data?.clientConnected) {
        return;
      }

      console.log('client connected', options.data.data.clientConnected);
    },
  });

  useSubscription(ClientDisconnected, {
    skip: props.skipClient,
    onData(options) {
      if (!options.data.data?.clientDisconnected) {
        return;
      }

      console.log('client disconnected', options.data.data.clientDisconnected);
    },
  });

  useSubscription(ClientCreated, {
    skip: props.skipClient,
    onData(options) {
      if (!options.data.data?.clientCreated) {
        return;
      }

      console.log('client created', options.data.data.clientCreated);
      props.onClientCreated?.(options.data.data.clientCreated);
    },
  });

  useSubscription(MessageCreated, {
    skip: props.skipMessage,
    onData(options) {
      if (!options.data.data?.messageCreated) {
        return;
      }

      console.log('message created', options.data.data.messageCreated);
      props.onMessageCreated?.(options.data.data.messageCreated);
    },
  });

  useSubscription(LogCreated, {
    skip: props.skipLog,
    onData(options) {
      if (!options.data.data?.logCreated) {
        return;
      }

      console.log('log created', options.data.data.logCreated);
      props.onLogCreated?.(options.data.data.logCreated);
    },
  });

  return <></>;
}
