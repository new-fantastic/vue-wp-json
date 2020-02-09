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
  } 

  const featuredMedia = response._embedded[`wp:${key.split('_').join('')}`]
  
  if (featuredMedia) {
    if (!Array.isArray(identifier)) {
      return featuredMedia.find(record => record.id === identifier)
    } else {
      return identifier.map(identifier => featuredMedia.find(record => record.id === identifier))
        .filter(v => !!v)
    }
  }

  // Try to find in wp:term
  const wpTerms = response._embedded['wp:term']
  if (wpTerms) {
    const matchingResults = []
    const containsIds = (id: Number): Boolean => {
      if (Array.isArray(identifier)) {
        return identifier.some(identifier => identifier === id)
      } else {
        return identifier === id
      }
    }

    for (let wpTerm of wpTerms) {

      const localMatches = wpTerm.filter(term =>
        term
        && term.taxonomy === key
        && containsIds(term.id)
      )

      if (localMatches && !!localMatches.length) {
        matchingResults.push(...localMatches)
      }

    }

    return matchingResults
  }
  
  throw new Error('Could not find corresponding field')
}