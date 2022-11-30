<template>
    <div>
        <page-main class="hidden">
            <el-form ref=“form” >
                <div class="m-b-20">
                    发起共享
                </div>
                <div class="bg-color-grey p-10">共享信息</div>
                <div>
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form-item label-width="120px" label="共享截止时间" class="p-t-20">
                                <el-date-picker
                                    v-model="shareRecord_form.obj.end_at"
                                    type="date"
                                    format="YYYY-MM-DD"
                                    value-format="YYYY-MM-DD"
                                    placeholder="选择日期"
                                    :disabled-date="pickerOptions.disabledDate"
                                    :shortcuts="pickerOptions.shortcuts"
                                    size="large"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                            <div class="m-tb-10">身份证件</div>
                            <div class="flex-row">
                                <div>
                                    <el-upload ref="uploadRefSfz" class="idcardBox" action="***" list-type="picture-card" limit="1"
                                        :auto-upload="false"
                                        :file-list="idCardFiles"
                                        :class="{hideclass:hideFaceIcon}"
                                        :on-preview="handlePictureCardPreview"
                                        :on-change="(file, files) => {
                                            ocrIdCardFiles(files,'face')
                                        }"
                                        :on-remove="(file, files) => {
                                            delIdCardFiles(files,'face')
                                        }">
                                        <el-icon class="font-grey size-base cardtip"><Plus/></el-icon>
                                        <!-- <span class="font-grey size-base cardtip">正面</span> -->
                                    </el-upload>
                                    <el-button v-show="switch_sfz_notification" plain @click="openNotification(0)">查看身份证信息</el-button>
                                </div>
                            </div>
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
                            <el-form-item label-width="120px" label="业务编号">
                                <el-input  v-model="shareRecord_form.obj.sno" placeholder="请输入业务编号"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="m-tb-10">不动产权证</div>
                            <el-upload ref="uploadRefBdc" action="***" list-type="picture-card"
                                :auto-upload="false"
                                :file-list="bdcFiles"
                                :on-preview="handlePictureCardPreview"
                                :on-change="(file, files) => {
                                    orcBdcFiles(files,'bdc')
                                }"
                                :on-remove="(file, files) => {
                                    delBdcFiles(files,'bdc')
                                }">
                                <el-icon><Plus/></el-icon>
                            </el-upload>
                            <el-button v-show="switch_bdc_notification" plain @click="openNotification(1)">查看不动产证信息</el-button>
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
                                <el-col :span="16">
                                    <el-form-item label-width="120px" label="业务受理单位">
                                        <el-select @change="groupOptChange(i,$event)" v-model="checked_group[i]" placeholder="受理单位" clearable>
                                            <el-option v-for="group in share_kind_group[i]" :key="group.id" :label="group.name" :value="group.id" />
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label-width="120px" label="办理业务">
                                        <el-select @change="bizOptChange(i,$event)" v-model="checked_biz[i]" placeholder="业务内容" clearable>
                                            <el-option v-for="biz in checked_group_biz[i]" :key="biz.id" :label="biz.title" :value="biz.id" />
                                        </el-select>
                                    </el-form-item>
                                    <block v-for="materials in material_list[i]" :key="materials.id">
                                        <el-form-item label-width="120px" :label="materials.title" v-if="materials.type === 1">
                                            <el-input  v-model="input_content[i]" @blur="inputFunc($event,materials.id)" :placeholder="'请输入'+materials.title"/>
                                        </el-form-item>
                                        <el-form-item label-width="120px" :label="materials.title" v-else-if="materials.type === 2" >
                                            <el-upload ref="uploadRef" action="***" :auto-upload="false" :file-list="file_list[i]"
                                                list-type="picture-card"
                                                :on-change="(file, files) => {
                                                    file_list[i] = files
                                                    file_list_fid[i] = materials.id
                                                }"
                                                :on-remove="(file, files) => {
                                                    file_list[i] = files
                                                    file_list_fid[i] = materials.id
                                                }"></el-upload>
                                        </el-form-item>
                                    </block>
                                </el-col>
                            </el-row>
                        </div>
                    </block>
                </div>
                <div class="p-20">
                    <el-button type="primary" @click="postShareRecord">提交</el-button>
                </div>
            </el-form>
            <el-dialog v-model="dialogVisible" width="60%">
                <img :src="dialogImageUrl" alt="图片预览" style="width: 100%;"/>
            </el-dialog>
        </page-main>
    </div>
