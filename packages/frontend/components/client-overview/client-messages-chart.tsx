import { MessageFragment } from '@schemas/message-fragment.gql';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { countMessageTypes } from '.';

interface Props {
  data: MessageFragment[];
}

export function ClientMessagesChart(props: Props) {
  const chartData = useMemo(() => {
    const { inCount, outCount } = countMessageTypes(props.data);

    return [
      {
        name: 'Incoming Messages',
        value: inCount,
      },
      {
        name: 'Outgoing Messages',
        value: outCount,
      },
    ];
  }, [props.data]);

  return (
    <div className="flex flex-col">
      <p className="text-lg">Messages</p>

      <PieChart width={250} height={250}>
        <Pie
          data={chartData}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label={true}
          labelLine={false}
        >
          <Cell className="fill-green-100" />
          <Cell className="fill-blue-200" />
        </Pie>
      </PieChart>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="h-3 w-3 my-auto mr-2 bg-green-100 rounded-full" />
          <div className="my-auto">- Incoming Messages</div>
        </div>
        <div className="flex flex-row">
          <div className="h-3 w-3 my-auto mr-2 bg-blue-200 rounded-full" />
          <div className="my-auto">- Outgoing Messages</div>
        </div>
      </div>
    </div>
  );
}
