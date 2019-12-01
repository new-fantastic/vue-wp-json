# Usage

<br>

## Plain data

<br>

### Old way (wpData) - deprecated

<br>

If you want to fetch data. All you need to do that is append **wpData** mixin.

After that, fetched data will be available under **this** like data/computed value.

Example:

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

Learn more about wpData [here](/api/wpData/).

<br>

### New way (wordpress hook)

Inside Vue instance you should put *wordpress* option. It can be object, array or function.
Example use:
```js
{
  // ... somewhere in the Vue's instance
  wordpress: {
    slug () {
      return this.$store.params.slugToFetch
    }
  }
}
```

Wordpress option alows us to do much more! Learn more about it [here](/api/wordpress/).
If you have any ideas what could we improve. Tell us on the Slack (vuewordpressworkspace.slack.com) or Github Repo!

<br>

It is the new, better way which will be developed.

<br>

## Menus

<br>

Menus are fetched by default. We can limit it to fetching only certain menus or not fetching.
a) If we want to fetch each menu, do not do anything. They will be fetched
b) Only certain (inside config):

```js
menus: ["first-menu-slug", "other-menu"];
// or
menus: "my-menu";
```

c) Not fetching

```js
menus: false;
```

Each menu will be fetched from API and available at:

```js
this.$store.state.wp_menu.menu;
store.state.wp_menu.menu;
```

There will be object where key is a menu's slug and value is a data.


<br>
