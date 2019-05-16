import { VueConstructor } from 'vue';

interface ValidatorFunc {
  (value: any): boolean
}

interface Block {
  [propName: string]: Object
}

interface Layouts {
  Section?: Object,
  Column?: Object,
  Page?: Object,
  Post?: Object
}

export interface WPExtension {
  validator?: ValidatorFunc,
  renderRoot?: (value: any, chosenSection: String | Object, h: Function) => Array<any>,
  sectionData: (data: any) => { columns: Array<any>, anyFilledColumn: Boolean, columnAmount: Number },
  blocks?: Block,
  layouts?: Layouts,
  filters?: {
    api: {
      [propName: string]: (value: any) => any
    }
  }
}