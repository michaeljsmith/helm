export const checkThat: (
  condition: unknown,
  msg?: string,
) => asserts condition = (condition, msg): asserts condition => {
  if (!condition) {
    throw new Error(msg);
  }
};
