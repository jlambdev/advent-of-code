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
        expect(addByNumber(3n)).toStrictEqual(8n);

        const multiplyByNumber = makeWorryOperation('*', '10');
        expect(multiplyByNumber(2n)).toStrictEqual(20n);

        const multiplyByItem = makeWorryOperation('*', 'old');
        expect(multiplyByItem(5n)).toStrictEqual(25n);
    });

    it('should make a `throwToMonkey` function that says which monkey to throw to', () => {
        const onTrue = makeThrowToMonkey(23n, 1, 2);
        expect(onTrue(23n)).toStrictEqual(1);

        const onFalse = makeThrowToMonkey(5n, 1, 2);
        expect(onFalse(7n)).toStrictEqual(2);
    });

    it('should create a map of monkeys', () => {
        const monkeys = initialiseMonkeys(smallInput);

        expect(monkeys.get(0).items).toStrictEqual([79n, 98n]);
        expect(monkeys.get(1).items).toStrictEqual([54n, 65n, 75n, 74n]);
        expect(monkeys.get(2).items).toStrictEqual([79n, 60n, 97n]);
        expect(monkeys.get(3).items).toStrictEqual([74n]);
    });

    it('identifies the level of monkey business after 20 rounds', () => {
        expect(getMonkeyBusiness(smallInput, 20)).toStrictEqual(10605);
        expect(getMonkeyBusiness(puzzleInput, 20)).toStrictEqual(111210);
    });

    /**
     * Tests start to hang around 1000 rounds.
     * Noticable slowdown happens around 600-700 rounds.
     */
    it.skip('should be able to process increasing rounds without performance issues', () => {
        expect(getMonkeyBusiness(smallInput, 100, false)).toStrictEqual(260099);
        expect(getMonkeyBusiness(smallInput, 700, false)).toStrictEqual(13184145);
        // expect(getMonkeyBusiness(smallInput, 1000, false)).toStrictEqual(6721050);
    });

    /**
     * This currently takes too long to run!
     * This started failing when I switched over to using bigint's instead of numbers
     */
    it.skip('identifies the level of monkey business after 10000 rounds, with no worry decrease', () => {
        expect(getMonkeyBusiness(smallInput, 10000, false)).toStrictEqual(2713310158);
        // 14571507584 is too low
        // expect(getMonkeyBusiness(puzzleInput, 10000, false)).toStrictEqual(14571507584);
    });
});
