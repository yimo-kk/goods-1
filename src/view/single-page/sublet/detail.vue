<template>
  <div class="spxq">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="looks">
      <div class="auto-width">
        <Carousel v-model="value1" loop>
          <CarouselItem v-for="item in pictures" :key="item.index">
            <div class="demo-carousel"><img :src="item"/></div>
          </CarouselItem>
        </Carousel>
      </div>

      <ul class="datas">
        <li>
          <div class="txt">转店标题</div>
          <div>{{sublet.title}}</div>
        </li>
        <li>
          <div>店铺类别</div>
          <div>
            <span v-if="sublet.category === 1">美容</span>
            <span v-if="sublet.category === 2">美发</span>
            <span v-if="sublet.category === 3">美甲</span>
            <span v-if="sublet.category === 4">美体</span>
            <span v-if="sublet.category === 5">医美</span>
          </div>
        </li>
        <li>
          <div>租金</div>
          <div>{{sublet.rent}}</div>
        </li>
        <li>
          <div>转让价格</div>
          <div>{{sublet.transferFee2}}</div>
        </li>
        <li>
          <div>区域</div>
          <div>{{sublet.province}}-{{sublet.city}}-{{sublet.district}}</div>
        </li>
        <li>
          <div>地段</div>
          <div>{{sublet.sector}}</div>
        </li>
        <li>
          <div>描述</div>
          <div>{{sublet.describe}}</div>
        </li>
        <li>
          <div>详细地址</div>
          <div>{{sublet.address}}</div>
        </li>
        <li>
          <div>联系人</div>
          <div>{{sublet.name}}</div>
        </li>
        <li>
          <div>手机号</div>
          <div>{{sublet.phone}}</div>
        </li>
      </ul>
      <div class="ck_back">
        <Button @click="handleCloseTag" >返回</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetails } from '@/api/sublet'
import { mapMutations } from 'vuex'
export default {
  name: 'subletDetail',
  components: {
  },
  data () {
    return {
      spinShow: true,
      value1: 0,
      sublet: {},
      pictures: []
    }
  },
  created () {
    this.handleSublet()
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'subletDetail',
        query: {
          releaseId: this.$route.query.releaseId
        }
      })
    },
    handleSublet () {
      getDetails(this.$route.query.releaseId).then((res) => {
        this.sublet = res.data.data
        if (this.sublet.pictures) {
          this.pictures = this.sublet.pictures.split(',')
        }
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
.auto-width{
  max-width: 500px;
  text-align: center;
  margin: 0px auto;
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
  .spxq .tupian,.shipin{
    width: 200px;
    height: 150px;
    border: 1px solid;
  }
</style>
