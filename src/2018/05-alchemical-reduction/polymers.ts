function willReact(left: string, right: string): boolean {
    return (
        left !== right && (left.toUpperCase() === right || left.toLowerCase() === right)
    );
}

export function partOne(input: string): number {
    const stack: Array<string> = [];

    for (let i = 0; i < input.length; i++) {
        if (stack.length === 0) {
            stack.push(input[i]);
            continue;
        } else if (willReact(stack[stack.length - 1], input[i])) {
            stack.pop();
        } else {
            stack.push(input[i]);
        }
    }

    return stack.length;
}
