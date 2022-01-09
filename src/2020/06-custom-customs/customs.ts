export const sumAnswersForAllGroups = (input: string) => {
    const groups = input.split('\n\n');

    let sum = 0;
    for (const group of groups) {
        const uniqueAnswers = new Set<string>();
        group.split('\n').map((answers) => {
            answers.split('').map((answer) => uniqueAnswers.add(answer));
        });
        sum += uniqueAnswers.size;
    }

    return sum;
};

export const sumConsistentAnswersForAllGroups = (input: string) => {
    const groups = input.split('\n\n');

    let sum = 0;
    for (const group of groups) {
        const answerCounter = new Map<string, number>();
        const members = group.split('\n');

        members.map((answers) => {
            answers.split('').map((answer) => {
                if (!answerCounter.has(answer)) answerCounter.set(answer, 1);
                else answerCounter.set(answer, answerCounter.get(answer) + 1);
            });
        });

        for (const [_, count] of answerCounter) {
            if (count === members.length) sum += 1;
        }
    }

    return sum;
};
