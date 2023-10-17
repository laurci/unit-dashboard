import { Sidebar } from '@components/sidebar';
import { Topbar } from '@components/topbar';
import { PropsWithChildren } from 'react';

export function Layout(props: PropsWithChildren) {
  return (
    <div className="flex flex-row h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col w-10/12 bg-background dark:bg-background border-t">
        <Topbar />
        <div className="flex flex-1 flex-col p-4 overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
}
