<template>
    <div>
        <page-main class="hidden">
            <div class="details-box">
                <div class="size-lg">{{ details.obj.sno }}</div>
                <div class="p-t-10 font-grey size-sm">
                   <span>申请时间：{{ details.obj.created_at }}</span>
                   <span class="p-lr-20">结束时间：{{ details.obj.end_at }}</span>
                   <span>业务ID：{{ details.obj.id }}</span>
                </div>
                <div class="p-tb-10">
                    <span class="el-tag" v-if="details.obj.status == 10">待补充材料</span>
                    <span class="el-tag" v-if="details.obj.status == 11">待公众补充材料</span>
                    <span class="el-tag" v-if="details.obj.status == 12">待不动产中心补充材料</span>
                    <span class="el-tag" type="success" v-if="details.obj.status == 20">已共享</span>
                    <span class="el-tag" type="info" v-if="details.obj.status == 40">共享已结束</span>
                    <span class="el-tag" type="danger" v-if="details.obj.status == 41">公众主动放弃共享</span>
                </div>
                <el-row :gutter="20">
                    <el-col :sm="24">
                        <div class="p-tb-10 size-base font-grey flex-row" style="align-items: center;">
                            <div class="m-r-20">
                                申请人信息
                            </div>
                            <el-button type="primary" @click="modifyShareRecord">修改相关信息</el-button>
                        </div>
                        <table class="table" border="1" v-if="details.obj.uinfo">
                            <tr>
                                <td style="width: 120px;">申请人：</td>
                                <td style="width: 50%;">{{ details.obj.uinfo.name || details.obj.uinfo.nickname || details.obj.uinfo.username }}</td>
                                <td>身份证件</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;">联系方式：</td>
                                <td>{{ details.obj.uinfo.mobile }}</td>
                                <td rowspan="3">
                                    <div class="flex-row">
                                        <div class="p-10" v-for="picture in details.obj.uinfo.card.sfz" :key="picture">
                                            <el-image :preview-src-list="details.obj.uinfo.card.sfz" :src="picture" lazy style="width: 100px;"></el-image>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;">证件号码：</td>
                                <td>{{ details.obj.uinfo.id_card || '' }}</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;">申请时间：</td>
                                <td>{{ details.obj.created_at }}</td>
                            </tr>
                        </table>
                    </el-col>
                    <el-col :sm="24">
                        <div class="p-tb-10 size-base font-grey">
                            房屋信息
                        </div>
                        <table class="table" border="1" v-if="details.obj.uinfo.house">
                            <tr>
                                <td style="width: 120px;">房屋坐落：</td>
                                <td style="width: 50%;">{{ details.obj.uinfo.house.house_addr }}</td>
                                <td>不动产权证</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;">不动产登记号：</td>
                                <td>{{ details.obj.uinfo.house.bdc_sno || '' }}</td>
                                <td rowspan="3">
                                    <div class="flex-row">
                                        <div class="p-10" v-for="picture in details.obj.uinfo.card.bdc" :key="picture">
                                            <el-image :preview-src-list="details.obj.uinfo.card.bdc" :src="picture" lazy style="width: 100px;"></el-image>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 120px;">不动产单元号：</td>
                                <td>{{ details.obj.uinfo.house.bdc_uno || '' }}</td>
                            </tr>
                            <tr>
                                <td style="width: 120px;">业务编号：</td>
                                <td>{{ details.obj.sno || '' }}</td>
                            </tr>
                        </table>
                    </el-col>
                </el-row>
                <div class="p-tb-10 size-base font-grey flex-row" style="align-items: center;">
                    <div class="m-r-20">
                        申办业务：
                    </div>
                    <el-button type="primary" @click="getDownloadRecordList">查看下载记录</el-button>
                </div>
                <div class="m-b-20" v-for="item in details.obj.business" :key="item.id">
                    <div class="flex-row bg-color-grey p-20">
                        <div class="m-r-30">
                            <div class="size-base strong" v-if="item.sharebiz.group">{{ item.sharebiz.group.name }}</div>
                            <div class="p-t-10">
                                <span class="size-base">申办业务：</span>
                                <span class="size-base" v-if="item.sharebiz">{{ item.sharebiz.title }}</span>
                            </div>
                        </div>
                        <el-button type="success" @click="downLoadMaterials(item.sharebiz.bizmaterials)">下载业务材料</el-button>
                    </div>
                    <table class="table" style="background: #fff;" v-for="materials in item.sharebiz.bizmaterials" :key="materials.id">
                        <tr v-if="materials.filetype === 1">
                            <td style="width: 120px;">{{ materials.cpt.sharefile.title }}</td>
                            <td>{{ materials.filecontent }}</td>
                        </tr>
                        <tr v-if="materials.filetype === 2 || materials.filetype  === 4">
                            <td style="width: 120px;">{{ materials.cpt.sharefile.title }}</td>
                            <td>
                                <div class="flex-row">
                                    <div class="p-10" v-for="picture in materials.filecontent" :key="picture">
                                        <el-image :preview-src-list="materials.filecontent" :src="picture" lazy style="width: 100px;"></el-image>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </page-main>
        <el-dialog v-model="switch_message" title="修改相关信息">
            <el-form ref="ruleFormRef">
                <el-row :gutter="10">
                    <div class="width-100 m-b-20 p-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                        <span class="size-base strong" style="color: #409eff;flex: 1;">申请人信息</span>
                    </div>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="申请人"  label-width="120px">
                            <el-input v-model="from_examine.item.name" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="联系方式" label-width="120px">
                            <el-input v-model="from_examine.item.mobile" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="证件号码" label-width="120px">
                            <el-input v-model="from_examine.item.id_card" placeholder="" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <div class="width-100 m-b-20 p-b-10 display" style="border-bottom: solid 1px #e4e7ed;">
                        <span class="size-base strong" style="color: #409eff;flex: 1;">房屋信息</span>
                    </div>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="房屋坐落" label-width="120px">
                            <el-input v-model="from_examine.item.house_addr" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="不动产登记号" label-width="120px">
                            <el-input v-model="from_examine.item.bdc_sno" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="不动产单元号" label-width="120px">
                            <el-input v-model="from_examine.item.bdc_uno" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-form-item label="业务编号" label-width="120px">
                            <el-input v-model="from_examine.item.sno" placeholder="" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_message=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="switch_download_record" title="下载记录">
                <el-table :data="download_record.list" class="tab_1">
                    <el-table-column label="头像" width="100">
                        <template #default="scope">
                            <el-image :src="VITE_APP_FOLDER_SRC+scope.row.stub.avatar" alt="" style="width: 50px; height: 50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="100">
                        <template #default="scope">
                            <text>{{scope.row.stub.name || scope.row.stub.nickname || scope.row.stub.username}}</text>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号" prop="stub.mobile"></el-table-column>
                    <el-table-column label="用户组" prop="stub.group_name"></el-table-column>
                    <el-table-column label="职位描述" prop="stub.group_post"></el-table-column>
                    <el-table-column label="下载时间" width="200" prop="created_at"></el-table-column>
                </el-table>
                <el-pagination
                    v-model:current-page="page"
                    style="float: right;"
                    layout="prev,next,jumper,"
                    :total="Infinity"
                    :page-size="per_page"
                    background
                    prev-text="上一页"
                    next-text="下一页"
                    hide-on-single-page
                />
            <template #footer>
                <div class="footer">
                    <el-button type="danger" @click="switch_download_record=false">关闭</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, reactive, watch} from 'vue'
