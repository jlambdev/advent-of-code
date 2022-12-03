import { largeInput } from '../fixture';
import {
    Move,
    Result,
    playRound,
    totalScoreForAllRounds,
    caclulatePlayerMoveBasedOnOutcome,
    playRoundUsingOutcomeStrategy,
} from '../game';

/*
    Note: an alternative approach to this would be to solve by 
    calculating all the permutations of games / results up front
*/

describe('Rock Paper Scissors', () => {
    describe('Move Strategy', () => {
        const moveStrategy = {
            X: Move.Rock,
            Y: Move.Paper,
            Z: Move.Scissors,
        };

        it('should calculate the score for a round with a move based strategy', () => {
            expect(playRound('A Y', moveStrategy)).toStrictEqual(8);
            expect(playRound('B X', moveStrategy)).toStrictEqual(1);
            expect(playRound('C Z', moveStrategy)).toStrictEqual(6);
        });

        it('should calculate the total score for all rounds with a move based strategy', () => {
            const rounds = 'A Y\nB X\nC Z';
            expect(totalScoreForAllRounds(rounds, moveStrategy)).toStrictEqual(15);
            expect(totalScoreForAllRounds(largeInput, moveStrategy)).toStrictEqual(15572);
        });
    });

    describe('Outcome Strategy', () => {
        const outcomeStrategy = {
            X: Result.Lose,
            Y: Result.Draw,
            Z: Result.Win,
        };

        it('should caculate the player move based on the outcome', () => {
            expect(
                caclulatePlayerMoveBasedOnOutcome(Move.Rock, Result.Win),
            ).toStrictEqual(Move.Paper);
            expect(
                caclulatePlayerMoveBasedOnOutcome(Move.Rock, Result.Draw),
            ).toStrictEqual(Move.Rock);
            expect(
                caclulatePlayerMoveBasedOnOutcome(Move.Rock, Result.Lose),
            ).toStrictEqual(Move.Scissors);
            expect(
                caclulatePlayerMoveBasedOnOutcome(Move.Scissors, Result.Lose),
            ).toStrictEqual(Move.Paper);
            expect(
                caclulatePlayerMoveBasedOnOutcome(Move.Paper, Result.Win),
            ).toStrictEqual(Move.Scissors);
        });

        it('should calculate the score for a round with an outcome-based strategy', () => {
            expect(playRoundUsingOutcomeStrategy('A Y', outcomeStrategy)).toStrictEqual(
                4,
            );
            expect(playRoundUsingOutcomeStrategy('B X', outcomeStrategy)).toStrictEqual(
                1,
            );
            expect(playRoundUsingOutcomeStrategy('C Z', outcomeStrategy)).toStrictEqual(
                7,
            );
        });

        it('should calculate the total score for all rounds with an outcome-based strategy', () => {
            const rounds = 'A Y\nB X\nC Z';
            expect(totalScoreForAllRounds(rounds, outcomeStrategy)).toStrictEqual(12);
            expect(totalScoreForAllRounds(largeInput, outcomeStrategy)).toStrictEqual(
                16098,
            );
        });
    });
});
