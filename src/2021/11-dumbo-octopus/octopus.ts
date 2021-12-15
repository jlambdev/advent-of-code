class Octopus {
    public readonly id: string;
    private readonly _onFlash: () => void;

    private _energy: number;
    private _flashing: boolean;
    private _neighbours: Set<Octopus>;

    constructor(id: string, initialEnergy: number, onFlash: () => void) {
        this.id = id;
        this._energy = initialEnergy;
        this._onFlash = onFlash;
        this._flashing = false;
        this._neighbours = new Set();
    }

    get numNeighbours() {
        return this._neighbours.size;
    }

    registerNeighbour(octopus: Octopus) {
        this._neighbours.add(octopus);
    }

    resetIfFlashed() {
        if (this._flashing) {
            this._flashing = false;
            this._energy = 0;
        }
    }

    increaseEnergy() {
        if (this._energy < 9) {
            this._energy++;
        } else if (!this._flashing) {
            this._flashing = true;
            this._onFlash();

            for (const neighbour of this._neighbours) {
                neighbour.increaseEnergy();
            }
        }
    }
}

const initialiseOctopuses = (rows: string[], onFlash: () => void) => {
    const octopuses = new Map<string, Octopus>();
    rows.forEach((row, rowIdx) => {
        row.split('')
            .map(Number)
            .forEach((octopusEnergy, colIdx) => {
                const key = `${rowIdx},${colIdx}`;
                octopuses.set(key, new Octopus(key, octopusEnergy, onFlash));
            });
    });

    for (const [key, octopus] of octopuses) {
        const [rowIdx, colIdx] = key.split(',').map(Number);

        const neighbourIds = [
            `${rowIdx - 1},${colIdx - 1}`,
            `${rowIdx - 1},${colIdx}`,
            `${rowIdx - 1},${colIdx + 1}`,
            `${rowIdx},${colIdx + 1}`,
            `${rowIdx + 1},${colIdx + 1}`,
            `${rowIdx + 1},${colIdx}`,
            `${rowIdx + 1},${colIdx - 1}`,
            `${rowIdx},${colIdx - 1}`,
        ];

        neighbourIds.forEach((id) => {
            if (octopuses.has(id)) octopus.registerNeighbour(octopuses.get(id));
        });
    }

    return octopuses;
};

export const countFlashes = (input: string) => {
    let rows = input.split('\n');

    let flashes = 0;
    const onFlash = () => {
        flashes++;
    };

    const octopuses = initialiseOctopuses(rows, onFlash);

    for (let i = 0; i < 100; i++) {
        octopuses.forEach((octopus) => octopus.increaseEnergy());
        octopuses.forEach((octopus) => octopus.resetIfFlashed());
    }

    return flashes;
};

export const getFlashSyncStep = (input: string) => {
    let rows = input.split('\n');

    let flashes = 0;
    const onFlash = () => {
        flashes++;
    };

    const octopuses = initialiseOctopuses(rows, onFlash);

    let step = 1;
    let synchronised = false;
    while (!synchronised && step < 1000) {
        let previousFlashes = flashes;

        octopuses.forEach((octopus) => octopus.increaseEnergy());
        octopuses.forEach((octopus) => octopus.resetIfFlashed());

        if (flashes - previousFlashes === 100) synchronised = true;
        else step++;
    }

    return step;
};
