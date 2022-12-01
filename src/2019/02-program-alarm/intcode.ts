const isAddOpcode = (x: number) => x === 1;

const isMultiplyOpcode = (x: number) => x === 2;

const isTerminateOpcode = (x: number) => x === 99;

export const run = (input: string, replacements: number[][] = []) => {
    const memory = input.split(',').map(Number);

    for (const pair of replacements) {
        memory[pair[0]] = pair[1];
    }

    let pointer = 0; // position
    let value = memory[pointer];

    while (!isTerminateOpcode(value)) {
        const left = memory[memory[pointer + 1]];
        const right = memory[memory[pointer + 2]];

        if (isAddOpcode(value)) {
            memory[memory[pointer + 3]] = left + right;
        } else if (isMultiplyOpcode(value)) {
            memory[memory[pointer + 3]] = left * right;
        }

        // step forward
        pointer += 4;
        value = memory[pointer];
    }

    return memory;
};

// TODO: given that this is only increasing the output, why not try a binary search?
// try in the middle, if it's an even number, split halfway
// if it's odd, do first even, 2nd odd (+1)

const findNounAndVerb = (input: string, needle: number) => {
    const right = 9801; // 99x99 (max)
    const left = 0;
    let combined = (right + left) / 2;

    // convert needle to noun + verb

    let noun: number;
    let verb: number;

    noun = Math.floor(Math.sqrt(combined));
    verb = Math.ceil(Math.sqrt(combined));

    const result = run(input, [
        [1, noun],
        [2, verb],
    ])[0];

    if (result === needle) {
        return [noun, verb];
    } else if (result > needle) {
        // right = combined;
    }
};
