import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map(s => s.split(",").map(s => s.split("-").map(Number)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const fullyContains = (a, b): boolean => {
    return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
  }
  return input
    .map(([a, b]) => fullyContains(a, b) ? 1 : 0)
    .reduce((acc, n) => acc + n, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const overlaps = (a, b): boolean => {
    return (a[0] <= b[0] && a[1] >= b[0]) || (b[0] <= a[0] && b[1] >= a[0]);
  }
  return input
    .map(([a, b]) => overlaps(a, b) ? 1 : 0)
    .reduce((acc, n) => acc + n, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
      {
        input: `
        2-4,6-8
        2-8,3-7
        `,
        expected: 1,
      },
      {
        input: `
        14-28,13-28
        13-28,14-28
        72-81,82-91
        4-4,6-95
        4-4,4-4
        `,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1-1,2-2
        `,
        expected: 0,
      },
      {
        input: `
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
