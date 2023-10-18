import { MessageEntry } from '@components/client-overview/client-messages-realtime';
import { TopbarPortal } from '@components/topbar';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { TabsList, TabsTrigger } from '@components/ui/tabs';
import { FuseOptions, useFuse } from '@hooks/use-fuse';
import { Tabs } from '@radix-ui/react-tabs';
import { MessageFragment } from '@schemas/message-fragment.gql';
import { useMemo, useState, useTransition } from 'react';

interface Props {
  data: MessageFragment[];
}

const fuseOptions: FuseOptions<MessageFragment> = {
  keys: ['direction', 'value'],
};

export function Messages(props: Props) {
  const [tab, setTab] = useState('all');
  const [openId, setOpenId] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (tab === 'in') {
      return props.data.filter((el) => el.direction === 'IN');
    }

    if (tab === 'out') {
      return props.data.filter((el) => el.direction === 'OUT');
    }

    return props.data;
  }, [props.data, tab]);

  const searched = useFuse(filtered, searchTerm, fuseOptions);

  const handleOpen = (id: string) => [
    setOpenId((current) => {
      if (current === id) {
        return undefined;
      }
      return id;
    }),
  ];

  return (
    <>
      <TopbarPortal>
        <Input
          className="max-w-min"
          placeholder="Search"
          onChange={(e) => {
            startTransition(() => {
              setSearchTerm(e.currentTarget.value);
            });
          }}
        />
      </TopbarPortal>

      <div className="flex flex-row mb-4">
        <Tabs value={tab} className="border rounded-lg w-64">
          <TabsList className="w-full bg-card">
            <TabsTrigger value="all" onClick={() => setTab('all')}>
              All
            </TabsTrigger>
            <TabsTrigger value="in" onClick={() => setTab('in')}>
              Incoming
            </TabsTrigger>
            <TabsTrigger value="out" onClick={() => setTab('out')}>
              Outgoing
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="flex flex-col p-4">
        {searched.length === 0 && <div className="mx-auto my-40">No messages! :(</div>}
        {searched.map((message) => (
          <MessageEntry
            key={message.id}
            data={message}
            isOpen={message.id === openId}
            onOpen={() => handleOpen(message.id)}
          />
        ))}
      </Card>
    </>
  );
}
