import {
    Directory,
    findSmallestDirectorySizeToFreeUpSpace,
    getDirectoryNameFromCommand,
    getSumOfDirectorySizes,
    isChangeDirectoryCommand,
    isDirectory,
    isListCommand,
    parseTerminalLogs,
    updateDirectorySizes,
} from '../filesystem';
import { smallInput, largeInput } from '../fixture';

describe('No Space Left On Device', () => {
    it('should recognise terminal commands & logs', () => {
        expect(isChangeDirectoryCommand('$ cd /')).toStrictEqual(true);
        expect(isChangeDirectoryCommand('$ cd d')).toStrictEqual(true);
        expect(isChangeDirectoryCommand('$ cd ..')).toStrictEqual(true);
        expect(isChangeDirectoryCommand('$ ls')).toStrictEqual(false);
        expect(isChangeDirectoryCommand('584 i')).toStrictEqual(false);
        expect(isChangeDirectoryCommand('dir e')).toStrictEqual(false);

        expect(getDirectoryNameFromCommand('$ cd /')).toStrictEqual('/');
        expect(getDirectoryNameFromCommand('$ cd d')).toStrictEqual('d');
        expect(getDirectoryNameFromCommand('$ cd ..')).toStrictEqual('..');

        expect(isListCommand('$ ls')).toStrictEqual(true);
        expect(isListCommand('$ cd /')).toStrictEqual(false);
        expect(isListCommand('584 i')).toStrictEqual(false);
        expect(isListCommand('dir e')).toStrictEqual(false);

        expect(isDirectory('dir a')).toStrictEqual(true);
        expect(isDirectory('dir xyz')).toStrictEqual(true);
        expect(isDirectory('dir abcdefg')).toStrictEqual(true);
        expect(isDirectory('7214296 k')).toStrictEqual(false);
        expect(isDirectory('$ ls')).toStrictEqual(false);
        expect(isDirectory('$ cd /')).toStrictEqual(false);
    });

    it('should traverse a linked list of directories and update the total size', () => {
        const parentDirectory: Directory = {
            name: 'a',
            size: 100,
            isDirectory: true,
            children: [],
        };
        const currentDirectory: Directory = {
            name: 'a',
            size: 0,
            isDirectory: true,
            children: [],
            parent: parentDirectory,
        };
        parentDirectory.children.push(currentDirectory);

        updateDirectorySizes(currentDirectory, 50);

        expect(currentDirectory.size).toStrictEqual(50);
        expect(parentDirectory.size).toStrictEqual(150);
    });

    /**
     * Something unusual happens to the order of elements pushed to an array when
     * you are pushing (circular) object references. The circular references are
     * ordered last in the array, after the non-circular ones (e.g. files).
     *
     * E.g. [file1, file2, file3, <directory ref 1>]
     *
     * For this reason, we use the .find() method to get the directories
     */
    it('should parse the terminal logs into a nested Directory data structure', () => {
        const rootDirectory = parseTerminalLogs(smallInput);

        expect(rootDirectory.name).toStrictEqual('/');
        expect(rootDirectory.size).toStrictEqual(48381165);
        expect(rootDirectory.isDirectory).toStrictEqual(true);
        expect(rootDirectory.children.length).toStrictEqual(4);

        // Directories
        const firstDirectory = rootDirectory.children.find(
            (el) => el.name === 'a',
        ) as Directory;
        expect(firstDirectory.name).toStrictEqual('a');
        expect(firstDirectory.size).toStrictEqual(94853);
        expect(firstDirectory.isDirectory).toStrictEqual(true);
        expect(firstDirectory.children.length).toStrictEqual(4);

        const secondDirectory = rootDirectory.children.find(
            (el) => el.name === 'd',
        ) as Directory;
        expect(secondDirectory.name).toStrictEqual('d');
        expect(secondDirectory.size).toStrictEqual(24933642);
        expect(secondDirectory.isDirectory).toStrictEqual(true);
        expect(secondDirectory.children.length).toStrictEqual(4);

        const nestedDirectory = firstDirectory.children.find(
            (el) => el.name === 'e',
        ) as Directory;
        expect(nestedDirectory.name).toStrictEqual('e');
        expect(nestedDirectory.size).toStrictEqual(584);
        expect(nestedDirectory.isDirectory).toStrictEqual(true);
        expect(nestedDirectory.children.length).toStrictEqual(1);

        // Files (first objects before circular references)
        expect(firstDirectory.children[0].name).toStrictEqual('f');
        expect(firstDirectory.children[0].size).toStrictEqual(29116);
        expect(firstDirectory.children[0].isDirectory).toStrictEqual(false);

        expect(secondDirectory.children[0].name).toStrictEqual('j');
        expect(secondDirectory.children[0].size).toStrictEqual(4060174);
        expect(secondDirectory.children[0].isDirectory).toStrictEqual(false);

        expect(nestedDirectory.children[0].name).toStrictEqual('i');
        expect(nestedDirectory.children[0].size).toStrictEqual(584);
        expect(nestedDirectory.children[0].isDirectory).toStrictEqual(false);
    });

    it('should get the sum of filesizes for directories <= 100000', () => {
        expect(getSumOfDirectorySizes(smallInput, 100000)).toStrictEqual(95437);
        expect(getSumOfDirectorySizes(largeInput, 100000)).toStrictEqual(1449447);
    });

    it('should find the smallest directory that would free up enough space', () => {
        expect(
            findSmallestDirectorySizeToFreeUpSpace(smallInput, 30000000, 70000000),
        ).toStrictEqual(24933642);
        expect(
            findSmallestDirectorySizeToFreeUpSpace(largeInput, 30000000, 70000000),
        ).toStrictEqual(8679207);
    });
});
