import { inspect } from 'util';

// Pretty print a nested object
export function inspectNestedObject(object: Object): string {
    return inspect(object, { showHidden: false, depth: null, colors: true });
}
