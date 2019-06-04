# Modifying endpoints

There is a possibility as a developer you might want change path to endpoints. For example while writing the multilang extension. You can do it by Middleware.

Middleware is the key in your extension's file. Inside of it, you should precise which part of plugin you will modify. For our target, we will use key **api**.

So the base structure of Extension ready to apply some filters looks like:
```ts
import { WPExtension } from '@vue-wordpress/core/plugin/extension'

const plugin: WPExtension = {
  middleware: {
    api: { }
  }
}
```

Inside the **api** key, you can hook up with any API module and change endpoint's path. Currently, we have 5 possible options.
```
media
menu
meta
page
post
```

You should attach function with one argument as a value. Value is an instance of our class UrlCreator. It provides you a few methods to smoothly managing paths. List of methods:
```
addAfterBase(value) - adds value after the cms' URL
addAtTheEnd(value) - adds value at the end of the URL
removeFromTheEnd() - removes inserted object which stays at the end
```

**Adding methods** take care about add slash at the start of the Part and delete it from the End.

Example of extension which adds /en/ prefix in page/post requests.
```ts
import { WPExtension } from '@vue-wordpress/core/plugin/extension'

const plugin: WPExtension = {
  middleware: {
    api: {
      page (value) {
        return value.addAfterBase('en')
      },
  
      post (value) {
        return value.addAfterBase('en')
      }
    }
  }
}
```
