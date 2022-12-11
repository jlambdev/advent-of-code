type Items = Array<number>;

type WorryOperation = (item: number) => number;

type ThrowToMonkey = (item: number) => number;

class Monkey {
    numInspectedItems: number;
    readonly divisibleBy: number;
    readonly items: Items;

    private readonly worryOperation: WorryOperation;
    private readonly throwToMonkey: ThrowToMonkey;
    private readonly decreaseWorry: boolean;

    constructor(
        startingItems: Items,
        worryOperation: WorryOperation,
        throwToMonkey: ThrowToMonkey,
        divisibleBy: number,
        decreaseWorryAfterInspection: boolean = true,
    ) {
        this.items = startingItems;
        this.numInspectedItems = 0;
        this.worryOperation = worryOperation;
        this.throwToMonkey = throwToMonkey;
        this.divisibleBy = divisibleBy;
        this.decreaseWorry = decreaseWorryAfterInspection;
    }

    receiveItem(item: number): void {
        this.items.push(item);
    }

    inspectItem(commonDivisor: number = 1): [number, number] {
        let item = this.items.shift();
        item = this.worryOperation(item);
        this.numInspectedItems++;

        // Keep worry levels manageable!
        if (this.decreaseWorry) {
            item = Math.floor(Number(item) / 3);
        } else {
            item = item % commonDivisor;
        }

        const nextMonkey = this.throwToMonkey(item);
        return [nextMonkey, item];
    }
}

export function makeWorryOperation(
    operand: string,
    secondNumber: string,
): WorryOperation {
    if (operand === '*') {
        return (item: number) =>
            item * (secondNumber === 'old' ? item : Number(secondNumber));
    }
    return (item: number) => item + Number(secondNumber);
}

export function makeThrowToMonkey(
    divisbleBy: number,
    monkeyOnTrue: number,
    monkeyOnFalse: number,
): ThrowToMonkey {
    return (item: number) => (item % divisbleBy === 0 ? monkeyOnTrue : monkeyOnFalse);
}

export function initialiseMonkeys(
    input: string,
    decreaseWorry?: boolean,
): Map<number, Monkey> {
    const monkeys = new Map<number, Monkey>();

    input
        .split('\n\n')
        .map((chunk) => chunk.split('\n'))
        .forEach((chunk) => {
            const monkeyNumber = Number(chunk[0].substring(7, 8));
            const startingItems = chunk[1]
                .split(' ')
                .map((element) => Number(element.replace(/,/, '')))
                .filter((element) => Number.isInteger(element) && element > 0);

            const operation = chunk[2].split(' ').slice(6);
            const worryOperation = makeWorryOperation(operation[0], operation[1]);

            const divisibleBy = Number(chunk[3].split(' ')[5]);
            const onTrue = Number(chunk[4].split(' ')[9]);
            const onFalse = Number(chunk[5].split(' ')[9]);
            const throwToMonkey = makeThrowToMonkey(divisibleBy, onTrue, onFalse);

            monkeys.set(
                monkeyNumber,
                new Monkey(
                    startingItems,
                    worryOperation,
                    throwToMonkey,
                    divisibleBy,
                    decreaseWorry,
                ),
            );
        });

    return monkeys;
}

export function getMonkeyBusiness(
    input: string,
    rounds: number,
    decreaseWorry?: boolean,
): number {
    const monkeys = initialiseMonkeys(input, decreaseWorry);
    const commonDivisor = Array.from(monkeys.values()).reduce(
        (acc, cur) => (acc *= cur.divisibleBy),
        1,
    );

    for (let round = 0; round < rounds; round++) {
        for (const [_, monkey] of monkeys) {
            while (monkey.items.length > 0) {
                const [toMonkey, item] = monkey.inspectItem(commonDivisor);
                monkeys.get(toMonkey).receiveItem(item);
            }
        }
    }

    const sortedMonkeys = Array.from(monkeys.values()).sort(
        (a, b) => b.numInspectedItems - a.numInspectedItems,
    );

    return sortedMonkeys[0].numInspectedItems * sortedMonkeys[1].numInspectedItems;
}
