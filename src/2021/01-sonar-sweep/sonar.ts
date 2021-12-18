/*
    Creating the new array means higher space complexity
*/
export const countIncreases = (report: string) => {
    let previous: number | undefined;
    let increases = 0;

    report.split('\n').forEach((measurement) => {
        const current = Number(measurement);
        if (previous && current > previous) increases++;
        previous = current;
    });

    return increases;
};

/*
    Lower space complexity but higher cognitive load?
 */
export const countIncreasesLowerSpaceComplexity = (report: string) => {
    let previous: number | undefined;
    let reading = '';
    let increases = 0;

    const incrementIfIncrease = (newReading: string) => {
        const current = Number(newReading);
        if (previous && current > previous) increases++;
        previous = current;
    };

    for (const char of report) {
        if (char === '\n') {
            incrementIfIncrease(reading);
            reading = '';
        } else {
            reading += char;
        }
    }

    incrementIfIncrease(reading);

    return increases;
};

/*
    Not really a 'sliding window' algorithm, but it does work.
    Since the width of the window doesn't really change, I guess
    it's more like a fixed-length deque

    https://en.wikipedia.org/wiki/Double-ended_queue
 */
export const slidingWindowOfThree = (report: string) => {
    const window: number[] = [];
    let increases = 0;
    let lastSum: number | undefined;

    report.split('\n').forEach((measurement) => {
        const current = Number(measurement);
        window.push(current);
        if (window.length === 3) {
            const sum = window.reduce((pre, cur) => (pre += cur), 0);
            if (lastSum && sum > lastSum) increases++;
            lastSum = sum;
            window.shift();
        }
    });

    return increases;
};
