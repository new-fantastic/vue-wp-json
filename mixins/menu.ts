import camelCase from 'lodash/camelCase'

export default slug => {
  const menuSlug = camelCase(`menu-${slug}`)
  const menuSlugItems = `${menuSlug}Items`

  return {
    computed: {
      [menuSlug] () {
        return this.$store.state.wp_rest_content.menus[slug]
      },
      [menuSlugItems] () {
        return this[menuSlug].items
      }
    }
  }
}
