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
      }
    },
    render (h) {
      const createProperLink = item => {

        const toReturn = []

        if (IsLinkExternal(item.url)) {
          toReturn.push(h('a', {
            attrs: {
              target: '_blank',
              href: item.url
            }
          }, item.title))
        } else {
          toReturn.push(h('router-link', {
            props: {
              to: item.url
            }
          }, item.title))
        }

        if (item.description && item.description.length > 0) {
          toReturn.push(h('p', {
            domProps: {
              innerHTML: item.description
            }
          }))
        }

        return toReturn
      }

      const withSubitems = item => {

        const toReturn = []
        toReturn.push(...createProperLink(item))

        const classes = item.classes 
          ? Object.values(item.classes) 
          : ''

        if(item.child_items) {
          toReturn.push(h('ul', item.child_items.map(v => {
            return withSubitems(v)
          })))
        }
        return h('li', {
          key: item.ID,
          class: classes
        }, toReturn)
      }

      if(this.menu) {
        const menuItems = this.menu.items.map(v => ({
          ...v,
          isLinkExternal: IsLinkExternal(v.url)
        }))

        return h('ul', menuItems.map(v => {
          return withSubitems(v)
        }))
      }
      
    }
  }
</script>