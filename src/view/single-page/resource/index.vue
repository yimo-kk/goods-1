<template>
    <div class="table-wrapper">
        <el-form  class="form" :rules="rules" ref="form" :model="form" label-width="200px">
            <el-form-item label="店铺名称" prop="storeName">
                <el-input v-model="form.storeName" placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="上传店铺图片">
                <el-upload
                    :action="uploadImgUrl"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :file-list="form.pictures"
                    :on-remove="handleRemovePictures"
                    :on-success="handleUploadPictruesSuccess"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
            </el-form-item>
            <el-form-item label="店铺简介" prop="summary">
                <el-input v-model="form.summary" type="textarea" placeholder="请输入店铺简介"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="contactPhone">
                <el-input v-model="form.contactPhone" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="所属行业">
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option
                        v-for="item in industryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="需求合作伙伴类型">
                <el-checkbox-group v-model="form.resourcesNo" @change="handleCheckbox">
                    <el-checkbox v-for="item in parnerList" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="合作类型数据">
                <el-tabs type="border-card">
                    <el-tab-pane :disabled="!form.isCooperate">
                        <span slot="label"> 资源合作</span>
                        <el-upload
                            class="upload-demo"
                            :action="uploadImgUrl"
                            :disabled="!form.isCooperate" 
                            :on-remove="handleCooperatePicRemove"
                            :file-list="form.cooperationUrl"
                            :on-success="handleUploadCooperatePicSuccess"
                            list-type="picture">
                            <el-button size="small" :disabled="!form.isCooperate" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <span>资源合作文本：</span>
                        <el-input :disabled="!form.isCooperate" v-model="form.cooperation" type="textarea"></el-input>
                    </el-tab-pane>
                    <el-tab-pane :disabled="!form.isShareChannel" label="渠道合作">
                        <el-upload
                            class="upload-demo"
                            :action="uploadImgUrl"
                            :disabled="!form.isShareChannel"
                            :on-remove="handleShareChannelPicRemove"
                            :file-list="form.channelShareUrl"
                            :on-success="handleUploadShareChannelPicSuccess"
                            list-type="picture">
                            <el-button size="small" :disabled="!form.isShareChannel" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <span>渠道合作文本：</span>
                        <el-input :disabled="!form.isShareChannel" v-model="form.channelShare" type="textarea"></el-input>
                    </el-tab-pane>
                    <el-tab-pane :disabled="!form.isShareProject" label="项目合作">
                        <el-upload
                            class="upload-demo"
                            :action="uploadImgUrl"
                            :disabled="!form.isShareProject"
                            :on-remove="handleShareProjectPicRemove"
                            :file-list="form.projectShareUrl"
                            :on-success="handleUploadShareProjectPicSuccess"
                            list-type="picture">
                            <el-button size="small" :disabled="!form.isShareProject" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <span>项目合作文本：</span>
                        <el-input v-model="form.projectShare" :disabled="!form.isShareProject" type="textarea"></el-input>
                    </el-tab-pane>
                    <el-tab-pane :disabled="!form.isExpandCustomer" label="拓客合作">
                        <el-upload
                            class="upload-demo"
                            :action="uploadImgUrl"
                            :disabled="!form.isExpandCustomer"
                            :on-remove="handleExpandCustomerPicRemove"
                            :file-list="form.expandCustomerUrl"
                            :on-success="handleUploadExpandCustomerPicSuccess"
                            list-type="picture">
                            <el-button size="small" :disabled="!form.isExpandCustomer" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <span>拓客合作文本：</span>
                        <el-input v-model="form.expandCustomer" :disabled="!form.isExpandCustomer" type="textarea"></el-input>
                    </el-tab-pane>
                </el-tabs>
            </el-form-item>
            <el-form-item>
                <el-button :loading="submitLoading" @click="submit(btnType, 'form')" type="primary">{{btnType === 'save' ? '保存' : '修改'}}</el-button>
                <el-button @click="formReset">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import config from "@/config/index";
import { fetchResourceInfo, addResourceInfo, updateResourceInfo } from '@/api/resource'

