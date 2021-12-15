enum CaveType {
    Large,
    Small,
    Start,
    End,
}

class Cave {
    public id: string;
    public type: CaveType;

    private _connections: Set<Cave>;

    constructor(id: string, type: CaveType) {
        this.id = id;
        this.type = type;
        this._connections = new Set<Cave>();
    }

    addConnection(cave: Cave) {
        this._connections.add(cave);
    }

    // defeats the point of a private set, but whatever
    get connections() {
        return this._connections;
    }
}

const caveFactory = (id: string): Cave => {
    if (id === 'start') return new Cave(id, CaveType.Start);
    if (id === 'end') return new Cave(id, CaveType.End);
    if (id === id.toUpperCase()) return new Cave(id, CaveType.Large);
    return new Cave(id, CaveType.Small);
};

export const countPathsSingleSmallCaveVisit = (input: string) => {
    const connections = input.split('\n').map((link) => link.split('-'));

    // used to prevent duplicate instantiation of caves
    const idToCaveMap = new Map<string, Cave>();

    // using terms left & right just for readability
    for (const [left, right] of connections) {
        // create cave instances if they don't already exist
        if (!idToCaveMap.has(left)) idToCaveMap.set(left, caveFactory(left));
        if (!idToCaveMap.has(right)) idToCaveMap.set(right, caveFactory(right));

        // link node and next caves together
        const leftCave = idToCaveMap.get(left);
        const rightCave = idToCaveMap.get(right);
        leftCave.addConnection(rightCave);
        rightCave.addConnection(leftCave);
    }

    const validPaths = new Set<string>();

    const recurseToEndCave = (path: string, caves: Set<Cave>) => {
        for (const cave of caves) {
            if (cave.type === CaveType.Start) continue;
            if (cave.type === CaveType.End) {
                validPaths.add(`${path}-${cave.id}`);
                continue;
            }
            if (cave.type === CaveType.Small) {
                if (new RegExp(cave.id).test(path)) continue; // already visited a small cave
            }
            recurseToEndCave(
                `${path}-${cave.id}`,
                idToCaveMap.get(cave.id).connections,
            );
        }
        // empty connections return here too
    };

    const start = idToCaveMap.get('start');
    recurseToEndCave(start.id, start.connections);

    return validPaths.size;
};
