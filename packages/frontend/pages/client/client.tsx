import { useQuery } from '@apollo/client';
import { ClientOverview } from '@components/client-overview';
import { Error404 } from '@components/errors';
import { ErrorOops } from '@components/errors/oops';
import { Loading } from '@components/loading';
import { Logs } from '@components/logs';
import { Messages } from '@components/messages';
import { TopbarPortal } from '@components/topbar';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useSearchParams } from 'react-router-dom';
import { GetClient } from './client-quries.gql';
import { clientRoute } from './client-route';

export default function Client() {
  const params = clientRoute.useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get('tab') || 'overview';

  if (!params.id) {
    throw new Error('Missing client id');
  }

  const { data, loading, error } = useQuery(GetClient, {
    variables: {
      where: {
        id: params.id,
      },
    },
  });

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
      <TopbarPortal>
        <div className="flex flex-row">
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
