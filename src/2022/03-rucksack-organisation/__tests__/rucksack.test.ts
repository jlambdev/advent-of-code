import { rucksacks } from '../fixture';
import {
    findItemInBothCompartments,
    convertItemToPriority,
    sumOfItemPriorities,
    findItemInThreeRucksacks,
    sumOfItemPrioritiesForElfGroups,
} from '../rucksack';

const groupOne = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`;

const groupTwo = `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const smallInput = `${groupOne}\n${groupTwo}`;

describe('Rucksack Reorganization', () => {
    it('should find the items present in both rucksack compartments', () => {
        expect(findItemInBothCompartments('vJrwpWtwJgWrhcsFMMfFFhFp')).toStrictEqual('p');
        expect(
            findItemInBothCompartments('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'),
        ).toStrictEqual('L');
        expect(findItemInBothCompartments('PmmdzqPrVvPwwTWBwg')).toStrictEqual('P');
        expect(
            findItemInBothCompartments('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn'),
        ).toStrictEqual('v');
        expect(findItemInBothCompartments('ttgJtRGJQctTZtZT')).toStrictEqual('t');
        expect(findItemInBothCompartments('CrZsJsPPZsGzwwsLwLmpwMDw')).toStrictEqual('s');
    });

    it('should convert an item to its priority', () => {
        expect(convertItemToPriority('p')).toStrictEqual(16);
        expect(convertItemToPriority('L')).toStrictEqual(38);
        expect(convertItemToPriority('P')).toStrictEqual(42);
        expect(convertItemToPriority('v')).toStrictEqual(22);
        expect(convertItemToPriority('t')).toStrictEqual(20);
        expect(convertItemToPriority('s')).toStrictEqual(19);
    });

    it('should get the sum of priorities of items for multiple rucksacks', () => {
        expect(sumOfItemPriorities(smallInput)).toStrictEqual(157);
        expect(sumOfItemPriorities(rucksacks)).toStrictEqual(7917);
    });

    it('should find the item present in a group of three rucksacks', () => {
        const groupOne = [
            'vJrwpWtwJgWrhcsFMMfFFhFp',
            'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
            'PmmdzqPrVvPwwTWBwg',
        ];
        expect(findItemInThreeRucksacks(groupOne)).toStrictEqual('r');

        const groupTwo = [
            'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
            'ttgJtRGJQctTZtZT',
            'CrZsJsPPZsGzwwsLwLmpwMDw',
        ];
        expect(findItemInThreeRucksacks(groupTwo)).toStrictEqual('Z');
    });

    it('should get the sum of priorities of items for elf groups', () => {
        expect(sumOfItemPrioritiesForElfGroups(smallInput)).toStrictEqual(70);
        expect(sumOfItemPrioritiesForElfGroups(rucksacks)).toStrictEqual(2585);
    });
});
