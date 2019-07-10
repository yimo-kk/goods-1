<template>
    <div class="table-wrapper">
        <div class="calendar-wrapper">
            <full-calendar :events="records" @eventClick="eventClick" @changeMonth="handleMonth"  lang="zh">
                <!-- <template slot="fc-header-right">
                    <h1>Here might be a page title</h1>
                </template> -->
            </full-calendar>
            <el-card :class="['box-card', isShowStaffCard ? 'box-card-active' : '']" :style="{left: pos.left+40+'px', top: pos.top+80+'px'}">
                <div slot="header" class="clearfix">
                    <div class="close">
                        <i class="el-icon-error" @click="closeCard"></i>
                        <span></span>
                    </div>
                    <div class="add-staff">
                        <div><span style="color: #666;">{{currentDate}}</span>&nbsp;&nbsp;&nbsp; <sapn style="font-weight: bold;">{{shiftName}}</sapn> </div>
                        <el-button size="mini" type="primary" @click="getStaffList">     
                            添加员工
                        </el-button>
                    </div>
                </div>
                <div v-for="item in shiftStafflist" :key="item.clerkId" class="text item">
                    <span class="staff-name">
                      {{item.clerkName}}
                    </span>
                    <el-button size="mini" type="danger" @click="delScheduleStaff({clerkId: item.clerkId,arrangeDate: currentDate})">删除</el-button>
                </div>
                <span v-if="shiftStafflist.length === 0">暂未添加该班次员工！</span>
            </el-card>
        </div>
        <el-dialog
            title="添加员工"
            :visible.sync="dialogVisible"
            width="50%">
            <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedStaff" @change="handleCheckedStaffChange">
                    <el-checkbox v-for="staff in staffOptions" :label="staff.value" :key="staff.value">{{staff.label}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddStaff">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchScheduleList, fetchDateScheduleList, fetchScheduleStaffList, fetchAddScheuleStaff, fetchDelScheuleStaff } from '@/api/staff'
export default {
  components: {
    'full-calendar': require('vue-fullcalendar')
  },
  data () {
    return {
      records: [],
      pos: {
        left: 0,
        top: 0
      },
      isShowStaffCard: false, // 是否显示班次员工卡片
      dialogVisible: false,

      checkAll: false,
      checkedStaff: [], // 被选中的员工列表
      staffOptions: [], // 所有员工列表
      isIndeterminate: true,
      addStaffParmas: { // 添加员工参数
        arrangeDate: '',
        arrangeId: null,
        clerkId: ''
      },
      shiftStafflist: [],  //该班次上班员工列表
      currentDate: '',
      shiftName: ''
    }
  },
  created () {
    let currentMonth = this.$moment(new Date).format('YYYY-MM');
    this.getSchedule(currentMonth);
  },
  methods: {
    async getSchedule(yearMonth) {
      const res = await fetchScheduleList(yearMonth);
      this.records = []
      if (res.data.result === 'SUCCESS') {
        let list = res.data.data;
        let tempRecords = [];
        list.forEach((item, index) => {
          item.dayArrangePOS.forEach(item02 => {
            tempRecords.push({
              title: item02.arrangeRemarks,
              start: yearMonth+'-'+(index+1)+'',
              clerkSum: item02.clerkSum,
              arrangeId: item02.arrangeId
            });
          });
        });
        this.records = tempRecords;
      }
    },
    eventClick (event, jsEvent, pos) { //点击日期班次
      this.pos = pos
      this.isShowStaffCard = true //显示该班次上班员工列表
      // 获取添加员工参数
      this.addStaffParmas.arrangeId = event.arrangeId
      this.addStaffParmas.arrangeDate = this.$moment(event.start).format('YYYY-M-DD');
      this.shiftName = event.title;
      this.currentDate = this.addStaffParmas.arrangeDate; //当前日期
      this.getShiftInfo(event.start, event.arrangeId)
    },
    closeCard () {
      this.isShowStaffCard = false
    },
    async getShiftInfo (arrangeDate, arrangeId) { //获取该班次上班员工
      // this.checkedStaff = [];
      const res = await fetchDateScheduleList(arrangeDate, arrangeId);
      if(res.data.result === 'SUCCESS'){
        this.shiftStafflist = res.data.data;
        // this.shiftStafflist.forEach(item => {
        //   this.checkedStaff.push(item.clerkId);
        // });
      }else {
        this.shiftStafflist = [];
      }
    },
    async getStaffList () { 
      this.dialogVisible = true
      this.staffOptions = []
      const res = await fetchScheduleStaffList()
      if (res.data.result === 'SUCCESS') {
        res.data.data.list.forEach(item => {
          this.staffOptions.push({
            label: item.clerkName,
            value: item.clerkId
          })
        })
      }
    },
    handleCheckAllChange (val) {
      let staffOptions = []
      this.staffOptions.forEach(item => {
        staffOptions.push(item.value)
      })
      this.checkedStaff = val ? staffOptions : []
      this.isIndeterminate = false
    },
    handleCheckedStaffChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.staffOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.staffOptions.length
    },
    async submitAddStaff () {
      this.dialogVisible = false
      this.addStaffParmas.clerkId = this.checkedStaff;
      const res = await fetchAddScheuleStaff(this.addStaffParmas);
      this.$message({
          message: res.data.message,
          type: res.data.result === "SUCCESS" ? "success" : "error"
      });
    },
    handleMonth(start, end, current){
      let currentMonth = this.$moment(current).format('YYYY-MM');
      this.getSchedule(currentMonth);
    },
    async delScheduleStaff(params){ //删除班次员工
      let postData = {
        arrangeDate: params.arrangeDate,
        clerkId: [params.clerkId],
        arrangeId: this.addStaffParmas.arrangeId
      }
      const res = await fetchDelScheuleStaff(postData);
      if(res.data.result === "SUCCESS"){
        this.shiftStafflist.forEach((item, index) => {
          if(item.clerkId === params.clerkId){
            this.shiftStafflist.splice(index, 1);
          }
        });
      }
      this.$message({
        message: res.data.message,
        type: res.data.result ? 'success' : 'error'
      });
    }
  }
}
</script>
<style lang="less">
    .table-wrapper{
        background-color: #fff;
        border-radius: 5px;
        padding: 0 10px;
        .staff-name{
          padding-left: 20px;
          position: relative;
          font-weight: bold;
          &::before{
            content: '';
            width: 8px;
            height: 8px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            background-color: #28b779;
          }
        }
    }
    .calendar-wrapper{
        position: relative;
        .box-card{
            z-index: 999;
            width: 300px;
            display: none;
            position: absolute;
                .close{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0 8px 0;
                }
                .add-staff{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .text {
                    font-size: 14px;
                }

                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #e6e6e6;
                }
                .el-card__header,.el-card__body{
                    padding: 10px;
                }
                .clearfix:before,
                .clearfix:after {
                    display: table;
                    content: "";
                }
                .clearfix:after {
                    clear: both
                }

        }
        .box-card-active{
            display: block;
        }
    }
</style>
