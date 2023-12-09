import { inspect } from 'util';
import { writeFileSync } from 'fs';

// Pretty print a nested object
export function inspectNestedObject(object: Object): string {
    return inspect(object, {
        compact: false,
        showHidden: false,
        depth: null,
        colors: false,
        breakLength: Infinity,
    });
}

/**
 * Example usage: writeValueToLogFile('hands.json', { guess, hands });
 */
export function writeValueToLogFile(fileName: string, object: any): void {
    writeFileSync(fileName, JSON.stringify(object));
}
