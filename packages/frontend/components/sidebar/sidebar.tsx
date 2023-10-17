import { homeRoute } from '@pages/home/home-route';
import { logsRoute } from '@pages/logs/logs-route';
import { messagesRoute } from '@pages/messages/messages-route';
import { ActivityLogIcon, EnvelopeClosedIcon, GridIcon } from '@radix-ui/react-icons';
import { SidebarItem } from './sidebar-item';

export function Sidebar() {
  return (
    <div className="flex w-2/12 p-4 bg-background dark:bg-background border">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Unit</h2>
          <div className="space-y-1">
            <SidebarItem to={homeRoute.url()} name="Clients" icon={GridIcon} />
            <SidebarItem to={messagesRoute.url()} name="Messages" icon={EnvelopeClosedIcon} />
            <SidebarItem to={logsRoute.url()} name="Logs" icon={ActivityLogIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
