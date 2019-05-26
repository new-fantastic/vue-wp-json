import blocks from '../../components/blocks';
export default {
    props: {
        column: {
            type: Object,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        columnAmount: {
            type: Number,
            required: true
        }
    },
    components: blocks
};
//# sourceMappingURL=Column.js.map