</template>

<script setup>
import {
    APIgetShareCategoryList,
    APIgetShareActiveCategoryList,
    APIgetShareServicesList,
    APIgetShareCategoryUserGroupList,
    APIgetShareAllMaterialData,
    APIpostShareRecord,
    postOrcIdcard,postOrcGeneral,
    getOrcResult
} from '@/api/custom/custom.js'
import { ElMessage,ElLoading,ElNotification } from 'element-plus'
import { getFilesKeys } from '@/util/files.js'
import {ref,reactive, onMounted} from 'vue'
import {Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
let input_content = reactive([])
const checked_group = ref([])//选中的用户组（业务受理单位）
const checked_biz = ref([])//选中的业务
let loading = ''
// 附件
const hideFaceIcon = ref(false)
const hideBackIcon = ref(false)
const idCardFiles = ref([])
const bdcFiles = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const file_list = ref([])
const file_list_fid = ref([])
const shareRecord_form = reactive({
    obj:{
        name:'',
        id_card:'',
        card:{
            sfz:[],
            bdc:[]
        },
        mobile:'',
        house_addr:'',
        bdc_sno:'',
        bdc_uno:'',
        end_at: Date.now() + 3600 * 1000 * 24 * 7,
        bids:[],
        material:[],
    }
})
//时间组件快捷功能配置
const pickerOptions = {
    disabledDate(time) {
        return time.getTime() < Date.now();
    },
    shortcuts: [{
        text: '明天',
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
        }
    }, {
        text: '一周',
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            return date;
        }
    }, {
        text: '15天',
        value: () =>{
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
            return date;
        }
    }, {
        text: '30天',
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            return date;
        }
    }]
}
//选择身份证照片
const ocrIdCardFiles = (files,side)=>{
    const p_size = files[0].size / 1024 / 1024
    if(p_size > 4) {
        ElMessage.error('上传文件大小不能超过4MB')
        return
    }
    if(side=='face'){
        hideFaceIcon.value = true
    }
    if(side=='back'){
        hideBackIcon.value = true
    }
    let fileraw=[]
    files.forEach(item=>{
        fileraw.push(item.raw)
    })
    // uploadFile(fileraw,side)
}
//删除身份证照片
const delIdCardFiles=(files,side)=>{
    if(side=='face'){
        hideFaceIcon.value = false
    }
    if(side=='back'){
        hideBackIcon.value = false
    }
}
//选择不动产证件
const orcBdcFiles = (files,side)=>{
    const p_size = files[0].size / 1024 / 1024
    if(p_size > 4) {
        ElMessage.error('上传文件大小不能超过4MB')
        return
    }
    let fileraw=[]
    files.forEach(item=>{
        fileraw.push(item.raw)
    })
    uploadFile(fileraw,side)
}
//删除不动产证件
const delBdcFiles = (files,side)=>{

}
//上传图片并识别
const identity_message = ref([])
const uploadFile = (files,fside)=>{
    loading = ElLoading.service({
        lock: true,
        text: '上传识别中',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    let sideArr = ['bdc','face','back']
    getFilesKeys(files, 'shareCard').then(res => {
        res.forEach((key)=>{
            let data = {
                'file_key':key,
            }
            let sideli = sideArr.indexOf(fside)
            // 身份证信息
            if(sideli>0){
                shareRecord_form.obj.card.sfz.push(key)
                data.side = sideli == 1 ? 1: 2
                postOrcGeneral(data).then(orc=>{
                    let i = 0
                    let timeout = setInterval(()=>{
                        getOrcResult(orc.id).then(orcre =>{
                            i++
                           if(i>4 || orcre.status === 20) clearInterval(timeout)
                            console.log(orcre)
                            identity_message.value[0] = orcre
                            switch_sfz_notification.value = true
                        }).catch(err=>{
                            loading.close()
                            ElMessage.error('未找到识别结果！')
                            // clearInterval(timeout)
                        })
                    },4000)
                }).catch(err=>{
                    loading.close()
                    ElMessage.error('识别错误！')
                })
            }else if(sideli==0){
                // 不动产权证信息
                shareRecord_form.obj.card.bdc.push(key)
                postOrcGeneral(data).then(orc=>{
                    let i = 0
                    let timeout = setInterval(()=>{
                        getOrcResult(orc.id).then(orcre =>{
                            i++
                            if(i>4 || orcre.status === 20) clearInterval(timeout)
                            console.log(orcre)
                            identity_message.value[1] = orcre
                            switch_bdc_notification.value = true
                        }).catch(err=>{
                            loading.close()
                            ElMessage.error('未找到识别结果！')
                            // clearInterval(timeout)
                        })
                    },4000)
                }).catch(err=>{
                    loading.close()
                    ElMessage.error('识别错误！')
                })
            }
        })
    }).catch(err=>{
        loading.close()
        ElMessage.error('获取KEY失败！')
    })
}
// 预览图片
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
};
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
    checked_kind.list = val
    if(share_biz.list.length < 1) {
        APIgetShareServicesList().then(res=>{
            share_biz.list = res
        })
    }
}
// 选中业务受理单位的事件,遍历出对应的业务选项
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
    shareRecord_form.obj.bids[index] = val//插入相应的业务id
    for(let arr of checked_group_biz[index]) {
        if(val === arr.id) {
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
    let hasFid = shareRecord_form.obj.material.filter( mat => mat.fid == id)
    if(hasFid.length>0){
        let fkey = shareRecord_form.obj.material.findIndex( mat => mat.fid == id)
        shareRecord_form.obj.material.splice(fkey,1)
    }
    shareRecord_form.obj.material.push({
        fid:id,
        content:e.target.value
    })
}
// 同意拒绝提交
const postShareRecord = () => {
    new Promise((resolve,reject) => {
        let file = []
        let file_key = []
        for(let i in file_list.value) {
            if(file_list.value[i].length > 0) {
                for(let j in file_list.value[i]) {
                    if(!file_list.value[i][j].raw) {
                        file_key.push(file_list.value[i][j].name)
                    } else {
                        file.push(file_list.value[i][j].raw)
                    }
                }

            }
        }
        if(file.length > 0) {
            getFilesKeys(file, 'water').then(arr => {
                arr.map((item,i) => {
                    console.log(item,file_list_fid.value[i],i)
                    shareRecord_form.obj.material.push({
                        fid:file_list_fid.value[i],
                        content:item
                    })
                })
            })
        }
        resolve(shareRecord_form.obj)
    }).then(res => {
        console.log(shareRecord_form.obj)
        APIpostShareRecord(shareRecord_form.obj).then(res => {
            console.log(shareRecord_form.obj)
            ElMessage.success('提交成功')
            refreshFunc()
        })
    })
}
// 刷新页面数据
const refreshFunc = () => {
    shareRecord_form.obj = {
        name:'',
        id_card:'',
        card:{
            sfz:[],
            bdc:[]
        },
        mobile:'',
        house_addr:'',
        bdc_sno:'',
        bdc_uno:'',
        end_at:'',
        bids:[],
        material:[],
    }
    // checked_kind.list = []
    share_biz.list = []
    input_content = []
    checked_group.value = []
    checked_biz.value = []
    file_list.value = []
    file_list_fid.value = []
    switch_bdc_notification.value = false
    switch_sfz_notification.value = false
    ElNotification.closeAll()
}
// 查看房屋产权信息
const switch_bdc_notification = ref(false)
const switch_sfz_notification = ref(false)
const openNotification = (index) => {
    ElNotification.closeAll()
    ElNotification({
        title: '不动产证信息',
        dangerouslyUseHTMLString: true,
        message: `<view>
            ${
                identity_message.value[index].content.words_result.map(item => {
                    return `<view>${item.words}</view>
                            <br >`
                }).join('')
            }
            </view>`,
        duration: 0,
    })
}
</script>

<style lang="scss" scoped>
// 修改upload样式
:deep(.el-upload-dragger) {
    width: 148px;
    height: 148px;
}
:deep .hideclass .el-upload--picture-card {
    display: none;
}
:deep .idcardBox .el-upload--picture-card,
:deep .idcardBox .el-upload-list--picture-card .el-upload-list__item {
    width: 200px;
    height: 120px;
    position: relative;
}
.cardtip {
    position: relative;
    top: calc(50% - 70px);
}
</style>
