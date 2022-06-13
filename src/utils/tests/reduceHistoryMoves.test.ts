import { reduceHistoryMoves } from '../reduceHistoryMoves';
import type { IHistoryMove } from '../reduceHistoryMoves';

import type { IHistoryItem } from 'hooks/useTimeTravel';

describe('reduceHistoryMoves', () => {
  it('should return the initial history', () => {
    const history: IHistoryItem[] = [];
    const reducedHistory = reduceHistoryMoves(history);
    expect(reducedHistory).toEqual(null);
  });

  it('should return empty history when moves cancels itself', () => {
    const id = 1;
    const origin = 0;
    const history: IHistoryItem[] = [
      { id, origin, from: 0, move: 1 },
      { id, origin, from: 1, move: -1 }
    ];
    const reducedHistory = reduceHistoryMoves(history);

    const expectedHistory: Map<IHistoryItem['id'], IHistoryMove> = new Map();
    expect(reducedHistory).toEqual(expectedHistory);
  });

  it('should return one move', () => {
    const id = 1;
    const origin = 0;
    const history: IHistoryItem[] = [
      { id, origin, from: 0, move: -1 },
      { id, origin, from: -1, move: 1 },
      { id, origin, from: 0, move: 1 }
    ];
    const reducedHistory = reduceHistoryMoves(history);

    const expectedHistory: Map<IHistoryItem['id'], IHistoryMove> = new Map([
      [
        id,
        {
          from: 0,
          move: 1,
          origin,
          id
        }
      ]
    ]);
    expect(reducedHistory).toEqual(expectedHistory);
  });

  it('should return one back move', () => {
    const id = 1;
    const origin = 0;
    const history: IHistoryItem[] = [
      { id, origin, from: 0, move: -1 },
      { id, origin, from: -1, move: 1 },
      { id, origin, from: 0, move: -1 }
    ];
    const reducedHistory = reduceHistoryMoves(history);
    const expectedHistory: Map<IHistoryItem['id'], IHistoryMove> = new Map([
      [
        id,
        {
          from: 0,
          move: -1,
          origin,
          id
        }
      ]
    ]);
    expect(reducedHistory).toEqual(expectedHistory);
  });

  it('should return two moves', () => {
    const id = 1;
    const origin = 0;
    const history: IHistoryItem[] = [
      { id, origin, from: 1, move: 1 },
      { id, origin, from: 0, move: 1 },
      { id, origin, from: 1, move: -1 },
      { id, origin, from: 0, move: 1 }
    ];
    const reducedHistory = reduceHistoryMoves(history);

    const expectedHistory: Map<IHistoryItem['id'], IHistoryMove> = new Map([
      [
        id,
        {
          from: 1,
          move: 2,
          origin,
          id
        }
      ]
    ]);
    expect(reducedHistory).toEqual(expectedHistory);
  });

  it('should cancel moves when return to origin', () => {
    const history: IHistoryItem[] = [
      { id: 2, origin: 1, from: 0, move: 1 },
      { id: 1, origin: 0, from: 0, move: 1 }
    ];
    const reducedHistory = reduceHistoryMoves(history);

    const expectedHistory: Map<IHistoryItem['id'], IHistoryMove> = new Map();
    expect(reducedHistory).toEqual(expectedHistory);
  });

  it('should cancel moves when return to origin', () => {
    const history: IHistoryItem[] = [
      { id: 3, origin: 2, from: 1, move: 1 },
      { id: 1, origin: 0, from: 1, move: -1 },
      { id: 1, origin: 0, from: 2, move: -1 },
      { id: 2, origin: 1, from: 0, move: 1 },
      { id: 1, origin: 0, from: 1, move: 1 },
      { id: 1, origin: 0, from: 0, move: 1 }
    ];
    const reducedHistory = reduceHistoryMoves(history);

    const expectedHistory: Map<IHistoryItem['id'], IHistoryMove> = new Map();
    expect(reducedHistory).toEqual(expectedHistory);
  });
});
