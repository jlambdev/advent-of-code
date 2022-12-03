function getDeduplicatedIntersection(
    left: Array<string>,
    right: Array<string>,
): Array<string> {
    return Array.from(new Set(left.filter((x) => right.includes(x))));
}

export function findItemInBothCompartments(rucksack: string): string {
    const items = rucksack.split('');
    const left = items.slice(0, items.length / 2);
    const right = items.slice(items.length / 2);
    const intersection = getDeduplicatedIntersection(left, right);
    return intersection.join();
}

export function findItemInThreeRucksacks(rucksacks: Array<string>): string {
    const firstIntersection = getDeduplicatedIntersection(
        rucksacks[0].split(''),
        rucksacks[1].split(''),
    );
    const secondIntersection = getDeduplicatedIntersection(
        firstIntersection,
        rucksacks[2].split(''),
    );
    return secondIntersection.join();
}

export function convertItemToPriority(item: string): number {
    const ascii = item.charCodeAt(0);
    return ascii < 97 ? ascii - 38 : ascii - 96;
}

export function sumOfItemPriorities(rucksacks: string): number {
    return rucksacks.split('\n').reduce((acc, rucksack) => {
        const item = findItemInBothCompartments(rucksack);
        return (acc += convertItemToPriority(item));
    }, 0);
}

export function sumOfItemPrioritiesForElfGroups(input: string): number {
    const rucksacks = input.split('\n');
    let priorityTotal = 0;
    for (let i = 0; i < rucksacks.length; i += 3) {
        const item = findItemInThreeRucksacks(rucksacks.slice(i, i + 3));
        priorityTotal += convertItemToPriority(item);
    }
    return priorityTotal;
}
