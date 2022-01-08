import MinBinaryHeap from './heap';

// Credit for graph node and types: https://github.com/jeffzh4ng/iruka/blob/master/src/algorithms/graphs/graph-node.ts
export class GraphNode<T> {
    val: T;

    constructor(val: T) {
        this.val = val;
    }
}
type EdgeList<T> = Map<GraphNode<T>, number>;
export type WeightedGraph<T> = Map<GraphNode<T>, EdgeList<T>>;
export type ShortestDistances<T> = Map<GraphNode<T>, number>;
export type PrevVertices<T> = Map<GraphNode<T>, GraphNode<T> | null>;

// Kind of a variant of the shortest path algorithm, which we can use Dijkstra's algorithm to solve
// Credit for Dijkstra implementation: https://github.com/jeffzh4ng/iruka/blob/master/src/algorithms/graphs/shortest-paths/dijkstras-shortest-path.ts
export const findLowestRisk = (input: string) => {
    const grid = input.split('\n').map((row) => row.split('').map(Number));
    console.log({ grid });

    // Dijkstra algo
    const height = grid.length;
    const width = grid[0].length;
    const source = [0, 0];
    const destination = [height - 1, width - 1];

    // something is going wrong here
    const priorityQueue = new MinBinaryHeap<[number, number[]]>([]);
    priorityQueue.add([0, source]);
    // minimum distance map?
    // visited nodes set?

    // while (!priorityQueue.isEmpty()) {
    //     break;
    // }

    // create a generator function to yield the neighbours of the current node

    // need to create a weighted graph... can probably work with primitives here

    //
    //
    // Dijkstra's algorithm
    // https://github.com/jeffzh4ng/iruka/blob/master/src/algorithms/graphs/shortest-paths/dijkstras-shortest-path.ts
};
