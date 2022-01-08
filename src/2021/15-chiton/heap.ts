// Credit to: https://github.com/jeffzh4ng/iruka/blob/02acaa0c621a6db9e874d6a7b4cc1bf2fd87f99a/src/data-structures/priority-queues/min-binary-heap.ts#L13
interface CompareFunction<T> {
    (a: T, b: T): number;
}

function defaultCompare<T>(a: T, b: T): number {
    if (a < b) return -1;
    else if (a === b) return 0;
    return 1;
}

class MinBinaryHeap<T> {
    private heap: T[];
    private compare: CompareFunction<T>;

    constructor(elements?: Iterable<T>, compareFunction?: CompareFunction<T>) {
        this.heap = [];
        this.compare = compareFunction ?? defaultCompare;

        if (elements) {
            this.heap = Array.from(elements);
            this.heapify();
        }
    }

    // there's a paper as to why this technique works in O(log(n))
    private heapify(): void {
        let i = Math.max(0, Math.floor(this.size() / 2) - 1);
        for (; i >= 0; i--) this.sink(i);
    }

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    // add element to the bottom right of the tree
    // and then 'swim' it up until heap invariant is satisfied
    add(element: T): void {
        this.heap.push(element);
        const indexOfLastElement = this.size() - 1;
        this.swim(indexOfLastElement);
    }

    peek(): T | null {
        if (this.isEmpty()) return null;

        return this.heap[0];
    }

    contains(element: T): boolean {
        return this.heap.includes(element);
    }

    // removes and returns the top-most element of the heap
    poll(): T | null {
        if (this.isEmpty()) return null;

        return this.removeAt(0);
    }

    remove(element: T): boolean {
        const elementIndex = this.heap.findIndex(
            (h: T) => this.compare(h, element) === 0,
        );

        if (elementIndex === -1) return false;

        this.removeAt(elementIndex);
        return true;
    }

    // sink element with index k until invariant is satisfied
    private sink(k: number): void {
        while (true) {
            // get smallest child index
            const leftChildIndex = this.getLeftChildIndex(k);
            const rightChildIndex = this.getRightChildIndex(k);

            let smallestChldIndex = leftChildIndex;
            const isRightChildSmallerThanLeft =
                rightChildIndex < this.size() &&
                this.less(rightChildIndex, leftChildIndex);
            if (isRightChildSmallerThanLeft)
                smallestChldIndex = rightChildIndex;

            // make sure smallest child index is not out of bounds
            const childrenAreOutOfBounds = leftChildIndex >= this.size();
            const elementIsLessThanChildren = this.less(k, smallestChldIndex);
            if (childrenAreOutOfBounds || elementIsLessThanChildren) break;

            // if it is not, then swap the current node with the child
            this.swap(k, smallestChldIndex);
            k = smallestChldIndex;

            // repeat
        }
    }

    // swim element with index k until invariant is satisfied
    // only swim up if a parent is greater than child
    private swim(k: number): void {
        let parentIndex = this.getParentIndex(k);

        while (k > 0 && this.less(k, parentIndex)) {
            this.swap(k, parentIndex);
            k = parentIndex;

            parentIndex = this.getParentIndex(k);
        }
    }

    private removeAt(indexToRemove: number): T {
        // grab the element at the specified index and save for later
        const removedValue = this.heap[indexToRemove];

        // swap the element with the last element in our heap
        const indexOfLastElement = this.size() - 1;
        this.swap(indexToRemove, indexOfLastElement);
        this.heap.pop();

        // if the element removing is the last element in the heap, return it
        const isLastElementBeingRemoved = indexToRemove === indexOfLastElement;
        if (isLastElementBeingRemoved) return removedValue;

        // heapify

        // try sinking
        const indexToBeHeapified = indexToRemove;
        const elementToBeHeapified = this.heap[indexToBeHeapified];
        this.sink(indexToBeHeapified);

        // try swimming
        const elementDidNotMove =
            this.heap[indexToBeHeapified] === elementToBeHeapified;
        if (elementDidNotMove) {
            this.swim(indexToBeHeapified);
        }

        // return saved value of removed element
        return removedValue;
    }

    private getLeftChildIndex(parentIndex: number): number {
        return parentIndex * 2 - 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 2;
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private less(a: number, b: number) {
        return this.compare(this.heap[a], this.heap[b]) < 0;
    }

    private swap(i: number, j: number) {
        const temp = this.heap[i];

        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

export default MinBinaryHeap;
