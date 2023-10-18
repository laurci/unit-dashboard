import { LogFragment } from '@schemas/log-fragment.gql';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { countLogTypes } from '.';

interface Props {
  data: LogFragment[];
}

export function ClientLogsChart(props: Props) {
  const chartData = useMemo(() => {
    const { infoCount, debugCount, warnCount, errorCount } = countLogTypes(props.data);

    return [
      {
        name: 'Debug',
        value: debugCount,
      },
      {
        name: 'Info',
        value: infoCount,
      },
      {
        name: 'Warning',
        value: warnCount,
      },
      {
        name: 'Error',
        value: errorCount,
      },
    ];
  }, [props.data]);

  const legend = [
    {
      text: 'Debug',
      fill: 'fill-green-100',
      bg: 'bg-green-100',
    },
    {
      text: 'Info',
      fill: 'fill-blue-200',
      bg: 'bg-blue-200',
    },
    {
      text: 'Warn',
      fill: 'fill-yellow-100',
      bg: 'bg-yellow-100',
    },
    {
      text: 'Error',
      fill: 'fill-red-100',
      bg: 'bg-red-100',
    },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-lg">Logs</p>
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
          {legend.map((item) => (
            <Cell key={item.text} className={item.fill} />
          ))}
        </Pie>
      </PieChart>
      <div className="grid grid-cols-2">
        {legend.map((item) => (
          <div key={item.text} className="flex flex-row">
            <div className={clsx('h-3 w-3 my-auto mr-2 rounded-full', item.bg)} />
            <div className="my-auto">- {item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
