export const prepareColumnToRow = (base: any): Object => {
  if(!base.content || !('rendered' in base.content)) {
    return false
  }

  base.cmpName = 'Default'
  base.columnAmount = 1

  return base
}

