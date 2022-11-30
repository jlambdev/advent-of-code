export const getFuelForMass = (mass: number) => Math.floor(mass / 3) - 2;

export const getFuelForAllModules = (input: string) => {
    return input
        .split('\n')
        .reduce((acc, cur) => acc + getFuelForMass(Number(cur)), 0);
};

export const getRecursiveFuelForMass = (mass: number) => {
    let total = getFuelForMass(mass);
    let fuelForFuel = getFuelForMass(total);

    while (fuelForFuel > 0) {
        total += fuelForFuel;
        fuelForFuel = getFuelForMass(fuelForFuel);
    }

    return total;
};

export const getFuelForAllModulesAndFuel = (input: string) => {
    return input
        .split('\n')
        .reduce((acc, cur) => acc + getRecursiveFuelForMass(Number(cur)), 0);
};
