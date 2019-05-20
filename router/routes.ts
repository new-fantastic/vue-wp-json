const staticPagePath = '../pages/Page.vue'
const staticPostPath = '../pages/Post.vue'

const lazyStaticPage = () => import(staticPagePath)
const lazyStaticPost = () => import(staticPostPath)

interface PartialRoute {
  name: string
  path: string
  component: Promise<Object>
}

export const pagePrefix = 'page'
export const postPrefix = 'post'

export const routes = (pageCmp, postCmp, cmpAsPath = false) => {
  if(!cmpAsPath) {
    return [
      { name: pagePrefix, path: `/${pagePrefix}/:slug`, component: pageCmp ? pageCmp : lazyStaticPage},
      { name: postPrefix, path: `/${postPrefix}/:slug`, component: postCmp ? postCmp : lazyStaticPost}
    ]
  }

  return [
    { name: pagePrefix, path: `/${pagePrefix}/:slug`, component: pageCmp ? pageCmp : staticPagePath},
    { name: postPrefix, path: `/${postPrefix}/:slug`, component: postCmp ? postCmp : staticPostPath}
  ]
}