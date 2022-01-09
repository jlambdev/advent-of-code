import { extractBagColours, processBags } from '../bags';
import { puzzleInput as puzzle, smallInput } from '../fixtures';

describe('Handy Haversacks', () => {
    describe('extractBagColours', () => {
        it('should extract the bag colour and the bag colours it can contain', () => {
            expect(
                extractBagColours(
                    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
                ),
            ).toStrictEqual({
                colour: 'light red',
                children: { 'bright white': 1, 'muted yellow': 2 },
                parents: new Set(),
            });

            expect(
                extractBagColours(
                    'bright white bags contain 1 shiny gold bag.',
                ),
            ).toStrictEqual({
                colour: 'bright white',
                children: { 'shiny gold': 1 },
                parents: new Set([]),
            });

            expect(
                extractBagColours('faded blue bags contain no other bags.'),
            ).toStrictEqual({
                colour: 'faded blue',
                children: {},
                parents: new Set([]),
            });
        });
    });

    describe('getNumberOfContainingBags', () => {
        it('should identify the number of bag colours that can contain `shiny gold` bag', () => {
            expect(processBags(smallInput).numContainerBags).toStrictEqual(4);
            expect(processBags(puzzle).numContainerBags).toStrictEqual(192);
        });

        it.only('should identify the number of bags that `shiny gold` bag needs to hold', () => {
            expect(processBags(smallInput).numRequiredBags).toStrictEqual(32);
            // expect(processBags(puzzle).numRequiredBags).toStrictEqual(1);
        });
    });
});
