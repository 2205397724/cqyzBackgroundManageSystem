<template>
    <div>
        <el-form ref=“form” >
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
                    <block v-for="(item,i) in share_kind.list" :key="item.id">
                        <div v-if="checked_kind.list.indexOf(item.id) > -1">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label-width="120px" label="业务受理单位">
                                        <el-select @change="groupOptChange(i,$event)" v-model="checked_group[i]" placeholder="受理单位" clearable>
                                            <el-option v-for="group in share_kind_group[i]" :key="group.id" :label="group.name" :value="group.id" />
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label-width="120px" label="业务选项">
                                        <el-select @change="bizOptChange(i,$event)" v-model="checked_biz[i]" placeholder="业务内容" clearable>
                                            <el-option v-for="biz in checked_group_biz[i]" :key="biz.id" :label="biz.title" :value="biz.id" />
                                        </el-select>
                                    </el-form-item>
                                    <block v-for="materials in material_list[i]" :key="materials.id">
                                        <el-form-item label-width="120px" :label="materials.title">
                                            <el-input v-if="materials.type === 1" v-model="shareRecord_form.material" @blur="inputFunc($event,materials.id)" :placeholder="'请输入'+materials.title"/>
                                            <el-upload v-else-if="materials.type === 2 || materials.type === 4" ref="uploadRef" action="***" :auto-upload="false" :file-list="file_list"
                                                list-type="picture-card"
                                                :on-change="(file, files) => {
                                                    file_list = files
                                                }"
                                                :on-remove="(file, files) => {
                                                    file_list = files
                                                }"></el-upload>
                                        </el-form-item>
                                    </block>
                                </el-col>
                            </el-row>
                        </div>
                    </block>
                </div>
            </page-main>
            <div>
                <el-button type="primary" @click="postShareRecord">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import {
    APIgetShareCategoryList,
    APIgetShareActiveCategoryList,
    APIgetShareServicesList,
    APIgetShareCategoryUserGroupList,
    APIgetShareAllMaterialData
} from '@/api/custom/custom.js'
import {ref,reactive, onMounted} from 'vue'
import { Plus } from '@element-plus/icons-vue'
const from_error = reactive({
    msg: {}
})
let from_examine = reactive({
    item: {}
})
const checked_group = ref([])//选中的用户组（业务受理单位）
const checked_biz = ref([])//选中的业务
// 附件
const file_list = ref([])
// 挂载时获取业务
onMounted(()=>{
    getShareList()
})
// 获取业务种类列表(正常使用的)
const share_kind = reactive({
    list:[]
})
const share_kind_group = reactive([])
const getShareList = () =>{
    APIgetShareActiveCategoryList().then(res=>{
        share_kind.list = res
        // 默认选择第一个申办业务，并获取该业务种类下分配的用户组
        if(checked_kind.list.length === 0) {
            checked_kind.list.push(res[0].id)
        }
        // 遍历获取对应种类下的所有数据
        res.map((item,i) => {
            getBusinessAllData(i,res[i].id)
        })
    })
}
// 获取种类下的所有业务数据
const getBusinessAllData = (index,kid) => {
    APIgetShareAllMaterialData({kid: kid}).then(res => {
        share_kind_group[index] = res.map(item => {
            return {
                id:item.id,
                name:item.name,
                sharebiz:item.sharebiz//业务数据
            }
        })
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
    console.log("val",val)
    checked_kind.list = val
    if(share_biz.list.length < 1) {
        APIgetShareServicesList().then(res=>{
            share_biz.list = res
        })
    }
}
// 选中业务受理单位的事件,遍历出对于的业务选项
const checked_group_biz = reactive([])
const groupOptChange = (index,val) => {
    for(let arr of share_kind_group[index]) {
        if(val === arr.id) {
            checked_group_biz[index] = arr.sharebiz.map((item,i) => {
                return {
                    id:item.id,
                    title:item.title,
                    desc:item.desc,//简介内容（用户协议书）
                    bizmaterials:item.bizmaterials
                }
            })
        }
    }
}
// 选中对于业务的事件，遍历出需要的业务材料
const material_list = reactive([])
const bizOptChange = (index,val) => {
    for(let arr of checked_group_biz[index]) {
        if(val === arr.id) {
            console.log(arr)
            material_list[index] = arr.bizmaterials.map((item) => {
                return {
                    id:item.sharefile.id,
                    title:item.sharefile.title,
                    src:item.sharefile.src,//要件来源：用户上传、不动产中心提供
                    type:item.sharefile.type,//要件类型：文本、图片、文件、手写签名
                }
            })
        }
    }
}
// 文本输入框失去焦点事件
const inputFunc = (e,id) => {
    console.log("e",e)
    shareRecord_form.obj.material.push({
        fid:id,
        content:e.detail.value
    })
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
