import { useQuery } from '@apollo/client';
import { ClientOverview } from '@components/client-overview';
import { Error404 } from '@components/errors';
import { ErrorOops } from '@components/errors/oops';
import { Loading } from '@components/loading';
import { Logs } from '@components/logs';
import { Messages } from '@components/messages';
import { Subscriptions } from '@components/subscriptions';
import { TopbarPortal } from '@components/topbar';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { LogFragment } from '@schemas/log-fragment.gql';
import { MessageFragment } from '@schemas/message-fragment.gql';
import { insert } from 'ramda';
import { useSearchParams } from 'react-router-dom';
import { GetClient } from './client-queries.gql';
import { clientRoute } from './client-route';

export default function ClientPage() {
  const params = clientRoute.useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get('tab') || 'overview';

  if (!params.id) {
    throw new Error('Missing client id');
  }

  const { data, loading, error, updateQuery } = useQuery(GetClient, {
    variables: {
      where: {
        id: params.id,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleMessageCreated = (message: MessageFragment) => {
    updateQuery((previous) => {
      if (!message.clientId) {
        return previous;
      }

      if (!previous.client) {
        return previous;
      }

      return {
        client: {
          ...previous.client,
          messages: insert(0, message, previous.client.messages ?? []),
        },
      };
    });
  };

  const handleLogCreated = (log: LogFragment) => {
    updateQuery((previous) => {
      if (!log.clientId) {
        return previous;
      }

      if (!previous.client) {
        return previous;
      }

      return {
        client: {
          ...previous.client,
          logs: insert(0, log, previous.client.logs ?? []),
        },
      };
    });
  };

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  if (error) {
    return <ErrorOops />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!data?.client) {
    return <Error404 />;
  }

  return (
    <>
      <Subscriptions onMessageCreated={handleMessageCreated} onLogCreated={handleLogCreated} />

      <TopbarPortal>
        <div className="flex flex-row mr-4">
          <Tabs value={tab} className="border rounded-lg w-64">
            <TabsList className="w-full">
              <TabsTrigger value="overview" onClick={() => handleTabChange('overview')}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="messages" onClick={() => handleTabChange('messages')}>
                Messages
              </TabsTrigger>
              <TabsTrigger value="logs" onClick={() => handleTabChange('logs')}>
                Logs
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="ml-4 my-auto border rounded-lg p-2">{data.client.name}</p>
        </div>
      </TopbarPortal>

      {tab === 'overview' && <ClientOverview data={data.client} />}
      {tab === 'messages' && <Messages data={data.client.messages ?? []} />}
      {tab === 'logs' && <Logs data={data.client.logs ?? []} />}
    </>
  );
}
