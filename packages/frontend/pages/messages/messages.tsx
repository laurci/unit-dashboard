import { useQuery } from '@apollo/client';
import { ErrorOops } from '@components/errors/oops';
import { Loading } from '@components/loading';
import { Messages } from '@components/messages';
import { Subscriptions } from '@components/subscriptions';
import { MessageFragment } from '@schemas/message-fragment.gql';
import { GetMessages } from './message-queries.gql';

const emptyArray: MessageFragment[] = [];

export default function MessagesPage() {
  const { data, loading, error, updateQuery } = useQuery(GetMessages, {
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
        onMessageCreated={(message) => {
          updateQuery((previous) => {
            return {
              messages: [message, ...(previous.messages ?? [])],
            };
          });
        }}
      />
      <Messages data={data?.messages ?? emptyArray} />
    </>
  );
}
