export const basicDive = (course: string) => {
    let distance = 0;
    let depth = 0;

    course.split('\n').forEach((step) => {
        const [direction, amount] = step.split(' ');

        switch (direction) {
            case 'forward':
                distance += Number(amount);
                break;

            case 'down':
                depth += Number(amount);
                break;

            case 'up':
                depth -= Number(amount);
                break;

            default:
                throw new Error('Unrecognised direction');
        }
    });

    return distance * depth;
};

export const aim = (course: string) => {
    let aim = 0;
    let distance = 0;
    let depth = 0;

    course.split('\n').forEach((step) => {
        const [direction, amount] = step.split(' ');
        const parsedAmount = Number(amount);

        switch (direction) {
            case 'forward':
                distance += parsedAmount;
                depth += parsedAmount * aim;
                break;

            case 'down':
                aim += parsedAmount;
                break;

            case 'up':
                aim -= parsedAmount;
                break;

            default:
                throw new Error('Unrecognised direction');
        }
    });

    return distance * depth;
};
