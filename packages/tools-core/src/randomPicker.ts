export function shuffleList<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickWinners<T>(array: T[], count: number): T[] {
  if (array.length === 0 || count <= 0) return [];
  const shuffled = shuffleList(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
