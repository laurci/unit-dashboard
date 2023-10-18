import { Button } from '@components/ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

interface Props {
  title: ReactNode;
  description: ReactNode;
  isOpen: boolean;
  onOpen: () => void;
}

interface ExpandableProps extends PropsWithChildren {
  className?: string;
  isOpen?: boolean;
}

function Expandable(props: ExpandableProps) {
  const { ref, height } = useResizeDetector({
    handleHeight: true,
    handleWidth: false,
  });

  return (
    <div
      className={clsx(
        'transition-all duration-500 relative overflow-hidden overflow-ellipsis',
        props.className
      )}
      style={{
        height: props.isOpen ? height : 0,
      }}
    >
      <div ref={ref} className="absolute">
        {props.children}
      </div>
    </div>
  );
}

export function ClientEntryItem(props: Props) {
  return (
    <div className="border-2 flex-col p-2 my-1 rounded-sm ">
      <div className="flex flex-row">
        <div className="cursor-pointer my-auto" onClick={props.onOpen}>
          {props.title}
        </div>
        <div className="ml-auto">
          <Button
            className="h-4 w-4 rounded-sm"
            size={'icon'}
            variant={'ghost'}
            onClick={props.onOpen}
          >
            <ChevronDownIcon className={clsx('transition-all', props.isOpen && 'rotate-180')} />
          </Button>
        </div>
      </div>
      <Expandable isOpen={props.isOpen}>{props.description}</Expandable>
    </div>
  );
}
