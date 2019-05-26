export declare const pagePrefix = "page";
export declare const postPrefix = "post";
export declare const routes: (path?: boolean) => {
    name: string;
    path: string;
    component: () => Promise<any>;
}[] | {
    name: string;
    path: string;
    component: string;
}[];
