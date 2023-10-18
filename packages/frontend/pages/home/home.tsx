import { useQuery } from '@apollo/client';
import { ClientCard } from '@components/client-card';
import { ErrorOops } from '@components/errors/oops';
import { Loading } from '@components/loading/loading';
import { Subscriptions } from '@components/subscriptions';
import { TopbarPortal } from '@components/topbar';
import { ClientFragment } from '@schemas/client-fragment.gql';
import { LogFragment } from '@schemas/log-fragment.gql';
import { MessageFragment } from '@schemas/message-fragment.gql';
import { insert, update } from 'ramda';
import { useMemo } from 'react';
import { GetClients } from './home-queries.gql';

export default function HomePage() {
  const { data, loading, error, updateQuery } = useQuery(GetClients, {
    fetchPolicy: 'cache-and-network',
  });

  const cards = useMemo(() => {
    return data?.clients.map((client) => <ClientCard data={client} key={client.id} />);
  }, [data?.clients]);

  const handleClientCreated = (client: ClientFragment) => {
    updateQuery((previous) => {
      return { clients: [client, ...previous.clients] };
    });
  };

  const handleMessageCreated = (message: MessageFragment) => {
    updateQuery((previous) => {
      if (!message.clientId) {
        return previous;
      }

      const idx = previous.clients.findIndex((el) => el.id === message.clientId);

      if (idx < 0) {
        return previous;
      }

      const messages = insert(0, message, previous.clients[idx].messages ?? []);

      const client: ClientFragment = {
        ...previous.clients[idx],
        messages,
      };

      return { clients: update(idx, client, previous.clients) };
    });
  };

  const handleLogCreated = (log: LogFragment) => {
    updateQuery((previous) => {
      if (!log.clientId) {
        return previous;
      }

      const idx = previous.clients.findIndex((el) => el.id === log.clientId);

      if (idx < 0) {
        return previous;
      }

      const logs = insert(0, log, previous.clients[idx].logs ?? []);

      const client: ClientFragment = {
        ...previous.clients[idx],
        logs,
      };

      return { clients: update(idx, client, previous.clients) };
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorOops />;
  }

  return (
    <>
      <Subscriptions
        onClientCreated={handleClientCreated}
        onMessageCreated={handleMessageCreated}
        onLogCreated={handleLogCreated}
      />

      <TopbarPortal>
        <h1 className="mb-2">Homepage</h1>
      </TopbarPortal>

      <div className="grid grid-cols-2 gap-6">{cards}</div>
    </>
  );
}
