import {
    findTuningFrequencyOfDistressBeacon,
    numNonBeaconPositionsForRow,
} from '../beacons';
import { puzzleInput, sampleInput } from '../fixture';

describe('Beacon Exclusion Zone', () => {
    it('should find the total number of positions that cannot contain a beacon for a row', () => {
        expect(numNonBeaconPositionsForRow(sampleInput, 10)).toStrictEqual(26);
        expect(numNonBeaconPositionsForRow(puzzleInput, 2000000)).toStrictEqual(4879972);
    });

    it.skip('should find the tuning frequency of the distress beacon', () => {
        expect(findTuningFrequencyOfDistressBeacon(sampleInput, 20, 20)).toStrictEqual(
            56000011,
        );
        // expect(
        //     findTuningFrequencyOfDistressBeacon(puzzleInput, 0, 4000000),
        // ).toStrictEqual(1);
    });
});
