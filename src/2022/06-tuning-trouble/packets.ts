type Marker = 'packet' | 'message';

export function isStartOfPacketMarker(chars: string): boolean {
    return new Set(chars).size === 4;
}

export function isStartOfMessageMarker(chars: string): boolean {
    return new Set(chars).size === 14;
}

export function numCharsToEndOfStartMarker(buffer: string, marker: Marker): number {
    const markerBoundary = marker === 'packet' ? 3 : 13;
    const isMarker = marker === 'packet' ? isStartOfPacketMarker : isStartOfMessageMarker;

    for (let index = 0; index < buffer.length; index++) {
        if (index >= markerBoundary) {
            if (isMarker(buffer.slice(index - markerBoundary, index + 1))) {
                return index + 1;
            }
        }
    }

    throw new Error('unable to find start-of-packet marker from buffer');
}
