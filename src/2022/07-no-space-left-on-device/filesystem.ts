import { inspect } from 'util';

interface SharedProperties {
    name: string;
    size: number;
    isDirectory: boolean;
}

interface File extends SharedProperties {
    parent: Directory;
}

export interface Directory extends SharedProperties {
    children: Array<File | Directory>;
    parent?: Directory;
}

export function isChangeDirectoryCommand(line: string): boolean {
    return line.length >= 6 && line.substring(0, 4) === '$ cd';
}

export function isListCommand(line: string): boolean {
    return line === '$ ls';
}

export function isDirectory(line: string): boolean {
    return line.length >= 5 && line.substring(0, 3) === 'dir';
}

export function getDirectoryNameFromCommand(changeCommand: string): string {
    return changeCommand.substring(5);
}

function findOrCreateNewDictionary(
    name: string,
    currentDirectory?: Directory,
): Directory {
    let directory: Directory;
    if (currentDirectory) {
        directory = currentDirectory.children.find(
            (element) => element.isDirectory && element.name === name,
        ) as Directory;

        if (directory) {
            return directory;
        }
    }
    return {
        name,
        size: 0,
        isDirectory: true,
        children: [],
    };
}

function createNewFile(name: string, size: number, parent: Directory): File {
    return {
        name,
        size,
        isDirectory: false,
        parent,
    };
}

// Pretty print nested object (useful for debugging, not part of solution)
function inspectNestedObject(object: any): string {
    return inspect(object, { showHidden: false, depth: null, colors: true });
}

export function updateDirectorySizes(directory: Directory, size: number): void {
    let current = directory;
    while (current) {
        current.size += size;
        current = current.parent;
    }
}

export function parseTerminalLogs(input: string): Directory {
    let rootDirectory: Directory;
    let currentDirectory: Directory;

    input.split('\n').forEach((line) => {
        if (isChangeDirectoryCommand(line)) {
            const changeTo = getDirectoryNameFromCommand(line);

            // folder navigation
            if (changeTo === '..') {
                currentDirectory = currentDirectory.parent;
                return;
            }

            const directory = findOrCreateNewDictionary(changeTo, currentDirectory);

            // update reference for current directory
            if (!currentDirectory) {
                rootDirectory = directory;
                currentDirectory = directory;
                return;
            }

            directory.parent = currentDirectory;
            currentDirectory.children.push(directory);
            currentDirectory = directory;
        } else {
            if (isListCommand(line) || isDirectory(line)) {
                return;
            }

            const [fileSize, fileName] = line.split(' ');
            const file = createNewFile(fileName, Number(fileSize), currentDirectory);
            updateDirectorySizes(currentDirectory, file.size);
            currentDirectory.children.push(file);
        }
    });

    /* Use to inspect the file system (debugging only) */
    // console.log(inspectNestedObject(rootDirectory));

    return rootDirectory;
}

export function getSumOfDirectorySizes(input: string, threshold: number): number {
    const rootDirectory = parseTerminalLogs(input);

    let sum = 0;

    const recurseThroughDirectory = (directory: Directory) => {
        if (directory.size <= threshold) {
            sum += directory.size;
        }
        directory.children.forEach((element) => {
            if (element.isDirectory) {
                recurseThroughDirectory(element as Directory);
            }
        });
    };

    recurseThroughDirectory(rootDirectory);

    return sum;
}

export function findSmallestDirectorySizeToFreeUpSpace(
    input: string,
    threshold: number,
    diskCapacity: number,
): number {
    const rootDirectory = parseTerminalLogs(input);
    const unusedSpace = diskCapacity - rootDirectory.size;

    let smallestDirectory: Directory;

    const recurseThroughDirectory = (directory: Directory) => {
        if (unusedSpace + directory.size >= threshold) {
            if (!smallestDirectory || directory.size < smallestDirectory.size) {
                smallestDirectory = directory;
            }
        }
        directory.children.forEach((element) => {
            if (element.isDirectory) {
                recurseThroughDirectory(element as Directory);
            }
        });
    };

    recurseThroughDirectory(rootDirectory);

    return smallestDirectory.size;
}
