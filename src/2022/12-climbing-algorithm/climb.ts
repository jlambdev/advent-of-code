/* key = coordinates, e.g. 3,4; value = map of coordinates + weight */
type Graph = Map<string, Map<string, number>>;

function toCoords(x: number, y: number): string {
    return `${x},${y}`;
}

export function getWeight(from: string, to: string): number {
    return to.charCodeAt(0) - from.charCodeAt(0);
}

function makeGraph(lines: Array<string>): {
    source: string;
    target: string;
    graph: Graph;
} {
    const graph: Graph = new Map();
    let source: string;
    let target: string;

    for (let row = 0; row < lines.length; row++) {
        for (let column = 0; column < lines[0].length; column++) {
            let letter = lines[row][column];
            if (letter === 'S') {
                source = toCoords(row, column);
                letter = 'a';
            } else if (letter === 'E') {
                target = toCoords(row, column);
                letter = 'z';
            }
            const neighbors = new Map<string, number>();
            if (lines[row - 1]?.[column]) {
                neighbors.set(
                    toCoords(row - 1, column),
                    getWeight(letter, lines[row - 1][column]),
                );
            }
            if (lines[row + 1]?.[column]) {
                neighbors.set(
                    toCoords(row + 1, column),
                    getWeight(letter, lines[row + 1][column]),
                );
            }
            if (lines[row][column - 1]) {
                neighbors.set(
                    toCoords(row, column - 1),
                    getWeight(letter, lines[row][column - 1]),
                );
            }
            if (lines[row][column + 1]) {
                neighbors.set(
                    toCoords(row, column + 1),
                    getWeight(letter, lines[row][column + 1]),
                );
            }
            graph.set(toCoords(row, column), neighbors);
        }
    }

    return { source, target, graph };
}

export function smallestNumberOfSteps(input: string): number {
    const lines = input.split('\n');
    const { source, target, graph } = makeGraph(lines);

    /*
    for each vertex v in Graph.Vertices:
 4          dist[v] ← INFINITY
 5          prev[v] ← UNDEFINED
 6          add v to Q
 7      dist[source] ← 0
 8      
 9      while Q is not empty:
10          u ← vertex in Q with min dist[u]
11          remove u from Q
12          
13          for each neighbor v of u still in Q:
14              alt ← dist[u] + Graph.Edges(u, v)
15              if alt < dist[v]:
16                  dist[v] ← alt
17                  prev[v] ← u
18
19      return dist[], prev[]
    */

    // Initialise distances to infinity for all nodes except source
    const distances = new Map<string, number>();
    for (const key of graph.keys()) {
        distances.set(key, source === key ? 0 : Infinity);
    }

    // Keep track of unvisited nodes
    const unvisited = new Set<string>(Array.from(graph.keys())); // refactor?

    // Debug
    console.log({ source, target, s: graph.size, distances, unvisited });

    // while (unvisited.size > 0) {
    //     const current = getSmallestUnvisitedNode(unvisited, distances);
    //     unvisited.delete(current);
    // }

    return 0;
}

// This function returns the shortest distance from the source node
// to all other nodes in the graph.
function dijkstra(graph: Map<number, Map<number, number>>, source: number): number[] {
    // Initialize distances to infinity for all nodes except the source
    // node, which has a distance of 0.
    const distances: Array<number> = new Array(graph.size).fill(Number.POSITIVE_INFINITY);
    distances[source] = 0;

    // Keep track of the unvisited nodes.
    const unvisited = new Set(Array.from(graph.keys()));

    // Repeat the following until all nodes have been visited:
    // 1. Select the unvisited node with the smallest distance.
    // 2. Update the distances of its neighbors.
    while (unvisited.size > 0) {
        const current = getSmallestUnvisitedNode(unvisited, distances);
        unvisited.delete(current);

        // Update the distances of the neighbors.
        for (const neighbor of graph.get(current).keys()) {
            // Only consider this neighbor if it has not yet been visited.
            if (unvisited.has(neighbor)) {
                const distance = distances[current] + graph.get(current).get(neighbor);
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                }
            }
        }
    }

    return distances;
}

function getSmallestUnvisitedNode(unvisited: Set<number>, distances: Array<number>) {
    return 0;
}
