import { CreateWrapper } from '@lib/route/route-element';
import { PropsWithChildren } from 'react';

export function Layout(props: PropsWithChildren) {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex w-2/12">sidebar</div>
      <div className="flex flex-col w-10/12">
        <div className="h-12 w-full">Top bar</div>
        <div className="flex-1 bg-pink-50 p-4">{props.children}</div>
      </div>
    </div>
  );
}

export const createLayoutWrapper: CreateWrapper = (child) => {
  return <Layout>{child}</Layout>;
};
