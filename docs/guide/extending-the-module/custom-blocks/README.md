# Custom blocks

There are few basics blocks which we use to build our pages. However, we can create own parts and inject them into plugin! In our extension, we have a special key - "blocks". There we can register components in a way:
```"ComponentName": ImportedComponentObject```

Unfortunately, for now, those components are registered globally. 

Example of extension that registers custom block.
```ts
import Example from './block/Example.vue'

const plugin: WPExtension = {
  blocks: {
    'Example': Example
  }
}
```

<br>
