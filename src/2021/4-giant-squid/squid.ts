type TwoDimensionalArray<T> = T[][];

export class BingoCard {
    private readonly _numbers: TwoDimensionalArray<number>;
    private readonly _boxes: TwoDimensionalArray<boolean>;

    /**
     * The sum of all the unmarked numbers
     */
    private _winningSum?: number;
    public hasBeenCheckedAsWinner: boolean;

    constructor(rows: TwoDimensionalArray<number>) {
        this._numbers = rows;
        this._boxes = rows.map((row) => Array(row.length).fill(false));
        this.hasBeenCheckedAsWinner = false;
    }

    checkNumber(draw: number): void {
        this.rows.forEach((row, rowIdx) => {
            row.forEach((value, columnIdx) => {
                if (value === draw) this._boxes[rowIdx][columnIdx] = true;
            });
        });
    }

    setSumOfUnmarkedNumbers() {
        let sum = 0;
        this.boxesAsRows.forEach((boolRow, rowIdx) => {
            boolRow.forEach((isMarked, colIdx) => {
                if (!isMarked) sum += this.rows[rowIdx][colIdx];
            });
        });
        this._winningSum = sum;
    }

    isWinner(): boolean {
        this.boxesAsRows.forEach((row) => {
            const winning = row.every((entry) => entry);
            if (winning) {
                this.setSumOfUnmarkedNumbers();
                this.hasBeenCheckedAsWinner = true;
            }
        });

        this.boxesAsColumns.forEach((col) => {
            const winning = col.every((entry) => entry);
            if (winning) {
                this.setSumOfUnmarkedNumbers();
                this.hasBeenCheckedAsWinner = true;
            }
        });

        return !!this._winningSum;
    }

    get rows(): TwoDimensionalArray<number> {
        return this._numbers;
    }

    get columns(): TwoDimensionalArray<number> {
        return this._numbers.map((_, index) => {
            return this._numbers.map((row) => row[index]);
        });
    }

    get boxesAsRows(): TwoDimensionalArray<boolean> {
        return this._boxes;
    }

    get boxesAsColumns(): TwoDimensionalArray<boolean> {
        return this._boxes.map((_, index) => {
            return this._boxes.map((row) => row[index]);
        });
    }

    get winningSum(): number | undefined {
        return this._winningSum;
    }
}

export const calculateScore = (bingoGame: string) => {
    const [draws, _, ...inputRows] = bingoGame.split('\n');

    // Load the data into Cards
    let cardRows: number[][] = [];
    const bingoCards: BingoCard[] = [];
    inputRows.forEach((inputRow) => {
        const readResult = inputRow
            .split(' ')
            .filter((item) => item !== '')
            .map(Number);

        if (readResult.length !== 0) {
            cardRows.push(readResult);
        }

        if (cardRows.length === 5) {
            bingoCards.push(new BingoCard(cardRows));
            cardRows = [];
        }
    });

    // Play bingo
    let firstWinningScore: number;
    let lastWinningScore: number;
    for (const draw of draws.split(',').map(Number)) {
        for (const card of bingoCards) {
            card.checkNumber(draw);
            if (!card.hasBeenCheckedAsWinner && card.isWinner()) {
                if (!firstWinningScore) {
                    firstWinningScore = draw * card.winningSum;
                }
                lastWinningScore = draw * card.winningSum;
            }
        }
    }

    // Debugging
    /*
    console.log({
        draws,
        winner: lastWinner,
        firstWinningScore,
        lastWinningScore,
    });
    */

    return { firstWinningScore, lastWinningScore };
};
