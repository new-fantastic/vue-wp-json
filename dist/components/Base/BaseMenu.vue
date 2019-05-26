<script>
  import IsLinkExternal from '../../util/IsLinkExternal'
  import { ModulePrefix } from '../../index'

  export default {
    name: 'Menu',
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    computed: {
      menu () {
        return this.$store.state[`${ModulePrefix}_menu`].menu[this.slug]
      },
      menuItems () {
        return this.menu.items.map(v => ({
          ...v,
          isLinkExternal: IsLinkExternal(v.url)
        }))
      }
    },
    render (h) {
      const createProperLink = item => {
        if(IsLinkExternal(item.url)) {
          return h('a', {
            attrs: {
              target: '_blank',
              href: item.url
            }
          }, item.title)
        } else {
          return h('router-link', {
            props: {
              to: item.url
            }
          }, item.title)
        }
      }

      const withSubitems = item => {
        const toReturn = []
        toReturn.push(createProperLink(item))
        if(item.child_items) {
          toReturn.push(h('ul', item.child_items.map(v => {
            return withSubitems(v)
          })))
        }
        return h('li', {
          key: item.ID
        }, toReturn)
      }

      return h('ul', this.menuItems.map(v => {
        return withSubitems(v)
      }))
    }
  }
</script>