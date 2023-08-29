export const pickRandom = (arr: any[]) =>
  arr[Math.round(Math.random() * (arr.length - 1))];
