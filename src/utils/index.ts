export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export function swapItems<T>(array: T[], from: number, to: number): T[] {
  if (!Array.isArray(array) || !array.length) {
    throw new Error('Invalid array');
  }

  if (from < 0 || to < 0 || from >= array.length || to >= array.length) {
    throw new Error('Invalid index');
  }

  if (from === to) {
    return array;
  }

  const movingItem = array[from];
  array[from] = array[to];
  array[to] = movingItem;
  return array;
}
