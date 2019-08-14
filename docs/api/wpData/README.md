---
sidebarDepth: 2
---

# wpData

Mixin accepts two arguments - target and fetching mode.

```ts
wpData(
  target: string | LoaderRequestElement | Array<LoaderRequestElement | string>,
  fetchingMode: FetchHookTypes,
  setMeta: boolean
)
```

## target

### Type: String

The simplest possible value is just a **string**. Plugin will attempt to fetch data from /wp-json/wp/v2/pages?slug=**value**. Response object will be available in computed/data value called same as slug. Meta from the response will be attached to the page.

Example view's fragment:

```js
{
  mixins: [wpData('example')],
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
  slug: string;
  meta?: Boolean;
  dataName?: string;
  type?: Boolean;
}
```

**Slug (necessary)** - Page's slug in API. Here you can also use **$route object**. Just type, e.g. '$route.params.slug' as value. If you use route params on client side(FetchHookTypes.Created), you have to use **dataName**. Otherwise it is not necessary.

**Meta** - when we fetch data from few endpoints (described below) there you can set which meta would you like to apply. Set to true if you want to attach. If there will be few objects with meta: true, last one will be set. If you won't set any meta: true, first one will be set.
**dataName** - pointer's name to fetched data in Vue's instance, by default it is same as **slug**, however, you can change it if you want  
**type** - if it is set to **some_value**, data will be fetched from /wp-json/wp/v2/**some_value** not pages! Of course by default it would be fetched from /wp-json/wp/v2/pages

Example view's fragment:

```js
{
  mixins: [wpData({
    slug: 'sample-post-page',
    type: 'posts',
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
  mixins: [wpData([
    'contact',
    {
      slug: 'sample-post-page',
      type: 'posts',
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

## fetchingMode

### Created

It is default value. Data will be fetched inside Created lifecycle hook. Mostly used only in No-SSR VueJs projects.

### AsyncData

Data will be fetched inside **asyncData** lifecycle hook. It is created for Nuxt.js. Fetched data will be returned and transported to **data**.

### VoidAsyncData

Data will be fetched inside **asyncData** lifecycle hook. However, fetched data **won't be** returned. We will create special computed values for them. It is created for Vue Storefront.

## setMeta

Should mixin get meta data from fetched pages and set it in **head**?  
true or false


## Fetching each post of type

You can easily fetch post of any type by setting slug as empty string - "".
E.g.
```js
wpData({
  slug: '',
  type: 'alerts'
}, FetchHookTypes.Created)
```

If you would like to have get a **computed variable** pointing to received posts array, use:
```js
wpData({
  slug: '',
  type: 'alerts',
  dataName: 'myPointer'
}, FetchHookTypes.Created)
```

Then **this.myPointer** will be pointer to array of fetched posts.