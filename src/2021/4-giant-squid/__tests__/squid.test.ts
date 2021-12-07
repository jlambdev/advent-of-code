import { game } from '../fixtures';
import { calculateScore } from '../squid';

describe('Squid', () => {
    const playthrough = calculateScore(game);

    it('should calculate the score of the first winning game', () => {
        expect(playthrough.firstWinningScore).toStrictEqual(5685);
    });

    it('should calculate the last winning score', () => {
        expect(playthrough.lastWinningScore).toStrictEqual(21070);
    });
});
