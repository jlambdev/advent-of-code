export const countFishWithArray = (input: string, days: number) => {
    let fishes = input.split(',').map(Number);

    for (let i = 0; i < days; i++) {
        let newFishes: number[] = [];
        fishes = fishes.map((fish) => {
            if (fish === 0) {
                newFishes.push(8);
                return 6;
            } else {
                return --fish;
            }
        });
        fishes = [...fishes, ...newFishes];
    }

    return fishes.length;
};

export const countFishWithMaths = (input: string, days: number) => {
    let initialFishes = input.split(',').map(Number);
    let numFishes = initialFishes.length;
    const newFishesPerDay = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < initialFishes.length; i++) {
        newFishesPerDay[initialFishes[i]]++;
    }

    const fifoQueue = [0, 0, 0];
    for (let i = 0; i < days; i++) {
        const spawn = newFishesPerDay[i % 7];
        numFishes += spawn;

        fifoQueue[2] = spawn;
        newFishesPerDay[i % 7] += fifoQueue.shift();
    }

    return numFishes;
};
