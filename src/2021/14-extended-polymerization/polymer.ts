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

export const differenceAfterPolymerization = (input: string) => {
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
            insertNewElement(leftNode, rightNode, 1, 3);
        } else {
            tail.setNext(rightNode);
            insertNewElement(tail, rightNode, 1, 3);
        }
        tail = rightNode;
    }

    // traverse linked list (full polymer chain)
    let test = '';
    while (head) {
        test += head.value;
        head = head.next;
    }

    console.log({ polymerTemplate, pairInsertionMap, test });
};
