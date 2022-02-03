import { LinearProgress } from '@ttoss/ui';
import * as React from 'react';

const MAX_PROGRESS = 100;

export const InfiniteLinearProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === MAX_PROGRESS) {
          return 0;
        }

        let diff = 0;

        if (oldProgress > 0.97 * MAX_PROGRESS) {
          diff -= 0.4 * MAX_PROGRESS;
        } else if (oldProgress > 0.7 * MAX_PROGRESS) {
          diff = Math.random() * (MAX_PROGRESS - oldProgress) * 0.1;
        } else {
          diff = Math.random() * (MAX_PROGRESS * 0.03);
        }

        return Math.min(oldProgress + diff, MAX_PROGRESS);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LinearProgress max={MAX_PROGRESS} value={progress} role="progressbar" />
  );
};
