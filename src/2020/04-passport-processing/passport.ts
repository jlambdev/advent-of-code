export const countPassportsWithMandatoryKeys = (batchFile: string) => {
    const lines = batchFile.split('\n');

    const generateMandatoryFields = () =>
        new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

    const isValidPassport = (keys: Set<string>) => keys.size === 0;

    let validPassports = 0;
    let fields = generateMandatoryFields();

    for (const line of lines) {
        if (line.length === 0) {
            // evaluate passport and start a new field check
            if (isValidPassport(fields)) validPassports++;
            fields = generateMandatoryFields();
        } else {
            // check if keys are in mandatory fields
            const keys = line.split(' ').map((kv) => kv.substring(0, 3));
            keys.forEach((key) => fields.delete(key));

            // if last line, do the check
            if (line === lines[lines.length - 1]) {
                if (isValidPassport(fields)) validPassports++;
            }
        }
    }

    return validPassports;
};

export const countFullyValidPassports = (batchFile: string) => {
    const lines = batchFile.split('\n');

    const policies = new Map<string, (value: string) => boolean>([
        [
            'byr',
            (byr) =>
                byr.length === 4 && Number(byr) >= 1920 && Number(byr) <= 2002,
        ],
        [
            'iyr',
            (iyr) =>
                iyr.length === 4 && Number(iyr) >= 2010 && Number(iyr) <= 2020,
        ],
        [
            'eyr',
            (eyr) =>
                eyr.length === 4 && Number(eyr) >= 2020 && Number(eyr) <= 2030,
        ],
        [
            'hgt',
            (hgt) => {
                const units = hgt.substring(0, hgt.length - 2);
                const interval = hgt.slice(hgt.length - 2);
                if (interval === 'cm') {
                    return Number(units) >= 150 && Number(units) <= 193;
                } else if (interval === 'in') {
                    return Number(units) >= 59 && Number(units) <= 76;
                }
                return false;
            },
        ],
        ['hcl', (hcl) => /^#[0-9a-f]{6}$/.test(hcl)],
        [
            'ecl',
            (ecl) =>
                ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl),
        ],
        ['pid', (pid) => /^[0-9]{9}$/.test(pid)],
    ]);

    let validPassports = 0;
    let passedPolicies = 0;

    for (const line of lines) {
        if (line.length === 0) {
            if (passedPolicies === 7) validPassports++;
            passedPolicies = 0;
        } else {
            const pairs = line.split(' ').map((kv) => kv.split(':'));
            for (const [key, value] of pairs) {
                if (policies.has(key)) {
                    if (policies.get(key)(value)) passedPolicies++;
                }
            }

            if (line === lines[lines.length - 1]) {
                if (passedPolicies === 7) validPassports++;
            }
        }
    }

    return validPassports;
};
