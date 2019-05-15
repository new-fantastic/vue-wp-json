import { VueConstructor } from 'vue';

interface ValidatorFunc {
  (value: any): boolean
}

interface Block {
  [propName: string]: Object
}

interface Layouts {
  Section?: Object,
  Page?: Object,
  Post?: Object
}

export interface WPExtension {
  validator?: ValidatorFunc
  blocks?: Block,
  layouts?: Layouts
}