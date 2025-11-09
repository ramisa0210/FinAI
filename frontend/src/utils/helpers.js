export const currency = (n = 0, symbol = '৳') =>
  `${symbol} ${Number(n || 0).toLocaleString()}`;
