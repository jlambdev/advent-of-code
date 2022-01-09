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
