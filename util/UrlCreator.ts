export class UrlCreator {
  base : string;
  parts : string[];

  constructor (base, parts) {
    if(base) {
      this.base = base
    }
    if(parts && Array.isArray(parts)) {
      this.parts = parts
    }
  }

  set baseUrl (value) {
    this.base = this.withSlash(value)
  }

  get url () {
    if(this.parts.length >= 1 && this.parts[0].substr(0, 1) === '/' && this.base.substr(-1) === '/') {
      return this.base.substr(0, this.base.length - 1) + this.parts.join('')
    }

    return this.base + this.parts.join('')
  }

  public addAfterBase (value) {
    this.parts.unshift(this.withSlash(value))
  }

  public addAtTheEnd (value) {
    this.parts.push(this.withSlash(value))
  }

  public removeFromTheEnd () {
    this.parts = this.parts.slice(0, this.parts.length - 1)
  }

  private withSlash(value) {
    let tmp = value
    if(value.substr(-1) === '/') {
      tmp = value.substr(0, value.length - 1)
    }
    if(value.substr(0, 1) !== '/') {
      tmp = '/' + tmp
    }
    
    return tmp
  }
}