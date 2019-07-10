<template>
  <div class="spxq">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="looks">
      <ul class="datas">
        <li>
          <div class="txt">招聘标题</div>
          <div>{{recruit.releaseTitle}}</div>
        </li>
        <li>
          <div>职位类别</div>
          <div>{{recruit.position}}</div>
        </li>
        <li>
          <div>月薪</div>
          <div>{{recruit.lowPay}}-{{recruit.highPay}}</div>
        </li>
        <li>
          <div>福利待遇</div>
          <div><span v-for="item in recruit.welfareName" :key="item.index">{{item}}&nbsp;</span></div>
        </li>
        <li>
          <div>招聘人数</div>
          <div>{{recruit.number}}</div>
        </li>
        <li>
          <div>职位描述</div>
          <div>{{recruit.recruitDescribe}}</div>
        </li>
        <li>
          <div>学历要求</div>
          <div>{{recruit.degree}}</div>
        </li>
        <li>
          <div>工作年限</div>
          <div>{{recruit.year}}</div>
        </li>
        <li>
          <div>工作地点</div>
          <div>{{recruit.address}}</div>
        </li>
        <li>
          <div>详细地址</div>
          <div>{{recruit.detailedAddress}}</div>
        </li>
        <li>
          <div>联系人</div>
          <div>{{recruit.name}}</div>
        </li>
        <li>
          <div>手机号</div>
          <div>{{recruit.phone}}</div>
        </li>
      </ul>
      <div class="ck_back">
        <Button @click="handleCloseTag" >返回</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetails } from '@/api/recruit'
import { mapMutations } from 'vuex'
export default {
  name: 'recruitDetail',
  components: {
  },
  data () {
    return {
      spinShow: true,
      recruit: {}
    }
  },
  created () {
    this.handleRecruit()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'recruitDetail',
        query: {
          releaseId: this.$route.query.releaseId
        }
      })
    },
    handleRecruit () {
      getDetails(this.$route.query.releaseId).then((res) => {
        this.recruit = res.data.data
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
</style>
