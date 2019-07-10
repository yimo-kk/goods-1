<template>
  <div class="transfer_shop">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Steps :current="current">
      <Step title="选择招聘分类"></Step>
      <Step title="编辑基本信息"></Step>
      <Step title="完成"></Step>
    </Steps>
    <div class="step1" v-show="step1">
      <Row class="categoryList">
        <Col span="8">
        <Card title="一级分类" icon="ios-options" :padding="0"  >
          <CellGroup @on-click="categorySelect1">
            <Cell :title="item.name" :name="item.categoryId" v-for="item in  level_1" :key="item.index" :selected="item.selected" />
          </CellGroup>
        </Card>
        </Col>
        <Col span="8">
        <Card title="二级分类" icon="ios-options" :padding="0"  >
          <CellGroup @on-click="categorySelect2">
            <Cell :title="item.name" :name="item.categoryId" v-for="item in  level_2" :key="item.index" :selected="item.selected" />
          </CellGroup>
        </Card>
        </Col>
        <Col span="8">
        <Card title="三级分类" icon="ios-options" :padding="0"  >
          <CellGroup @on-click="categorySelect3">
            <Cell :title="item.name" :name="item.categoryId" v-for="item in  level_3" :key="item.index" :selected="item.selected" />
          </CellGroup>
        </Card>
        </Col>
      </Row>
      <div class="ck_back">
        <Button type="primary" @click="next" >下一步</Button>
      </div>
    </div>
    <div class="step2" v-show="step2">
      <Row class="step-top">
        <Col span="18">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
          <FormItem label="标题" prop="releaseTitle">
            <Input v-model="formValidate.releaseTitle" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="职位类别" prop="position">
            <Select v-model="formValidate.position" style="width:260px">
              <Option value="全职" key="p1">全职</Option>
              <Option value="兼职" key="p2">兼职</Option>
              <Option value="实习生" key="p3">实习生</Option>
            </Select>
          </FormItem>
          <FormItem label="月薪">
            <Row>
              <Col span="5">
              <Input type="text" v-model="formValidate.lowPay" placeholder="输入最低薪酬"></Input>
              </Col>
              <Col span="5" offset="1">
              <Input type="text" v-model="formValidate.highPay" placeholder="最高薪酬"></Input>
              </Col>
            </Row>
          </FormItem>
          <div class="ivu-form-item ivu-form-item-required">
            <label class="ivu-form-item-label" style="width: 160px;">福利待遇</label>
            <div class="ivu-form-item-content" style="margin-left: 160px;">
              <Select v-model="formValidate.welfareName" multiple style="width:260px">
                <Option value="五险" key="w1">五险</Option>
                <Option value="奖金" key="w2">奖金</Option>
                <Option value="年终奖" key="w3">年终奖</Option>
                <Option value="双休" key="w4">双休</Option>
                <Option value="绩效" key="w5">五险</Option>
              </Select>
            </div>
          </div>
          <FormItem label="福利待遇">
            <Select v-model="formValidate.welfareName" multiple style="width:260px">
              <Option value="五险" key="w1">五险</Option>
              <Option value="奖金" key="w2">奖金</Option>
              <Option value="年终奖" key="w3">年终奖</Option>
              <Option value="双休" key="w4">双休</Option>
              <Option value="绩效" key="w5">五险</Option>
            </Select>
          </FormItem>
          <FormItem label="招聘人数" prop="number">
            <Input number v-model="formValidate.number"></Input>
          </FormItem>
          <FormItem label="职位描述" prop="recruitDescribe">
            <Input v-model="formValidate.recruitDescribe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入职位描述"></Input>
          </FormItem>
          <FormItem label="学历要求" prop="degree">
            <Select v-model="formValidate.degree" placeholder="请选择">
              <Option :value="1" key="degree_1">不限</Option>
              <Option :value="2" key="degree_2">高中</Option>
              <Option :value="3" key="degree_3">技校</Option>
              <Option :value="4" key="degree_4">中专</Option>
              <Option :value="5" key="degree_5">大专</Option>
              <Option :value="6" key="degree_6">本科</Option>
              <Option :value="7" key="degree_7">硕士</Option>
              <Option :value="8" key="degree_8">博士</Option>
            </Select>
          </FormItem>
          <FormItem label="工作年限" prop="year">
            <Select v-model="formValidate.year" placeholder="请选择">
              <Option :value="1" key="year_1">不限</Option>
              <Option :value="2" key="year_2">应届</Option>
              <Option :value="3" key="year_3">1-3年</Option>
              <Option :value="4" key="year_4">3-5年</Option>
              <Option :value="5" key="year_5">5-8年</Option>
              <Option :value="6" key="year_6">8-10年</Option>
              <Option :value="7" key="year_7">10以上</Option>
            </Select>
          </FormItem>
          <div class="ivu-form-item ivu-form-item-required">
            <label class="ivu-form-item-label" style="width: 160px;">地址</label>
            <div class="ivu-form-item-content" style="margin-left: 160px;">
              <Cascader :data="areaList" v-model="areaCode" @on-change="getAddress"></Cascader>
            </div>
          </div>
          <!--<FormItem label="地址">
            <Cascader :data="areaList" v-model="areaCode" @on-change="getAddress"></Cascader>
          </FormItem>-->
          <FormItem label="详细地址" prop="detailedAddress">
            <Input v-model="formValidate.detailedAddress"></Input>
          </FormItem>
          <FormItem label="联系人" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入联系人"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem>
            <Button @click="prev">上一步</Button>
            <Button type="primary" @click="save('formValidate')" style="margin-left: 8px">发布</Button>
          </FormItem>
        </Form>
        </Col>
        <Col span="6">
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { create, recruitCategoryList } from '@/api/recruit'
import { getAllArea } from '@/api/area'
export default {
  data () {
    return {
      current: 0,
      spinShow: true,
      step1: true,
      step2: false,
      area_1: [],
      area_2: [],
      area_3: [],
      areaList: [],
      areaCode: [],
      // 先做分组
      level_1: [],
      levelAll_2: [],
      levelAll_3: [],
      // 单个循环显示值
      level_2: [],
      level_3: [],
      catNo: '',
      formValidate: {
        releaseTitle: '', // 标题
        lowPay: '', // 最低薪酬
        highPay: '', // 最高薪酬
        position: '', // 职位类别
        number: 1, // 招聘人数
        catNo: '', // 招聘类目
        recruitDescribe: '', // 描述
        degree: '', // 学历
        year: '', // 年限
        areaCode: '', // 地区编码
        address: '', // 地址
        detailedAddress: '', // 详细地址
        name: '', // 联系人姓名
        phone: '', // 联系人电话
        welfareName: [] // 福利名称
      },
      ruleValidate: {
        releaseTitle: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        degree: [
          { type: 'number', required: true, message: '学历不能为空', trigger: 'change' }
        ],
        year: [
          { type: 'number', required: true, message: '年限不能为空', trigger: 'change' }
        ],
        position: [
          { required: true, message: '职位不能为空', trigger: 'change' }
        ],
        number: [
          { type: 'number', required: true, message: '招聘人数不能为空', trigger: 'blur' }
        ],
        detailedAddress: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'recruitAdd',
      })
    },
    prev () {
      if (this.current !== 0) {
        this.current -= 1
      }
      if (this.current === 1) {
        this.step2 = true
      }
      if (this.current === 0) {
        this.step2 = false
        this.step1 = true
      }
    },
    next (name) {
      if (this.current === 0) {
        if (this.catNo === '') {
          this.$Message.error('请先选择一个分类')
          return
        }
        this.formValidate.catNo = this.catNo
        this.step1 = false
        this.step2 = true
        this.getAreaList()
      }
      if (this.current !== 1) {
        this.current += 1
      }
    },
    getAddress (value, selectedData) {
      if (value.length > 0) {
        this.formValidate.areaCode = value[2]
        this.formValidate.address = `${selectedData[0].label}${selectedData[1].label}${selectedData[2].label}`
      }
    },
    save (name) {
      this.spinShow = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.areaCode === 0) {
            this.spinShow = false
            this.$Message.error('请先选择地址')
            return
          }
          if (this.formValidate.welfareName === 0) {
            this.spinShow = false
            this.$Message.error('请先选择福利待遇')
            return
          }
          this.formValidate.welfareName = this.formValidate.welfareName.join(',')
          create(this.formValidate).then((res) => {
            this.spinShow = false
            this.$Message.success('新增招聘信息成功!')
            this.handleCloseTag()
          }).catch((e) => {
            this.spinShow = false
            this.$Message.error(e.message)
          })
        } else {
          this.spinShow = false
          this.$Message.error('请先确认所有必填项都已填写')
        }
      })
    },
    getCategoryList () {
      recruitCategoryList().then((res) => {
        this.groupLevelAll(res.data.data)
        this.level_2 = this.getLevel(this.levelAll_2, this.level_1[0].catNo)
        if (this.level_2.length !== 0) {
          this.level_3 = this.getLevel(this.levelAll_3, this.level_2[0].catNo)
        }
        this.spinShow = false
      }).catch((e) => {
        this.$Message.error(e.message)
      })
    },
    getLevel (leves, catNo) {
      let array = []
      for (let data of leves) {
        if (data.catNo.indexOf(catNo) !== -1) {
          array.push(data)
        }
      }
      return array
    },
    // 分组所有分类
    groupLevelAll (levelAll) {
      for (let data of levelAll) {
        data.selected = false
        if (data.level === 1) {
          this.level_1.push(data)
        }
        if (data.level === 2) {
          this.levelAll_2.push(data)
        }
        if (data.level === 3) {
          this.levelAll_3.push(data)
        }
      }
    },
    // 需要重构
    categorySelect1 (name) {
      for (let data of this.level_1) {
        data.selected = false
        // 下级全部取消选中
        if (this.level_2.length > 0) {
          for (let data2 of this.level_2) {
            data2.selected = false
          }
        }
        if (data.categoryId === name) {
          data.selected = true
          this.catNo = data.catNo
          this.level_2 = this.getLevel(this.levelAll_2, data.catNo)
        }
      }
    },
    categorySelect2 (name) {
      for (let data of this.level_2) {
        data.selected = false
        if (this.level_3.length > 0) {
          // 下级全部取消选中
          for (let data2 of this.level_3) {
            data2.selected = false
          }
        }
        if (data.categoryId === name) {
          data.selected = true
          this.catNo = data.catNo
          this.level_3 = this.getLevel(this.levelAll_3, data.catNo)
        }
      }
    },
    categorySelect3 (name) {
      for (let data of this.level_3) {
        data.selected = false
        if (data.categoryId === name) {
          data.selected = true
          this.catNo = data.catNo
        }
      }
    },
    // 需要重构, 和分类筛选一样的,做成公用方法
    getAreaList () {
      this.spinShow = true
      getAllArea().then((res) => {
        const list = res.data.data
        this.groupAreaLevelAll(list)
        // 组合3级到2级下面
        let area2 = []
        for (let item of this.area_2) {
          const arr3 = this.getAreaLevel(this.area_3, item.areaCode)
          item = {
            value: item.areaCode,
            label: item.name,
            children: arr3
          }
          area2.push(item)
        }
        // 组合2级到1级下面
        let areas = []
        for (let item of this.area_1) {
          let area1 = []
          for (let data of area2) {
            if (data.value.indexOf(item.areaCode) !== -1) {
              area1.push(data)
            }
          }
          item = {
            value: item.areaCode,
            label: item.name,
            children: area1
          }
          areas.push(item)
        }
        this.areaList = areas
        this.spinShow = false
      }).catch((e) => {
        this.spinShow = true
        this.$Message.error(e.message)
      })
    },
    groupAreaLevelAll (all) {
      for (let data of all) {
        if (data.level === 1) {
          this.area_1.push(data)
        }
        if (data.level === 2) {
          this.area_2.push(data)
        }
        if (data.level === 3) {
          this.area_3.push(data)
        }
      }
    },
    getAreaLevel (areas, areaCode) {
      let array = []
      for (let data of areas) {
        if (data.areaCode.indexOf(areaCode) !== -1) {
          data = {
            value: data.areaCode,
            label: data.name
          }
          array.push(data)
        }
      }
      return array
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
  .transfer_shop {
    background: #fff;
    padding: 20px;
  }
  .categoryList,.step-top{
    margin-top: 20px;
  }
  .ck_back {
    padding-top: 50px;
    text-align: center;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .firstPic{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.2);
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
</style>
