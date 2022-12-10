type Knot = [number, number];

export type Rope = Array<Knot>;

type Direction = 'U' | 'D' | 'L' | 'R';

/* Improve readability when indexing Knot arrays */
const X = 0;
const Y = 1;

function addVisitedTailPosition(tail: Knot, set: Set<string>): void {
    set.add(`${tail[0]},${tail[1]}`);
}

export function isFirstKnotNearSecond(first: Knot, second: Knot): boolean {
    return Math.abs(second[X] - first[X]) <= 1 && Math.abs(second[Y] - first[Y]) <= 1;
}

function getPullDirection(first: Knot, second: Knot): Direction {
    if (first[Y] - second[Y] === 2) {
        return 'R';
    }
    if (first[Y] - second[Y] === -2) {
        return 'L';
    }
    if (first[X] - second[X] === 2) {
        return 'U';
    }
    if (first[X] - second[X] === -2) {
        return 'D';
    }
}

export function pullKnots(rope: Rope, direction: Direction): Rope {
    const pull = () => {
        for (let current = 0, next = 1; next < rope.length; current++, next++) {
            if (!isFirstKnotNearSecond(rope[current], rope[next])) {
                const pullDirection = getPullDirection(rope[current], rope[next]);
                let x = rope[current][X];
                let y = rope[current][Y];
                if (pullDirection === 'R' || pullDirection === 'L') {
                    y = pullDirection === 'R' ? y - 1 : y + 1;
                }
                if (pullDirection === 'U' || pullDirection === 'D') {
                    x = pullDirection === 'U' ? x - 1 : x + 1;
                }
                rope[next] = [x, y];
            }
        }
    };

    if (direction === 'R') {
        rope[0][Y]++;
        pull();
    } else if (direction === 'L') {
        rope[0][Y]--;
        pull();
    } else if (direction === 'U') {
        rope[0][X]++;
        pull();
    } else {
        // direction === 'D'
        rope[0][X]--;
        pull();
    }

    return rope;
}

export function moveRope(
    input: string,
    ropeSize: number,
): {
    head: Knot;
    tail: Knot;
    numPositionsTailHasVisited: number;
} {
    const motions = input.split('\n').map((line) => {
        const [direction, moves] = line.split(' ');
        return [direction, Number(moves)] as const;
    });

    const rope: Array<Knot> = [...Array(ropeSize)].map((_) => [0, 0]);
    const positionsTailHasVisited = new Set<string>();
    addVisitedTailPosition(rope[rope.length - 1], positionsTailHasVisited);

    // console.log('starting');
    // console.group();
    // console.log({ rope });

    motions.forEach(([direction, moves]) => {
        for (let i = 0; i < moves; i++) {
            pullKnots(rope, direction as Direction);
            // console.log(`pulling ${direction} move ${i}`, { rope });
            addVisitedTailPosition(rope[rope.length - 1], positionsTailHasVisited);
        }
    });

    // console.log({ rope });
    // console.groupEnd();

    return {
        head: rope[0],
        tail: rope[rope.length - 1],
        numPositionsTailHasVisited: positionsTailHasVisited.size,
    };
}
