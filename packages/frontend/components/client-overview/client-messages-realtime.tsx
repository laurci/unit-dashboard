import { MessageFragment } from '@schemas/message-fragment.gql';
import { useMemo, useState } from 'react';
import { ClientEntryItem } from './client-entry-item';

interface Props {
  data: MessageFragment[];
}

interface EntryProps {
  data: MessageFragment;
  isOpen: boolean;
  onOpen: () => void;
}

export function MessageEntry(props: EntryProps) {
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
          <span className="font-bold">{props.data.direction}</span>
          <span> - {date}</span>
        </p>
      }
      description={<p className="text-xs">{props.data.value}</p>}
    />
  );
}

export function ClientMessagesRealtime(props: Props) {
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
        {items.map((message) => (
          <MessageEntry
            key={message.id}
            data={message}
            isOpen={message.id === openId}
            onOpen={() => handleOpen(message.id)}
          />
        ))}
      </div>
    </div>
  );
}
