<template>
    <div class="vote">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="()=>{
                        data_1.add_form={status:opts_all.obj.information_status[0].key};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        file_list=[];
                        data_1.add_title = '添加'
                    }"
                >
                    添加资讯
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :lg="2" class="searchKey">
                        <div>关键字</div>
                    </el-col>
                    <el-col :lg="4" class="m-r-10">
                        <el-input v-model="data_1.search.name" placeholder="标题名称" clearable />
                    </el-col>
                    <el-col :lg="4">
                        <Cascaders v-model="data_1.search.china_code" />
                    </el-col>
                    <el-col :lg="4" class="m-l-10">
                        <el-select v-model="data_1.search.status" clearable placeholder="状态">
                            <el-option v-for="(item) in opts_all.obj.information_status" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col>
                </el-row>
                <br>
                <el-button
                    class="m-l-20" type="primary" :icon="Search"
                    @click="()=>{
                        data_1.switch_search = true;
                        data_1.page = 1;
                        getFuncCategoryList()
                    }"
                >
                    筛选
                </el-button>
            </div>
            <div v-show="data_1.switch_search" style="margin-bottom: 10px;">
                <el-button style="margin-right: 10px;" type="primary" @click="refreshFunc()">重置</el-button>
                *搜索到相关结果共{{ data_1.total }}条。
            </div>
            <el-table
                :data="data_1.list"
                row-key="id"
                lazy
                :load="getChildrens"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
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
                            active-text="已审核"
                            inactive-text="未审核"
                            :active-value="1"
                            :inactive-value="0"
                            class="switchStyle"
                            @change="SwitchFunc(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button
                            type="success"
                            @click="clickFuncPost(scope.row)"
                        >
                            添加子栏目
                        </el-button>
                        <el-button
                            type="primary"
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
                                    type="danger"
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
                style="padding-top: 20px;"
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
                            <Cascaders v-model="data_1.add_form.china_code" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="所在小区"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;">
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
                                active-text="已审核"
                                inactive-text="未审核"
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
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="缩略图"
                                :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                            >
                                <el-input v-model="data_1.add_form.thumb" />
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncCategory(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <!-- <el-dialog
            v-model="data_1.details_switch"
            title="详情"
            width="50%"
        >
            <div class="">
                <div class="item">
                    <div class="left">标题名称</div>
                    <div class="right">{{ data_1.details_data.title }}</div>
                </div>
                <div class="item">
                    <div class="left">编号</div>
                    <div class="right">{{ data_1.details_data.sno }}</div>
                </div>
                <div class="item">
                    <div class="left">是否公开</div>
                    <div class="right">{{ getOptVal(opts_all.obj.toushu_pub,data_1.details_data.pub) }}</div>
                </div>
                <div class="item">
                    <div class="left">是否匿名</div>
                    <div class="right">{{ getOptVal(opts_all.obj.toushu_ano,data_1.details_data.ano) }}</div>
                </div>
                <div class="item">
                    <div class="left">分类</div>
                    <div class="right">{{ getOptVal(opts_all.obj.tousu_type_kind,data_1.details_data.kind) }}</div>
                </div>
                <div class="item">
                    <div class="left">小区id</div>
                    <div class="right">{{ data_1.details_data.zid }}</div>
                </div>
                <div v-if="data_1.details_data.catpro" class="item">
                    <div class="left">问题分类</div>
                    <div class="right">{{ data_1.details_data.catpro }}</div>
                </div>
                <div v-if="data_1.details_data.catob" class="item">
                    <div class="left">投诉对象</div>
                    <div class="right">{{ data_1.details_data.catob }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ getOptVal(opts_all.obj.toushu_status,data_1.details_data.status) }}</div>
                </div>
                <div class="item">
                    <div class="left">内容</div>
                    <div class="right">{{ data_1.details_data.content }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog> -->
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
import { Search, Plus } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetInforCategoryList,
    APIpostInforCategory,
    APIputInforCategory,
    APIdeleteInforCategory
} from '@/api/custom/custom.js'
import category from '@/router/modules/information/category'
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
    console.log(data)
    APIgetInforCategoryList(data).then(res => {
        console.log(res)
        data_1.total = res.length
        data_1.list = res
    })
}
// 添加修改 同意拒绝提交
const clickFuncCategory = () => {
    console.log(data_1.add_form)
    if (data_1.add_title == '添加') {
        APIpostInforCategory(data_1.add_form).then(res => {
            // console.log(res)
            refreshFunc()
            ElMessage.success('添加成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else if (data_1.add_title == '修改') {
        data_1.add_form.setting = []
        // data_1.add_form.thumb = ''
        console.log(data_1.add_form)
        APIputInforCategory(data_1.add_form.id, data_1.add_form).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        data_1.add_form.pid = parseInt(data_1.add_form.pid)
        console.log(data_1.add_form.pid)
        APIpostInforCategory(data_1.add_form).then(res => {
            // console.log(res)
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
    console.log(row)
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
//         console.log(res)
//     })
// }
// switch 状态改变事件
const SwitchFunc = row => {
    // console.log(row)
    data_1.add_form.setting = []
    data_1.add_form = row
    APIputInforCategory(data_1.add_form.id, data_1.add_form)
}
/* ----------------------------------------------------------------------------------------------------------------------- */

const refreshFunc = () => {
    data_1.search = {}
    data_1.switch_search = false
    data_1.page = 1
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
    width: 70px !important;
}
</style>
