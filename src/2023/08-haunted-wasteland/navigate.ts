type Node = {
    name: string;
    left: string;
    right: string;
};

function getNodes(nodesUnparsed: string): {
    nodeMap: Map<string, Node>;
    nodesEndingWithA: Array<Node>;
} {
    const nodeMap = new Map<string, Node>();
    const nodesEndingWithA: Array<Node> = [];
    nodesUnparsed.split('\n').forEach((line: string) => {
        const [name, edgesUnparsed] = line.split(' = ');
        const [left, right] = edgesUnparsed.replace(/[\(\)]/g, '').split(', ');
        const node = { name, left, right };
        nodeMap.set(name, node);
        if (name.endsWith('A')) {
            nodesEndingWithA.push(node);
        }
    });
    return { nodeMap, nodesEndingWithA };
}

export function partOne(input: string): number {
    const [instructions, nodesUnparsed] = input.split('\n\n');
    const { nodeMap } = getNodes(nodesUnparsed);

    let maxIterations = 100000; // prevent infinite loop
    let i = 0;
    let currentNode = nodeMap.get('AAA');
    while (i < maxIterations) {
        if (currentNode.name === 'ZZZ') {
            break;
        }
        const step = instructions[i % instructions.length];
        const nextNodeName = step === 'L' ? currentNode.left : currentNode.right;
        currentNode = nodeMap.get(nextNodeName);
        i++;
    }

    return i;
}

export function partTwo(input: string): number {
    const [instructions, nodesUnparsed] = input.split('\n\n');
    const { nodeMap, nodesEndingWithA: currentNodes } = getNodes(nodesUnparsed);

    // TODO: need another approach, runtime is too long
    let maxIterations = 100000000; // prevent infinite loop
    let i = 0;
    while (i < maxIterations) {
        if (currentNodes.every((node) => node.name.endsWith('Z'))) {
            break;
        }
        const step = instructions[i % instructions.length];
        for (let j = 0; j < currentNodes.length; j++) {
            currentNodes[j] = nodeMap.get(
                step === 'L' ? currentNodes[j].left : currentNodes[j].right,
            );
        }
        i++;
    }

    console.log({ i, currentNodes });

    return i;
}
