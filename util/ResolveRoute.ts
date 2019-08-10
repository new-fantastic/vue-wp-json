export default (str: string, route: any): string => {

  let result = str
  if (str.indexOf('$route') === 0) {
    if(str === '$route') {
      return route
    }

    const parts = str.split('.').slice(1)
    let obj = route
    for (let part of parts) {
      obj = obj[part]
    }
    return obj
  }
  return result

}