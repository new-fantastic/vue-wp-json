---
sidebarDepth: 2
---

# wordpress

Wordpress option should be **WordpressOption**, **Array\<WordpressOption\>** or function that returns one of them. WordpressOption is the interface which looks like that:
```ts
export interface WordpressOption {
  slug: string | (() => string),
  type?: string,
  fields?: string | Array<string>,
  embed?: Boolean,
  beforeSave?: (fetchedData: any) => any,
  beforeRequest?: (url: string) => string,
  beforeSaveFailed?: () => any
}
```

## Attribute: slug

### Type: String or Function that returns String
#### Context: Inside function you have access to component's **this**

It is slug which will be fetched from Wordpress. If you would set value to the `apple`, it would send request to the:
`https:///yourwordpress.com/wp-json/wp/v2/pages?slug=apple`

Example use case as **String**:
```js
wordpress: {
  slug: 'apple'
}
```

Example use case as **Function that returns String**:
```js
wordpress: {
  slug () {
    return this.$route.params.slugToFetch
  }
}

```
## Attribute: type

### Type: String
#### Default value: pages

It is type of post which will be fetched from Wordpress. If you would set value to the `custom_type`, it would send request to the:
`https:///yourwordpress.com/wp-json/wp/v2/custom_type?slug=<your_slug>`

Example use case as **String**:
```js
wordpress: {
  slug: 'apple',
  type: 'custom_type'
}
```
## Attribute: fields

### Type: Array&lt;String&gt; | String
#### Default value: []

It is array of fields which will be fetched from endpoint. For real it will be attached to the URI as query params, e.g. for value: `['id', 'acf']` it will attach:   
`https:///yourwordpress.com/wp-json/wp/v2/custom_type?slug=<your_slug>&_fields[]=id&_fields[]=acf&_fields[]=slug`

As you could see, there is also `slug` but you did not provide it. It is necessary because VueWp will save it in the vuex under key=slug

Example use case as **String**:
```js
wordpress: {
  slug: 'apple',
  fields: 'acf'
}
``` 
Example use case as **Array&lt;String&gt;**:
```js
wordpress: {
  slug: 'apple',
  fields: ['acf', 'id']
}
```
## Attribute: embed

### Type: Boolean
#### Default value: false

Whether add *&_embed* at the end or not
`https:///yourwordpress.com/wp-json/wp/v2/custom_type?slug=<your_slug>&_embed`

Example use case:
```js
wordpress: {
  slug: 'apple',
  embed: true
}
```
## Attribute: beforeSave

### Type: Function
#### Argument: fetchedData: any
#### Returns: fetchedData: any
#### Context: There you do not have access to this

This hook will be executed before save fetched data to the Vuex. You have access to the stored data here in first argument. That's what you return will be saved in the Vuex

What's the real purpose of that hook?
You can get rid of unnecessary Wordpress' API fields so they would not slow down user's device.

Example use case:
```js
wordpress: {
  slug: 'apple',
  beforeSave (fetchedData) {
    return {
      title: fetchedData.title,
      content: fetchedData.content.rendered,
      excerpt: fetchedData.excerpt.rendered,
    }
  } 
}
```
## Attribute: beforeRequest

### Type: Function
#### Argument: url: string
#### Returns: url: string
#### Context: There you do not have access to this

This hook will be executed before sending request to the Vuex. You have access to the URL here in the first argument. That's what you return will be target of XHR Request.

What's the real purpose of that hook?
You can easily change target URL based on any things (e.g. for multilang).

Example use case:
```js
wordpress: {
  slug: 'apple',
  beforeSave (fetchedData) {
    return {
      title: fetchedData.title,
      content: fetchedData.content.rendered,
      excerpt: fetchedData.excerpt.rendered,
    }
  } 
}
```
## Attribute: beforeSaveFailed

### Type: Function
#### Returns: data: any
#### Context: There you do not have access to this

This hook will be executed when client tried to fatched data but it thrown an error. There you could return some placeholder data. So the user will receive any informations. That what's you return will be stored in the Vuex

What's the real purpose of that hook?
Predefined contect if something goes wrong.

Example use case:
```js
wordpress: {
  slug: 'apple',
  async beforeSaveFailed () {
    const predefinedHtmlTemplate = await import('myTemplate.json')

    return predefinedHtmlTemplate
  } 
}
```

## How to access fetched data?

Inside computed/data add a proper pointer do the data:

```js
{
  // ...
  computed: {
    apple () {
      return this.$store.state.wp_post.types.posts.apple
    }
  }
}
```

## Tips
1. Each function can be **async**
2. You can access component's this inside other than slug hooks with that trick:
```js
{
  data () {
    return {
      currentLanguage: 'es'
    }
  },

  wordpress () {
    const self = this
    return {
      slug: 'apple',
      beforeRequest (url) {
        const apiUrl = self.$store.state.wp_config.url

        return apiUrl.endsWith('/')
          ? apiUrl + self.currentLanguage + '/'
          : `${apiUrl}/${self.currentLanguage}/`
      }
    }
  }
}
```
3. Wordpress option could be array, so pages would be fetched in paralell:
```js
{
  wordpress: [
    {
      slug: 'apple'
    },
    {
      slug: 'orange'
    }
  ]
}
```
Or as function:
```js
{
  wordpress () {
    return [
      {
        slug: 'apple'
      },
      {
        slug: 'orange'
      }
    ]
  }
}
```