import { countMessageTypes } from '@components/client-overview';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { clientRoute } from '@pages/client/client-route';
import { EnterIcon, ExitIcon, RocketIcon } from '@radix-ui/react-icons';
import { ClientFragment } from '@schemas/client-fragment.gql';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: ClientFragment;
}

export function ClientCard(props: Props) {
  const navigate = useNavigate();

  const { inCount, outCount } = useMemo(() => {
    const { inCount, outCount } = countMessageTypes(props.data.messages ?? []);
    return {
      inCount: inCount > 999 ? '999+' : inCount.toString(),
      outCount: outCount > 999 ? '999+' : outCount.toString(),
    };
  }, [props.data.messages]);

  const handleView = () => {
    navigate(clientRoute.url({ id: props.data.id }));
  };

  const handleViewIncoming = () => {
    navigate(clientRoute.url({ id: props.data.id }) + '?tab=messages');
  };

  const handleViewOutgoing = () => {
    navigate(clientRoute.url({ id: props.data.id }) + '?tab=messages');
  };

  return (
    <Card className="bg-gray-950">
      <CardHeader>
        <CardTitle className="flex-row flex">
          <p
            onClick={handleView}
            title={props.data.name ?? undefined}
            className="whitespace-nowrap overflow-ellipsis overflow-hidden w-11/12 cursor-pointer"
          >
            {props.data.name ?? 'Unknown Client'}
          </p>
          <div
            className={clsx(
              'h-3 w-3 rounded-full ml-auto my-auto',
              props.data.connected ? 'bg-green-200' : 'bg-red-200'
            )}
          />
        </CardTitle>
        <div className="flex-row flex">
          <RocketIcon className="my-auto mr-2" />
          {props.data.appName}
        </div>
      </CardHeader>
      <CardContent className="flex flex-row">
        <Button
          className="mr-2 my-auto relative"
          size="sm"
          variant="secondary"
          onClick={handleViewIncoming}
        >
          <EnterIcon className="h-5 w-5" />
          <div className="ml-2 -right-1 -bottom-2 bg-green-100 inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-primary text-primary-foreground">
            {inCount}
          </div>
        </Button>
        <Button
          className="my-auto relative"
          variant="secondary"
          size="sm"
          onClick={handleViewOutgoing}
        >
          <ExitIcon className="h-5 w-5" />
          <div className="ml-2 -right-1 bg-blue-200 -bottom-3 inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-primary text-primary-foreground">
            {outCount}
          </div>
        </Button>
        <Button className="my-auto ml-auto" variant="secondary" onClick={handleView}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}
