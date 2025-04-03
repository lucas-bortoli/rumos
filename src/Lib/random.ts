/**
 * Picks N random unique choices from an array.
 *
 * @template T - The type of the elements in the `choices` array.
 * @param choices - The array of choices to pick from.
 * @param n - The number of unique choices to pick.
 * @returns - An array of N randomly selected unique choices.
 * @throws - If `n` is greater than the length of the `choices` array.
 */
export function pickRandomUniqueChoices<T>(choices: T[], n: number): T[] {
  if (n > choices.length) {
    throw new Error("Cannot pick more unique choices than the array contains");
  }

  const pickedChoices: T[] = [];
  const remainingChoices = [...choices];

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * remainingChoices.length);
    pickedChoices.push(remainingChoices[randomIndex]);
    remainingChoices.splice(randomIndex, 1);
  }

  return pickedChoices;
}

/**
 * Shuffles the elements of an array in-place.
 *
 * @template T - The type of the elements in the array.
 * @param {T[]} array - The array to be shuffled.
 * @returns {T[]} - The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
