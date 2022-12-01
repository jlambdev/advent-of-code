const getTotalCalories = (input: string) => {
    return input
        .split('\n\n')
        .map((str: string) =>
            str.split('\n').reduce((acc, cur) => (acc += Number(cur)), 0),
        );
};

export const totalCalories = (input: string) => {
    const totalCaloriesPerElf = getTotalCalories(input);
    return Math.max(...totalCaloriesPerElf);
};

export const totalCaloriesForTopThreeElves = (input: string) => {
    const totalCaloriesPerElf = getTotalCalories(input);
    const [first, second, third] = totalCaloriesPerElf.sort((a, b) => b - a);
    return first + second + third;
};
