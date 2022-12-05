import { largeInput } from '../fixture';
import { applyCraneProcedures, getTopStacksFromFullInput, parseStacks } from '../stacks';

const smallStacks = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

const smallProcedures = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const smallInput = `${smallStacks}\n\n${smallProcedures}`;

describe('Supply Stacks', () => {
    it('should convert the input of stacks into arrays', () => {
        const stacks = parseStacks(smallStacks);

        expect(stacks.length).toStrictEqual(3);
        expect(stacks[0]).toStrictEqual(['Z', 'N']);
        expect(stacks[1]).toStrictEqual(['M', 'C', 'D']);
        expect(stacks[2]).toStrictEqual(['P']);
    });

    it('should apply the crane procedures and update the stacks', () => {
        const startingStacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
        const updatedStacks = applyCraneProcedures(startingStacks, smallProcedures);

        expect(updatedStacks.length).toStrictEqual(3);
        expect(updatedStacks[0]).toStrictEqual(['C']);
        expect(updatedStacks[1]).toStrictEqual(['M']);
        expect(updatedStacks[2]).toStrictEqual(['P', 'D', 'N', 'Z']);
    });

    it('should parse full input and return the items on top of each stack', () => {
        expect(getTopStacksFromFullInput(smallInput)).toStrictEqual('CMZ');
        expect(getTopStacksFromFullInput(largeInput)).toStrictEqual('LJSVLTWQM');
    });

    it('should handle moves where the crate order is preserved', () => {
        const startingStacks = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
        const updatedStacks = applyCraneProcedures(startingStacks, smallProcedures, true);

        expect(updatedStacks.length).toStrictEqual(3);
        expect(updatedStacks[0]).toStrictEqual(['M']);
        expect(updatedStacks[1]).toStrictEqual(['C']);
        expect(updatedStacks[2]).toStrictEqual(['P', 'Z', 'N', 'D']);
    });

    it('should parse full input, preserve crate order and return the items on top of each stack', () => {
        expect(getTopStacksFromFullInput(smallInput, true)).toStrictEqual('MCD');
        expect(getTopStacksFromFullInput(largeInput, true)).toStrictEqual('BRQWDBBJM');
    });
});
