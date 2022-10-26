<template>
    <div>
        <page-main class="hidden">
            <!-- <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">
                    添加共享数据
                </el-button>
            </div> -->
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
                        <el-button
                            size="small"
                            @click="detailsFunc(scope.row)"
                        >
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="50"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <el-dialog v-model="data.switch_1" title="相关材料" width="60%">
            <el-scrollbar height="300px">
                <el-table
                    :data="data.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
                >
                    <el-table-column prop="id" label="共享记录id">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="关联要件id">
                        <template #default="scope">
                            <span>{{ scope.row.fid }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" label="创建时间" >
                        <template #default="scope">
                            <span>{{ scope.row.created_at }}</span>
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
        <!-- 详情 -->
        <el-dialog
            v-model="data.switch"
            title="详情"
            width="50%"
            :append-to-body="true"
        >
            <div class="details-box">
                <div class="item-hd">相关信息</div>
                <div class="item">
                    <div class="left">业务编号</div>
                    <div class="right">{{ data.obj.sno }}</div>
                </div>
                <div class="item">
                    <div class="left">房屋id</div>
                    <div class="right">{{ data.obj.hid }}</div>
                </div>

                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">
                        <span v-if="data.obj.status == 10">待补充材料</span>
                        <span v-if="data.obj.status == 11">待公众补充材料</span>
                        <span v-if="data.obj.status == 12">待不动产中心补充材料</span>
                        <span v-if="data.obj.status == 20">已共享</span>
                        <span v-if="data.obj.status == 40">共享已结束</span>
                        <span v-if="data.obj.status == 41">公众主动放弃共享</span>
                    </div>
                </div>
                <div class="item">
                    <div class="left">共享结束时间</div>

                    <div class="right">{{ data.obj.end_at }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>

                    <div class="right">{{ data.obj.created_at }}</div>
                </div>
                <div class="item-hd">其他信息：</div>
                <div v-if="data.obj.uinfo" class="item">
                    <div class="left">发起人</div>
                    <div class="right">{{ data.obj.uinfo.name || data.obj.uinfo.nickname || data.obj.uinfo.username }}</div>
                </div>
                <div v-if="data.obj.uinfo" class="item">
                    <div class="left">电话</div>
                    <div class="right">{{ data.obj.uinfo.mobile }}</div>
                </div>
                <div class="item">
                    <div class="left">共享记录id</div>
                    <div class="right">{{ data.obj.id }}</div>
                </div>
                <div class="item-hd">业务材料：</div>
                <block v-for="item in data.obj.materials" :key="item.id">
                    <div v-if="item.sharefile.type === 1" class="item">
                        <div class="left">{{ item.sharefile.title }}</div>
                        <div class="right">{{ item.content }}</div>
                    </div>
                    <div v-if="item.sharefile.type === 2 || item.sharefile.type === 4" class="item">
                        <div class="left">{{ item.sharefile.title }}</div>
                        <div class="right">
                            <div v-for="picture in item.picture" :key="picture">
                                <el-image :preview-src-list="item.picture" :src="picture" lazy style="width: 100px;"></el-image>
                            </div>
                        </div>
                    </div>
                </block>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data.switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 修改添加 -->
        <!-- <el-dialog v-model="data.switch" :title="str_title" width="60%" @closed="dialogClosed">
            <div>
                <el-form ref="ruleFormRef" :model="data.obj">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋" label-width="100px"
                            >
                                <div class="searchUserGroup">
                                    <SearchHouse ref="V" @checkName="checkNameFunc" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="共享截止时间" label-width="100px"
                            >
                                <el-date-picker
                                    v-model="data.obj.end_at"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div class="m-b-10">
                                <el-button type="primary" plain @click="addServiceFunc">添加材料</el-button>
                            </div>
                            <div>
                                <div v-for="(item, i) in data.obj.material" :key="i" class="serve-box">
                                    <el-row :gutter="10">
                                        <el-col :md="24" :lg="24">
                                            <el-form-item
                                                label="要件" label-width="100px"
                                            >
                                                <div class="selecZone" @click="selElements">
                                                    <span v-if="!selectedElement" class="selecChina">请选择</span>
                                                    <span style="margin-left: 11px;">{{ selectedElement }}</span>
                                                </div>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :md="24" :lg="24">
                                            <el-form-item
                                                label-width="100px" label="要件内容"
                                            >
                                                <el-upload
                                                    v-if="file.obj&& file.obj.type !== 1"
                                                    multiple action="***" :auto-upload="false"
                                                    :file-list="item.content" :on-change="(file, files) => {
                                                        item.content = files
                                                    }" :on-remove="(file, files) => {
                                                        item.content = files
                                                    }"
                                                >
                                                    <el-button type="primary">选择</el-button>
                                                </el-upload>
                                                <el-input v-if="file.obj&& file.obj.type == 1" v-model="data.obj.content" placeholder="" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <div class="delete-service" @click="deleteServiceFunc_1(i)">
                                        <el-icon :size="20" color="#F56C6C">
                                            <el-icon-circle-close />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="data.switch=false">取消</el-button>
                    <el-button type="primary" @click="postFunc">确定</el-button>
                </div>
            </template>
        </el-dialog> -->
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
    console.log(flag.value)
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
        console.log(res)
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
const detailsFunc = row => {
    APIgetShareDataDetails(row.id).then(res => {
        console.log(res)
        res.materials.map(share_detail=>{
            if(share_detail.sharefile.type === 2 || share_detail.sharefile.type === 4) {
                share_detail.picture = []
                share_detail.picture = share_detail.content.split(",")
                for(let i in share_detail.picture) {
                    share_detail.picture[i] =(import.meta.env.VITE_APP_FOLDER_SRC + share_detail.picture[i])
                }
            }
        })
        data.obj = res
        data.switch = true
    })
}
// const str_title = ref('添加数据')
// const addResidentialFunc = () => {
//     selectedElement.value = ''
//     data.obj = {}
//     data.obj.material = [{
//         fid: '',
//         content: []
//     }]
//     str_title.value = '添加数据'
//     data.switch = true
// }
// // 添加
// const addServiceFunc = () => {
//     console.log(data.obj)
//     let data_1 = {
//         'fid': '',
//         'content': []
//     }
//     // console.log(typeof (from_examine.item.extra))
//     // data.obj.material.push(data)
// }
// const selElements = () => {
//     data.switch_1 = true
//     let params = {
//         page: page.value,
//         per_page: per_page.value
//     }
//     loading_tab.value = true
//     APIgetShareElementsList(params).then(res => {
//         console.log(res)
//         data.list = res
//         loading_tab.value = false
//     })
// }
// const file = reactive({
//     obj: {}
// })
// const selectedElement = ref('')
// const rowClickFunc = row => {
//     selectedElement.value = row.title
//     file.obj = row
//     data.switch_1 = false
// }
// const postFunc = () => {
//     // console.log(formEl)
//     // from_error.msg = {}
//     // if (!formEl) return
//     // formEl.validate(valid => {
//     //     if (valid) {
//     console.log(data.obj)
//     for (let key in data.obj) {
//         if (data.obj[key] !== null) {
//             if (data.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (data.obj[key] !== 0 || data.obj[key] !== false)) {
//                 delete data.obj[key]
//             }
//         }
//     }
//     if (str_title.value == '修改数据') {
//         console.log(data.obj)
//         APIputShareData(data.obj.id, data.obj).then(res => {
//             refreshFunc()
//             ElMessage.success('修改成功')
//             data.switch = false
//         }).catch(err => {
//             ElMessage.error('修改失败')
//         })
//     } else {
//         APIpostShareData(data.obj).then(res => {
//             refreshFunc()
//             ElMessage.success('添加成功')
//             data.switch = false
//         }).catch(() => {
//             ElMessage.error('添加失败')
//         })
//     }
//     //     } else {
//     //         return false
//     //     }
//     // })
// }
const type = ref(0)
const dataMaterialFunc = row => {
    materialId_1.value = row.id
    data.switch_1 = true
    APIgetShareDataMaterialList({ rid: row.id }).then(res => {
        console.log(res)
        data.arr = res
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
    // APIgetShareElementsList({ page: 1, per_page: 500 }).then(res => {
    //     type.value = getType(res, row.fid)
    //     console.log(getType(res, row.fid))
    // })

}
// const getType = (data, key) => {
//     for (let i in data) {
//         if (data[i].id == key) {
//             return data[i].type
//         }
//     }
//     return ''
// }
const file_list = ref([])
const dialogExamineCloseFunc = () => {
    console.log(data.item,type.value)
    if (type.value == 2 || type.value == 3 || type.value == 4) {
        let files = []
        let file_key = []
        if (file_list.value.length > 0) {
            for (let i in file_list.value) {
                if (!file_list.value[i].raw) {
                    file_key.push(file_list.value[i].name)
                } else {
                    files.push(file_list.value[i].raw)
                }
            }
        }
        if (files.length > 0) {
            getFilesKeys(files, 'material').then(arr => {
                data.item.content = file_key.concat(arr).join(',')
                console.log(data.item)
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
