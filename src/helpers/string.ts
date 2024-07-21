export const generateString = (symbols: string, length: number) => {
  if (!symbols || length <= 0) {
    return "";
  }

  const result = [];

  // Ensure each symbol appears at least once
  while (result.length < symbols.length) {
    result.push(symbols[result.length]);
  }

  // Randomly add symbols until the desired length is reached
  while (result.length < length) {
    result.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  // Shuffle the result array to ensure randomness
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
};
