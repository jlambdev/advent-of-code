function isNumber(char: string): boolean {
    return Number.isInteger(Number(char));
}

export function sumCalibrationValues(input: string) {
    const nums = input.split('\n').map((line: string) => {
        let firstDigit: string;
        let lastDigit: string;

        for (
            let left = 0, right = line.length - 1;
            left <= line.length - 1;
            left++, right--
        ) {
            if (!firstDigit && isNumber(line[left])) {
                firstDigit = line[left];
            }
            if (!lastDigit && isNumber(line[right])) {
                lastDigit = line[right];
            }
            if (firstDigit && lastDigit) {
                return Number(`${firstDigit}${lastDigit}`);
            }
        }
    });

    return nums.reduce((total, current) => (total += current), 0);
}
