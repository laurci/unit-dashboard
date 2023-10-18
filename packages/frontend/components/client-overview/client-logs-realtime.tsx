import { LogFragment } from '@schemas/log-fragment.gql';
import { useMemo, useState } from 'react';
import { ClientEntryItem } from './client-entry-item';

interface Props {
  data: LogFragment[];
}

interface EntryProps {
  data: LogFragment;
  isOpen: boolean;
  onOpen: () => void;
}

export function LogEntry(props: EntryProps) {
  const date = useMemo(() => {
    const date = new Date(props.data.createdAt);
    return date.toLocaleString();
  }, [props.data.createdAt]);

  return (
    <ClientEntryItem
      key={props.data.id}
      isOpen={props.isOpen}
      onOpen={props.onOpen}
      title={
        <p className="text-xs font-thin">
          <span className="font-bold">{props.data.type}</span>
          <span> - {date} - </span>
          {props.data.title}
        </p>
      }
      description={<p className="text-xs">{props.data.description}</p>}
    />
  );
}

export function ClientLogsRealtime(props: Props) {
  const [openId, setOpenId] = useState<string>();

  const handleOpen = (id: string) => [
    setOpenId((current) => {
      if (current === id) {
        return undefined;
      }
      return id;
    }),
  ];

  const items = useMemo(() => {
    return props.data.slice(0, 7);
  }, [props.data]);

  return (
    <div className="flex flex-col w-full">
      <div className="h-96 overflow-y-auto flex-col flex">
        {items.length === 0 && <div className="m-auto">No logs!</div>}
        {items.map((log) => (
          <LogEntry
            key={log.id}
            data={log}
            isOpen={log.id === openId}
            onOpen={() => handleOpen(log.id)}
          />
        ))}
      </div>
    </div>
  );
}
