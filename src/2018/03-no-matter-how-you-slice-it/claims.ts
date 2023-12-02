type Canvas = Array<Array<number>>;

type Claim = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

function makeCanvas(): Canvas {
    return Array.from({ length: 1000 }, () => Array(1000).fill(0));
}

function parseClaim(claim: string): Claim {
    const [idUnparsed, , coordsUnparsed, sizeUnparsed] = claim.split(' ');
    const id = idUnparsed.replace('#', '');
    const [x, y] = coordsUnparsed.replace(':', '').split(',').map(Number);
    const [width, height] = sizeUnparsed.split('x').map(Number);
    return { id, x, y, width, height };
}

function drawClaimOnCanvas(
    canvas: Canvas,
    x: number,
    y: number,
    width: number,
    height: number,
): void {
    for (let i = y; i < y + height; i++) {
        for (let j = x; j < x + width; j++) {
            canvas[i][j] += 1;
        }
    }
}

export function partOne(input: string): number {
    const canvas = makeCanvas();

    input.split('\n').forEach((line: string) => {
        const { x, y, width, height } = parseClaim(line);
        drawClaimOnCanvas(canvas, x, y, width, height);
    });

    let overlappingSquaresCount = 0;
    canvas.forEach((row) =>
        row.forEach((columnValue) => {
            if (columnValue > 1) {
                overlappingSquaresCount++;
            }
        }),
    );

    return overlappingSquaresCount;
}

function isClaimOverlapping(canvas: Canvas, claim: Claim): boolean {
    const { x, y, width, height } = claim;

    for (let i = y; i < y + height; i++) {
        for (let j = x; j < x + width; j++) {
            if (canvas[i][j] !== 1) {
                return true;
            }
        }
    }

    return false;
}

export function partTwo(input: string): string {
    const canvas = makeCanvas();

    const coordsToClaimMap = new Map<string, Claim>();

    input.split('\n').map((line: string) => {
        const claim = parseClaim(line);
        drawClaimOnCanvas(canvas, claim.x, claim.y, claim.width, claim.height);
        coordsToClaimMap.set(`${claim.x},${claim.y}`, claim);
    });

    let id: string;
    canvas.forEach((row, rowIndex) =>
        row.forEach((columnValue, columnIndex) => {
            if (columnValue === 1) {
                const key = `${rowIndex},${columnIndex}`;
                if (coordsToClaimMap.has(key)) {
                    const claim = coordsToClaimMap.get(key);
                    if (!isClaimOverlapping(canvas, claim)) {
                        id = claim.id;
                    }
                }
            }
        }),
    );

    return id;
}
