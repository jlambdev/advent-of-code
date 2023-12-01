export function maxReleasablePressure(input: string): number {
    input.split('\n').forEach((line) => console.log(line));

    // only between 6-15 valves can actually release more pressure

    // we know the valves with the highest flow rates

    // (?) can we identify the furthest 'distance'
    // does it have any value?
    // the cost could be the amount of minutes it takes to get there
    // and open the valve from AA

    // how many combinations are there?
    // 6! = 720
    // 15! = 30,517,578,125

    // unless..
    // you check all possibilities

    // ------

    // find the valve that will release the most pressure first
    // then the next from that position
    // then the next ...
    // until the time runs out

    // also need to find the shortest path to a valve...

    // does this work manually?

    return 0;
}

/*
    manual: 
    -- STEP 1 --
    candidates: BB (13), CC (2), DD (20), EE (3), HH (22), JJ (21)
     - BB, cost=2, release=(28x13)=364
     - CC, cost=3, release=(27x2)=54
     - DD, cost=2, release=(28*20)=560 <-- why would you go here first?
     - EE, cost=3, release=(27*3)=81
     - HH, cost=5, release=(25*22)=550
     - JJ, cost=3, release=(27*21)=567 <-- why would you not go here first?

*/
