<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">
                    添加业务
                </el-button>
            </div>
            <el-table
                v-loading="loading_tab" :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
            >
                <el-table-column prop="id" label="业务名称">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="状态" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.desc }} </span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.active == 1" size="small" type="success">启用</el-tag>
                        <el-tag v-if="scope.row.active == 0" size="small" type="info">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="修改时间">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button type="success" size="small" @click="addRelatedMaterialFunc(scope.row.id)">
                            相关材料
                        </el-button>
                        <el-button type="primary" size="small" @click="examineListFunc(scope.row)">
                            修改
                        </el-button>
                        <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
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
            <!-- 修改添加 -->
            <el-dialog v-model="data.switch" :title="str_title" width="60%" @closed="dialogClosed">
                <div>
                    <el-form ref="ruleFormRef" :model="data.obj">
                        <el-row :gutter="10">
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="业务名称" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-input v-model="data.obj.title" placeholder="" />
                                <!-- <el-input
                                    v-model="data.obj.logo"
                                    placeholder=""
                                /> -->
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="关联部门" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <div class="searchUserGroup">
                                        <SearchUserGroup ref="V" v-model:name="userGroupName" @checkName="checkNameFunc" />
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="业务种类" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-select v-model="data.obj.kid" class="head-btn" placeholder="" clearable>
                                        <el-option
                                            v-for="item in data.arr" :key="item.id"
                                            :label="item.title" :value="item.id"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="业务状态" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-select v-model="data.obj.active" class="head-btn" placeholder="" clearable>
                                        <el-option
                                            v-for="item in opts_all.obj.flow_active" :key="item.key"
                                            :label="item.val" :value="item.key"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="24">
                                <el-form-item label="服务协议" label-width="80px" prop="content" :error="err_add.obj&&err_add.obj.desc?err_add.obj.desc[0]:''">
                                    <editor v-model="data.obj.desc" class="w_100" />
                                </el-form-item>
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
            </el-dialog>
            <el-dialog v-model="data_1.switch" title="相关材料" width="60%">
                <div class="m-b-20">
                    <el-button type="primary" :icon="Plus" size="large" @click="addMaterialFunc">
                        添加材料
                    </el-button>
                </div>
                <el-scrollbar height="300px">
                    <el-table
                        v-loading="loading_tab" :data="data_1.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
                    >
                        <el-table-column prop="id" label="业务材料名称id">
                            <template #default="scope">
                                <span>{{ scope.row.id }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="业务id">
                            <template #default="scope">
                                <span>{{ scope.row.bid }}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                        <el-table-column prop="created_at" label="状态" width="100">
                            <template #default="scope">
                                <el-tag v-if="scope.row.active == 1" size="small" type="success">启用</el-tag>
                                <el-tag v-if="scope.row.active == 0" size="small" type="info">禁用</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template #default="scope">
                                <el-button type="primary" size="small" @click="examineListFunc_1(scope.row)">
                                    修改
                                </el-button>
                                <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc_1(scope.row)">
                                    <template #reference>
                                        <el-button type="danger" size="small">
                                            删除
                                        </el-button>
                                    </template>
                                </el-popconfirm>
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
            <!-- 业务材料修改添加 -->
            <el-dialog v-model="data_1.switch_1" :title="str_title_1" width="50%">
                <div>
                    <el-form ref="ruleFormRef" :model="data.obj">
                        <el-row :gutter="10">
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="要件" label-width="100px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <div class="selecZone" @click="selElements">
                                        <span v-if="!selectedElement" class="selecChina">请选择</span>
                                        <span style="margin-left: 11px;">{{ selectedElement }}</span>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24">
                                <el-form-item
                                    label-width="100px" label="是否启用" style="text-align: left;"
                                >
                                    <el-radio-group v-model="data_1.obj.active" class="ml-4">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <template #footer>
                    <div class="footer">
                        <el-button @click="data_1.switch_1=false">取消</el-button>
                        <el-button type="primary" @click="postFunc_1">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <el-dialog v-model="data_1.switch_2" width="60%" title="选择要件">
                <el-table
                    v-loading="loading_tab" :data="data_1.list" :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab_1" @row-click="rowClickFunc"
                >
                    <el-table-column prop="id" label="要件名称">
                        <template #default="scope">
                            <span>{{ scope.row.title }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="name" label="状态" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.desc }} </span>
                    </template>
                </el-table-column> -->
                    <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                    <el-table-column prop="type" label="要件类型">
                        <template #default="scope">
                            <span v-if="scope.row.type == 1">文本</span>
                            <span v-if="scope.row.type == 2">图片</span>
                            <span v-if="scope.row.type == 3">文件</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="src" label="要件来源">
                        <template #default="scope">
                            <span v-if="scope.row.src == 1">用户上传 </span>
                            <span v-if="scope.row.src == 2">不动产登记中心</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="src_sys" label="来源类型">
                        <template #default="scope">
                            <span v-if="scope.row.src_sys == 1">身份证 </span>
                            <span v-if="scope.row.src_sys == 2">不动产权证</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="examineListFunc(scope.row)">
                                修改
                            </el-button>
                            <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc(scope.row)">
                                <template #reference>
                                    <el-button type="danger" size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </page-main>
    </div>
