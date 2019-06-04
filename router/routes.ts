const lazyLoader = () => import('../pages/Loader.vue')
const loaderPath = '../pages/Loader.vue'

export const pagePrefix = 'page'
export const postPrefix = 'post'

export const routes = (path = false) => {
  if (!path) {
    return [
      { name: pagePrefix, path: `/${pagePrefix}/:slug`, component: lazyLoader },
      { name: postPrefix, path: `/${postPrefix}/:slug`, component: lazyLoader }
    ]
  } else {
    return [
      { name: pagePrefix, path: `/${pagePrefix}/:slug`, component: loaderPath },
      { name: postPrefix, path: `/${postPrefix}/:slug`, component: loaderPath }
    ]
  }
}