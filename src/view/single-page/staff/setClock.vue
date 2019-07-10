<template>
    <div class="table-wrapper">
        <div class="lng-lat">
            <div class="text">
                <span>经度：{{center.lng}}，</span>
                <span>纬度：{{center.lat}}，</span>
                <span style="margin-right: 20px;">打卡范围（米）：{{radius}}</span>
                <div class="slider-wrapper">
                    <el-slider v-model="radius"></el-slider>
                </div>
                <el-button type="primary" @click="submitLocation" size="small">保存</el-button>
            </div>
        </div>
        <baidu-map class="bm-view"
            :center="center"
            @click="getClickInfo"
            :zoom="zoom"
            :scroll-wheel-zoom="true"
            @moving="syncCenterAndZoom"
            @moveend="syncCenterAndZoom"
            @zoomend="syncCenterAndZoom">
            <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragstart="dragMarker">
            </bm-marker>
            <bm-control :offset="{width: '10px', height: '10px'}">
                <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                    <input type="text" placeholder="请输入搜索关键字" class="serachinput">
                </bm-auto-complete>
            </bm-control>
            <bm-circle :center="center" :radius="radius" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2"></bm-circle>
            <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
        </baidu-map>
    </div>
</template>
<script>
import { BaiduMap, BmControl, BmView, BmAutoComplete, BmCircle, BmLocalSearch, BmMarker } from 'vue-baidu-map'
import { fetchSetClockInfo, fetchSetClockIn } from '@/api/staff'
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmCircle,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data () {
    return {
      center: { lng: 114.069346, lat: 22.525282 },
      radius: 100,
      keyword: '',
      zoom: 18
    }
  },
  mounted () {

  },
  created() {
    this.getClokeInfo();
  },
  methods: {
    async getClokeInfo(){
      const res = await fetchSetClockInfo();
      if(res.data.result === 'SUCCESS'){
        let info = res.data.data;
        this.center.lng = info.longitude;
        this.center.lat = info.latitude;
        this.radius = info.scopeAddress;
      }
    },
    getClickInfo (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
    },
    dragMarker (e) {
      this.center = Object.assign({}, e.point)
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    async submitLocation () {
      let postData = {
        address: '',
        latitude: this.center.lat,
        longitude: this.center.lng,
        scopeAddress: this.radius
      }
      const res = await fetchSetClockIn(postData)
      if (res.data.result === 'SUCCESS') {
        this.$message({
          message: res.data.message,
          type: 'success'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
    .table-wrapper{
        background-color: #fff;
        border-radius: 5px;
        padding: 20px;
        .bm-view {
            width: 100%;
            height: 500px;
        }
        .lng-lat{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .text{
                display: flex;
                align-items: center;
                .slider-wrapper{
                    width: 200px;
                    margin-right: 30px;
                }
                span{
                    font-size: 14px;
                }
            }
        }
        .serachinput{
            width: 300px;
            box-sizing: border-box;
            padding: 9px;
            border: 1px solid #dddee1;
            line-height: 20px;
            font-size: 16px;
            height: 38px;
            color: #333;
            position: relative;
            border-radius: 4px;
            -webkit-box-shadow: #666 0px 0px 10px;
            -moz-box-shadow: #666 0px 0px 10px;
            box-shadow: #666 0px 0px 10px;
        }
    }
</style>
