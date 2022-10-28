<template>
    <div>
        <page-main class="hidden">
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
                <el-table-column prop="created_at" label="房屋id">
                    <template #default="scope">
                        <span>{{ scope.row.hid }} </span>
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
                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                        <el-button
                            :disabled="scope.row.status !== 10 && scope.row.status !== 11"
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
            <el-button type="primary" @click="downLoadMaterials">下载选中业务材料</el-button>
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
                                    <el-image :preview-src-list="scope.row.file" :src="item" lazy style="height: 60px;"></el-image>
                                </block>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template #default="scope">
                            <el-button
                                :disabled="scope.row.content !== ''"
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
            <!-- <template #footer>
                <div class="footer">
                    <el-button @click="data.switch = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_1">确定</el-button>
                </div>
            </template> -->
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
    APIgetShareElementsList
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
import { getFilesKeys } from '@/util/files.js'
// 多文件打包下载：参考（https://www.npmjs.com/package/fetch-file-j）
import { instance } from 'fetch-file-j'
const loading_tab = ref(false)
const data = reactive({
    list: [],
    switch: false,
    switch_1: false,
    obj: {
        material: []
    },
    arr: [],
    switch_2: false,
    item: {}
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
const page = ref(1)
const per_page = ref(15)
const getShareDataList = () => {
    let params = { page: page.value, per_page: per_page.value, status_many: index.value }
    if (index.value == 0) {
        delete params.status_many
    }
    loading_tab.value = true
    APIgetShareDataList(params).then(res => {
        // console.log(res)
        data.list = res
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
// 监听分页
watch(page, () => {
    getShareDataList()
})
const refreshFunc = () => {
    getShareDataList()
}
refreshFunc()
const type = ref(0)
const dataMaterialFunc = row => {
    materialId_1.value = row.id
    data.switch_1 = true
    APIgetShareDataMaterialList({ rid: row.id }).then(res => {
        // console.log("111",res)
        res.map(item=>{
            if(item.sharefile.type != 1 && item.content != "") {
                // console.log("aaaa")
                item.file = []
                item.file = item.content.split(",")
                for(let i in item.file) {
                    item.file[i] = (import.meta.env.VITE_APP_FOLDER_SRC + item.file[i])
                }
            }
        })
        data.arr = res
        // console.log("123",data.arr)
    })
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
const file_list = ref([])
const dialogExamineCloseFunc = () => {
    // console.log(data.item,type.value)
    if (type.value == 2 || type.value == 3 || type.value == 4) {
        let files = []
        let type = []
        let file_key = []
        if (file_list.value.length > 0) {
            console.log("file_list.value",file_list.value)
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
                    data.switch_2 = false
                    data.switch_1 = false
                    refreshFunc()
                }).catch(() => {
                    ElMessage.error('补充失败')
                })
            })
        } else {
            APIputShareDataMaterial(materialId.value, data.item).then(res => {
                ElMessage.success('补充成功')
                data.switch_2 = false
                data.switch_1 = false
                refreshFunc()
            }).catch(() => {
                ElMessage.error('补充失败')
            })
        }
    }else if(type.value == 1) {
        APIputShareDataMaterial(materialId.value, data.item).then(res => {
                ElMessage.success('补充成功')
                data.switch_2 = false
                data.switch_1 = false
                refreshFunc()
            }).catch(() => {
                ElMessage.error('补充失败')
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
let urls = reactive([])
const downLoadMaterials = ()=>{
    // console.log("123",urls)
    instance.download(urls);
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
</style>