const DIC = {
    VAILD: [
        {
            label: "真",
            value: "true"
        },
        {
            label: "假",
            value: "false"
        }
    ],
    SEX: [
        {
            label: "男",
            value: 0
        },
        {
            label: "女",
            value: 1
        }
    ],
    PARNER: [
        {
            label: "资源合作",
            value: 1
        },
        {
            label: "渠道合作",
            value: 2
        },
        {
            label: "项目合作",
            value: 3
        },
        {
            label: "拓客合作",
            value: 4
        }
    ],
    INDUSTRY: [
        {
            label: "美容",
            value: 1
        },
        {
            label: "美发",
            value: 2
        },
        {
            label: "美甲",
            value: 3
        },
        {
            label: "美体",
            value: 4
        },
        {
            label: "医美",
            value: 5
        }
    ]
};
export default {
    data() {
        return {
            form: {
                storeName: "",
                summary: "",
                contactPhone: "",
                category: 1,
                pictures: [],
                resourcesNo: [],
                cooperation: "",
                cooperationUrl: [],
                channelShare: "",
                channelShareUrl: [],
                projectShare: "",
                projectShareUrl: [],
                expandCustomer: "",
                expandCustomerUrl: [],
                isCooperate: false,
                isExpandCustomer: false,
                isShareChannel: false,
                isShareProject: false,
            },
            btnType: "save",
            dialogImageUrl: "",
            dialogVisible: false,
            uploadImgUrl: config.uploadImgUrl,
            industryList: DIC.INDUSTRY,
            parnerList: DIC.PARNER,
            submitLoading: false,
            rules: {
                storeName: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' }
                ],
                summary: [
                    { required: true, message: '请输入店铺简介', trigger: 'blur' }
                ],
                contactPhone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.getResourceInfo();
    },
    methods: {
         async getResourceInfo(){
            const res = await fetchResourceInfo();
            if(res.data.result === 'SUCCESS'){
                if(res.data.data){
                    this.btnType = 'update'
                }
                let info = res.data.data;
                let parnerList = [];
                let pictures = this.fitlerPicList(info.pictures);
                let channelShareUrl = this.fitlerPicList(info.channelShareUrl);
                let cooperationUrl = this.fitlerPicList(info.cooperationUrl);
                let projectShareUrl = this.fitlerPicList(info.projectShareUrl);
                let expandCustomerUrl = this.fitlerPicList(info.expandCustomerUrl);

                let form = {
                    storeName: info.storeName,
                    summary: info.summary,
                    contactPhone: info.contactPhone,
                    category: info.category,
                    channelShare: info.channelShare,
                    channelShareUrl: channelShareUrl,
                    cooperation: info.cooperation,
                    cooperationUrl: cooperationUrl,
                    projectShare: info.projectShare,
                    projectShareUrl: projectShareUrl,
                    parnerList: parnerList,
                    expandCustomer: info.expandCustomer,
                    expandCustomerUrl: expandCustomerUrl,
                    pictures: pictures,
                    resourcesNo: JSON.parse(info.resourcesNo), //合作分类
                    isCooperate: info.isCooperate, 
                    isExpandCustomer: info.isExpandCustomer,
                    isShareChannel: info.isShareChannel,
                    isShareProject: info.isShareProject
                }
                this.form = Object.assign({}, form);
            }
        },
        fitlerPicList(val) {
            let arr = [];
            if(val){
                let tempArr = val.split(',');

                tempArr.forEach(item => {
                    arr.push({
                        name: item,
                        url: item
                    });
                });
                return arr;
            }else {
                return arr;
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCheckbox(){
            this.form.isCooperate = false;
            this.form.isShareChannel = false;
            this.form.isShareProject = false;
            this.form.isExpandCustomer = false;
            this.form.resourcesNo.forEach(item => {
                switch(item){
                    case 1:
                        this.form.isCooperate = true;
                        break;
                    case 2:
                        this.form.isShareChannel = true;
                        break;
                    case 3:
                        this.form.isShareProject = true;
                        break;
                    case 4:
                        this.form.isExpandCustomer = true;
                        break;
                }
            });
        },
        handleRemovePictures(file){
            this.removeFile('pictures', file);
        },
        handleCooperatePicRemove(file){
            this.removeFile('cooperationUrl', file);
        },
        handleShareChannelPicRemove(file){
            this.removeFile('channelShareUrl', file);
        },
        handleShareProjectPicRemove(file){
            this.removeFile('projectShareUrl', file);
        },
        handleExpandCustomerPicRemove(file){
            this.removeFile('expandCustomerUrl', file);
        },
        removeFile(param, file){
            this.form[param].forEach((item, index) => {
                if(item.url === file.url){
                    this.form[param].splice(index ,1)
                }
            });
        },  
        handleUploadPictruesSuccess(response){
            this.uploadPicSuccess('pictures', response);
        },
        handleUploadCooperatePicSuccess(response){
            this.uploadPicSuccess('cooperationUrl', response);
        },
        handleUploadShareChannelPicSuccess(response){
            this.uploadPicSuccess('channelShareUrl', response);
        },
        handleUploadShareProjectPicSuccess(response){
            this.uploadPicSuccess('projectShareUrl', response);
        },
        handleUploadExpandCustomerPicSuccess(response){
            this.uploadPicSuccess('expandCustomerUrl', response);
        },
        uploadPicSuccess(param,response){
            let res = response.data;
            this.form[param].push({
                name: res.fileName,
                url: res.url
            });
        },
        submit(type, formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let postData = {
                        storeName: this.form.storeName, //店铺名
                        summary: this.form.summary, //简介
                        contactPhone: this.form.contactPhone, //联系电话
                        category: this.form.category, //资源分类
                        channelShare: this.form.channelShare, //渠道文本
                        channelShareUrl: this.filterUrlString(this.form.channelShareUrl), //渠道图片
                        cooperation: this.form.cooperation, //资源文本
                        cooperationUrl: this.filterUrlString(this.form.cooperationUrl), //资源图片
                        projectShare: this.form.projectShare, //项目文本
                        projectShareUrl: this.filterUrlString(this.form.projectShareUrl), //项目图片
                        expandCustomer: this.form.expandCustomer,
                        expandCustomerUrl: this.filterUrlString(this.form.expandCustomerUrl),
                        pictures:  this.filterUrlString(this.form.pictures), //店铺图片
                        resourcesNo: this.form.resourcesNo, //合作分类
                        isCooperate: this.form.isCooperate, 
                        isExpandCustomer: this.form.isExpandCustomer,
                        isShareChannel: this.form.isShareChannel,
                        isShareProject: this.form.isShareProject
                    }
                    this.submitLoading = true;
                    if(type === 'update'){ //修改
                        const res = await updateResourceInfo(postData);
                        this.submitLoading = false;
                         this.$message({
                            message: res.data.message,
                            type: res.data.result === "SUCCESS" ? 'success':'error'
                        });
                        this.getResourceInfo();
                    }else { //添加
                        const res = await addResourceInfo(postData);
                        this.submitLoading = false;
                        this.$message({
                            message: res.data.message,
                            type: res.data.result === "SUCCESS" ? 'success':'error'
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        filterUrlString(arr){
            let str = ''
            if(arr.length > 0){
                console.log(arr,'00');
                arr.forEach(item => {
                    str += item.url + ','
                });
                str = str.replace(/,$/gi, "");
                return str;
            }else {
                return str;
            }
        },
        formReset(){
            let form = {
                storeName: "",
                summary: "",
                contactPhone: "",
                category: 1,
                pictures: [],
                resourcesNo: [],
                cooperation: "",
                cooperationUrl: [],
                channelShare: "",
                channelShareUrl: [],
                projectShare: "",
                projectShareUrl: [],
                expandCustomer: "",
                expandCustomerUrl: [],
                isCooperate: false,
                isExpandCustomer: false,
                isShareChannel: false,
                isShareProject: false,
            }
            this.form = Object.assign({}, form);
        }
    }
};
</script>
<style lang="less" scoped>
.table-wrapper {
    padding: 30px 0;
    .form {
        width: 700px;
    }
}
</style>
