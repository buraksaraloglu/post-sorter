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

  const newArray = [...array];
  const movingItem = newArray[from];
  newArray.splice(from, 1);
  newArray.splice(to, 0, movingItem);

  return newArray;
}