</template>
<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetShareCategoryList,
    APIgetShareServicesList,
    APIdeleteShareServices,
    APIputShareServices,
    APIpostShareServices,
    APIgetGroupDetails
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const loading_tab = ref(false)
const data = reactive({
    list: [],
    switch: false,
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const page = ref(1)
const per_page = ref(15)
const str_title = ref('添加业务')
const getShareServicesList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    loading_tab.value = true
    APIgetShareServicesList(params).then(res => {
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
    APIgetShareCategoryList({ page: 1, per_page: 500 }).then(res => {
        console.log(res)
        data.arr = res
        loading_tab.value = false
    })
}
// 监听分页
watch(page, () => {
    getShareServicesList()
})
const V = ref(null)
const dialogClosed = () => {
    userGroupName.value = ''
    V.value.clearFunc()
}
const checkNameFunc = val => {
    console.log(val)
    data.obj.gid = val.id
}
const refreshFunc = () => {
    getShareServicesList()
}
refreshFunc()
const addResidentialFunc = () => {
    data.obj = {}
    str_title.value = '添加业务'
    data.switch = true
}

// 同意拒绝提交
const postFunc = () => {
    // console.log(formEl)
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    for (let key in data.obj) {
        if (data.obj[key] !== null) {
            if (data.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (data.obj[key] !== 0 || data.obj[key] !== false)) {
                delete data.obj[key]
            }
        }
    }
    if (str_title.value == '修改业务') {
        console.log(data.obj)
        APIputShareServices(data.obj.id, data.obj).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            data.switch = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostShareServices(data.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            data.switch = false
        }).catch(() => {
            ElMessage.error('添加失败')
        })
    }
    //     } else {
    //         return false
    //     }
    // })
}
const userGroupName = ref('')
const examineListFunc = val => {
    str_title.value = '修改业务'
    data.switch = true
    data.obj = val
    if (val.desc == null) {
        val.desc = ''
    }
    console.log(data.obj)
    APIgetGroupDetails(val.gid).then(res => {
        console.log(res)
        userGroupName.value = res.name
    })
}

const deleteFunc = val => {
    APIdeleteShareServices(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const data_1 = reactive({
    arr: [],
    switch: false,
    switch_1: false,
    switch_2: false,
    list: [],
    obj: {}
})
import {
    APIgetShareElementsList,
    APIgetShareMaterialList,
    APIdeleteShareMaterial,
    APIputShareMaterial,
    APIpostShareMaterial
} from '@/api/custom/custom.js'
const materialId = ref('')
const addRelatedMaterialFunc = id => {
    console.log(id)
    materialId.value = id
    APIgetShareMaterialList({ bid: id }).then(res => {
        console.log(res)
        data_1.arr = res
        data_1.switch = true
    })

}
const str_title_1 = ref('添加材料')
const examineListFunc_1 = val => {
    str_title_1.value = '修改材料'
    data_1.switch_1 = true
    val.active = val.active + ''
    data_1.obj = val
}
const postFunc_1 = () => {
    // console.log(formEl)
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    data_1.obj.bid = materialId.value
    for (let key in data_1.obj) {
        if (data_1.obj[key] !== null) {
            if (data_1.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (data_1.obj[key] !== 0 || data_1.obj[key] !== false)) {
                delete data_1.obj[key]
            }
        }
    }
    if (str_title_1.value == '修改材料') {
        console.log(data_1.obj)
        APIputShareMaterial(data_1.obj.id, data_1.obj).then(res => {
            addRelatedMaterialFunc(materialId.value)
            ElMessage.success('修改成功')
            data_1.switch_1 = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostShareMaterial(data_1.obj).then(res => {
            addRelatedMaterialFunc(materialId.value)
            ElMessage.success('添加成功')
            data_1.switch_1 = false
        }).catch(() => {
            ElMessage.error('添加失败')
        })
    }
    //     } else {
    //         return false
    //     }
    // })
}
const deleteFunc_1 = val => {
    APIdeleteShareMaterial(val.id).then(res => {
        addRelatedMaterialFunc(materialId.value)
        ElMessage.success('删除成功')
    })
}
const addMaterialFunc = () => {
    data_1.obj = {}
    selectedElement.value = ''
    str_title_1.value = '添加材料'
    data_1.switch_1 = true
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    loading_tab.value = true
    APIgetShareElementsList(params).then(res => {
        console.log(res)
        data_1.list = res
        loading_tab.value = false
    })
}
const selElements = () => {
    data_1.switch_2 = true
}
const selectedElement = ref('')
const rowClickFunc = row => {
    selectedElement.value = row.title
    data_1.obj.fid = row.id
    data_1.switch_2 = false
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['flow_active', 'card_type']).then(res => {
    opts_all.obj = res
})
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
