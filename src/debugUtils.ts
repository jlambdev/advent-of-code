import { inspect } from 'util';

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
