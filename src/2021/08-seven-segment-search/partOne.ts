export const countEasyDigits = (input: string) => {
    const lines = input.split('\n');

    const easyDigitSignalLengths = new Set([2, 3, 4, 7]);
    let instancesOfEasyDigits = 0;

    for (const line of lines) {
        const [_, numbers] = line.split(' | ').map((x) => x.split(' '));

        numbers.forEach((number) => {
            if (easyDigitSignalLengths.has(number.length))
                instancesOfEasyDigits++;
        });
    }

    return instancesOfEasyDigits;
};
