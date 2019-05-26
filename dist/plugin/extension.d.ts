export interface ValidatorFunc {
    (value: any): boolean;
}
export interface Block {
    [propName: string]: Object;
}
export interface Layouts {
    Section?: Object;
    Column?: Object;
    Page?: Object;
    Post?: Object;
}
export interface WPExtension {
    blocks?: Block;
    layouts?: Layouts;
    middleware?: {
        api?: {
            [propName: string]: (value: any) => any;
        };
        root?: {
            validator?: ValidatorFunc;
            interpret?: (value: any, chosenSection: String | Object, h: Function) => Array<any>;
        };
        section?: {
            interpret?: (data: any) => {
                columns: Array<any>;
                anyFilledColumn: Boolean;
                columnAmount: Number;
            };
        };
    };
}
