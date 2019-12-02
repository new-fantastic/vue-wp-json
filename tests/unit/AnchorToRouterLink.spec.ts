import AnchorToRouterLink from '../../util/AnchorToRouterLink'

describe('AnchorToRouterLink', () => {

  it ('properly changes', () => {
    const tests = [
      { 
        from: '<a href="abc">Hey</a>',
        to: '<router-link to="abc">Hey</router-link>'
      },
      { 
        from: '<div><a href="abc">Hey</a><a href=\'http://sdasdas.com/dsfdf\'>Hey</a></div>',
        to: '<div><router-link to="abc">Hey</router-link><router-link to=\'http://sdasdas.com/dsfdf\'>Hey</router-link></div>'
      },
      { 
        from: '<a title="" class="parent bigMenuBtn" href="/en/b2b-catalogue/home-accessories/">Accessories<img class="menuArrowDown" src="/images/icon/arrowFaceDownMenun.jpg"></a>',
        to: '<router-link title="" class="parent bigMenuBtn" to="/en/b2b-catalogue/home-accessories/">Accessories<img class="menuArrowDown" src="/images/icon/arrowFaceDownMenun.jpg"></router-link>'
      }
    ]

    for (let test of tests) {
      expect(AnchorToRouterLink(test.from)).toBe(test.to)
    }
  })

})