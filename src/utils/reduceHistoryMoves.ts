import type { IHistoryItem } from 'hooks/useTimeTravel';

export interface IHistoryMove {
  from: number;
  move: number;
}

export const reduceHistoryMoves = (history: IHistoryItem[]) => {
  if (!history.length) {
    return null;
  }

  const moves = new Map();

  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];

    if (moves.has(item.id)) {
      const nextMove = moves.get(item.id).move + item.move;

      if (nextMove === 0) {
        moves.delete(item.id);
        continue;
      }

      moves.set(item.id, { ...item, move: nextMove });
      continue;
    }

    moves.set(item.id, { ...item });
    continue;
  }

  const positions = new Map();

  const cleanMoves = () => {
    moves.forEach((move) => {
      const newPosition = move.from + move.move;

      if (positions.has(newPosition)) {
        const occupying = positions.get(newPosition);

        const moveOccupyingBy = (move.from < newPosition ? -1 : 1) * move.move;
        if (newPosition === move.origin) {
          moves.delete(move.id);
          positions.delete(newPosition);

          if (newPosition + moveOccupyingBy === occupying.origin) {
            moves.delete(occupying.id);
            return;
          }

          const newOccupying = { ...occupying, from: newPosition, move: occupying.move + moveOccupyingBy };
          moves.set(occupying.id, newOccupying);
          return;
        }
      }

      if (newPosition === move.origin) {
        moves.delete(move.id);
        return;
      }

      positions.set(newPosition, move);
    });
  };

  cleanMoves();
  return moves;
};

// if (!Array.isArray(history)) {
//   throw new Error('State and history must be arrays');
// }

// if (!history.length) {
//   return history;
// }

// const moves = new Map<IHistoryItem['id'], IHistoryMove>();

// history.forEach((item) => {
//   const previousMove = moves.get(item.id);
//   if (!previousMove) {
//     moves.set(item.id, { from: item.from, move: item.move });
//     return;
//   }

//   const newMove = previousMove.move + item.move;

//   if (newMove === 0) {
//     moves.delete(item.id);
//     return;
//   }

//   moves.set(item.id, { from: item.from, move: newMove });
// });

// return moves;
