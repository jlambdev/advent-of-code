interface Bag {
    colour: string;
    children: { [key: string]: number };
    parents: Set<string>;
}

export const extractBagColours = (input: string): Bag => {
    const [colour, unparsedChildColours] = input.split(' bags contain ');

    const firstSpaceRegex = /(?<=^\S+)\s/;
    const children = unparsedChildColours
        .replace(/bags?\.?/g, '')
        .split(', ')
        .filter((bags) => !/no other/.test(bags))
        .reduce((bags: Bag['children'], nextBag) => {
            const [amount, colour] = nextBag.split(firstSpaceRegex);
            bags[colour.trim()] = parseInt(amount);
            return bags;
        }, {});

    return {
        colour,
        children,
        parents: new Set<string>(),
    };
};

export const processBags = (input: string) => {
    const rules = input.split('\n');
    const bags = new Map<string, Bag>();

    for (const rule of rules) {
        const bag = extractBagColours(rule);
        if (!bags.has(bag.colour)) bags.set(bag.colour, bag);

        for (const colour of Object.keys(bag.children)) {
            if (!bags.has(colour)) {
                bags.set(colour, {
                    colour,
                    children: {},
                    parents: new Set([bag.colour]),
                });
            } else {
                const bagToUpdate = bags.get(colour);
                bagToUpdate.parents.add(bag.colour);
                bags.set(bagToUpdate.colour, bagToUpdate);
            }
        }
    }

    const eligibleContainerBags = new Set<string>();
    const recurseThroughParents = (colour: string) => {
        const bag = bags.get(colour);
        if (!bag || bag.parents.size === 0) return;

        for (const parent of bag.parents) {
            eligibleContainerBags.add(parent);
            recurseThroughParents(parent);
        }
    };
    recurseThroughParents('shiny gold');

    let numRequiredBags = 0;
    const recurseThroughChildren = (colour: string) => {
        const bag = bags.get(colour);
        // console.log({ bag });
        if (!bag || Object.keys(bag.children).length === 0) return;

        for (const [colour, amount] of Object.entries(bag.children)) {
            numRequiredBags += amount;
            recurseThroughChildren(colour);
        }
    };
    recurseThroughChildren('shiny gold');

    // console.log({ bags });

    return {
        numContainerBags: eligibleContainerBags.size,
        numRequiredBags,
    };
};
