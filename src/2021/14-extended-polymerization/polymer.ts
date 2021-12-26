class Node {
    public value: string;
    public next?: Node;

    constructor(value: string, next?: Node) {
        this.value = value;
        this.next = next;
    }

    setNext(newNext: Node) {
        this.next = newNext;
    }
}

export const differenceAfterPolymerizationRecursive = (
    input: string,
    maxIterations: number,
) => {
    const lines = input.split('\n');
    const polymerTemplate = lines[0];

    // pair insertion rules from lines[2] to lines[lines.length - 1]
    const pairInsertionMap = new Map<string, string>();
    for (let i = 2; i < lines.length; i++) {
        const [pair, insert] = lines[i].split(' -> ');
        pairInsertionMap.set(pair, insert);
    }

    // recursive algorithm to insert elements up to a certain number of iterations
    const insertNewElement = (
        left: Node,
        right: Node,
        iteration: number,
        iterationMax: number,
    ) => {
        const key = `${left.value}${right.value}`;
        const mid = new Node(pairInsertionMap.get(key), right);
        left.setNext(mid);

        if (iteration < iterationMax) {
            insertNewElement(left, mid, iteration + 1, iterationMax);
            insertNewElement(mid, right, iteration + 1, iterationMax);
        }
    };

    // scan over adjecent letters in the polymer template, i.e [0] + [1]; [1] + [2]...
    let head = undefined;
    let tail = undefined;
    for (
        let left = 0, right = 1;
        right < polymerTemplate.length;
        left++, right++
    ) {
        // build linked list (with recursively inserted nodes)
        const rightNode = new Node(polymerTemplate[right]);
        if (!head) {
            const leftNode = new Node(polymerTemplate[left], rightNode);
            head = leftNode;
            insertNewElement(leftNode, rightNode, 1, maxIterations);
        } else {
            tail.setNext(rightNode);
            insertNewElement(tail, rightNode, 1, maxIterations);
        }
        tail = rightNode;
    }

    // traverse linked list (full polymer chain)
    const counter = new Map<string, number>();
    while (head) {
        if (!counter.has(head.value)) counter.set(head.value, 1);
        else counter.set(head.value, counter.get(head.value) + 1);
        head = head.next;
    }

    // maybe there is some optimisation that could be done earlier, but its ok
    let highest;
    let lowest;
    for (const [_, value] of counter) {
        if (!highest) highest = value;
        else if (value > highest) highest = value;

        if (!lowest) lowest = value;
        else if (value < lowest) lowest = value;
    }

    // console.log({ highest, lowest });

    return highest - lowest;
};

// adapted from somewhere else because my recursive solution hangs
export const differenceAfterPolymerizationIterative = (
    input: string,
    maxIterations: number,
) => {
    // start a count of all elements
    const elementCount = new Map<string, number>();

    const [template, unprocessedRules] = input.split('\n\n');

    const rules = unprocessedRules.split(`\n`).reduce((acc, next) => {
        const [pair, elementToInsert] = next.split(' -> ');
        acc.set(pair, elementToInsert);
        if (!elementCount.has(elementToInsert)) {
            elementCount.set(elementToInsert, 0);
        }
        return acc;
    }, new Map<string, string>());

    // count the chars in the template string
    for (const char of template) {
        const count = elementCount.get(char);
        elementCount.set(char, count + 1);
    }

    // keep track of generated pairs, starting with template
    const pairs = new Map<string, number>();
    for (let i = 0; i < template.length - 1; i++) {
        pairs.set(`${template[i]}${template[i + 1]}`, 1);
    }

    const addOrIncrement = (
        map: Map<string, number>,
        key: string,
        amount: number,
    ) => {
        const value = map.get(key);
        if (value) {
            map.set(key, value + amount);
        } else {
            map.set(key, amount);
        }
    };

    while (maxIterations > 0) {
        const currentPairs = Array.from(pairs.entries());

        for (const [pair, pairCount] of currentPairs) {
            const nextChar = rules.get(pair);

            const count = elementCount.get(nextChar);
            elementCount.set(nextChar, count + pairCount);

            pairs.set(pair, pairs.get(pair) - pairCount);

            addOrIncrement(pairs, `${pair[0]}${nextChar}`, pairCount);
            addOrIncrement(pairs, `${nextChar}${pair[1]}`, pairCount);
        }

        --maxIterations;
    }

    const max = Math.max(...Array.from(elementCount.values()));
    const min = Math.min(...Array.from(elementCount.values()));

    // console.log({
    //     template,
    //     rules,
    //     elementCount,
    //     pairs,
    //     maxIterations,
    //     max,
    //     min,
    // });

    return max - min;
};
