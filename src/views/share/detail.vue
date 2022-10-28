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
                                <td>联系方式：</td>
                                <td>{{ details.obj.uinfo.mobile }}</td>
                            </tr>
                            <tr>
                                <td>证件号码：</td>
                                <td>{{ details.obj.uinfo.id_card || '' }}</td>
                                <td>申请时间：</td>
                                <td>{{ details.obj.created_at }}</td>
                            </tr>
                        </table>
                    </el-col>
                    <el-col :sm="24" :md="12" :lg="12">
                        <div class="p-tb-10 size-base font-grey">
                            房屋信息
                        </div>
                        <table class="table" border="1" v-if="details.obj.house">
                            <tr>
                                <td>房屋名称：</td>
                                <td>{{ details.obj.house.name }}</td>
                                <td>房屋坐落：</td>
                                <td>{{ details.obj.house.addr }}</td>
                            </tr>
                            <tr>
                                <td>建筑面积：</td>
                                <td>{{ details.obj.house.area_build || '' }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </el-col>
                </el-row>
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
                            <div v-for="picture in item.picture" :key="picture">
                                <el-image :preview-src-list="item.picture" :src="picture" lazy style="width: 100px;"></el-image>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import { ref, reactive} from 'vue'
import { APIgetShareDataDetails} from '@/api/custom/custom.js'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
// 多文件打包下载：参考（https://www.npmjs.com/package/fetch-file-j）
import { instance } from 'fetch-file-j'
const route = useRoute()
const details = reactive({
    obj: {
        materials: []
    },
})
const getShareDataDetail = ()=>{
    APIgetShareDataDetails(route.query.id).then(res => {
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
        details.obj = res
        // console.log("123",details.obj)
    })
}
// 下载业务材料
let urls = reactive([])
const downLoadMaterials = ()=>{
    // 遍历判断材料是否有图片
    urls = []
    console
    for(let i in details.obj.materials) {
        if(details.obj.materials[i].picture) {
            urls.push(...details.obj.materials[i].picture)
            // console.log("123",urls)
        }
    }
    instance.download(urls);
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
