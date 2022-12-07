import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const stringHasUniqueCharacters = (s: string): boolean => {
  const chars = s.split("");
  const uniqueChars = new Set(chars);
  return uniqueChars.size === chars.length; // all chars are unique
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let i = 4;
  for (; i < input.length; i++) {
    const str = input.slice(i - 4, i);
    console.log(`Considering index ${i} with ${str}...`);
    if (stringHasUniqueCharacters(str)) {
      return i;
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let i = 14;
  for (; i < input.length; i++) {
    const str = input.slice(i - 14, i);
    console.log(`Considering index ${i} with ${str}...`);
    if (stringHasUniqueCharacters(str)) {
      return i;
    }
  }
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
