import { smallInput, puzzleInput } from '../fixture';
import {
    initialiseMonkeys,
    makeWorryOperation,
    makeThrowToMonkey,
    getMonkeyBusiness,
} from '../monkeys';

describe('Monkey in the Middle', () => {
    it('should make a `worryOperation` based on the operand and second number', () => {
        const addByNumber = makeWorryOperation('+', '5');
        expect(addByNumber(3)).toStrictEqual(8);

        const multiplyByNumber = makeWorryOperation('*', '10');
        expect(multiplyByNumber(2)).toStrictEqual(20);

        const multiplyByItem = makeWorryOperation('*', 'old');
        expect(multiplyByItem(5)).toStrictEqual(25);
    });

    it('should make a `throwToMonkey` function that says which monkey to throw to', () => {
        const onTrue = makeThrowToMonkey(23, 1, 2);
        expect(onTrue(23)).toStrictEqual(1);

        const onFalse = makeThrowToMonkey(5, 1, 2);
        expect(onFalse(7)).toStrictEqual(2);
    });

    it('should create a map of monkeys', () => {
        const monkeys = initialiseMonkeys(smallInput);

        expect(monkeys.get(0).items).toStrictEqual([79, 98]);
        expect(monkeys.get(1).items).toStrictEqual([54, 65, 75, 74]);
        expect(monkeys.get(2).items).toStrictEqual([79, 60, 97]);
        expect(monkeys.get(3).items).toStrictEqual([74]);
    });

    it('identifies the level of monkey business after 20 rounds', () => {
        expect(getMonkeyBusiness(smallInput, 20)).toStrictEqual(10605);
        expect(getMonkeyBusiness(puzzleInput, 20)).toStrictEqual(111210);
    });

    /**
     * The key here is to keep the worry levels manageable.
     *
     * In Part 1, the use of Math.floor(worryLevel / 3) and low number of rounds keeps levels safe.
     * In Part 2, if you don't reduce the worry levels, you will go beyond the max safe integer
     * and get innacurate results.
     *
     * When I tried to convert this to use BigInts instead of numbers, I ran into
     * performance issues after 600+ rounds. I tried reducing the number of multiplications /
     * divisions, but this didn't work.
     *
     * What you can do here is create a 'common divisor', where you multiply all the
     * 'divide by' numbers used by each monkey as part of their test. Then when the worry level
     * exceeds this commonDivisor, you can do worry % commonDivisor to lower it, while still
     * passing later tests by the monkey when it checks which next monkey receives the item.
     *
     * I calculate the common divisor in the `getMonkeyBusiness` function.
     */
    it('identifies the level of monkey business after 10000 rounds', () => {
        expect(getMonkeyBusiness(smallInput, 10000, false)).toStrictEqual(2713310158);
        expect(getMonkeyBusiness(puzzleInput, 10000, false)).toStrictEqual(15447387620);
    });
});
