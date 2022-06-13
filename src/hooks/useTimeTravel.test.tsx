import { act, renderHook } from '@testing-library/react';

import { useTimeTravel } from './useTimeTravel';

describe('useTimeTravel', () => {
  it('should add item to history', () => {
    const { result } = renderHook(() => useTimeTravel());

    act(() => {
      result.current.add({ id: 1, origin: 0, from: 0, move: 1 });
    });

    expect(result.current.history).toEqual([{ id: 1, origin: 0, from: 0, move: 1 }]);
  });

  it('should throw error if step is out of range', () => {
    const { result } = renderHook(() => useTimeTravel());

    expect(() => {
      act(() => {
        result.current.rollback(-1);
      });
    }).toThrowError('Rollback step is out of range');

    expect(() => {
      act(() => {
        result.current.rollback(1);
      });
    }).toThrowError('Rollback step is out of range');
  });

  it('should rollback by given step', () => {
    const { result } = renderHook(() => useTimeTravel());

    act(() => {
      result.current.add({ id: 5, origin: 4, from: 4, move: -1 });
      result.current.add({ id: 5, origin: 4, from: 3, move: -1 });
      result.current.add({ id: 5, origin: 4, from: 2, move: -1 });
    });

    act(() => {
      result.current.rollback(1);
    });

    expect(result.current.history[0]).toEqual({ id: 5, origin: 4, from: 3, move: -1 });

    act(() => {
      result.current.rollback(1);
    });

    expect(result.current.history[0]).toEqual({ id: 5, origin: 4, from: 4, move: -1 });
  });
});
