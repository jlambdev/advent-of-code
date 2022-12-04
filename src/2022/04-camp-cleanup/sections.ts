/* 
    elves need to clean up sections of the ramp
    every section has a unique ID number
    eac elf is assigned a _range_ of section IDs

    many of the section assignments overlap with each other
    elves try to pair up and find overlaps
    puzzle input: list of the section assignments for each pair

    e.g
    2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8

    this means: first elf was assigned sections 2-4 (2, 3, 4)
    second elf assigned sections 6-8 (6,7,8)
    the ranges can be much larger than this

    visualised:
    .234.....  2-4
    .....678.  6-8

    .23......  2-3
    ...45....  4-5

    ....567..  5-7
    ......789  7-9

    .2345678.  2-8
    ..34567..  3-7

    .....6...  6-6
    ...456...  4-6

    .23456...  2-6
    ...45678.  4-8

    some pairs fully contain another section
    when this happens, one elf in the pair would be exclusively cleaning the secitions
    so the cleaning would need reconsideration
    there are 2 pairs affected in the above input

    how many pairs fully contain another section
*/

/*
    --- V1 ---

    If the right-most number is less than the left most number (2) - disqualify
    If the left most number is more than the right most number (2) - disqualify

    flip it around to find qualifying pairs:
    1) right-most number of first pair (4) >= left most number of second (6) - false

    2) right-most number of first pair (3) >= left most number of second (4) - false

    3) right-most number of first pair (7) >= left most number of second (7) - true
       left-most number of first pair (5) <= right-most number of second (9) - true
       ...we know there is potentially some overlap
       take the lowest number of the pairs & walk through?
       ...

    --- V2 ---

    * right pair encloses left
    is the min of left <= the min of right AND is the max of left >= the max of right?
    YES

    * left encloses right
    is the min of right <= the min of left AND the max of right >= the max of left?
*/

const MIN = 0;
const MAX = 1;

export function hasContainedSection(pairs: string): boolean {
    const [left, right] = pairs.split(',').map((pair) => pair.split('-').map(Number));

    // Debug
    // console.log({
    //     left,
    //     right,
    //     leftMin: left[MIN],
    //     rightMin: right[MIN],
    //     leftMax: left[MAX],
    //     rightMax: right[MAX],
    // });

    // left pair encloses right
    if (right[MIN] <= left[MIN] && right[MAX] >= left[MAX]) {
        return true;
    }

    // right pair encloses left
    if (left[MIN] <= right[MIN] && left[MAX] >= right[MAX]) {
        return true;
    }

    return false;
}

export function sumOfContainedSections(input: string): number {
    return input
        .split('\n')
        .map(hasContainedSection)
        .reduce((acc, cur) => (acc += Number(cur)), 0);
}
