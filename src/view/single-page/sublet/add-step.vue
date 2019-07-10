<template>
  <div class="add-sublet">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <Steps :current="current">
      <Step title="选择转店分类" ></Step>
      <Step title="填写转店基本信息"></Step>
      <Step title="完成" ></Step>
    </Steps>
    <div class="step1" v-show="step1">
      <Row class="categoryList">
        <Col span="8">
          <Card title="一级分类" icon="ios-options" :padding="0">
            <CellGroup @on-click="categorySelect1">
              <Cell
                :title="item.name"
                :name="item.categoryId"
                v-for="item in  level_1"
                :key="item.index"
                :selected="item.selected"
              />
            </CellGroup>
          </Card>
        </Col>
        <Col span="8">
          <Card title="二级分类" icon="ios-options" :padding="0">
            <CellGroup @on-click="categorySelect2">
              <Cell
                :title="item.name"
                :name="item.categoryId"
                v-for="item in  level_2"
                :key="item.index"
                :selected="item.selected"
              />
            </CellGroup>
          </Card>
        </Col>
        <Col span="8">
          <Card title="三级分类" icon="ios-options" :padding="0">
            <CellGroup @on-click="categorySelect3">
              <Cell
                :title="item.name"
                :name="item.categoryId"
                v-for="item in  level_3"
                :key="item.index"
                :selected="item.selected"
              />
            </CellGroup>
          </Card>
        </Col>
      </Row>
      <div class="ck_back">
        <Button type="primary" @click="next">下一步</Button>
      </div>
      <div class="step1" v-show="step2">
        第二步
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinShow:true, 
      current: 0, //步骤条的计数
      step1:true, // 默认显示步骤1
      step2:false, // 默认显示步骤1
      level_1:[], // 一级分类的数据
      level_2:[], //二级分类数据
      level_3:[], // 三级分类 


    };
  },
  methods: {
    // 一级分类
    categorySelect1() {

    },
    // 二级分类
    categorySelect2(){

    },
    // 三级分类
    categorySelect3(){},
      // 点击下一步 
    next(){
      this.current >= 2 ? this.current = 0 :this.current++
      // 隐藏步骤其他步骤显示对应步骤的内容
      if(this.current == 1) {
        this.step1 = false
        this.step2 = true
      }else if(this.current == 2){
      this.step1 = true
        this.step2 = false 
      }
    }
  },

};

</script>

<style scoped>
.add-sublet {
  background-color: #fff;
}
</style>