<template>
    <div class="table-wrapper">
        <avue-data-box :option="option"></avue-data-box>
    </div>
</template>
<script>
import {fetchConcernCount, fetchResumeCount} from '@/api/statistics'
export default {
    data() {
        return {
            form: {},
            option: {
                data: [
                    {
                        title: "浏览量",
                        count: 0,
                        icon: "icon-shujuzhanshi2",
                        color: 'rgb(49, 180, 141)',
                        target: "_blank"
                    },
                    {
                        title: "已投递简历统计",
                        count: 33,
                        // icon: "icon-shujuzhanshi2",
                        color: "rgb(56, 161, 242)",
                        target: "_blank"
                    },
                ]
            }
        };
    },
    created() {
        this.getConcernCount();
        this.getResumeCount();
    },
    methods: {
        async getConcernCount() {
            const res = await fetchConcernCount();
            if(res.data.result === 'SUCCESS'){
                this.option.data[0].count = res.data.data ? res.data.data : 0;
            }
        },
        async getResumeCount () {
            const res = await fetchResumeCount();
            if(res.data.result === 'SUCCESS') {
                this.option.data[1].count = res.data.data ? res.data.data : 0;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.table-wrapper{
    padding: 20px 10px;
    min-height: 100vh;
}
</style>

