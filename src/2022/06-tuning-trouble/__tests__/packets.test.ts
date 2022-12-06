import { largeInput } from '../fixture';
import {
    isStartOfPacketMarker,
    numCharsToEndOfStartMarker,
    isStartOfMessageMarker,
} from '../packets';

describe('Tuning Trouble', () => {
    it('should identify a start-of-packet marker', () => {
        expect(isStartOfPacketMarker('mjqj')).toStrictEqual(false);
        expect(isStartOfPacketMarker('jpqm')).toStrictEqual(true);
    });

    it('should identify the number of characters until the end of the start-of-packet marker', () => {
        const marker = 'packet';

        expect(
            numCharsToEndOfStartMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', marker),
        ).toStrictEqual(7);
        expect(
            numCharsToEndOfStartMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', marker),
        ).toStrictEqual(5);
        expect(
            numCharsToEndOfStartMarker('nppdvjthqldpwncqszvftbrmjlhg', marker),
        ).toStrictEqual(6);
        expect(
            numCharsToEndOfStartMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', marker),
        ).toStrictEqual(10);
        expect(
            numCharsToEndOfStartMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', marker),
        ).toStrictEqual(11);
        expect(numCharsToEndOfStartMarker(largeInput, marker)).toStrictEqual(1093);
    });

    it('should identify a start-of-message marker', () => {
        expect(isStartOfMessageMarker('mjqj')).toStrictEqual(false);
        expect(isStartOfMessageMarker('jpqm')).toStrictEqual(false);
        expect(isStartOfMessageMarker('mjqjpqmgbljsph')).toStrictEqual(false);
        expect(isStartOfMessageMarker('qmgbljsphdztnv')).toStrictEqual(true);
    });

    it('should identify the number of characters until the end of the start-of-message marker', () => {
        const marker = 'message';

        expect(
            numCharsToEndOfStartMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', marker),
        ).toStrictEqual(19);
        expect(
            numCharsToEndOfStartMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', marker),
        ).toStrictEqual(23);
        expect(
            numCharsToEndOfStartMarker('nppdvjthqldpwncqszvftbrmjlhg', marker),
        ).toStrictEqual(23);
        expect(
            numCharsToEndOfStartMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', marker),
        ).toStrictEqual(29);
        expect(
            numCharsToEndOfStartMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', marker),
        ).toStrictEqual(26);
        expect(numCharsToEndOfStartMarker(largeInput, marker)).toStrictEqual(3534);
    });
});
