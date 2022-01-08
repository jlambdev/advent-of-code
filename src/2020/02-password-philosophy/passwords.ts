interface SledRentalPolicy {
    min: number;
    max: number;
    letter: string;
    password: string;
}

export const countValidSledRentalPasswords = (input: string) => {
    const checks: SledRentalPolicy[] = input.split('\n').map((line) => {
        const [minToMax, letterPlusColon, password] = line.split(' ');
        const [min, max] = minToMax.split('-').map(Number);

        return {
            min,
            max,
            letter: letterPlusColon.replace(':', ''),
            password,
        };
    });

    let numValid = 0;

    for (const check of checks) {
        const { letter, min, max, password } = check;
        let count = 0;

        for (let i = 0; i < password.length; i++) {
            if (password.charAt(i) === letter) count++;
        }

        if (count >= min && count <= max) numValid++;
    }

    return numValid;
};

interface TobogganPolicy {
    first: number;
    second: number;
    letter: string;
    password: string;
}

export const countValidTobogganPasswords = (input: string) => {
    const checks: TobogganPolicy[] = input.split('\n').map((line) => {
        const [firstAndSecond, letterPlusColon, password] = line.split(' ');
        const [first, second] = firstAndSecond.split('-').map(Number);

        return {
            first,
            second,
            letter: letterPlusColon.replace(':', ''),
            password,
        };
    });

    let numValid = 0;

    for (const check of checks) {
        const { letter, first, second, password } = check;
        const instances =
            Number(password.charAt(first - 1) === letter) +
            Number(password.charAt(second - 1) === letter);
        if (instances === 1) {
            numValid++;
        }
    }

    return numValid;
};
