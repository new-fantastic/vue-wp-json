export default (link: string): Boolean => {
  // External rules
  // Starts with http/https
  // Starts with //*.\.*.
  return link.indexOf('http') === 0 //|| /\/\/*.\.*./.test(link)
}