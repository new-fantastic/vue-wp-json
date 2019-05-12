export const getColumnAmount = (data: string) => {
  const regex = /section_(\d+)_col/.exec(data)
  return  Number(regex[1])
}

export const layoutNameToCmpName = (layoutName: string): string => {
  return (layoutName.substr(0, 1).toUpperCase() + layoutName.substr(1))
    .replace('_section', '')
}

export const prepareColumnToRow = (base: any, columnAmount: Number): Object => {
  const sectionData = Array.isArray(base.column_content)
    ? base.column_content[0]
    : base.column_content

  if(!sectionData || !('acf_fc_layout' in sectionData)) {
    return false
  }

  sectionData.cmpName = layoutNameToCmpName(sectionData.acf_fc_layout)
  sectionData.columnAmount = columnAmount

  return sectionData
}