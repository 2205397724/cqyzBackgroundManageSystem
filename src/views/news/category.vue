<template>
    <div class="vote">
        <page-main>
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="()=>{
                        data_1.add_form={status:opts_all.obj.information_status[0].key};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        file_list=[];
                        data_1.add_title = '添加'
                    }"
                >
                    添加类别
                </el-button>
            </div>
            <el-table
                :data="data_1.list"
                row-key="id"
                lazy
                :load="getChildrens"
                :default-sort="{ prop: 'sort', order: 'ascending' }"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column label="类别名称">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="所在区域" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.china_name }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.status"

                            style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                            active-text="已审"
                            inactive-text="未审"
                            :active-value="1"
                            :inactive-value="0"
                            class="switchStyle"
                            @change="SwitchFunc(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template #default="scope">
                        <el-button
                            type="success" class="btnfix" style="width: 80px;"
                            @click="clickFuncPost(scope.row)"
                        >
                            添加子栏目
                        </el-button>
                        <el-button
                            type="primary" class="btnfix"
                            @click="clickFuncModify(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="clickFuncDelete(scope.row.id)"
                        >
                            <template #reference>
                                <el-button
                                    type="danger" class="btnfix"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="data_1.page"
                class="p-t-20"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.total"
                :page-size="data_1.per_page"
                background
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <template v-if="data_1.add_title == '添加子栏目'">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="父类别"
                                :error="data_1.add_error&&data_1.add_error.pub?data_1.add_error.pub[0]:''"
                            >
                                <el-input v-model="data_1.add_form.pid" disabled />
                            </el-form-item>
                        </el-col>
                    </template>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="类别名称"
                            :error="data_1.add_error&&data_1.add_error.pub?data_1.add_error.pub[0]:''"
                        >
                            <el-input v-model="data_1.add_form.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="所在区域"
                            :error="data_1.add_error&&data_1.add_error.ano?data_1.add_error.ano[0]:''"
                        >
                            <Cascaders v-model="data_1.add_form.china_code" :showall="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="所在小区"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <div class="searchUserGroup">
                                <SearchResidential v-model:str="data_1.add_form.zone_id" />
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="状态"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <el-switch
                                v-model="data_1.add_form.status"

                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                active-text="已审"
                                inactive-text="未审"
                                :active-value="1"
                                :inactive-value="0"
                                class="switchStyle"
                            />
                        </el-form-item>
                    </el-col>
                    <template v-if="data_1.add_title=='修改'">
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="配置"
                                :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                            >
                                <el-input v-model="data_1.add_form.setting" />
                            </el-form-item>
                        </el-col> -->
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="缩略图"
                                :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                            >
                                <el-input v-model="data_1.add_form.thumb" />
                            </el-form-item>
                        </el-col> -->
                    </template>
                </el-row>
            </el-form>
            <template #footer>
                <div class="footer">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncCategory(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetInforCategoryList,
    APIpostInforCategory,
    APIputInforCategory,
    APIdeleteInforCategory
} from '@/api/custom/custom.js'
const data_1 = reactive({
    search: {},
    switch_search: false,
    page: 1,
    total: 0,
    per_page: 15,
    list: [],
    add_switch: false,
    add_title: '添加',
    add_form: {},
    add_error: {},
    details_data: {},
    details_switch: false
})
// 获取列表
const getFuncCategoryList = () => {
    let data = {
        // page: data_1.page,
        // per_page: data_1.per_page
    }
    for (let key in data_1.search) {
        let item = data_1.search[key]
        if (item || item === 0) {
            data[key] = item
        }
    }
    APIgetInforCategoryList(data).then(res => {
        data_1.total = res.length
        data_1.list = res
    })
}
// 添加修改 同意拒绝提交
const clickFuncCategory = () => {
    for (let key in data_1.add_form) {
        if (data_1.add_form[key] !== null) {
            if (data_1.add_form[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (data_1.add_form[key] !== 0 || data_1.add_form[key] !== false)) {
                delete data_1.add_form[key]
            }
        }
    }
    if (data_1.add_title == '添加') {
        APIpostInforCategory(data_1.add_form).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else if (data_1.add_title == '修改') {
        data_1.add_form.setting = []
        data_1.add_form.thumb = 'dfr'
        APIputInforCategory(data_1.add_form.id, data_1.add_form).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        data_1.add_form.pid = parseInt(data_1.add_form.pid)
        APIpostInforCategory(data_1.add_form).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
    // }
    // })
}
// 修改
const clickFuncModify = row => {
    data_1.add_title = '修改'
    data_1.add_form = row
    data_1.add_switch = true
}
// 添加子栏目
const clickFuncPost = row => {
    data_1.add_form = {}
    data_1.add_title = '添加子栏目'
    data_1.add_form.pid = row.id
    data_1.add_switch = true
}
// 删除
const clickFuncDelete = id => {
    APIdeleteInforCategory(id).then(() => {
        ElMessage.success('删除成功')
        refreshFunc()
    })
}
// 懒加载
// const getChildrens = (tree, resolve) => {
//     if(tree.)
//     APIgetInforCategoryList({ id: tree.id }).then(res => {
//     })
// }
// switch 状态改变事件
const SwitchFunc = row => {
    data_1.add_form.setting = []
    data_1.add_form = row
    APIputInforCategory(data_1.add_form.id, data_1.add_form)
}
/* ----------------------------------------------------------------------------------------------------------------------- */

const refreshFunc = () => {
    data_1.search = {}
    data_1.switch_search = false
    getFuncCategoryList()
}
watch(data_1.page, () => {
    refreshFunc()
}, { immediate: true, deep: true })
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['information_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
::v-deep .el-cascader {
    width: 100%;
}
.search {
    background-color: #fafafa;
    height: 150px;
    width: 100%;
    padding: 20px;
    margin-bottom: 15px;
}
.searchKey {
    text-align: center;
    margin-top: 5px;
}
.searchSele {
    margin: 10px 0 0 15px;
}
.btn {
    margin-bottom: 15px;
}
.noDeal {
    margin-left: 12px;
}
.details {
    text-decoration: inherit;
    font-size: small;
    margin: 0 10px;
}
.el-button--small {
    height: 32px;
    width: 58px;
}
.el-badge {
    margin-right: 25px;
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
</style>
