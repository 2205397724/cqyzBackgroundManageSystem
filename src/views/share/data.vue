<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <router-link
                    class="el-button el-button--primary p-tb-20 p-lr-30 size-base"
                    :to="{name: 'addShare'}"
                    style="text-decoration: inherit;border: none;background-color: #409eff;"
                >发起共享</router-link>
            </div>
            <el-button-group class="btn m-b-20">
                <!-- <el-badge :value="index == 0 ? total : ''" class="item" :hidden="flag"> -->
                <el-button :type="index == 0 ? 'primary' : ''" @click="StatusFunk(0)">全部</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 10 ? total : ''" class="item" :hidden="flag1"> -->
                <el-button :type="index == 10 ? 'primary' : ''" @click="StatusFunk(10)">待补充资料</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 20 ? total : ''" class="item" :hidden="flag2"> -->
                <el-button :type="index == 20 ? 'primary' : ''" @click="StatusFunk(20)">共享结束</el-button>
                <!-- </el-badge> -->
                <!-- <text><el-button class="m-l-40" type="primary" @click="{i}">发起共享</el-button></text> -->
            </el-button-group>
            <el-table
                v-loading="loading_tab"
                :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="id" label="业务编号">
                    <template #default="scope">
                        <span>{{ scope.row.sno }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="姓名" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.tgt_type }} </span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->
                <el-table-column prop="created_at" label="房屋坐落">
                    <template #default="scope">
                        <span>{{ scope.row.uinfo.house?.house_addr }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="状态" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.status == 10">待补充材料</span>
                        <span v-if="scope.row.status == 11">待公众补充材料</span>
                        <span v-if="scope.row.status == 12">待不动产中心补充材料</span>
                        <span v-if="scope.row.status == 20">已共享</span>
                        <span v-if="scope.row.status == 40">共享已结束</span>
                        <span v-if="scope.row.status == 41">公众主动放弃共享</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="共享结束时间">
                    <template #default="scope">
                        <span>{{ scope.row.end_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button
                            size="small" type="success"
                            @click="dataMaterialFunc(scope.row)"
                        >
                            相关材料
                        </el-button>
                        <router-link class="el-tag m-l-10" style="text-decoration: inherit;"
                            :to="{
                                name: 'shareDataDetail',
                                query: {
                                    id: scope.row.id,
                                },
                            }"
                        >
                            详情
                        </router-link>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFunc(scope.row)"
                            class="m-l-20"
                        >
                            <template #reference>
                                <el-button type="danger" class="btnfix m-l-10">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 翻页 -->
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="500"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <el-dialog v-model="data.switch_1" title="相关材料" width="60%">
            <el-button type="primary" class="m-b-10" @click="downLoadMaterials">下载选中业务材料</el-button>
            <el-scrollbar height="300px">
                <el-table
                    :data="data.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
                    @selection-change="selectionChange"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="id" label="材料名称">
                        <template #default="scope">
                            <span>{{ scope.row.sharefile.title }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="材料说明">
                        <template #default="scope">
                            <span>{{ scope.row.sharefile.desc }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="材料">
                        <template #default="scope">
                            <span v-if="scope.row.sharefile.type === 1">{{ scope.row.content}} </span>
                            <span v-else>
                                <block v-for="item in scope.row.file" :key="item">
                                    <el-image :preview-src-list="scope.row.file" :src="item" lazy style="height: 60px; margin: 5px;"></el-image>
                                </block>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="材料状态">
                        <template #default="scope">
                            <el-switch
                            v-model="scope.row.status"
                            style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                            active-text="有效"
                            inactive-text="失效"
                            :active-value="20"
                            :inactive-value="30"
                            class="switchStyle"
                            @change="SwitchFunc(scope.row)"
                        />
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="small"
                                @click="addMaterialFunc(scope.row)"
                            >
                                补充材料
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
            <el-table
                :data="data.list_uinfo"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
            >
                <el-table-column prop="" label="材料名称">
                    <template #default="scope">
                        <span>{{scope.row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="材料">
                    <template #default="scope">
                        <block v-for="item in scope.row.file" :key="item">
                            <el-image :preview-src-list="scope.row.file" :src="item" lazy style="height: 60px; margin: 5px;"></el-image>
                        </block>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                        <template #default="scope">
                            <el-button
                                type="primary"
                                size="small"
                                @click="modifyMaterialFunc(scope.row)"
                            >
                                修改材料
                            </el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 补充材料弹窗 -->
        <el-dialog v-model="data.switch_2" :title="str_title" width="50%">
            <div>
                <el-form ref="ruleFormRef" :model="data.item">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label-width="100px" label="材料标题"
                            >
                            {{material_title}}
                            </el-form-item>
                            <el-form-item
                                label-width="100px" label="材料内容"
                            >
                                <el-upload
                                    v-if="type == 2 || type == 3 || type == 4"
                                    multiple action="***" :auto-upload="false"
                                    :file-list="file_list" :on-change="(file, files) => {
                                        file_list = files
                                    }" :on-remove="(file, files) => {
                                        file_list = files
                                    }"
                                >
                                    <el-button type="primary">选择</el-button>
                                </el-upload>
                                <el-input v-if="type == 1" v-model="data.item.content" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="data.switch_2 = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 修改材料弹窗 -->
        <el-dialog v-model="data.switch_3" :title="str_title" width="50%">
            <div>
                <el-form ref="ruleFormRef" :model="data.item">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label-width="100px" label="材料名称"
                            >
                            {{record_title}}
                            </el-form-item>
                            <el-form-item
                                label-width="100px" label="材料内容"
                            >
                                <el-upload
                                    multiple action="***" :auto-upload="false"
                                    :file-list="file_list" :on-change="(file, files) => {
                                        file_list = files
                                    }" :on-remove="(file, files) => {
                                        file_list = files
                                    }"
                                >
                                    <el-button type="primary">选择</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="data.switch_3 = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFuncRecord">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetShareDataList,
    APIgetShareDataDetails,
    APIgetShareDataMaterialList,
    APIputShareDataMaterial,
    APIgetShareElementsList,
    APIdeleteShareData,
    APIputShareRecordData
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
import { getFilesKeys } from '@/util/files.js'

import { instance } from 'kin-file-fetch'
const loading_tab = ref(false)
const data = reactive({
    list: [],
    list_uinfo:[],
    switch: false,
    switch_1: false,
    obj: {
        material: []
    },
    arr: [],
    // 补充材料
    switch_2: false,
    item: {},
    //修改材料（相关证件）
    switch_3: false,
})
const index = ref(0)
const flag = ref(true)
const flag1 = ref(true)
const flag2 = ref(true)
const StatusFunk = val => {
    page.value = 1
    index.value = val
    getShareDataList()
    flag.value = false
    flag1.value = false
    flag2.value = false
    // console.log(flag.value)
}

let urls = reactive([])

const details = reactive({
    obj: {
        materials: []
    },
})
const page = ref(1)
const per_page = ref(15)
const getShareDataList = () => {
    let params = { page: page.value, per_page: per_page.value, status_many: index.value }
    if (index.value == 0) {
        delete params.status_many
    }
    // 判断是否为水电气公司，如果是传入对应用户组id
    let user_group = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))
    // console.log(user_group)
    if(user_group.type === 8) {
        params.gid = user_group.id
    }
    loading_tab.value = true
    APIgetShareDataList(params).then(res => {
        // console.log(res)
        data.list= res
        loading_tab.value = false
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
//获取详情
const getShareDataDetail = (id)=>{
    APIgetShareDataDetails(id).then(res => {
        details.obj = res
        // 遍历出uinfo中的card相关证件图片信息(不动产、身份证)
        data.list_uinfo = []
        if(res.uinfo.card) {
            if(res.uinfo.card.bdc) {
                data.list_uinfo[0] = {rid:id,type:'bdc',content:'不动产证',file:[]}//将共享记录id存入方便后面修改,type判断是身份证还是不动产证
                for(let i in res.uinfo.card.bdc) {
                    data.list_uinfo[0].file[i] = (import.meta.env.VITE_APP_FOLDER_SRC + res.uinfo.card.bdc[i])
                }
            }
            if(res.uinfo.card.sfz) {
                data.list_uinfo[1] = {rid:id,type:'sfz',content:'身份证件',file:[]}
                for(let i in res.uinfo.card.sfz) {
                    data.list_uinfo[1].file[i] = (import.meta.env.VITE_APP_FOLDER_SRC + res.uinfo.card.sfz[i])
                }
            }
        }
    })
}
// 监听分页
watch(page, () => {
    getShareDataList()
})
const refreshFunc = () => {
    data.switch_1 = false
    data.switch_2 = false
    data.switch_3 = false
    getShareDataList()
}
refreshFunc()
const type = ref(0)
const dataMaterialFunc = row => {
    materialId_1.value = row.id
    data.switch_1 = true
    APIgetShareDataMaterialList({ rid: row.id }).then(res => {
        res.map(item=>{
            if(item.sharefile.type != 1 && item.content != "") {
                item.file = []
                item.file = item.content.split(",")
                for(let i in item.file) {
                    item.file[i] = (import.meta.env.VITE_APP_FOLDER_SRC + item.file[i])
                }
            }
        })
        data.arr = res
    })
    getShareDataDetail(row.id)
}
const materialId = ref('')
const materialId_1 = ref('')
const material_title = ref('')
// 补充材料
const addMaterialFunc = row => {
    materialId.value = row.id
    material_title.value = row.sharefile.title
    type.value = row.sharefile.type
    data.item = {}
    data.switch_2 = true
}
const recordlId = ref('')
const record_title = ref('')
// 修改相关证件图片
const modifyMaterialFunc = row => {
    recordlId.value = row.rid
    record_title.value = row.content
    type.value = row.type//bdc or sfz
    data.switch_3 = true
    // console.log("modifyMaterialFunc",row)
}
const file_list = ref([])
const dialogExamineCloseFunc = () => {
    // console.log(data.item,type.value)
    if (type.value == 2 || type.value == 3 || type.value == 4) {
        let files = []
        let type = []
        let file_key = []
        if (file_list.value.length > 0) {
            // console.log("file_list.value",file_list.value)
            for (let i in file_list.value) {
                if (!file_list.value[i].raw) {
                    file_key.push(file_list.value[i].name)
                } else {
                    files.push(file_list.value[i].raw)
                }
                type.push(file_list.value[i].name.split(".")[1])
                // console.log("type",type)
            }
        }
        if (files.length > 0) {
            getFilesKeys(files, 'material',type).then(arr => {
                data.item.content = file_key.concat(arr).join(',')
                // console.log(data.item)
                APIputShareDataMaterial(materialId.value, data.item).then(res => {
                    ElMessage.success('补充成功')
                    file_list.value = []
                    refreshFunc()
                }).catch(() => {
                    ElMessage.error('补充失败')
                })
            })
        } else {
            APIputShareDataMaterial(materialId.value, data.item).then(res => {
                ElMessage.success('补充成功')
                refreshFunc()
            }).catch(() => {
                ElMessage.error('补充失败')
            })
        }
    }else if(type.value == 1) {
        APIputShareDataMaterial(materialId.value, data.item).then(res => {
                ElMessage.success('补充成功')
                refreshFunc()
            }).catch(() => {
                ElMessage.error('补充失败')
            })
    }
}
// 相关证件图片修改的提交
const dialogExamineCloseFuncRecord = () => {
    let files = []
    let file_key = []
    if (file_list.value.length > 0) {
        // console.log("file_list.value",file_list.value)
        for (let i in file_list.value) {
            if (!file_list.value[i].raw) {
                file_key.push(file_list.value[i].name)
            } else {
                files.push(file_list.value[i].raw)
            }
        }
    }
    if (files.length > 0) {
        getFilesKeys(files, 'material',type).then(arr => {
            // data.item.content = file_key.concat(arr).join(',')
            // console.log("123456",data.item)
            // console.log("222",recordlId.value,arr)
            let data = {
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
            if(type.value == 'bdc') {
                data.card.bdc = arr
                APIputShareRecordData(recordlId.value, data).then(res => {
                    ElMessage.success('修改成功')
                    file_list.value = []
                    refreshFunc()
                })
            }else if(type.value == 'sfz') {
                data.card.sfz = arr
                APIputShareRecordData(recordlId.value, data).then(res => {
                    ElMessage.success('修改成功')
                    file_list.value = []
                    refreshFunc()
                })
            }
        })
    }
}
// 选择项变化时触发的事件
const selectionChange = (selection) => {
    // console.log("aaa",selection)
    urls = []
    // 遍历提取出图片材料的urls地址
    selection.map(item=>{
        if(item.sharefile.type === 2 || item.sharefile.type === 4) {
            if(item.content != "") {
                let arr = []
                arr = item.content.split(",")
                // console.log("arr",arr)
                for(let i in arr) {
                    urls.push(import.meta.env.VITE_APP_FOLDER_SRC + arr[i])
                }
            }
        }
        // console.log("urls",urls)
    })
}
// 下载业务材料
const downLoadMaterials = ()=>{
    details.obj.uinfo.card.sfz.map(key=>{
        urls.push(import.meta.env.VITE_APP_FOLDER_SRC + key)
    })
    details.obj.uinfo.card.bdc.map(key=>{
        urls.push(import.meta.env.VITE_APP_FOLDER_SRC + key)
    })
    let username = details.obj.uinfo.name || details.obj.uinfo.nickname || details.obj.uinfo.username
    let address = details.obj.uinfo.house.house_addr
    instance.download(urls,username +'-'+ address);
}
// switch 状态改变事件
const SwitchFunc = (e) => {
    let status = e.status === 20 ? 20 : 30
    let content = e.content
    APIputShareDataMaterial(e.id,{content,status}).then(res => {
        ElMessage.success('修改成功')
    }).catch(() => {
        ElMessage.error('修改失败')
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteShareData(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.btn button {
    padding: 20px 40px;
}
.selecZone {
    width: 100%;
    height: 32px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    .selecChina {
        margin-left: 11px;
        color: #aaa;
    }
    .selecChina_1 {
        margin-left: 11px;
        font-size: 14px;
        line-height: 29px;
        color: #c0c4d5;
    }
}
.switchStyle ::v-deep .el-switch__label {
    position: absolute !important;
    display: none !important;
    color: #fff !important;
    width: 80px;
}
.switchStyle ::v-deep .el-switch__label--left {
    z-index: 9 !important;
    left: 17px !important;
}
.switchStyle ::v-deep .el-switch__label--right {
    z-index: 9 !important;
    left: -5px !important;
}
.switchStyle ::v-deep .el-switch__label.is-active {
    display: block !important;
}
.switchStyle.el-switch ::v-deep .el-switch__core,
.switchStyle ::v-deep .el-switch__label {
    width: 60px !important;
}
.el-table ::v-deep .el-table__cell {
    z-index: auto !important;
}
</style>
