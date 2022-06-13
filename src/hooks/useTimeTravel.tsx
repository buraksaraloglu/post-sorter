import { useState } from 'react';

import type { IPost } from 'components/Post';

export interface IHistoryItem extends Pick<IPost, 'id'> {
  origin: number;
  from: number;
  move: number;
}

export interface IUseTimeTravelReturn {
  history: IHistoryItem[];
  add: (item: IHistoryItem) => void;
  rollback: (to: number) => IHistoryItem[];
}

export const useTimeTravel = (): IUseTimeTravelReturn => {
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  const add = (item: IHistoryItem) => {
    setHistory((previousHistory) => [item, ...previousHistory]);
  };

  const rollback = (step: number) => {
    if (step <= 0 || step > history.length) {
      throw new Error('Rollback step is out of range');
    }

    const newHistory = history.slice(step, history.length);
    setHistory(newHistory);
    return newHistory;
  };

  return { history, add, rollback };
};
