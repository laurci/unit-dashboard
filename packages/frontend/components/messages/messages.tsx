import { MessageEntry } from '@components/client-overview/client-messages-realtime';
import { TopbarPortal } from '@components/topbar';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { TabsList, TabsTrigger } from '@components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import { MessageFragment } from '@schemas/message-fragment.gql';
import { useState } from 'react';

interface Props {
  data: MessageFragment[];
}

export function Messages(props: Props) {
  const items = props.data;

  const [tab, setTab] = useState('all');
  const [openId, setOpenId] = useState<string>();

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
        <Input className="ml-4 max-w-min" placeholder="Search" />
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
        {items.map((message) => (
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
