<template>
  <div class="transfer_shop">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div>
      <Row class="step-top">
        <Col span="18">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="店铺类别" prop="category">
            <Select v-model="formValidate.category" style="width:260px">
              <Option value="1" key="p1">美容</Option>
              <Option value="2" key="p2">美容</Option>
              <Option value="3" key="p3">美甲</Option>
              <Option value="4" key="p4">美体</Option>
              <Option value="5" key="p5">医美</Option>
            </Select>
          </FormItem> 
          <FormItem label="描述" prop="describe">
            <Input v-model="formValidate.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述"></Input>
          </FormItem>
          <FormItem label="区域">
            <Cascader :data="areaList" v-model="areaCode"></Cascader>
          </FormItem>
          <FormItem label="详细地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入详细地址"></Input>
          </FormItem>
          <FormItem label="地段" prop="sector">
            <Input v-model="formValidate.sector" placeholder="请输入地段"></Input>
          </FormItem>
          <FormItem label="面积(平方)" prop="area">
            <Input v-model="formValidate.area" placeholder="请输入面积"></Input>
          </FormItem>
          <FormItem label="租金" prop="rent">
            <Input v-model="formValidate.rent" placeholder="请输入租金"></Input>
          </FormItem>
          <FormItem label="转让价格">
            <Col span="12">
            <Input v-model="formValidate.transferFee" placeholder="请输入转让价格" :disabled="single"></Input>
            </Col>
            <Col span="12">&nbsp;&nbsp;<Checkbox v-model="single">面议</Checkbox></Col>
          </FormItem>
          <FormItem label="联系人" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入联系人"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="图片" prop="detailsPath">
            <div class="demo-upload-list" v-for="item in detailsPathList" :key="item.index">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="detailsPathView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="detailsPathRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="detailsPathList"
              :on-success="detailsPathSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="20480"
              :on-format-error="detailsPathFormatError"
              :on-exceeded-size="detailsPathMaxSize"
              :before-upload="detailsPathBeforeUpload"
              multiple
              type="drag"
              :action="uploadImgUrl"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="detailsPathVisible">
              <img :src="detailsPathImgName" v-if="detailsPathVisible" style="width: 100%">
            </Modal>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="save('formValidate')">完成</Button>
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
import config from '@/config'
import { mapMutations } from 'vuex'
import { setSublet } from '@/api/sublet'
import { getAllArea } from '@/api/area'
export default {
  name: 'subletAdd',
  data () {
    return {
      uploadImgUrl: config.uploadImgUrl,
      spinShow: true,
      single: false,
      area_1: [],
      area_2: [],
      area_3: [],
      areaList: [],
      areaCode: [],
      detailsPathVisible: false,
      detailsPathImgName: '',
      // 详情图片暂存列表
      detailsPathList: [],
      formValidate: {
        title: '', // 标题
        areaCode: '', // 地区编码
        category: '', // 类别
        sector: '', // 地段
        address: '', // 详细地址
        pictures: '', // 图集
        area: '', // 面积
        rent: '', // 租金
        transferFee: '', // 转让费
        describe: '', // 描述
        name: '',
        phone: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        sector: [
          { required: true, message: '地段不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '面积不能为空', trigger: 'blur' }
        ],
        rent: [
          { required: true, message: '租金不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名字不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAreaList()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'subletAdd'
      })
    },
    // 上传详情图片
    detailsPathView (name) {
      this.detailsPathImgName = name
      this.detailsPathVisible = true
    },
    detailsPathRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.detailsPathList = this.$refs.upload.fileList
    },
    detailsPathSuccess (res, file) {
      if (res.result === 'FAILURE') {
        this.$Message.error(res.message)
      }
      file.url = `${res.data.url}`
      file.name = res.data.fileName
      this.detailsPathList = this.$refs.upload.fileList
    },
    detailsPathFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: `文件格式${File.name}不正确，请选择jpg或png.`
      })
    },
    detailsPathMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: `File ${File.name}太大，不超过2M`
      })
    },
    detailsPathBeforeUpload () {
      const check = this.detailsPathList.length < 100
      if (!check) {
        this.$Notice.warning({
          title: '只能上传100张图片'
        })
      }
      return check
    },
    save (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.areaCode.length === 0) {
            this.$Message.error('请先选择地区')
            return
          }
          this.formValidate.areaCode = this.areaCode[2]
          if (this.single) {
            this.formValidate.transferFee = -1
          }
          if (this.formValidate.transferFee === '') {
            this.$Message.error('请先填写转店费用')
            return
          }

          this.spinShow = true
          // 组合详情图片
          if (this.detailsPathList.length > 0) {
            let detailsPathArray = []
            for (let item of this.detailsPathList) {
              detailsPathArray.push(item.url)
            }
            this.formValidate.pictures = detailsPathArray.join(',')
          }
          setSublet(this.formValidate).then((res) => {
            this.spinShow = false
            this.$Message.success('转店发布成功!')
            this.handleCloseTag()
          }).catch((e) => {
            this.spinShow = false
            this.$Message.error(e.message)
          })
        } else {
          this.$Message.error('请先确认所有必填项都已填写')
        }
      })
    },
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
    this.detailsPathList = this.$refs.upload.fileList
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
