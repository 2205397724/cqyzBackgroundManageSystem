<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                发起共享
            </div>
            <div class="bg-color-grey p-10">共享信息</div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="m-10">申请人信息</div>
                        <el-form-item label-width="120px" label="姓名">
                            <el-input  v-model="shareRecord_form.obj.name" placeholder="请输入姓名"/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="身份证号">
                            <el-input  v-model="shareRecord_form.obj.id_card" placeholder="请输入身份证号"/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="手机号码">
                            <el-input  v-model="shareRecord_form.obj.mobile" placeholder="请输入手机号码" required type="number" maxlength="11"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="m-10">身份证件</div>
                        <el-upload ref="uploadRef" action="***" :auto-upload="false" :file-list="file_list"
                            list-type="picture-card"
                            :on-change="(file, files) => {
                                file_list = files
                            }"
                            :on-remove="(file, files) => {
                                file_list = files
                            }"></el-upload>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="m-10">房屋信息</div>
                        <el-form-item label-width="120px" label="房屋坐落">
                            <el-input  v-model="shareRecord_form.obj.house_addr" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="不动产权证号">
                            <el-input  v-model="shareRecord_form.obj.bdc_sno" placeholder="请输入不动产权证号"/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="不动产单元号">
                            <el-input  v-model="shareRecord_form.obj.bdc_uno" placeholder="请输入不动产单元号"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="m-10">不动产权证</div>
                        <el-upload ref="uploadRef" action="***" :auto-upload="false" :file-list="file_list"
                            list-type="picture-card"
                            :on-change="(file, files) => {
                                file_list = files
                            }"
                            :on-remove="(file, files) => {
                                file_list = files
                            }"></el-upload>
                    </el-col>
                </el-row>
            </div>
            <div class="bg-color-grey p-10 m-t-10">申办业务</div>
            <div class="m-10">
                <el-checkbox-group
                    v-model="checked_kind.list"
                    @change="handleCheckedShareKindChange"
                >
                    <el-checkbox v-for="item in share_kind.list" :key="item.id" :label="item.id">{{item.title}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="bg-color-grey p-10">业务详情</div>
            <div class="m-10">
                <block v-for="item in share_biz.list" :key="item.id">
                    <div v-if="checked_kind.list.indexOf(item.kid) > -1">
                        <div>{{item.title}}</div>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label-width="120px" label="业务受理单位">
                                    <el-input  v-model="shareRecord_form.obj.title" placeholder=""/>
                                </el-form-item>
                                <el-form-item label-width="120px" label="业务选项">
                                    <el-input  v-model="shareRecord_form.obj.title" placeholder=""/>
                                </el-form-item>
                                <el-form-item label-width="120px" label="用户协议书">
                                    <el-upload ref="uploadRef" action="***" :auto-upload="false" :file-list="file_list"
                                        list-type="picture-card"
                                        :on-change="(file, files) => {
                                            file_list = files
                                        }"
                                        :on-remove="(file, files) => {
                                            file_list = files
                                        }"></el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </block>
            </div>
        </page-main>
        <div>
            <el-button type="primary" @click="postShareRecord">提交</el-button>
        </div>
    </div>
</template>

<script setup>
import {
    APIgetShareCategoryList,
    APIgetShareServicesList
} from '@/api/custom/custom.js'
import {ref,reactive, onMounted} from 'vue'
import { Plus } from '@element-plus/icons-vue'
const from_error = reactive({
    msg: {}
})
let from_examine = reactive({
    item: {}
})
const file_list = ref([])
// 挂载时获取业务
onMounted(()=>{
    getShareList()
})
// 获取业务种类列表
const share_kind = reactive({
    list:[]
})
const getShareList = () =>{
    APIgetShareCategoryList().then(res=>{
        share_kind.list = res
    })
}
// 处理已选业务种类
const checked_kind = reactive({
    list:[]
})
const share_biz = reactive({
    list:[]
})
const handleCheckedShareKindChange = val => {
    checked_kind.list = val
    if(share_biz.list.length < 1) {
        APIgetShareServicesList().then(res=>{
            share_biz.list = res
        })
    }
}
// 同意拒绝提交
const shareRecord_form = reactive({
    obj:{
        name:'',
        id_card:'',
        mobile:'',
        house_addr:'',
        bdc_sno:'',
        bdc_uno:'',
        end_at:'',
        bids:[],
        material:[]
    }
})
const postShareRecord = () => {
    console.log("111",shareRecord_form.obj)
}
</script>

<style lang="scss" scoped>
// 修改upload样式
:deep(.el-upload-dragger) {
    width: 148px;
    height: 148px;
}
</style>
