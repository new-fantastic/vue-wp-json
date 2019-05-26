declare const _default: {
    watch: {
        $route(to: any): Promise<void>;
    };
    created(): Promise<void>;
    asyncData({ store, route, redirect }: {
        store: any;
        route: any;
        redirect: any;
    }): Promise<{
        wpData: any;
    }>;
};
export default _default;
