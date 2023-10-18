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

  console.log(dots)

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      {/* <div
        className="opacity-50 mr-2 my-auto inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      /> */}
      <div className="text-sm opacity-50">
        Loading
        <span>.</span>
        <span className={clsx(dots <= 0 && 'opacity-0')}>.</span>
        <span className={clsx(dots <= 1 && 'opacity-0')}>.</span>
      </div>
    </div>
  );
}
