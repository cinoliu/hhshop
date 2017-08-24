import LinkedNode from './linked-node';
declare class LinkedList<T extends LinkedNode> {
    head: T;
    tail: T;
    length: number;
    constructor();
    append(...nodes: T[]): void;
    contains(node: T): boolean;
    insertBefore(node: T, refNode: T): void;
    offset(target: T): number;
    remove(node: T): void;
    iterator(curNode?: T): () => T;
    find(index: number, inclusive?: boolean): [T, number];
    forEach(callback: (cur: T) => void): void;
    forEachAt(index: number, length: number, callback: (cur: T, offset: number, length: number) => void): void;
    map(callback: (cur: T) => any): any[];
    reduce<M>(callback: (memo: M, cur: T) => M, memo: M): M;
}
export default LinkedList;
