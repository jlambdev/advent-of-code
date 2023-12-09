function canBeatDistanceRecord(
    speed: number,
    raceTime: number,
    distanceRecord: number,
): boolean {
    const raceTimeAfterButtonHold = raceTime - speed;
    if (raceTimeAfterButtonHold <= 0) {
        return false;
    }

    return raceTimeAfterButtonHold * speed > distanceRecord;
}

export function partOne(input: string): number {
    const [times, distances] = input.split('\n').map((line: string) =>
        line
            .replace(/^(Time|Distance):\s+/, '')
            .split(/\s+/)
            .map(Number),
    );

    const possibilitiesPerRace: Array<number> = [];
    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];

        let min = 1; // keep min/max references outside of for loop
        for (; min < time; min++) {
            if (canBeatDistanceRecord(min, time, distance)) {
                break;
            }
        }

        let max = time - 1;
        for (; max > 1; max--) {
            if (canBeatDistanceRecord(max, time, distance)) {
                break;
            }
        }

        possibilitiesPerRace.push(max - min + 1);
    }

    return possibilitiesPerRace.reduce((total, current) => (total *= current), 1);
}

export function partTwo(input: string): number {
    const [time, distance] = input
        .split('\n')
        .map((line: string) =>
            Number(line.replace(/^(Time|Distance):\s+/, '').replaceAll(/\s+/g, '')),
        );

    let min = 1; // keep min/max references outside of for loop
    for (; min < time; min++) {
        if (canBeatDistanceRecord(min, time, distance)) {
            break;
        }
    }

    let max = time - 1;
    for (; max > 1; max--) {
        if (canBeatDistanceRecord(max, time, distance)) {
            break;
        }
    }

    return max - min + 1;
}
