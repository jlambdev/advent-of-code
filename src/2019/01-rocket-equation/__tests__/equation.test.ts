import { modules } from '../fixture';
import {
    getFuelForMass,
    getFuelForAllModules,
    getRecursiveFuelForMass,
    getFuelForAllModulesAndFuel,
} from '../equation';

describe('The Tyranny of the Rocket Equation', () => {
    describe('getFuelForMass', () => {
        it('should calculate the amount of fuel required based on mass', () => {
            expect(getFuelForMass(12)).toStrictEqual(2);
            expect(getFuelForMass(14)).toStrictEqual(2);
            expect(getFuelForMass(1969)).toStrictEqual(654);
            expect(getFuelForMass(100756)).toStrictEqual(33583);
        });
    });

    describe('getFuelForAllModules', () => {
        it('should get the total fuel requirement for all modules', () => {
            expect(getFuelForAllModules(modules)).toStrictEqual(3337766);
        });
    });

    describe('getRecursiveFuelForMass', () => {
        it('should calculate the amount of fuel based on mass, including calculated fuel', () => {
            expect(getRecursiveFuelForMass(14)).toStrictEqual(2);
            expect(getRecursiveFuelForMass(1969)).toStrictEqual(966);
            expect(getRecursiveFuelForMass(100756)).toStrictEqual(50346);
        });
    });

    describe('getFuelForAllModulesAndFuel', () => {
        it('should get the total fuel requirement for all modules, including fuel', () => {
            expect(getFuelForAllModulesAndFuel(modules)).toStrictEqual(5003788);
        });
    });
});
