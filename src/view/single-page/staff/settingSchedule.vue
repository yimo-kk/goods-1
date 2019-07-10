<template>
    <div class="table-wrapper">
        <avue-crud
            :data="records"
            :option="option"
            :page="page"
            @row-save="rowSave"
            @row-update="rowUpdate"
            @row-del="rowDel"
            @refresh-change="refresh"
        ></avue-crud>
    </div>
</template>
<script>
import { fetchArrageList, fetchAddArrage, fetchDelArrage } from "@/api/staff";
import common from "@/mixins/common";
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
            option: {
                index: true,
                indexLabel:'序号',
                page: true,
                align: "center",
                menuAlign: "center",
                menuWidth: 400,
                editBtn: false,
                column: [
                    {
                        label: "班次名称",
                        prop: "arrangeRemarks",
                        type: "select",
                        dicData: [
                            { label: "早班", value: "早班" },
                            { label: "中班", value: "中班" },
                            { label: "晚班", value: "晚班" }
                        ]
                    },
                    // {
                    //     label: "排班序号",
                    //     prop: "arrangeNum"
                    // },
                    // {
                    //     label: "userBusinessId",
                    //     prop: "userBusinessId"
                    // },
                    {
                        label: "上班时间",
                        prop: "startTime",
                        type: "time",
                        // format: "hh:mm:ss"
                    },
                    {
                        label: "下班时间",
                        prop: "endTime",
                        type: "time",
                        // format: "hh:mm:ss"
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        async getList() {
            let postData = {
                pageNum: 1,
                pageSize: 10
            };
            const res = await fetchArrageList(postData);
            if (res.data.result === "SUCCESS") {
                this.records = res.data.data.list;
                this.page.total = res.data.data.total;
            }
        },
        async rowSave(row, done) {
            let postData = {
                arrangeNum: 1,
                arrangeRemarks: row.arrangeRemarks,
                endTime: this.$moment(row.endTime).format("HH:mm:ss"),
                startTime: this.$moment(row.startTime).format("HH:mm:ss")
            };
            const res = await fetchAddArrage(postData);
            if (res.data.result === "SUCCESS") {
                this.getList();
            }
            this.$message({
                message: res.data.message,
                type: res.data.result === "SUCCESS" ? "success" : "error"
            });
            done();
        },
        rowUpdate() {},
        async _delObj(from) {
            return await fetchDelArrage(from.arrangeId);
        },
        rowDel(from, index) {
            if (from.arrangeId) {
                this.$confirm("此操作为永久删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    callback: async action => {
                        if (action == "confirm") {
                            const res = await this._delObj(from);
                            if (res.data.result === 'SUCCESS') {
                                this.records.every((item, index) => {
                                    if (item.arrangeId == from.arrangeId) {
                                        this.records.splice(index, 1);
                                        this.page.total--;
                                        this.$message({
                                            type: "success",
                                            message: "删除成功!"
                                        });
                                        return false;
                                    } else {
                                        return true;
                                    }
                                });
                            }
                        } else {
                            this.$message({
                                type: "info",
                                message: "已取消删除"
                            });
                        }
                    }
                });
            }
        },
        refresh() {}
    }
};
</script>
<style lang="less" scoped>
.table-wrapper {
    background-color: #fff;
    border-radius: 5px;
    padding: 0 10px;
}
</style>
