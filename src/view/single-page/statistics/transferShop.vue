<template>
    <div class="table-wrapper">
        <avue-crud
            :data="records"
            :option="option"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @current-change="currentChange"
            @search-change="searchChange"
            @search-reset = "searchReset"
            :page="page">
            <template slot="search">
                <el-form-item >
                     <el-row>
                        <el-button size="small" @click="selectTime(item)" v-for="item in timeList"  :type="(timeId===item.type) ? 'primary' : ''" :key="item.id">{{item.name}}</el-button>
                    </el-row>
                </el-form-item>
            </template>
      </avue-crud>
    </div>
</template>
<script>
import { fetchSubletCount } from '@/api/statistics'
import common from '@/mixins/common'
export default {
    mixins: [common()],
    data() {
        return {
            records: [],
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            searchParams: {
                endTime: "",
                startTime: "",
                time: 0
            },
            timeList: [
                {
                    type: 1,
                    name: '本周'
                },
                {
                    type: 2,
                    name: '上周'
                },
                {
                    type: 3,
                    name: '本月'
                },
                {
                    type: 4,
                    name: '上月'
                },
            ],
            timeId: 0,
            option: {
                index: true,
                indexLabel: '序号',
                align: 'center',
                menuAlign: 'center',
                editBtn: false,
                delBtn: false,
                addBtn: false,
                stripe: true,
                labelWidth: '150px',
                menu: false,
                border: true,
                column: [
                    {
                        label: '转店名称',
                        prop: 'title',
                    },
                    {
                        label: '浏览量',
                        prop: 'collectionCount'
                    },
                     {
                        label: "开始时间",
                        prop: "startTime",
                        type: "datetime",
                        format: "yyyy-MM-dd hh:mm:ss",
                        search: true,
                        hide: true,
                    },
                    {
                        label: "结束时间",
                        prop: "endTime",
                        type: "datetime",
                        format: "yyyy-MM-dd hh:mm:ss",
                        search: true,
                        hide: true,
                    }
                ]
            }
        }
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
           let postData = {
                endTime: this.searchParams.endTime,
                pageNum: this.page.currentPage,
                pageSize: this.page.pageSize,
                sort: "",
                startTime: this.searchParams.startTime,
                time: this.searchParams.time ? this.searchParams.time : 0
            }
            const res = await fetchSubletCount(postData);
            if(res.data.result === 'SUCCESS'){
                this.records = res.data.data.list;
                this.page.total = res.data.data.total;
            }
        },
        selectTime(item){
            this.searchParams.time = item.type;
            this.timeId = item.type;
        },
        searchReset(){ //重置搜索条件
            this.searchParams = {
                endTime: "",
                startTime: "",
                time: 0
            }
            this.timeId = 0;
        }
    }
}
</script>
<style lang="less" scoped>

</style>

