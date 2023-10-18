import { Card } from '@components/ui/card';
import { ClientFragment } from '@schemas/client-fragment.gql';
import { LogFragment } from '@schemas/log-fragment.gql';
import { MessageFragment } from '@schemas/message-fragment.gql';
import { ClientLogsChart } from './client-logs-chart';
import { ClientLogsRealtime } from './client-logs-realtime';
import { ClientMessagesChart } from './client-messages-chart';
import { ClientMessagesRealtime } from './client-messages-realtime';

interface Props {
  data: ClientFragment;
}

const emptyLogs: LogFragment[] = [];
const emptyMessages: MessageFragment[] = [];

export function ClientOverview(props: Props) {
  const logs = props.data.logs ?? emptyLogs;
  const messages = props.data.messages ?? emptyMessages;

  return (
    <>
      <Card className="flex flex-row p-4">
        <ClientMessagesChart data={messages} />
        <ClientMessagesRealtime data={messages} />
      </Card>

      <Card className="flex flex-row p-4 mt-4">
        <ClientLogsChart data={logs} />
        <ClientLogsRealtime data={logs} />
      </Card>
    </>
  );
}
