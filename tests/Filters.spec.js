import { getColumnAmountAndPrefix } from '../util/Filters.ts'
import { prepareColumnToRow, layoutNameToCmpName } from '../util/Filters'
const expect = require('chai').expect;

describe('Filters', () => {

    it('it gets column amount and prefix from given data', () => {
        const dataMock = {
            "acf_fc_layout": null,
            "wp_3_col_layout_content": []
        }

        expect(getColumnAmountAndPrefix(dataMock)).to.deep.equal({
            columns: 3,
            prefix: 'wp_3_col_layout_'
        })
    })

    it('it prepares column to be pushed to row', () => {
        const dataMock = {
            "acf_fc_layout": "wp_wysiwyg",
            "wp_wysiwyg_editor": "<h2 style=\"text-align: center;\">Halko</h2><p style=\"text-align: center;\">Siiii</p>"
        }
        expect(prepareColumnToRow(dataMock, 2)).to.deep.equal({
            ...dataMock,
            columnAmount: 2,
            cmpName: layoutNameToCmpName(dataMock.acf_fc_layout)
        })
    })
})