type Stacks = Array<Array<string>>;

function createEmptyTwoDimensionalArray(length: number): Stacks {
    return [...Array(length)].map((x) => []);
}

export function parseStacks(input: string): Stacks {
    const lines = input.split('\n');
    const numberOfStacks = lines
        .pop()
        .split(' ')
        .filter((char) => char !== '')
        .map(Number).length;

    const stacks = createEmptyTwoDimensionalArray(numberOfStacks);

    lines.forEach((line) => {
        const splitLine = line.split('');
        for (
            let stack = 0, charIndex = 1;
            stack < numberOfStacks;
            stack++, charIndex += 4
        ) {
            if (splitLine[charIndex] !== ' ') {
                stacks[stack].unshift(splitLine[charIndex]);
            }
        }
    });

    return stacks;
}

export function applyCraneProcedures(
    stacks: Stacks,
    procedures: string,
    preserveCrateOrder = false,
): Stacks {
    procedures.split('\n').forEach((procedure) => {
        const [numCrates, stackFromNum, stackToNum] = procedure
            .split(' ')
            .map(Number)
            .filter(Number.isInteger);

        const fromStack = stacks[stackFromNum - 1];
        const toStack = stacks[stackToNum - 1];
        const cratesFrom = fromStack.length - numCrates;

        let movedCrates = fromStack.slice(cratesFrom);
        const leftoverCrates = fromStack.slice(0, cratesFrom);

        if (!preserveCrateOrder) {
            // .reverse() emulates the action of moving one crate over at a time
            movedCrates = movedCrates.reverse();
        }

        toStack.push(...movedCrates);
        stacks[stackFromNum - 1] = leftoverCrates;
    });

    return stacks;
}

export function getTopStacksFromFullInput(
    input: string,
    preserveCrateOrder = false,
): string {
    const [stacks, procedures] = input.split('\n\n');
    const updatedStacks = applyCraneProcedures(
        parseStacks(stacks),
        procedures,
        preserveCrateOrder,
    );

    return updatedStacks
        .reduce((topCrates: Array<string>, stack) => {
            topCrates.push(stack[stack.length - 1]);
            return topCrates;
        }, [])
        .join('');
}
