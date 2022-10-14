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
                        <el-tag v-if="scope.row.active == 0" size="small" type="danger">禁用</el-tag>
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
                                        <SearchUserGroup ref="V" @checkName="checkNameFunc" />
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
            <el-dialog v-model="data.switch" title="相关材料" width="50%" @closed="dialogClosed">
                <div class="m-b-20">
                    <el-button type="primary" :icon="Plus" size="large" @click="addMaterialFunc">
                        添加材料
                    </el-button>
                </div>
                <el-table
                    v-loading="loading_tab" :data="data_1.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
                >
                    <el-table-column prop="id" label="业务材料名称id">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="业务id" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.bid }}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                    <el-table-column prop="created_at" label="状态">
                        <template #default="scope">
                            <el-tag v-if="scope.row.active == 1" size="small" type="success">启用</el-tag>
                            <el-tag v-if="scope.row.active == 0" size="small" type="danger">禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template #default="scope">
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
            <!-- <template #footer>
                <div class="footer">
                    <el-button @click="data.switch = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_1">确定</el-button>
                </div>
            </template> -->
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
    APIpostShareServices
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
    })
    APIgetShareCategoryList({ page: 1, per_page: 500 }).then(res => {
        console.log(res)
        data.arr = res
        loading_tab.value = false
    })
}
const V = ref(null)
const dialogClosed = () => {
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
const examineListFunc = val => {
    str_title.value = '修改'
    data.switch = true
    data.obj = val
}
const deleteFunc = val => {
    APIdeleteShareServices(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
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
.btn button {
    padding: 20px 40px;
}
// .row-box {
//     display: flex;
//     flex-wrap: wrap;
//     .row-col {
//         border: 1px solid #ddd;
//         flex: 30%;
//         margin-right: 10px;
//         .row-p {
//             font-size: 14px;
//             color: #ccc;
//         }
//     }
// }
</style>
