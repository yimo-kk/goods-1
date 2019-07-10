<template>
    <div class="table-wrapper">
        <avue-crud
            :data="records"
            :option="option"
            :page="page"
            @refresh-change="refreshChange"
            @row-del="rowDel"
            @size-change="sizeChange"
            @search-change="searchChange"
            @current-change="currentChange"
            @row-save="rowSave" ></avue-crud>
    </div>
</template>

<script>
import { fetchStaffList, fetchAddStaff, fetchDelStaff, fetchSearchStaff } from '@/api/staff'
export default {
  data () {
    return {
      records: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {
        phone: ''
      },
      option: {
        // title: "表格的标题",
        page: true,
        indexLabel: '序号',
        align: 'center',
        menuAlign: 'center',
        editBtn: false,
        column: [
          {
            label: '员工名称',
            prop: 'clerkName'
          },
          {
            label: '手机号码',
            prop: 'phone',
            search: true
          },
          {
            label: '日期',
            prop: 'createTime',
            type: 'date',
            format: 'yyyy-MM-dd hh:mm:ss',
            addVisdiplay: false,
            editVisdiplay: false
          }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let postData = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      const res = await fetchStaffList(postData)
      if (res.data.result == 'SUCCESS') {
        this.records = res.data.data.list
        this.page.total = res.data.data.total
      }
    },
    async searchStaff ({ phone }) {
      const res = await fetchSearchStaff(phone)
      if (res.data.result == 'SUCCESS') {
        this.records = res.data.data.list
        this.page.total = res.data.data.total
      }
    },
    searchChange (params) {
      this.searchParams = params
      this.searchStaff(this.searchParams)
    },
    async rowSave (row, done, loading) {
      let postData = {
        clerkName: row.clerkName,
        phone: row.phone
      }
      const res = await fetchAddStaff(postData)
      if (res.data.result == 'SUCCESS') {
        this.$message({
          message: '添加成功！',
          type: 'success'
        })
        this.getList()
        done()
      }
    },
    rowDel (from, index) {
      if (from.clerkId) {
        this.$confirm('此操作为永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: async action => {
            if (action == 'confirm') {
              const res = await fetchDelStaff(from.clerkId)
              if (res.data.result == 'SUCCESS') {
                this.getList()
                this.$message({
                  type: 'success',
                  message: res.data.message
                })
                this.records.every((item, index) => {
                  if (item.clerkId == from.clerkId) {
                    this.records.splice(index, 1)
                    this.page.total--
                    this.$message({
                      type: 'success',
                      message: res.data.message
                    })
                    return false
                  } else {
                    return true
                  }
                })
              }
            } else {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            }
          }
        })
      }
    },
    sizeChange (val) {
      this.page.pageSize = val;
      this.getList()
    },
    currentChange (val) {
      this.page.currentPage = val
      this.getList()
    },
    refreshChange () {
      this.getList()
    },
    async _delObj (from) {
      console.log(form)
      // return await fetchDelStaff(from.clerkId);
    }
  }
}
</script>
<style lang="less">
    .table-wrapper{
        background-color: #fff;
        border-radius: 5px;
        padding: 0 10px;
    }
</style>
