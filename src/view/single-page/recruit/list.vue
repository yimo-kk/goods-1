<template>
  <div class="table">
    <div class="form_box">
        <div class="search-con search-con-top">
          <Row>
            <Col span="5">公司名称: <Input clearable placeholder="请输入公司名称" class="search-input" v-model="firmName"/></Col>
            <Col span="5">招聘标题: <Input clearable placeholder="请输入招聘标题" class="search-input" v-model="title"/></Col>
            <Col span="5">招聘分类: <Select v-model="streleaseTitleate" class="search-col">
            <Option value="0" key="state0">请选择招聘分类</Option>
            <Option value="1" key="state1">清洁系列</Option>
            <Option value="2" key="state2">护法系列</Option>
            <Option value="3" key="state3">美白系列</Option>
          </Select>
            </Col>
            <Col span="5">状态: <Select v-model="state" class="search-col">
            <Option value="0" key="state0">选择</Option>
            <Option value="1" key="state1">申请中</Option>
            <Option value="2" key="state2">申请通过</Option>
            <Option value="3" key="state3">申请失败</Option>
            <Option value="5" key="state5">开启</Option>
            <Option value="6" key="state6">关闭</Option>
          </Select>
            </Col>
            <Col span="4">
            <Button @click="handleSearch" class="search-btn " type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
            </Col>
          </Row>
        </div>
    </div>
    <div>
      <Button @click="addRecruit" class="search-btn " type="primary">添加招聘</Button>
      <Button @click="handleSearch" class="search-btn " type="primary">上架</Button>
      <Button @click="handleSearch" class="search-btn " type="primary">下架</Button>
      <Button @click="deleteRecruit" class="search-btn " type="primary">删除</Button>
    </div>
    <Table stripe ref="selection" :loading="loading" :columns="columns" :data="dataList"></Table>
    <br/>
    <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
          placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
  </div>
</template>
<script>
import './index.less'
import { getPage, releaseUp, releaseDown } from '@/api/recruit'
import { dateTimeFilter } from '@/libs/filters'
export default {
  name: 'recruitList',
  components: {

  },
  data () {
    return {
      title:'',  // 招聘标题
      firmName:'', // 公司名称
      loading: true,
      streleaseTitleate:0, // 招聘分类
      deleteList:[], // 批量删除的数据
      // releaseTitle: 0,
      state: 0,
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
          title: '招聘标题',
          key: 'releaseTitle'
        },
        {
          title: '招聘类别',
          key: 'position'
        },
        {
          title: '月薪',
          key: 'compensation' // 需要转换最高最低薪资
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
          title: '已投递简历',
          key: 'deliveryCount'
        },
        {
          title: '状态',
          key: 'stateTxt'
        },
        {
          title:'推荐',
          key:'recommend'
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
                      name: 'recruitDetail',
                      query: {
                        releaseId
                      },
                      meta: {
                        title: '招聘详情'
                      }
                    }
                    this.$router.push(route)
                  }
                }
              }, '查看')
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
                        releaseUp(row.releaseId).then((res) => {
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
                        releaseDown(row.releaseId).then((res) => {
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
            createElement.push(h('Button', {
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
                    name: 'resumeList', 
                    query: {
                      releaseId
                    },
                    meta: {
                      title: '已投递简历'
                    }
                  }
                  this.$router.push(route)
                }
              }
            }, '已投递简历'))
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
    // 添加招聘
    addRecruit(){
      //添加到添加招聘也
      this.$router.push({name:'recruitAdd'})
    },
    //批量删除
    deleteRecruit(){
      
    },
    handleDataList () {
      // 保存取到的所有数据 
      this.loading = true
      const state = Number.parseInt(this.state) !== 0 ? this.state : null
      const param = {
        releaseTitle: this.releaseTitle === '' ? null : this.releaseTitle,
        state,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getPage(param).then((res) => {
        const data = res.data.data
        // console.log(data.list)
        this.dataList = data.list
        this.dataCount = data.total
        for (let data of this.dataList) {
          data.compensation = `${data.lowPay} - ${data.highPay}`
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
    console.log(this.dataList)
  }

}
</script>
<style scoped>
  .search-btn { margin-left: 10px; margin-bottom: 10px;}
  .ivu-table th{text-align:center !important; }
  .ivu-table td{text-align:center !important;}
  .table{height:100%;background: #fff;padding: 0px 20px;}
  .table .form_right button{padding: 8px 15px;border-radius: 4px;background: #2d8cf0;border:none;color: #fff;}
</style>
