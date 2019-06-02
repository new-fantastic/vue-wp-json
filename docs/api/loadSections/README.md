---
sidebarDepth: 2
---

# loadSections
Mixin accepts two arguments - target and fetching mode.
```ts
loadSections(
  target: string | LoaderRequestElement | Array<LoaderRequestElement | string>, 
  fetchingMode: FetchHookTypes
)
```

## target
### Type: String
The simplest possible value is just a **string**. Plugin will attempt to fetch data from /wp-json/wp/v2/pages?slug=**value**. Response object will be available in computed/data value called same as slug. Meta from the response will be attached to the page.

Example view's fragment:

```js
{
  mixins: [loadSections('example')],
  mounted () {
    // There we have access to response!
    console.log(this.example)
  }
}
```

### Type: Object
Your slug can contain chars like '-' or maybe you would want to change pointer's name to response object. That's why we support Object. There you have few possibilities. Object should fulfill contract with **LoaderRequestElement** interface:
```ts
interface LoaderRequestElement {
  slug: string
  meta?: Boolean,
  dataName?: string,
  post?: Boolean
}
```

**Slug (necessary)** - Page's slug in API   
**Meta** - when we fetch data from few endpoints (described below) there you can set which meta would you like to apply. Set to true if you want to attach. If there will be few objects with meta: true, last one will be set. If you won't set any meta: true, first one will be set.
**dataName** - pointer's name to fetched data in Vue's instance, by default it is same as **slug**, however, you can change it if you want   
**post** - if it is **true**, data will be fetched from /wp-json/wp/v2/**posts** not pages!   


Example view's fragment:

```js
{
  mixins: [loadSections({
    slug: 'sample-post-page',
    post: true,
    dataName: 'example'
  })],
  mounted () {
    // There we have access to 'sample-post-page' response!
    console.log(this.example)
  }
}
```

### Type: Array
There is possibility you want fetch data from few endpoints. For that, you can use an array. Inside you can provide **strings** and **objects** in shape described higher.
Example view's fragment:

```js
{
  mixins: [loadSections([
    'contact',
    {
      slug: 'sample-post-page',
      post: true,
      dataName: 'example'
    },
    {
      slug: 'faq',
      meta: true
    }
  ])],
  mounted () {
    // There we have access to each response!
    console.log(this.example, this.contact, this.faq)
  }
}
```
