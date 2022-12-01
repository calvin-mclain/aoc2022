import run from "aocrunner";
import fs from "fs";

const parseInput = (rawInput: string) => rawInput.split("\n\n")
  .map(s => s.split("\n").map(s => Number(s)).reduce((acc, n) => acc + n, 0));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return Math.max(...input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const max1 = Math.max(...input);
  const max2 = Math.max(...input.filter(n => n !== max1));
  const max3 = Math.max(...input.filter(n => n !== max1 && n !== max2));
  return max1 + max2 + max3;
};

run({
  part1: {
    tests: [
      {
        input: `
        2
        0
        
        1
        1
        1
        `,
        expected: "3",
      },
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
