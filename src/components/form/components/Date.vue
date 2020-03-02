<template>
    <div>
        <el-date-picker v-model="ruleForm[formItem.key]"
            :type="dateType"
            value-format="timestamp"
            placeholder="选择日期"
            :style="dateStyle">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        ruleForm: Object,
        formItem: Object,
    },
    computed: {
        dateType () {
            return this.formItem.dateType ? this.formItem.dateType : 'date';
        },
        dateStyle () {
            return this.formItem.style ? this.formItem.style : '';
        },
    },
    data () {
        return {
        };
    },

    methods: {},
};
</script>

<style lang='scss'>
</style>
