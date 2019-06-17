# Features

<br>

- Building static pages on Wordpress, so you do not have to be in programming to build amazing views that will be used on **dynamic** websites (SPA)
- Support SSR in Nuxt.js App (Vue SSR comming soon)
- Automaticly creates Page/Post routes under /page/* and /post/* (you can disable it)
- Flexible - we can modify almost everything by providing Extension (ACF, qTranslate, Yoast)
- If you wish to have more unique styling on Page, you can build it with Vue and just place there certain VueWpJson's component which will inject Wordpress Data. Fetching data process can be resolved by importing only one mixin, and provide additional key in Config.
- You can use data from few endpoints on one page with **wpData** mixin
- Autoattaching meta data to page (you can choose the source)
- Fallback to default Wordpress meta if page does not have any
- Having data about default website's meta, media and menus in Vuex store
- PWA support, pages created with this module works offline (if visited), both in Vue and Nuxt App
- Using App only for PWA purposes and fetching data. You can omit our special Render component
<br>
