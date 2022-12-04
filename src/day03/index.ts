import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const priority = (c: string): number => {
  if (c > 'a' && c <= 'z') {
    return c.charCodeAt(0) - 96;
  } else if (c > 'A' && c <= 'Z') {
    return c.charCodeAt(0) - 64 + 26;
  } else {
    throw new Error('Invalid character');
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .map(line => [line.substring(0, line.length / 2), line.substring(line.length / 2)]);

  const commonLetter = (a: string, b: string) => {
    return a.split("").find(c => b.includes(c));
  }
  return input.map(halves =>
    commonLetter(halves[0], halves[1]))
    .map(c => priority(c!))
    .reduce((acc, n) => acc + n, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const commonLetter = (a: string, b: string, c: string): string => {
    return a.split("").find(char => b.includes(char) && c.includes(char))!;
  }

  const nextThreeLines = (lines: string[], i: number) => {
    return lines.slice(i, i + 3);
  }

  let sum: number = 0;
  for (let i = 0; i < input.length; i += 3) {
    const [a, b, c] = nextThreeLines(input, i);
    sum += priority(commonLetter(a, b, c));
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        `,
        expected: 16,
      },
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        `,
        expected: 16 + 38,
      },
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        `,
        expected: 18,
      },
      {
        input: `
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 52,
      },
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
