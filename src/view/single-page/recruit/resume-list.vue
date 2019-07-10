<template>
  <div class="table">
    <div class="form_box">
      <div class="search-con search-con-top">
        <Row>
          <Col span="6">用户姓名: <Input clearable placeholder="用户姓名" class="search-input" v-model="name"/></Col>
          <Col span="6">联系方式: <Input clearable placeholder="联系方式" class="search-input" v-model="phone"/></Col>
        </Row>
      </div>
    </div>
    <Table stripe ref="selection" :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>

  </div>
</template>
<script>
import './index.less'
import { getResumePage } from '@/api/recruit'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'resumeList',
  components: {

  },
  data () {
    return {
      loading: true,
      name: '',
      phone: '',
      dataList: [],
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      // 当前页码
      pageNum: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'resumeId'
        },
        {
          title: '用户昵称',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex' // 需要转换
        },
        {
          title: '联系方式',
          key: 'phone'
        },
        {
          title: '期望薪资',
          key: 'monthPay'
        },
        {
          title: '求职区域',
          key: 'areaTxt' // 需要转换
        },
        {
          title: '出生年月',
          key: 'yearOfBirth'
        },
        {
          title: '工作年限',
          key: 'startWorkTime'
        },
        {
          title: '投递时间',
          key: 'submitTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
          align: 'center',
          render: (h, params) => {
            const row = this.dataList[params.index]
            let createElement = [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    const resumeId = row.resumeId
                    const route = {
                      name: 'resumeDetail',
                      query: {
                        resumeId
                      },
                      meta: {
                        title: '简历详情'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看')
            ]
            return h('div', createElement)
          }
        }
      ]
    }
  },
  created () {
    this.handleDataList()
  },
  methods: {
    handleDataList () {
      // 保存取到的所有数据
      this.loading = true
      const param = {
        name: this.name === '' ? null : this.name,
        phone: this.phone === '' ? null : this.phone,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getResumePage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.sex = data.sex ? '女' : '男'
          data.areaTxt = `${data.province} - ${data.city} - ${data.district}`
          data.submitTime = dateTimeFilter(data.submitTime)
        }
        this.loading = false
      }).catch((e) => {
        this.loading = false
        this.$Message.error(e.message)
      })
    },
    handlePage (value) {
      this.pageNum = value
      this.handleDataList()
    },
    handlePageSize (value) {
      this.pageSize = value
      this.handleDataList()
    },
    handleSearch (e) {
      this.handleDataList()
    }
  },
  mounted () {
    //
  }

}
</script>
<style scoped>
  .ivu-table th{text-align:center !important; }
  .ivu-table td{text-align:center !important;}
  .table{height:100%;background: #fff;padding: 0px 20px;}
  .table .form_right button{padding: 8px 15px;border-radius: 4px;background: #2d8cf0;border:none;color: #fff;}
</style>
