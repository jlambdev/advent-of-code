export enum Move {
    Paper = 'paper',
    Rock = 'rock',
    Scissors = 'scissors',
}

export enum Result {
    Win = 'win',
    Draw = 'draw',
    Lose = 'lose',
}

type MoveStrategy = {
    [key: string]: Move;
};

type OutcomeStrategy = {
    [key: string]: Result;
};

const points = {
    [Move.Rock]: 1,
    [Move.Paper]: 2,
    [Move.Scissors]: 3,
    [Result.Win]: 6,
    [Result.Draw]: 3,
    [Result.Lose]: 0,
};

const opponentStrategy: MoveStrategy = {
    A: Move.Rock,
    B: Move.Paper,
    C: Move.Scissors,
};

function scoreGame(opponentMove: Move, playerMove: Move): number {
    if (opponentMove === playerMove) {
        return points[Result.Draw];
    }

    if (opponentMove === Move.Rock) {
        return playerMove === Move.Paper ? points[Result.Win] : points[Result.Lose];
    } else if (opponentMove === Move.Paper) {
        return playerMove === Move.Scissors ? points[Result.Win] : points[Result.Lose];
    }
    return playerMove === Move.Rock ? points[Result.Win] : points[Result.Lose]; // scissors
}

export function playRound(round: string, playerStrategy: MoveStrategy): number {
    const [encryptedOpponentMove, encryptedPlayerMove] = round.split(' ');

    const opponentMove = opponentStrategy[encryptedOpponentMove];
    const playerMove = playerStrategy[encryptedPlayerMove];

    return scoreGame(opponentMove, playerMove) + points[playerMove];
}

export function caclulatePlayerMoveBasedOnOutcome(
    opponentMove: Move,
    result: Result,
): Move {
    if (result === Result.Draw) {
        return opponentMove;
    }

    if (opponentMove === Move.Rock) {
        return result === Result.Win ? Move.Paper : Move.Scissors;
    } else if (opponentMove === Move.Paper) {
        return result === Result.Win ? Move.Scissors : Move.Rock;
    }
    return result === Result.Win ? Move.Rock : Move.Paper; // scissors
}

export function playRoundUsingOutcomeStrategy(
    round: string,
    playerStrategy: OutcomeStrategy,
): number {
    const [encryptedOpponentMove, encryptedPlayerMove] = round.split(' ');

    const opponentMove = opponentStrategy[encryptedOpponentMove];
    const outcome = playerStrategy[encryptedPlayerMove];
    const playerMove = caclulatePlayerMoveBasedOnOutcome(opponentMove, outcome);

    return points[outcome] + points[playerMove];
}

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
function isMoveStrategy(strategy: unknown): strategy is MoveStrategy {
    const properties = Object.values(strategy);
    return properties.includes(Move.Rock.toString());
}

export const totalScoreForAllRounds = (
    input: string,
    strategy: MoveStrategy | OutcomeStrategy,
): number => {
    const rounds = input.split('\n');

    if (isMoveStrategy(strategy)) {
        return rounds.reduce((acc, round) => (acc += playRound(round, strategy)), 0);
    }

    return rounds.reduce(
        (acc, round) => (acc += playRoundUsingOutcomeStrategy(round, strategy)),
        0,
    );
};
