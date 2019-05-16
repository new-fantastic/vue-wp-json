import { getColumnAmount, layoutNameToCmpName, prepareColumnToRow } from '../../util/Layout'
import Column from '../../components/Content/Column'
import NotFound from '../../components/Content/Blocks/NotFound'

export default {
  name: 'Section',
  components: {
    Column,
    NotFound
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
      if(this.$wp.sectionData && this.$wp.sectionData.length >= 1) {
        const customOptionsAmount = this.$wp.sectionData.length
        let counter = 0

        for(let filter of this.$wp.sectionData) {
          try {
            const val = filter(this.data)
            this.columns = val.columns
            this.anyFilledColumn = val.anyFilledColumn
            this.columnAmount = val.columnAmount
            
            break;
          } catch(e) {
            // console.log(e)
            counter++
          }
        }

        if(counter === customOptionsAmount) {
          this.columns.push(prepareColumnToRow(this.data))
          this.anyFilledColumn = true
          this.columnAmount = 1
        }
      } else {
        this.columns.push(prepareColumnToRow(this.data))
        this.anyFilledColumn = true
        this.columnAmount = 1
      }

      this.sectionName = `grid__${this.columnAmount}-col`

      this.success = true
    } catch(e) {
      console.log('err', e)
      this.success = false
    }
  }
}