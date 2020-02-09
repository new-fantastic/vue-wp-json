import FindCorrespondingEmbed from '../../../util/FindCorrespondingEmbed'

describe('FindCorrespondingEmbed', () => {

  it('finds "author" properly', () => {
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

    const PostWithAuthorId = (author: Number) => ({
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
  })

})