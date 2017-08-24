import * as Registry from '../registry';
export interface AttributorOptions {
    scope?: Registry.Scope;
    whitelist?: string[];
}
export default class Attributor {
    attrName: string;
    keyName: string;
    scope: Registry.Scope;
    whitelist: string[];
    static keys(node: HTMLElement): string[];
    constructor(attrName: string, keyName: string, options?: AttributorOptions);
    add(node: HTMLElement, value: string): boolean;
    canAdd(node: HTMLElement, value: string): boolean;
    remove(node: HTMLElement): void;
    value(node: HTMLElement): string;
}
