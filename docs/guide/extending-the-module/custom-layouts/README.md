# Custom Layouts

<br>

## Post

<br>

### What does the custom view have to have included?

1. Mixin from ```@vue-wordpress/core/plugin/inheritable/Post``` that applies a Post 

2. Section component, e.g:
```vue
<Sections
  v-if="wpData"
  :data="wpData"
/>
```
3. Fallback if something goes wrong. For example:
```vue
<p
  v-else
>
  Not found
</p>
```

4. Adding meta post info would be great but it is not necessary
```vue
<div class="author">Author: </div>
<div class="date">Date: {{ wpData.date_gmt.replace('T', ' ') }}</div>
<div class="tags">Tags: 
  <span v-for="(tag, index) in wpData.tags.slice(0, -1)" :key="index">
    {{ tag }},&nbsp;
  </span>
  <span v-if="wpData.tags.length > 0">
    {{ wpData.tags[wpData.tags.length - 1] }}
  </span>
</div>
```

### What data does the mixin provide?

1. `<Sections>` component
2. Data value:

```
wpData - whole response from the API
```
3. Props value:

```
wpDataFallback - whole response from the API (used in Nuxt)
```

### What about meta tags?
Meta tags will be added automatically by Post mixin.

### How to register the new Post layout from the extension?

Add `layouts` key in your extension.

Inside of it, add a key "Post" with a value which will then be imported Vue view object, e.g:

```ts
import Post from './layouts/CustomPost.vue'

const plugin: WPExtension = {
  layouts: {
    Post: Post
  }
}
```

<br>

<br>

## Page

<br>

### What does the custom view have to have included?

1. Mixin from ```@vue-wordpress/core/plugin/inheritable/Page``` that applies a Page 

2. Sections component, e.g:
```vue
<Sections
  v-if="wpData"
  :data="wpData"
/>
```
3. Fallback if something goes wrong. By default we have:
```vue
<p
  v-else
>
  Not found
</p>
```

### What data does the mixin provide?

1. `<Sections>` component
2. Computed value:

```
wpData - whole response from the API
```

### What about meta tags?
Meta tags will be added automatically by Page mixin

### How to register new Page layout from the extension?

Add `layouts` key in your extension.

Inside of it, add a key "Page" with a value which will then be imported Vue view object, e.g:

```ts
import Page from './layouts/CustomPage.vue'

const plugin: WPExtension = {
  layouts: {
    Page: Page
  }
}
```

## Section

### What does the custom component have to have included?

1. Mixin from ```@vue-wordpress/core/plugin/inheritable/Section``` that applies a Section 

2. Column component, e.g:
```vue
<Column
  v-for="(column, index) in columns"
  :key="index"
  :column="column"
  :data="data"
  :index="index"
  :columnAmount="columnAmount"
/>
```
3. Fallback if something goes wrong. By default we have:
```vue
<NotFound v-else-if="success === false"/>
```

The `success` response is based on 3 possible values:

```
true - if everything goes well   
false - if something goes wrong   
null - occurs until we don't recognize a situation
```

### What data does the mixin provide?

1. `<Column>` component
2. Data values:

```
columnAmount - the number of columns in a row
columns[] - an array of columns with all data
success - explained above
sectionName - Hajime class applied to section by default
anyFilledColumn - Whether there are any filled column (true) or it is a totally empty section (false)
```

### How to register new Section layout from the extension?

Add `layouts` key in your extension.

Inside of it, add a key "Section" with a value which will then be imported Vue component object, e.g:

```ts
import Example from './layouts/Example.vue'

const plugin: WPExtension = {
  layouts: {
    Section: Example
  }
}
```

## Column

### What does the custom column have to have included?

1. Mixin from ```@vue-wordpress/core/plugin/inheritable/Column``` that applies a Column 

2. Dynamic component, e.g:
```vue
<component
  :is="column.cmpName"
  v-if="column !== false"
  :data="column"
/>
```
3. Fallback if something goes wrong. By default we have:
```vue
<div 
  v-else
  class='empty-column'
/>
```

### What data does the mixin provide?

Props values:

```
column - separated column's data
data - whole parent's data object
index - order in a row (which counted from left and 1)
columnAmount - how many columns does parent have
```

### How to register new Column component from the extension?

Add `layouts` key in your extension.

Inside of it, add a key "Post" with a value which will then be imported Vue view object, e.g:

```ts
import Column from './layouts/CustomColumn.vue'

const plugin: WPExtension = {
  layouts: {
    Column: Column
  }
}
```
