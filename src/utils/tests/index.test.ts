import { swapItems } from '..';

describe('swapItems', () => {
  it('should swap items', () => {
    const array = [1, 2, 3, 4, 5];
    const result = swapItems(array, 0, 4);
    expect(result).toEqual([2, 3, 4, 5, 1]);
  });

  it('should swap items', () => {
    const array = [1, 2, 3, 4, 5];
    const result = swapItems(array, 0, 3);
    expect(result).toEqual([2, 3, 4, 1, 5]);
  });

  it('should throw error if invalid index', () => {
    const array = [1, 2, 3, 4, 5];
    expect(() => swapItems(array, -1, 4)).toThrowError('Invalid index');
    expect(() => swapItems(array, 0, -1)).toThrowError('Invalid index');
    expect(() => swapItems(array, 0, array.length)).toThrowError('Invalid index');
    expect(() => swapItems(array, array.length, 0)).toThrowError('Invalid index');
  });

  it('should throw error if invalid array', () => {
    expect(() => swapItems([], 0, 0)).toThrowError('Invalid array');
  });
});
