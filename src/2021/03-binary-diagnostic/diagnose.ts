export const powerConsumption = (report: string) => {
    let rowCount = 0;
    const gamma: number[] = [];

    report.split('\n').forEach((reading) => {
        for (let i = 0; i < reading.length; i++) {
            if (rowCount === 0) {
                gamma.push(Number(reading[i]));
            } else {
                gamma[i] += Number(reading[i]);
            }
        }
        rowCount++;
    });

    for (let i = 0; i < gamma.length; i++) {
        gamma[i] = gamma[i] / rowCount < 0.5 ? 0 : 1;
    }

    const gammaAsBinaryString = gamma.join('');
    const gammaAsDecimal = parseInt(gammaAsBinaryString, 2);

    // epsilon is basically the inverse of gamma
    const epsilonAsBinaryString = gamma.reduce((prev, curr) => {
        return (prev += curr === 0 ? '1' : '0');
    }, '');
    const epsilonAsDecimial = parseInt(epsilonAsBinaryString, 2);

    return gammaAsDecimal * epsilonAsDecimial;
};

export const lifeSupportRating = (report: string) => {
    const binaryNumbers = report.split('\n');

    const recurseToRating = (
        numbers: string[],
        shouldUseZeros: (sum: number, len: number) => boolean,
        column = 0,
    ): string => {
        // base case
        if (numbers.length === 1) return numbers[0];

        let sum = 0;
        let zeros = [];
        let ones = [];

        for (const binary of numbers) {
            const value = parseInt(binary[column]);
            value === 0 ? zeros.push(binary) : ones.push(binary);
            sum += value;
        }

        // determine which set to pass down next
        if (shouldUseZeros(sum, numbers.length)) {
            return recurseToRating(zeros, shouldUseZeros, column + 1);
        } else {
            return recurseToRating(ones, shouldUseZeros, column + 1);
        }
    };

    const isMostlyOrEvenlyOnes = (sum: number, len: number) => sum / len < 0.5;
    const oxygenRating = recurseToRating(binaryNumbers, isMostlyOrEvenlyOnes);
    const oxygenAsDecimal = parseInt(oxygenRating, 2);

    const isMostlyOrEvenlyZeros = (sum: number, len: number) =>
        sum / len >= 0.5;
    const co2Rating = recurseToRating(binaryNumbers, isMostlyOrEvenlyZeros);
    const co2RatingAsDecimal = parseInt(co2Rating, 2);

    return oxygenAsDecimal * co2RatingAsDecimal;
};
