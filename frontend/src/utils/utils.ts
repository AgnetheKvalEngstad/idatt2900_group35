/**
 * Enum for topic difficulty levels.
 */
export enum Difficulty {
  Beginner = "ingen",
  Intermediate = "litt",
  Expert = "mye",
}

/**
 * Checks the difficulty level of a topic and returns the corresponding enum value.
 *
 * @param difficulty The difficulty level of the topic as a string.
 * @returns The corresponding Difficulty enum value.
 */
export const checkDifficulty = (difficulty: string) => {
  switch (difficulty.trim()) {
    case "Beginner":
      return Difficulty.Beginner;
    case "Intermediate":
      return Difficulty.Intermediate;
    case "Expert":
      return Difficulty.Expert;
    default:
      return Difficulty.Beginner;
  }
};

/**
 * Returns the background color based on the difficulty level.
 *
 * @param difficulty The difficulty level of the topic as a string.
 * @returns A string representing a background color.
 */
export const getBackgroundColor = (difficulty: string) => {
  switch (difficulty) {
    case "ingen":
      return "#66DB68";
    case "litt":
      return "#FF9000";
    case "mye":
      return "#E77979";
    default:
      return "#66DB68";
  }
};
