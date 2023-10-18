import { PropsWithChildren, useMemo } from 'react';
import { createPortal } from 'react-dom';

export function Topbar() {
  return <div id="topbar" className="w-full p-4 border-b empty:hidden flex flex-row"></div>;
}

export function TopbarPortal(props: PropsWithChildren) {
  const topbarElement = useMemo(() => {
    return document.getElementById('topbar');
  }, []);

  if (!topbarElement) {
    throw new Error('TopbarPortal: topbar not found');
  }

  return createPortal(props.children, topbarElement);
}
