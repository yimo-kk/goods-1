<template>
  <div class="spxq">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="looks">
      <ul class="datas">
        <li>
          <div class="txt">头像</div>
          <div id="tx"><img :src="resume.headPicture"/></div>
        </li>
        <li>
          <div>真实姓名</div>
          <div>{{resume.name}}</div>
        </li>
        <li>
          <div>性别</div>
          <div><span v-if="resume.sex === true">女</span><span v-if="resume.sex === false">男</span></div>
        </li>
        <li>
          <div>出生年份</div>
          <div>{{resume.yearOfBirth}}</div>
        </li>
        <li>
          <div>最高学历</div>
          <div>
            <span v-if="resume.degree === 1">高中</span>
            <span v-if="resume.degree === 2">技校</span>
            <span v-if="resume.degree === 3">中专</span>
            <span v-if="resume.degree === 4">大专</span>
            <span v-if="resume.degree === 5">本科</span>
            <span v-if="resume.degree === 6">硕士</span>
            <span v-if="resume.degree === 7">博士</span>
          </div>
        </li>
        <li>
          <div>参加工作时间</div>
          <div>{{resume.startWorkTime | dateFilter}}</div>
        </li>
        <li>
          <div>求职意向</div>
          <div>{{resume.position}}</div>
        </li>
        <li>
          <div>职位类别</div>
          <div>
            <span v-if="resume.positionCategory === 1">美容</span>
            <span v-if="resume.positionCategory === 2">美发</span>
            <span v-if="resume.positionCategory === 3">美甲</span>
            <span v-if="resume.positionCategory === 4">美体</span>
            <span v-if="resume.positionCategory === 5">医美</span>
          </div>
        </li>
        <li>
          <div>期望岗位</div>
          <div>{{resume.position}}</div>
        </li>
        <li>
          <div>期望薪资</div>
          <div>{{resume.monthPay}}</div>
        </li>
        <li>
          <div>求职区域</div>
          <div>{{resume.province}}-{{resume.city}}-{{resume.district}}</div>
        </li>
        <li>
          <div>工作经验</div>
          <div>
            <div id="sx">
              <div v-for="(item, index) in resume.resumeWkexpPOS" :key="index">
                <Row>
                  <Col span="12">入职时间：{{item.startDate | dateFilter}}- 离职时间: {{item.endDate | dateFilter}}</Col>
                </Row>
                <Row >
                  <Col span="12">公司名称：{{item.companyName}} &nbsp;&nbsp;职位: {{item.wkexpPosition}}</Col>
                </Row>
                <Row >
                  <Col span="12">工作描述：{{item.workDescribe}}</Col>
                </Row>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div>教育经历</div>
          <div>
            <div id="sx">
              <div :key="item.index" v-for="item in resume.resumeEdubgPOS">
                <Row >
                  <Col span="12">开始时间：{{item.startDate | dateFilter}}- 结束时间: {{item.endDate | dateFilter}}</Col>
                </Row>
                <Row>
                  <Col span="12">学校名称：{{item.schoolName}}
                  </Col>
                  <Col span="12">专业:
                  <span v-if="item.degree === 1">高中</span>
                  <span v-if="item.degree === 2">技校</span>
                  <span v-if="item.degree === 3">中专</span>
                  <span v-if="item.degree === 4">大专</span>
                  <span v-if="item.degree === 5">本科</span>
                  <span v-if="item.degree === 6">硕士</span>
                  <span v-if="item.degree === 7">博士</span>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">学历：{{item.specialty}}</Col>
                  <Col span="12">工作描述：{{item.educationDescribe}}</Col>
                </Row>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="ck_back">
        <Button @click="handleCloseTag" >返回</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getResume } from '@/api/recruit'
import { mapMutations } from 'vuex'
export default {
  name: 'resumeDetail',
  components: {
  },
  data () {
    return {
      spinShow: true,
      resume: {}
    }
  },
  created () {
    this.handleResume()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'resumeDetail',
        query: {
          resumeId: this.$route.query.resumeId
        }
      })
    },
    handleResume () {
      getResume(this.$route.query.resumeId).then((res) => {
        this.resume = res.data.data
        this.spinShow = false
      }).catch((e) => {
        this.$Message.error(e.message)
      })
    }
  },
  mounted () {
    //
  }
}
</script>
<style type="text/css">
  .ivu-tabs-nav .ivu-tabs-tab {
    padding: 20px 16px;
  }
  .ivu-table td{text-align: center;}
  .ivu-table th{text-align: center;}
  .spxq {
    background: #fff;
    padding: 0px 20px;
  }
  .spxq .datas{padding-left: 30%;margin-top:50px;}
  .spxq .looks li label {
    padding: 20px 0px;
    text-align: left;
  }
  .spxq .cz_title{padding: 30px 0px;text-align: right;}
  .spxq .looks .info {
    padding-top: 20px;
    padding-bottom: 8px;
  }

  .spxq .looks li {
    color: #333;
    padding: 15px 0px;
    font-size: 14px;
    position: relative;
  }

  .spxq .looks li>div:first-of-type {
    display:inline-block;
    width: 20%;
  }

  .spxq .looks li>div:last-of-type {
    display: inline-block;
  }

  .spxq .looks .widths {
    width: 50%;
  }

  .spxq .looks .ck_back {
    padding-top: 50px;
    text-align: center;
  }

  .spxq .looks .ivu-btn {
    padding: 7px 60px;
  }

  .spxq .looks .sd {
    margin-right: 40px;
  }

  .spxq .photos {
    width: 200px;
    height: 150px;
    border: 1px solid;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .spxq .looks .top {
    height: 170px;
    line-height: 170px;
    padding: 0px;
  }

  .spxq .p_l {
    float: left;
  }
  #jg{display: block;}
  .goodsPrices{margin-left: 20%;padding: 15px 0px;}
  .spxq .shuliang{
    display: inline-block;
    margin-right: 100px;
  }
  .spxq .yuan{
    display: inline-block;
  }
  .spxq .s_data{margin: 0px 30px;}
  #sx{
    border: 1px solid;
    width: 500px;
    height: 300px;
  }
  .spxq .tupian,.shipin{
    width: 200px;
    height: 150px;
    border: 1px solid;
  }
  #sx{
    width: 500px;
  }
</style>
