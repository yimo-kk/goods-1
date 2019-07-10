<!-- 优惠券 -->
<template>
    <div class="table-wrapper">
       <avue-crud
            :data="records"
            :option="option"
            :page="page"
            @refresh-change="refreshChange"
            @row-del="rowDel"
            @search-change="searchChange"
            @size-change="sizeChange"
            @current-change="currentChange"
            @row-save="rowSave" >
          <template slot-scope="scope" slot="menu">
              <el-button  @click.stop="handleEdit(scope.row,scope.index)" slot="reference">修改优惠券状态</el-button>
          </template>
          <template slot-scope="scope" slot="couponStatus">
            <el-tag :type="scope.row.couponStatus == 2 ? 'danger' : (scope.row.couponStatus == 3 ? 'info' : '')">{{scope.row.couponStatus | filterCouponStatus}}</el-tag>
          </template>
      </avue-crud>
      <el-dialog title="优惠券状态修改" :visible.sync="dialogFormVisible" width="350px">
        <el-form>
          <el-form-item label="优惠券状态" :label-width="formLabelWidth">
            <el-select v-model="couponStatus" :label-width="formLabelWidth" placeholder="请选择优惠券状态">
              <el-option
                v-for="item in couponStatuslist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { fetchList, addCoupon, editCouponStatus, searchCoupon } from '@/api/coupon'
import common from '@/mixins/common'
export default {
  components: {},
  mixins: [common()],
  data () {
    return {
      records: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      couponStatus: '',
      couponId: '',
      couponStatuslist: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 2
        },
        {
          label: '注销',
          value: 3
        }
      ],
      serarchParams: {
        endDate: '',
        startDate: '',
        title: '',
        pageNum: 1,
        pageSize: 10
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      option: {
        page: true,
        indexLabel: '序号',
        align: 'center',
        menuAlign: 'center',
        editBtn: false,
        delBtn: false,
        stripe: true,
        labelWidth: '150px',
        column: [
          {
            label: '优惠券名称',
            prop: 'title',
            search: true,
            rules: [{
                required: true,
                message: "请输入优惠券名称",
                trigger: "blur"
            }]
          },
          {
            label: '数量',
            prop: 'quantity',
            type: 'number',
            rules: [{
                required: true,
                message: "请输入数量",
                trigger: "blur"
            }]
          },
          {
            label: '满多少钱',
            prop: 'fullMoney',
            type: 'number',
            rules: [{
                required: true,
                message: "请输入满多少钱",
                trigger: "blur"
            }]
          },
          {
            label: '减多少钱',
            prop: 'subtractMoney',
            type: 'number',
            rules: [{
                required: true,
                message: "请输入减多少钱",
                trigger: "blur"
            }]
          },
          {
            label: '购物券状态',
            prop: 'couponStatus',
            solt: true,
            rules: [{
                required: true,
                message: "请输入购物券状态",
                trigger: "blur"
            }]
          },
          {
            label: '开始时间',
            prop: 'startDate',
            type: 'datetime',
            format: 'yyyy-MM-dd hh:mm:ss',
            search: true,
            rules: [{
                required: true,
                message: "请选择开始时间",
                trigger: "blur"
            }]
          },
          {
            label: '截止时间',
            prop: 'endDate',
            type: 'datetime',
            format: 'yyyy-MM-dd hh:mm:ss',
            search: true,
            rules: [{
                required: true,
                message: "请选择截止时间",
                trigger: "blur"
            }]
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
      const res = await fetchList(postData)
      if (res.data.result === 'SUCCESS') {
        this.records = res.data.data.list
        this.page.total = res.data.data.total
      }
    },
    rowDel () {

    },
    async searchChange (params) {
      let postaData = {
        title: params.title,
        startDate: params.startDate,
        endDate: params.endDate,
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      }
      this.serarchParams = postaData
      const res = await searchCoupon(this.serarchParams)
      this.records = res.data.data.list
      this.page.total = res.data.data.total
    },
    async rowSave (row, done, loading) {
      const res = await addCoupon(row)
      if (res.data.result === 'SUCCESS') {
        this.$message({
          message: '添加成功！',
          type: 'success'
        })
        this.getList()
        done()
      }
    },
    handleEdit ({ couponId, couponStatus }) {
      this.dialogFormVisible = true
      this.couponId = couponId
      this.couponStatus = couponStatus
    },
    async submitEdit () {
      this.dialogFormVisible = false
      const res = await editCouponStatus(this.couponId, this.couponStatus)
      this.couponId = ''
      this.couponStatus = ''
      if (res.data.result === 'SUCCESS') {
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
        this.getList()
      }
    }
  },

  filters: {
    filterCouponStatus (val) {
      if (val) {
        let mapStatus = {
          1: '启用',
          2: '停用',
          3: '注销'
        }
        return mapStatus[val]
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
