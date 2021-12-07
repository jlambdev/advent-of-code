export const countHitTrees = (input: string, right: number, down: number) => {
    const gradients = input.split('\n');

    let position = right;
    let trees = 0;

    for (let i = down; i < gradients.length; i += down) {
        if (gradients[i].charAt(position % gradients[i].length) === '#') {
            trees++;
        }
        position += right;
    }

    return trees;
};

export const productOfAllRoutes = (input: string, routes: number[][]) => {
    let product = 1;

    for (const [right, down] of routes) {
        product *= countHitTrees(input, right, down);
    }

    return product;
};
