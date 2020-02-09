import FindCorrespondingEmbed from '../../../util/FindCorrespondingEmbed'

describe('FindCorrespondingEmbed', () => {

  it('finds "author" or a few ones properly', () => {
    const post = {
      _embedded: {
        author: [
          {
            id: 5,
            name: 'fifciuu'
          },
          {
            id: 4,
            name: 'undefined'
          },
          {
            id: 3,
            name: 'defined'
          }
        ]
      }
    }

    const PostWithAuthorId = (author: Number | Array<Number>) => ({
      ...post,
      author
    })

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithAuthorId(5),
          'author'
        )
      )
    ).toBe(JSON.stringify(post._embedded.author[0]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithAuthorId(4),
          'author'
        )
      )
    ).toBe(JSON.stringify(post._embedded.author[1]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithAuthorId(3),
          'author'
        )
      )
    ).toBe(JSON.stringify(post._embedded.author[2]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithAuthorId([3, 4]),
          'author'
        )
      )
    ).toBe(JSON.stringify([
      post._embedded.author[2],
      post._embedded.author[1]
    ]))
  })

  it('finds "featured_media" or a few ones properly', () => {
    const post = {
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 5,
            name: 'fifciuu'
          },
          {
            id: 4,
            name: 'undefined'
          },
          {
            id: 3,
            name: 'defined'
          }
        ]
      }
    }

    const PostWithFeaturedImageId = (featured_media: Number | Array<Number>) => ({
      ...post,
      featured_media
    })

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithFeaturedImageId(5),
          'featured_media'
        )
      )
    ).toBe(JSON.stringify(post._embedded[`wp:featuredmedia`][0]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithFeaturedImageId(4),
          'featured_media'
        )
      )
    ).toBe(JSON.stringify(post._embedded[`wp:featuredmedia`][1]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithFeaturedImageId(3),
          'featured_media'
        )
      )
    ).toBe(JSON.stringify(post._embedded[`wp:featuredmedia`][2]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithFeaturedImageId([3, 4]),
          'featured_media'
        )
      )
    ).toBe(JSON.stringify([
      post._embedded[`wp:featuredmedia`][2],
      post._embedded[`wp:featuredmedia`][1]
    ]))
  })

  it('finds "category" or a few ones properly', () => {
    const post = {
      _embedded: {
        'wp:term': [
          [
            {
              id: 5,
              name: 'fifciuu',
              taxonomy: 'category'
            },
            {
              id: 4,
              name: 'undefined',
              taxonomy: 'category'
            },
            {
              id: 3,
              name: 'defined',
              taxonomy: 'category'
            }
          ],
          [
            {
              id: 9,
              name: 'fifciuu',
              taxonomy: 'category'
            },
            {
              id: 10,
              name: 'undefined',
              taxonomy: 'category'
            },
            {
              id: 11,
              name: 'defined',
              taxonomy: 'category'
            }
          ]
        ]
      }
    }

    const PostWithCategoryId = (category: Number | Array<Number>) => ({
      ...post,
      category
    })

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithCategoryId(5),
          'category'
        )
      )
    ).toBe(JSON.stringify([post._embedded[`wp:term`][0][0]]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithCategoryId(4),
          'category'
        )
      )
    ).toBe(JSON.stringify([post._embedded[`wp:term`][0][1]]))

    expect(
      JSON.stringify(
        FindCorrespondingEmbed(
          PostWithCategoryId(3),
          'category'
        )
      )
    ).toBe(JSON.stringify([post._embedded[`wp:term`][0][2]]))

    expect(FindCorrespondingEmbed(
      PostWithCategoryId([4, 3]),
      'category'
    ).sort((a, b) => a.id - b.id)).toMatchObject([
      post._embedded[`wp:term`][0][2],
      post._embedded[`wp:term`][0][1]
    ].sort((a, b) => a.id - b.id))
  })

})