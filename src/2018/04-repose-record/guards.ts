interface Entry {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    record: string;
}

function entryToDate(entry: Entry): Date {
    return new Date(
        Date.UTC(
            Number(entry.year),
            Number(entry.month) - 1,
            Number(entry.day),
            Number(entry.hour),
            Number(entry.minute),
        ),
    );
}

function parseEntries(input: string): Array<Entry> {
    return input
        .split('\n')
        .sort()
        .map((line: string) => {
            return {
                year: line.substring(1, 5),
                month: line.substring(6, 8),
                day: line.substring(9, 11),
                hour: line.substring(12, 14),
                minute: line.substring(15, 17),
                record: line.substring(19),
            };
        });
}

function createGuardMap(
    entries: Array<Entry>,
): Map<number, { totalMinutes: number; minuteCount: Map<number, number> }> {
    const guardMap: Map<
        number,
        { totalMinutes: number; minuteCount: Map<number, number> }
    > = new Map();

    let currentGuardId: number;
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].record.startsWith('Guard')) {
            currentGuardId = Number(entries[i].record.match(/\d+/)![0]);
        } else if (entries[i].record === 'falls asleep') {
            const timeAsleep = entryToDate(entries[i]);
            const wakesUp = entryToDate(entries[i + 1]);

            const mapEntry = guardMap.get(currentGuardId) ?? {
                totalMinutes: 0,
                minuteCount: new Map<number, number>(),
            };

            while (timeAsleep < wakesUp) {
                const minuteAsleepUtc = timeAsleep.getUTCMinutes();
                mapEntry.totalMinutes++;
                mapEntry.minuteCount.set(
                    minuteAsleepUtc,
                    (mapEntry.minuteCount.get(minuteAsleepUtc) ?? 0) + 1,
                );
                timeAsleep.setMinutes(timeAsleep.getMinutes() + 1);
            }

            guardMap.set(currentGuardId, mapEntry);
        }
    }

    return guardMap;
}

export function partOne(input: string): number {
    const entries = parseEntries(input);

    const guardMap = createGuardMap(entries);

    let max = 0;
    let mostAsleepGuardId: number;
    for (const [id, { totalMinutes }] of guardMap) {
        if (totalMinutes > max) {
            max = totalMinutes;
            mostAsleepGuardId = id;
        }
    }

    max = 0;
    let mostAsleepMinute: number;
    for (const [minute, count] of guardMap.get(mostAsleepGuardId).minuteCount) {
        if (count > max) {
            max = count;
            mostAsleepMinute = minute;
        }
    }

    return mostAsleepGuardId * mostAsleepMinute;
}

export function partTwo(input: string): number {
    const entries = parseEntries(input);

    const guardMap = createGuardMap(entries);

    let max = 0;
    let guardId: number;
    let mostAsleepMinute: number;
    for (const [id, { minuteCount }] of guardMap) {
        for (const [minute, count] of minuteCount) {
            if (count > max) {
                max = count;
                guardId = id;
                mostAsleepMinute = minute;
            }
        }
    }

    return guardId * mostAsleepMinute;
}
