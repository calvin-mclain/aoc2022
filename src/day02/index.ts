import run from "aocrunner";

type RPS = 'Rock' | 'Paper' | 'Scissors';
type ABC = 'A' | 'B' | 'C';
type XYZ = 'X' | 'Y' | 'Z';

const winner = (a: RPS, b: RPS): string => {
  return {
    'Rock': { 'Rock': 'draw', 'Paper': 'right', 'Scissors': 'left' },
    'Paper': { 'Rock': 'left', 'Paper': 'draw', 'Scissors': 'right' },
    'Scissors': { 'Rock': 'right', 'Paper': 'left', 'Scissors': 'draw' }
  }[a][b] ?? 'draw';
}

const losesTo: Record<RPS, RPS> = { 'Paper': 'Rock', 'Scissors': 'Paper', 'Rock': 'Scissors' };
const winsTo: Record<RPS, RPS> = { 'Paper': 'Scissors', 'Scissors': 'Rock', 'Rock': 'Paper' };

const rps = (c: ABC | XYZ): RPS => {
  const lookup: Record<ABC | XYZ, RPS> =
    { 'A': 'Rock', 'X': 'Rock', 'B': 'Paper', 'Y': 'Paper', 'C': 'Scissors', 'Z': 'Scissors' };
  return lookup[c];
}

const pointsForResult = (a: RPS, b: RPS): number => {
  return { 'left': 0, 'right': 6, 'draw': 3 }[winner(a, b)] ?? 0;
}

const pointsForShape = (s: RPS) => {
  return { 'Rock': 1, 'Paper': 2, 'Scissors': 3 }[s] ?? 0;
}

const parseInput = (rawInput: string): RPS[][] =>
  rawInput.split("\n").map(s => s.split(" ").map(c => rps(c as ABC | XYZ)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.map(([a, b]) => pointsForResult(a!, b!) + pointsForShape(b!))
    .reduce((acc, n) => acc + n, 0);
};


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map(([a, b]): RPS[] => {
    // re-parse
    if (b == 'Rock') {
      return [a, losesTo[a]];
    } else if (b == 'Paper') {
      return [a, a];
    } else {
      return [a, winsTo[a]];
    }
  });

  return input.map(([a, b]) => pointsForResult(a!, b!) + pointsForShape(b!))
    .reduce((acc, n) => acc + n, 0);
};


run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 15,
      },
      {
        input: `
        A Y
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
      {
        input: `
        A Y
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
