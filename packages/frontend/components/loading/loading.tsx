import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function Loading() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDots((dots) => {
        if (dots >= 2) {
          return 0;
        }
        return dots + 1;
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="text-sm opacity-50">
        Loading
        <span>.</span>
        <span className={clsx(dots <= 0 && 'opacity-0')}>.</span>
        <span className={clsx(dots <= 1 && 'opacity-0')}>.</span>
      </div>
    </div>
  );
}
