import { useQuery } from '@apollo/client';
import { ErrorOops } from '@components/errors/oops';
import { Loading } from '@components/loading';
import { Logs } from '@components/logs';
import { Subscriptions } from '@components/subscriptions';
import { LogFragment } from '@schemas/log-fragment.gql';
import { GetLogs } from './logs-queries.gql';

const emptyArray: LogFragment[] = [];

export default function LogsPage() {
  const { data, loading, error, updateQuery } = useQuery(GetLogs, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorOops />;
  }

  return (
    <>
      <Subscriptions
        onLogCreated={(log) => {
          updateQuery((previous) => {
            return {
              logs: [log, ...(previous.logs ?? [])],
            };
          });
        }}
      />
      <Logs data={data?.logs ?? emptyArray} />
    </>
  );
}
