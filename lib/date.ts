export function getDate30DaysInFuture(): Date {
  const now = Date.now();
  const future = now + 1000 * 60 * 60 * 24 * 30;
  return new Date(future);
}
