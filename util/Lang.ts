import { Route } from 'vue-router'

// export const getLangByRoute = (route: Route): string => {
//   return config.storeViews.mapStoreUrlsFor.some(
//     el => route.name.includes(`${el}-`)
//   ) ? 'en' : 'pl'
// }

// export const getLangAndCmpName = (route: Route): Object => {
//   const lang = getLangByRoute(route)

//   return {
//     lang,
//     langComponentName: (route.name)
//       .replace(`${lang !== 'pl' 
//       ? rootStore.state.storeView.url.substr(1) + '-' 
//       : ''}`, '')
//   }
// }