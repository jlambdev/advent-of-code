import { partOne, partTwo } from './cubes';
import { sampleInput, puzzleInput } from './input';

describe('Cube Conundrum', () => {
    it('can determine the number of games within cube limits', () => {
        expect(partOne(sampleInput)).toStrictEqual(8);
        expect(partOne(puzzleInput)).toStrictEqual(3099);
    });

    it('can determine the fewest number of cubes required', () => {
        expect(partTwo(sampleInput)).toStrictEqual(2286);
        expect(partTwo(puzzleInput)).toStrictEqual(72970);
    });
});
