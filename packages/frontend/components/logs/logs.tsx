import { LogEntry } from '@components/client-overview/client-logs-realtime';
import { TopbarPortal } from '@components/topbar';
import { Card } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { TabsList, TabsTrigger } from '@components/ui/tabs';
import { Tabs } from '@radix-ui/react-tabs';
import { LogFragment } from '@schemas/log-fragment.gql';
import { useMemo, useState } from 'react';

interface Props {
  data: LogFragment[];
}

export function Logs(props: Props) {
  const items = props.data;

  const [tab, setTab] = useState('all');
  const [openId, setOpenId] = useState<string>();

  const filtered = useMemo(() => {
    if (tab === 'debug') {
      return props.data.filter((el) => el.type === 'DEBUG');
    }

    if (tab === 'info') {
      return props.data.filter((el) => el.type === 'INFO');
    }

    if (tab === 'warn') {
      return props.data.filter((el) => el.type === 'WARNING');
    }

    if (tab === 'error') {
      return props.data.filter((el) => el.type === 'ERROR');
    }

    return props.data;
  }, [props.data, tab]);

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
        <Input className="max-w-min" placeholder="Search" />
      </TopbarPortal>

      <div className="flex flex-row mb-4">
        <Tabs value={tab} className="border rounded-lg">
          <TabsList className="w-full bg-card">
            <TabsTrigger value="all" onClick={() => setTab('all')}>
              All
            </TabsTrigger>
            <TabsTrigger value="debug" onClick={() => setTab('debug')}>
              Debug
            </TabsTrigger>
            <TabsTrigger value="info" onClick={() => setTab('info')}>
              Info
            </TabsTrigger>
            <TabsTrigger value="warn" onClick={() => setTab('warn')}>
              Warn
            </TabsTrigger>
            <TabsTrigger value="error" onClick={() => setTab('error')}>
              Error
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="flex flex-col p-4">
        {filtered.length === 0 && <div className="mx-auto my-40">No logs! :(</div>}
        {filtered.map((log) => (
          <LogEntry
            key={log.id}
            data={log}
            isOpen={log.id === openId}
            onOpen={() => handleOpen(log.id)}
          />
        ))}
      </Card>
    </>
  );
}
