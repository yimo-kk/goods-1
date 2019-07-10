<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          <Row>
            <Col span="6">转店名称: <Input clearable placeholder="转店名称" class="search-input" v-model="title"/></Col>
            <Col span="6">状态: <Select v-model="state" class="search-col">
            <Option value="0" key="state0">选择</Option>
            <Option value="1" key="state1">申请中</Option>
            <Option value="2" key="state2">申请通过</Option>
            <Option value="3" key="state3">申请失败</Option>
            <Option value="5" key="state5">开启</Option>
            <Option value="6" key="state6">关闭</Option>
          </Select>
            </Col>
            <Col span="6">类型: <Select v-model="category" class="search-col">
            <Option value="" key="level_10">选择</Option>
            <Option value="1" key="c1">美容</Option>
            <Option value="2" key="c2">美发</Option>
            <Option value="3" key="c3">美甲</Option>
            <Option value="4" key="c4">美体</Option>
            <Option value="5" key="c5">医美</Option>
          </Select>&nbsp;
            <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </Col>
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
import { getPage, subletUp, subletDown } from '@/api/sublet'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'subletList',
  components: {

  },
  data () {
    return {
      loading: true,
      title: '',
      state: 0,
      category: '',
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
          key: 'releaseId'
        },
        {
          title: '名称',
          key: 'title'
        },
        {
          title: '类别',
          key: 'category' // 需要转换
        },
        {
          title: '区域',
          key: 'range' // 需要查询区域
        },
        {
          title: '面积',
          key: 'area'
        },
        {
          title: '转让价格',
          key: 'transferFee'
        },
        {
          title: '联系人',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'phone'
        },
        {
          title: '发布时间',
          key: 'createTime'
        },
        {
          title: '状态',
          key: 'stateTxt'
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
                    const releaseId = row.releaseId
                    const route = {
                      name: 'subletDetail',
                      query: {
                        releaseId
                      },
                      meta: {
                        title: '转店详情'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看详情')
            ]
            if (row.state === 6 || row.state === 2) {
              createElement.push(h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: (params) => {
                    this.$Modal.confirm({
                      title: '开启',
                      content: '确认要开启吗?',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        const releaseId = [row.releaseId]
                        subletUp(releaseId).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.state = 5
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '开启'))
            }
            if (row.state === 5) {
              createElement.push(h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: (params) => {
                    this.$Modal.confirm({
                      title: '关闭',
                      content: '确认要关闭吗?',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        this.loading = true
                        const releaseId = [row.releaseId]
                        subletDown(releaseId).then((res) => {
                          this.loading = false
                          this.$Message.success(res.data.message)
                          row.state = 6
                        }).catch((e) => {
                          this.loading = false
                          this.$Message.error(e.message)
                        })
                      },
                      onCancel: () => {}
                    })
                  }
                }
              }, '关闭'))
            }
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
      const state = Number.parseInt(this.state) !== 0 ? this.state : null
      const param = {
        title: this.title === '' ? null : this.title,
        category: this.category === '' ? null : this.category,
        state,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getPage(param).then((res) => {
        const data = res.data.data
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          switch (data.state) {
            case 1:
              data.stateTxt = '申请中'
              break
            case 2:
              data.stateTxt = '申请通过'
              break
            case 3:
              data.stateTxt = '申请失败'
              break
            case 4:
              data.stateTxt = '删除'
              break
            case 5:
              data.stateTxt = '开启'
              break
            case 6:
              data.stateTxt = '关闭'
              break
            default:
              data.stateTxt = '异常'
          }
          switch (data.category) {
            case 1:
              data.category = '美容'
              break
            case 2:
              data.category = '美发'
              break
            case 3:
              data.category = '美甲'
              break
            case 4:
              data.category = '美体'
              break
            case 5:
              data.category = '医美'
              break
            default:
              data.category = '异常'
          }
          data.range = `${data.province}-${data.city}-${data.district}`
          data.createTime = dateTimeFilter(data.createTime)
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
