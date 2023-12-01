import { puzzleInput, sampleInput } from '../fixtures';
import { maxReleasablePressure } from '../valves';

describe('Proboscidea Volcanium', () => {
    it.skip('should find the max amount of pressure that can be released', () => {
        expect(maxReleasablePressure(sampleInput)).toStrictEqual(1651);
        // expect(maxReleasablePressure(puzzleInput)).toStrictEqual(1);
    });
});
