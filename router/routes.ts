const lazyStaticPage = () => import('../pages/Page.vue')
const lazyStaticPost = () => import('../pages/Post.vue')

interface PartialRoute {
  name: string
  path: string
  component: Promise<Object>
}

const pagePrefix = 'page'
const postPrefix = 'post'

export const routes = [
  { name: pagePrefix, path: `/${pagePrefix}/:slug`, component: lazyStaticPage },
  { name: postPrefix, path: `/${postPrefix}/:slug`, component: lazyStaticPost }
]