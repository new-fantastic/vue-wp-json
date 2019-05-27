# Essentials

<br>

## What is extension?

<br>

Extension allows developers to change behaviour of certain things in core module. We have many hooks that provide a lot of posibilities.

<br>

## Base structure

<br>

When we are creating own extension - we should use Typescript. However, it is not obligatory. Example starter:

```ts
import { WPExtension } from '../vue-wp-json/plugin/extension'

const plugin: WPExtension = {
  // ...
}

export default plugin
```

What keys do we have inside?
```ts
interface WPExtension {
  blocks?: Block,
  layouts?: Layouts,
  middleware?: {
    api?: {
      [propName: string]: (value: any) => any
    },
    root?: {
      validator?: ValidatorFunc,
      interpret?: (value: any, chosenSection: String | Object, h: Function) => Array<any>
    },
    section?: {
      interpret?: (data: any) => { columns: Array<any>, anyFilledColumn: Boolean, columnAmount: Number }
    }
  }
}
```

We will deep in possible hooks more in further parts.