import { findLowestRisk } from '../chiton';
import { smallInput } from '../fixtures';

describe('Chiton', () => {
    it.skip('should find the path with the lowest total chiton risk', () => {
        expect(findLowestRisk(smallInput)).toStrictEqual(40);
    });
});
