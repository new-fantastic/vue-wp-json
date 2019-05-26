export declare class UrlCreator {
    base: string;
    parts: string[];
    constructor(base: any, parts: any);
    baseUrl: any;
    readonly url: string;
    addAfterBase(value: any): void;
    addAtTheEnd(value: any): void;
    removeFromTheEnd(): void;
    private withSlash;
}