import {
    APIgetShareDataDetails,
    APIputShareRecordData,
    APIpostShareRecordDownload,
    APIgetShareRecordDownloadList
} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { instance } from 'kin-file-fetch'
const uid = localStorage.getItem('uid')
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
const route = useRoute()
//控制修改信息的弹窗
const switch_message = ref(false)
//控制下载记录的弹窗
const switch_download_record = ref(false)
const details = reactive({
    obj: {
        uinfo:{
            card:{},
            house:{}
        },
        materials: []
    },
})
const from_examine = reactive({
    item: {}
})
let per_page = ref(10)
let page = ref(1)
// 获取共享记录详细
const getShareDataDetail = ()=>{
    APIgetShareDataDetails(route.query.id).then(res => {
        res.business.map(bus=>{
            bus.sharebiz?.bizmaterials?.map(files=>{
                files.filetype = files.cpt.sharefile.type
                if(files.cpt.sharefile.type==1){
                    files.filecontent =files.cpt?.content
                }else if(files.cpt.sharefile.type==2 || files.cpt.sharefile.type==4){
                    files.filecontent = files.cpt.content.split(",")
                    for(let i in files.filecontent) {
                        files.filecontent[i] =(import.meta.env.VITE_APP_FOLDER_SRC + files.filecontent[i])
                    }
                }
            })
        })
        //组装身份证产权证
        res.uinfo.card.sfz.map((key,i)=>{
            if(key.indexOf(import.meta.env.VITE_APP_FOLDER_SRC) == -1 ) {
                res.uinfo.card.sfz[i] = (import.meta.env.VITE_APP_FOLDER_SRC + key)
            }
        })
        res.uinfo.card.bdc.map((key,i)=>{
            if(key.indexOf(import.meta.env.VITE_APP_FOLDER_SRC) == -1 ) {
                res.uinfo.card.bdc[i] = (import.meta.env.VITE_APP_FOLDER_SRC + key)
            }
        })
        details.obj = res
    })
}
//修改相关业务
const modifyShareRecord = () => {
    switch_message.value = true
    from_examine.item = {
        name:details.obj.uinfo.name,
        end_at:details.obj.end_at.split(" ")[0],
        bdc_sno:details.obj.uinfo.house.bdc_sno,
        house_addr:details.obj.uinfo.house.house_addr,
        mobile:details.obj.uinfo.mobile,
        id_card:details.obj.uinfo.id_card,
        bdc_uno:details.obj.uinfo.house.bdc_uno,
        card:details.obj.uinfo.card,
        sno:details.obj.sno,
    }
}
const dialogExamineCloseFunc = () => {
    APIputShareRecordData(details.obj.id, from_examine.item).then(res => {
        ElMessage.success('修改成功')
        switch_message.value = false
        getShareDataDetail()
    })
}
// 下载业务材料
let urls = reactive([])
const downLoadMaterials = (mates)=>{
    // 遍历判断材料是否有图片
    urls = []
    mates.map(item=>{
        if(item.filetype ==2 || item.filetype==4){
            urls.push(...item.filecontent)
        }
    })
    details.obj.uinfo.card.sfz.map(key=>{
        urls.push(key)
    })
    details.obj.uinfo.card.bdc.map(key=>{
        urls.push(key)
    })
    let username = details.obj.uinfo.name || details.obj.uinfo.nickname || details.obj.uinfo.username
    let address = details.obj.uinfo.house.house_addr
    instance.download(urls,username +'-'+ address);
    let data = {
        rid:details.obj.id,
        gid:JSON.parse(localStorage.getItem(uid + '_user_group')).id
    }
    APIpostShareRecordDownload(data).then(res => {
        ElMessage.success('下载成功')
    })
}
// 获取下载记录
const download_record = reactive({
    list:[]
})
const getDownloadRecordList = () => {
    switch_download_record.value = true
    let params = {
        page: page.value,
        per_page: per_page.value,
        rid:details.obj.id
    }
    APIgetShareRecordDownloadList(params).then(res => {
        download_record.list = res
        let btnNext = document.querySelector('.btn-next')
        if (res.length < per_page.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
onMounted(() => {
    getShareDataDetail()
})
watch(page, () => {
    getDownloadRecordList()
})
</script>
<style lang="scss" scoped>
/* 修改el-pagination翻页的样式 */
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
table tr td {
    padding: 10px;
}
.table_td {
    color: #72767b;
}
.table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #efefef;
    font-size: 14px;
}
</style>
