import config from 'config'

const lazyStaticPage = () => import('../pages/Page.vue')
const lazyStaticPost = () => import('../pages/Post.vue')

interface PartialRoute {
  name: string
  path: string
  component: Promise<Object>
}

// const pagePrefix = config.wordpressCms.staticPagePrefix 
//   ? config.wordpressCms.staticPagePrefix 
//   : 'info'
const pagePrefix = 'page'
const postPrefix = 'post'

// const pageName = config.wordpressCms.staticPageName 
//   ? config.wordpressCms.staticPageName 
//   : 'info'

export const routes = [
  { name: pagePrefix, path: `/${pagePrefix}/:slug`, component: lazyStaticPage },
  { name: postPrefix, path: `/${postPrefix}/:slug`, component: lazyStaticPost }
]
