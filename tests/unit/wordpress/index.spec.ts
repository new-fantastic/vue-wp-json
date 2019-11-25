import Wordpress from '../../../mixins/wordpress'

describe('Wordpress\' Mixin', () => {

  it ('does nothing if wordpress option not applied', () => {
    expect(Wordpress.beforeMount()).toBeUndefined()
  })

})