import { getColumnAmount, layoutNameToCmpName, prepareColumnToRow } from '../../util/Layout'
import NumberToWord from '../../util/NumberToWord'
import Column from '../../components/Content/Column'

export default {
  name: 'Section',
  components: {
    Column
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      columns: [],
      columnAmount: null,
      success: null,
      sectionName: null,
      anyFilledColumn: false
    }
  },
  created () {
    try {
      this.columnAmount = getColumnAmount(this.data.acf_fc_layout)
      this.sectionName = `grid__${this.columnAmount}-col`
      const columns = this.data['section_content']

      for(let i = 1; i <= this.columnAmount; i++) {
        const prepared = prepareColumnToRow(columns['column_' + i], this.columnAmount)
        if(prepared === false) {
          this.columns.push(false)
        } else {
          this.columns.push(prepared)
          if(!this.anyFilledColumn) {
            this.anyFilledColumn = true
          }
        }
      }

      this.success = true
    } catch(e) {
      this.success = false
    }
  }
}