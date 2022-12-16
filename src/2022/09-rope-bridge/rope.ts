type Knot = [number, number];

export type Rope = Array<Knot>;

/* Improve readability when indexing Knot arrays */
const X = 0;
const Y = 1;

const offset = {
    U: [1, 0],
    D: [-1, 0],
    L: [0, -1],
    R: [0, 1],
} as const;

type Direction = keyof typeof offset;

export function isNeighbour(a: Knot, b: Knot): boolean {
    return Math.abs(b[X] - a[X]) <= 1 && Math.abs(b[Y] - a[Y]) <= 1;
}

function moveHead(head: Knot, direction: Direction): Knot {
    const [x, y] = head;
    const offsetX = offset[direction][X];
    const offsetY = offset[direction][Y];
    return [x + offsetX, y + offsetY];
}

function moveTail(head: Knot, tail: Knot): Knot {
    if (isNeighbour(head, tail)) {
        return tail;
    }

    const signX =
        head[X] === tail[X] ? 0 : (head[X] - tail[X]) / Math.abs(head[X] - tail[X]);
    const signY =
        head[Y] === tail[Y] ? 0 : (head[Y] - tail[Y]) / Math.abs(head[Y] - tail[Y]);

    return [tail[X] + signX, tail[Y] + signY];
}

export function buildStartingRope(size: number): Rope {
    return Array(size).fill([0, 0]);
}

export function moveRope(input: string, rope: Rope): number {
    const tailPositions = new Set<string>();
    tailPositions.add('0,0');

    input.split('\n').forEach((line) => {
        const [direction, movesString] = line.split(' ');
        const moves = Number(movesString);

        for (let move = 0; move < moves; move++) {
            rope[0] = moveHead(rope[0], direction as Direction);
            for (let i = 1; i < rope.length; i++) {
                rope[i] = moveTail(rope[i - 1], rope[i]);
            }
            const [tailX, tailY] = rope[rope.length - 1];
            tailPositions.add(`${tailX},${tailY}`);
        }
    });

    return tailPositions.size;
}
