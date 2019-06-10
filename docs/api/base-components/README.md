---
sidebarDepth: 2
---

# Base components
There are a few Base components which we created for developers to make process of rendering data easier.

## BaseMenu
It renders the simplest possible ul > li > a/router-link structure, based on provided slug.

Where is it?:
```
@vue-wordpress/core/components/Base/BaseMenu.vue
```

Description of props:
```
slug: String - slug of menu to display (should be also provided inside of config)
showDescription: Boolean - should it display paragraphs with description? (p)
```

Component will automaticly choose if link is external/internal and by that create **a** or **router-link**. Menu can contain any depth level. However, original Wordpress Rest Menu plugin supports only **one depth level**. We will share our forked version soon.

## BaseMedia
There we can show any fetched media by ID. Currently, it supports videos and images.

Where is it?:
```
@vue-wordpress/core/components/Base/BaseMedia.vue
```

Description of props:
```
id: Number : index of medium
```

Component will automaticly recognize whether it is Video or Image and load proper component (BaseVideo/BaseImage).

Feel free to use listeners and attributes on BaseMedia.
