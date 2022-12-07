import run from "aocrunner";

const parseInput = (rawInput: string): [string[][], { [key: string]: string }[]] => {
  const [rawStacks, rawProcedure] = rawInput.split("\n\n");
  const parsedStacks = rawStacks.split('\n').slice(0, -1)
    .map(s => s.replace(/ ?   /g, '_')
      .replace(/ /g, '')
      .replace(/[\[\]]/g, '')
      .split(''));
  const pivotedStacks = parsedStacks.reduce((acc, arr) => {
    arr.forEach((box, i) => {
      if (acc[i] === undefined) acc[i] = [];
      if (box === '_') return;
      acc[i].unshift(box);
    })
    return acc;
  }, [[]] as string[][]);
  return [
    pivotedStacks,
    rawProcedure.split('\n').map(s => s.match(/move (?<numOfBoxes>\d+) from (?<from>\d+) to (?<to>\d+)/)?.groups)
  ];
};

const part1 = (rawInput: string) => {
  const [stacks, procedure] = parseInput(rawInput);

  procedure.forEach(({ numOfBoxes, from, to }) => {
    for (let i = 0; i < Number(numOfBoxes); i++) {
      const toMove = stacks[Number(from) - 1]?.pop();
      if (toMove !== undefined) {
        stacks[Number(to) - 1]?.push(toMove);
      }
    }
  });

  return stacks.reduce((acc, stack) => acc += stack.pop() ?? '', '');
};

const part2 = (rawInput: string) => {
  const [stacks, procedures] = parseInput(rawInput);

  procedures.forEach(procedure => {
    const numOfBoxes = Number(procedure.numOfBoxes);
    const from = Number(procedure.from) - 1;
    const to = Number(procedure.to) - 1;
    const boxesInTransit = stacks[from].splice(-numOfBoxes, numOfBoxes);

    stacks[to] = [...stacks[to], ...boxesInTransit];
  });


  return stacks.reduce((acc, stack) => acc += stack.pop() ?? '', '');
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
      {
        input: `        [D]    
[N] [C] [A]   
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1`,
        expected: "CMD",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C] [A]   
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1`,
        expected: "DCP",
      },
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 3 from 2 to 1
move 1 from 1 to 2`,
        expected: "CDP",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
