type Items = Array<bigint>;

type WorryOperation = (item: bigint) => bigint;

type ThrowToMonkey = (item: bigint) => number;

type DivisibleByCache = Map<[bigint, bigint], bigint>;

class Monkey {
    numInspectedItems: number;
    readonly items: Items;

    private readonly worryOperation: WorryOperation;
    private readonly throwToMonkey: ThrowToMonkey;
    private readonly decreaseWorry: boolean;

    constructor(
        startingItems: Items,
        worryOperation: WorryOperation,
        throwToMonkey: ThrowToMonkey,
        decreaseWorryAfterInspection: boolean = true,
    ) {
        this.items = startingItems;
        this.numInspectedItems = 0;
        this.worryOperation = worryOperation;
        this.throwToMonkey = throwToMonkey;
        this.decreaseWorry = decreaseWorryAfterInspection;
    }

    receiveItem(item: bigint): void {
        this.items.push(item);
    }

    inspectItem(): [number, bigint] {
        let item = this.items.shift();
        item = this.worryOperation(item);
        this.numInspectedItems++;
        if (this.decreaseWorry) {
            item = BigInt(Math.floor(Number(item) / 3));
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
        return (item: bigint) =>
            item * BigInt(secondNumber === 'old' ? item : Number(secondNumber));
    }
    return (item: bigint) => item + BigInt(Number(secondNumber));
}

export function makeThrowToMonkey(
    divisbleBy: bigint,
    monkeyOnTrue: number,
    monkeyOnFalse: number,
    cache?: DivisibleByCache,
): ThrowToMonkey {
    return (item: bigint) => {
        if (cache && cache.has([item, divisbleBy])) {
            return cache.get([item, divisbleBy]) === 0n ? monkeyOnTrue : monkeyOnFalse;
        }
        const computation = item % divisbleBy;
        if (cache) {
            cache.set([item, divisbleBy], computation);
        }
        return computation === 0n ? monkeyOnTrue : monkeyOnFalse;
    };
}

export function initialiseMonkeys(
    input: string,
    decreaseWorry?: boolean,
): Map<number, Monkey> {
    const monkeys = new Map<number, Monkey>();
    // const multiplyByCache
    const cache: DivisibleByCache = new Map();

    input
        .split('\n\n')
        .map((chunk) => chunk.split('\n'))
        .forEach((chunk) => {
            const monkeyNumber = Number(chunk[0].substring(7, 8));
            const startingItems = chunk[1]
                .split(' ')
                .map((element) => Number(element.replace(/,/, '')))
                .filter((element) => Number.isInteger(element) && element > 0)
                .map(BigInt);

            const operation = chunk[2].split(' ').slice(6);
            const worryOperation = makeWorryOperation(operation[0], operation[1]);

            const divisibleBy = BigInt(chunk[3].split(' ')[5]);
            const onTrue = Number(chunk[4].split(' ')[9]);
            const onFalse = Number(chunk[5].split(' ')[9]);
            const throwToMonkey = makeThrowToMonkey(divisibleBy, onTrue, onFalse, cache);

            monkeys.set(
                monkeyNumber,
                new Monkey(startingItems, worryOperation, throwToMonkey, decreaseWorry),
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

    for (let round = 0; round < rounds; round++) {
        for (const [_, monkey] of monkeys) {
            while (monkey.items.length > 0) {
                const [toMonkey, item] = monkey.inspectItem();
                monkeys.get(toMonkey).receiveItem(item);
            }
        }
    }

    const sortedMonkeys = Array.from(monkeys.values()).sort(
        (a, b) => b.numInspectedItems - a.numInspectedItems,
    );

    return sortedMonkeys[0].numInspectedItems * sortedMonkeys[1].numInspectedItems;
}
