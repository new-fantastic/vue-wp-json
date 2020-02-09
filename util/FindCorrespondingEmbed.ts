export default (response: any, key: string): any => {
  const identifier = response[key]
  if (!response._embedded) {
    throw new Error('No embedded data in response')
  }

  if (response._embedded[key]) {
    if (!Array.isArray(identifier)) {
      return response._embedded[key].find(record => record.id === identifier)
    } else {
      return identifier.map(identifier => response._embedded[key].find(record => record.id === identifier))
        .filter(v => !!v)
    }
  } else {
    // try to find wp:
  }
  return response
}