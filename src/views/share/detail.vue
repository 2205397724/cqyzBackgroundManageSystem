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
                    <el-col :sm="24" :md="12" :lg="12">
                        <div class="p-tb-10 size-base font-grey">
                            申请人信息
                        </div>
                        <table class="table" border="1" v-if="details.obj.uinfo">
                            <tr>
                                <td>申请人：</td>
                                <td>{{ details.obj.uinfo.name || details.obj.uinfo.nickname || details.obj.uinfo.username }}</td>
                            </tr>
                            <tr>
                                <td>联系方式：</td>
                                <td>{{ details.obj.uinfo.mobile }}</td>
                            </tr>
                            <tr>
                                <td>证件号码：</td>
                                <td>{{ details.obj.uinfo.id_card || '' }}</td>
                            </tr>
                            <tr>
                                <td>申请时间：</td>
                                <td>{{ details.obj.created_at }}</td>
                            </tr>
                        </table>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="12">
                        <div class="p-tb-10 size-base font-grey">
                            房屋信息
                        </div>
                        <table class="table" border="1" v-if="details.obj.uinfo.house">
                            <tr>
                                <td>房屋坐落：</td>
                                <td>{{ details.obj.uinfo.house.house_addr }}</td>
                            </tr>
                            <tr>
                                <td>不动产登记号：</td>
                                <td>{{ details.obj.uinfo.house.bdc_sno || '' }}</td>
                            </tr>
                            <tr>
                                <td>不动产单元号：</td>
                                <td>{{ details.obj.uinfo.house.bdc_uno || '' }}</td>
                            </tr>
                            <tr>
                                <td>业务编号：</td>
                                <td>{{ details.obj.sno || '' }}</td>
                            </tr>
                        </table>
                    </el-col>
                </el-row>
                <el-button type="primary" @click="modifyShareRecord">修改相关信息</el-button>
                <div class="p-t-20 p-b-10 size-base font-grey">申请业务：</div>
                <div class="el-tag m-r-10" v-for="item in details.obj.business" :key="item.id">
                    <span class="size-base" v-if="item.sharebiz.group">{{ item.sharebiz.group.name }}：</span>
                    <span class="size-base" v-if="item.sharebiz">{{ item.sharebiz.title }}</span>
                </div>
                <div class="p-t-20 p-b-10 size-base font-grey">
                    业务材料：
                    <el-button type="primary" @click="downLoadMaterials">下载业务材料</el-button>
                </div>
                <table class="table m-b-10" border="1" v-for="item in details.obj.materials" :key="item.id">
                    <tr v-if="item.sharefile.type === 1">
                        <td style="width: 120px;">{{ item.sharefile.title }}</td>
                        <td>{{ item.content }}</td>
                    </tr>
                    <tr v-if="item.sharefile.type === 2 || item.sharefile.type === 4">
                        <td style="width: 120px;">{{ item.sharefile.title }}</td>
                        <td>
                            <div class="flex-row">
                                <div class="p-10" v-for="picture in item.picture" :key="picture">
                                    <el-image :preview-src-list="item.picture" :src="picture" lazy style="width: 100px;"></el-image>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="table m-b-10" border="1">
                    <tr>
                        <td style="width: 120px;">身份证件</td>
                        <td>
                            <div class="flex-row">
                                <div class="p-10" v-for="picture in details.obj.uinfo.card.sfz" :key="picture">
                                    <el-image :preview-src-list="details.obj.uinfo.card.sfz" :src="picture" lazy style="width: 100px;"></el-image>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px;">不动产权证</td>
                        <td>
                            <div class="flex-row">
                                <div class="p-10" v-for="picture in details.obj.uinfo.card.bdc" :key="picture">
                                    <el-image :preview-src-list="details.obj.uinfo.card.bdc" :src="picture" lazy style="width: 100px;"></el-image>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </page-main>
        <el-dialog v-model="switch_people" title="修改相关信息">
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
                    <el-button @click="switch_people=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc()">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, reactive} from 'vue'
import {
    APIgetShareDataDetails,
    APIputShareRecordData
} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { instance } from 'kin-file-fetch'
const route = useRoute()
const switch_people = ref(false)
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
const card = reactive({})
// 获取共享记录详细
const getShareDataDetail = ()=>{
    APIgetShareDataDetails(route.query.id).then(res => {
        card = res.uinfo.card
        res.materials.map(share_detail=>{
            if(share_detail.sharefile.type === 2 || share_detail.sharefile.type === 4) {
                if(share_detail.content != "") {
                    share_detail.picture = []
                    share_detail.picture = share_detail.content.split(",")
                    for(let i in share_detail.picture) {
                        share_detail.picture[i] =(import.meta.env.VITE_APP_FOLDER_SRC + share_detail.picture[i])
                    }
                }
            }
        })
        //组装身份证产权证
        res.uinfo.card.sfz.map((key,i)=>{
            res.uinfo.card.sfz[i] = (import.meta.env.VITE_APP_FOLDER_SRC + key)
        })
        res.uinfo.card.bdc.map((key,i)=>{
            res.uinfo.card.bdc[i] = (import.meta.env.VITE_APP_FOLDER_SRC + key)
        })
        details.obj = res
        console.log("res",res)
    })
}
//修改相关业务
const modifyShareRecord = () => {
    switch_people.value = true
    from_examine.item = {
        name:details.obj.uinfo.name,
        end_at:details.obj.end_at.split(" ")[0],
        bdc_sno:details.obj.uinfo.house.bdc_sno,
        house_addr:details.obj.uinfo.house.house_addr,
        mobile:details.obj.uinfo.mobile,
        id_card:details.obj.uinfo.id_card,
        bdc_uno:details.obj.uinfo.house.bdc_uno,
        card:card,
        // card:details.obj.uinfo.card,
        sno:details.obj.sno,
    }
}
const dialogExamineCloseFunc = () => {
    APIputShareRecordData(details.obj.id, from_examine.item).then(res => {
        ElMessage.success('修改成功')
        switch_people.value = false
        getShareDataDetail()
    })
}
// 下载业务材料
let urls = reactive([])
const downLoadMaterials = ()=>{
    // 遍历判断材料是否有图片
    urls = []
    for(let i in details.obj.materials) {
        if(details.obj.materials[i].picture) {
            urls.push(...details.obj.materials[i].picture)
        }
    }
    details.obj.uinfo.card.sfz.map(key=>{
        urls.push(key)
    })
    details.obj.uinfo.card.bdc.map(key=>{
        urls.push(key)
    })
    let username = details.obj.uinfo.name || details.obj.uinfo.nickname || details.obj.uinfo.username
    let address = details.obj.uinfo.house.house_addr
    instance.download(urls,username +'-'+ address);
}
onMounted(() => {
    getShareDataDetail()
})
</script>
<style lang="scss" scoped>
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
