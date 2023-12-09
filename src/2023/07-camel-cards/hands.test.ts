import { partOne, partTwo, getHandStrength, Score } from './hands';
import { smallInput, puzzleInput } from './input';

describe('Camel Cards', () => {
    it('can identify the total winnings of all camel cards', () => {
        expect(partOne(smallInput)).toStrictEqual(6440);
        expect(partOne(puzzleInput)).toStrictEqual(253313241);
    });

    it('can determine the correct hand strength (no joker cards)', () => {
        expect(getHandStrength('AAAAA')).toStrictEqual(Score.FiveOfAKind);
        expect(getHandStrength('JJJJJ')).toStrictEqual(Score.FiveOfAKind);

        expect(getHandStrength('AAJAA')).toStrictEqual(Score.FourOfAKind);
        expect(getHandStrength('JJAJJ')).toStrictEqual(Score.FourOfAKind);

        expect(getHandStrength('AAJJJ')).toStrictEqual(Score.FullHouse);
        expect(getHandStrength('JJAAA')).toStrictEqual(Score.FullHouse);

        expect(getHandStrength('JJJ98')).toStrictEqual(Score.ThreeOfAKind);
        expect(getHandStrength('555J8')).toStrictEqual(Score.ThreeOfAKind);

        expect(getHandStrength('J343J')).toStrictEqual(Score.TwoPair);
        expect(getHandStrength('23J32')).toStrictEqual(Score.TwoPair);

        expect(getHandStrength('J23J4')).toStrictEqual(Score.OnePair);
        expect(getHandStrength('T2JT4')).toStrictEqual(Score.OnePair);

        expect(getHandStrength('J3456')).toStrictEqual(Score.HighCard);
    });

    it('can determine the correct hand strength with joker cards', () => {
        expect(getHandStrength('AAAAA', true)).toStrictEqual(Score.FiveOfAKind);
        expect(getHandStrength('JJJJJ', true)).toStrictEqual(Score.FiveOfAKind);

        expect(getHandStrength('AAJAA', true)).toStrictEqual(Score.FiveOfAKind); // changed
        expect(getHandStrength('JJAJJ', true)).toStrictEqual(Score.FiveOfAKind); // changed

        expect(getHandStrength('AAJJJ', true)).toStrictEqual(Score.FiveOfAKind); // changed
        expect(getHandStrength('JJAAA', true)).toStrictEqual(Score.FiveOfAKind); // changed

        expect(getHandStrength('JJJ98', true)).toStrictEqual(Score.FourOfAKind); // changed
        expect(getHandStrength('555J8', true)).toStrictEqual(Score.FourOfAKind); // changed

        expect(getHandStrength('J343J', true)).toStrictEqual(Score.FourOfAKind); // changed
        expect(getHandStrength('23J32', true)).toStrictEqual(Score.FullHouse); // changed

        expect(getHandStrength('J23J4', true)).toStrictEqual(Score.ThreeOfAKind); // changed
        expect(getHandStrength('T2JT4', true)).toStrictEqual(Score.ThreeOfAKind); // changed

        expect(getHandStrength('J3456', true)).toStrictEqual(Score.OnePair); // changed
    });

    it('can replace J as a joker card', () => {
        expect(partTwo(smallInput)).toStrictEqual(5905);
        expect(partTwo(puzzleInput)).toStrictEqual(253362743);
    });
});
