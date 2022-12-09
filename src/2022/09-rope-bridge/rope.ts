type Knot = [number, number];

type Direction = 'U' | 'D' | 'L' | 'R';

/* Improve readability when indexing Knot arrays */
const X = 0;
const Y = 1;

function addVisitedTailPosition(tail: Knot, set: Set<string>): void {
    set.add(`${tail[0]},${tail[1]}`);
}

export function isTailNearHead(head: Knot, tail: Knot): boolean {
    return Math.abs(tail[X] - head[X]) <= 1 && Math.abs(tail[Y] - head[Y]) <= 1;
}

export function moveHeadWithTail(
    head: Knot,
    tail: Knot,
    direction: Direction,
): [Knot, Knot] {
    const oldHead: Knot = [...head];

    if (direction === 'R') {
        head[Y]++;
    } else if (direction === 'L') {
        head[Y]--;
    } else if (direction === 'U') {
        head[X]++;
    } else {
        // direction === 'D'
        head[X]--;
    }

    if (!isTailNearHead(head, tail)) {
        tail = oldHead;
    }

    return [head, tail];
}

export function moveRopeHead(input: string): {
    head: Knot;
    tail: Knot;
    numPositionsTailHasVisited: number;
} {
    const motions = input.split('\n').map((line) => {
        const [direction, moves] = line.split(' ');
        return [direction, Number(moves)] as const;
    });

    let head: Knot = [0, 0];
    let tail: Knot = [0, 0];

    const positionsTailHasVisited = new Set<string>();
    addVisitedTailPosition(tail, positionsTailHasVisited);

    motions.forEach(([direction, moves]) => {
        for (let i = 0; i < moves; i++) {
            [head, tail] = moveHeadWithTail(head, tail, direction as Direction);
            addVisitedTailPosition(tail, positionsTailHasVisited);
        }
    });

    // console.log({ head, tail, positionsTailHasVisited });

    return {
        head,
        tail,
        numPositionsTailHasVisited: positionsTailHasVisited.size,
    };
}
