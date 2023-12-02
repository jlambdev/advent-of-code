function isNumber(char: string): boolean {
    return Number.isInteger(Number(char));
}

export function sumCalibrationValuesPartOne(input: string) {
    return input
        .split('\n')
        .map((line: string) => {
            let firstDigit: string;
            let lastDigit: string;

            for (
                let left = 0, right = line.length - 1;
                left <= line.length - 1;
                left++, right--
            ) {
                if (!firstDigit && isNumber(line[left])) {
                    firstDigit = line[left];
                }
                if (!lastDigit && isNumber(line[right])) {
                    lastDigit = line[right];
                }
                if (firstDigit && lastDigit) {
                    return Number(`${firstDigit}${lastDigit}`);
                }
            }
        })
        .reduce((total, current) => (total += current), 0);
}

const numbersAsWords = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

type TreeNode = {
    children?: Map<string, TreeNode>;
    number?: number;
};

function makeNode(): TreeNode {
    return {
        children: new Map<string, TreeNode>(),
    };
}

function makeTree(values: Array<string>): TreeNode {
    const root: TreeNode = makeNode();
    values.forEach((line: string, lineIndex: number) => {
        let parentNode: TreeNode = root;
        line.split('').forEach((char: string, charIndex: number) => {
            let childNode: TreeNode = parentNode.children.get(char);
            if (!childNode) {
                childNode = makeNode();
                parentNode.children.set(char, childNode);
            }

            if (charIndex === line.length - 1) {
                childNode.number = lineIndex + 1;
            }

            parentNode = childNode;
        });
    });
    return root;
}

function findWordNumber(
    line: string,
    tree: TreeNode,
    startIndex: number,
    increment: boolean,
): string | undefined {
    let currentNode = tree.children.get(line[startIndex]);
    let charIndex = increment ? startIndex + 1 : startIndex - 1;
    let nextChar = line[charIndex];

    while (currentNode && nextChar) {
        if (currentNode.number) {
            return String(currentNode.number);
        }
        currentNode = currentNode.children.get(nextChar);
        charIndex = increment ? charIndex + 1 : charIndex - 1;
        nextChar = line[charIndex];
    }
}

export function sumCalibrationValuesPartTwo(input: string) {
    const forwardWordTree = makeTree(numbersAsWords);
    const reverseWordTree = makeTree(
        numbersAsWords.map((word) => word.split('').reverse().join('')),
    );

    const result = input.split('\n').map((line: string) => {
        let firstNumber: string;
        for (let i = 0; i <= line.length - 1; i++) {
            if (isNumber(line[i])) {
                firstNumber = line[i];
                break;
            }
            if (forwardWordTree.children.has(line[i])) {
                const matchingNumber = findWordNumber(line, forwardWordTree, i, true);
                if (matchingNumber) {
                    firstNumber = matchingNumber;
                    break;
                }
            }
        }

        let lastNumber: string;
        for (let i = line.length - 1; i >= 0; i--) {
            if (isNumber(line[i])) {
                lastNumber = line[i];
                break;
            }
            if (reverseWordTree.children.has(line[i])) {
                const matchingNumber = findWordNumber(line, reverseWordTree, i, false);
                if (matchingNumber) {
                    lastNumber = matchingNumber;
                    break;
                }
            }
        }

        return Number(`${firstNumber}${lastNumber}`);
    });

    return result.reduce((total, current) => (total += current), 0);
}
