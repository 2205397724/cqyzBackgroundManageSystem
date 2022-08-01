<template>
    <div class="articletparticletpl">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加模板
                </el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="8" :sm="10" :md="12" :lg="8" :xl="8">
                        <!-- <el-row>
                            <el-col :xs="8" :sm="8" :md="6" :lg="8" :xl="8" class="searchKey"> -->
                        <div class="size-base p-l-20">
                            关键字:
                            <!-- </el-col>
                            <el-col :xs="8" :sm="8" :md="6" :lg="14" :xl="8"> -->
                            <el-input v-model="data_search.obj.name" class=".head-btn search_tb p-l-5" placeholder="名称" clearable />
                        <!-- </el-col>
                        </el-row> -->
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="10" :md="12" :lg="8" :xl="8">
                        <div class="search_th">公示分类：</div>
                        <div class="search_tb">
                            <CascaderAnnounce v-model="data_search.obj.cid" />
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="3" :xl="8">
                        <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                    </el-col>
                    <el-col v-show="switch_search" class="" :xs="12" :sm="8" :md="6" :lg="21" :xl="8">
                        <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                        *搜索到相关结果共{{ total }}条。
                    </el-col>
                </el-row>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;"
            >
                <el-table-column prop="name" label="名称" width="180">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="cid" label="公示分类" width="250">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ getNameFunc(data_1.arr,scope.row.cid) }} </span>
                    </template>
                </el-table-column>

                <el-table-column />
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="modifyResidentialFunc(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFunc(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前项么?" cancel-button-type="info"
                            @confirm="deleteFunc(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <div style="padding-top: 20px;">
                <el-pagination
                    v-model:current-page="page"
                    layout="total,prev,pager,next,jumper,"
                    :total="total"
                    :page-size="per_page"
                    background
                    hide-on-single-page
                />
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="模板名称" prop="name"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="分类"
                                label-width="70px"
                                :error="from_error.msg&&from_error.msg.cat_dep?from_error.msg.cid[0]:''"
                            >
                                <CascaderAnnounce v-model="from_examine.item.cid" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div style="margin-bottom: 10px;">
                                <el-button style="margin-right: 10px;" @click="addServiceFunc">添加模板字段</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.fields" :key="i" class="serve-box">
                                <el-row :gutter="10">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="字段名称" :error="from_error.msg&&from_error.msg['fields.'+i+'.label']?from_error.msg['fields.'+i+'.label'][0]:''">
                                            <el-input
                                                v-model="item.label"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="字段类型" :error="from_error.msg&&from_error.msg['fields.'+i+'.type']?from_error.msg['fields.'+i+'.type'][0]:''">
                                            <el-input
                                                v-model="item.type"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div style="margin-bottom: 10px;">
                                    <el-button style="margin-right: 10px;" @click="addServiceOptFunc(i)">添加选项字段</el-button>
                                </div>
                                <template v-if="from_examine.item.fields[i].prop&&from_examine.item.fields[i].prop.arr">
                                    <div v-for="(child,j) in from_examine.item.fields[i].prop.arr" :key="j" style="position: relative;width: 100%;">
                                        <el-row :gutter="10">
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item :label="'键Key'+j">
                                                    <el-input
                                                        v-model="child.key"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item :label="'值Val'+j">
                                                    <el-input
                                                        v-model="child.val"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <div style="position: absolute;top: -10px;right: -10px;z-index: 9999;cursor: pointer;background-color: #fff;" @click="deleteServiceOptFunc(i,j)">
                                            <el-icon :size="20" color="#F56C6C">
                                                <el-icon-circle-close />
                                            </el-icon>
                                        </div>
                                    </div>
                                </template>
                                <div class="delete-service" @click="deleteServiceFunc(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">模板ID</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">公示分类</div>
                    <div class="right">{{ getNameFunc(data_1.arr,data_details.item.cid) }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
                </div>
                <div class="item">
                    <div class="left">模板字段</div>
                    <div class="right">
                        <div v-for="(item,i) in data_details.item.fields" :key="i" style="border-bottom: 1px solid #eee;margin-bottom: 8px;">
                            <div>
                                字段名称：{{ item.label }}
                            </div>
                            <div>
                                字段类别：{{ item.type }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import CascaderType from '@/components/CascaderType/index.vue'
import {
    APIgetArticletplList,
    APIgetArticletplDetails,
    APIdeleteArticletpl,
    APIputArticletpl,
    APIpostArticletpl
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({ obj: {} })
// 详情
let switch_details = ref(false)
// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 操作事件 列表单个行数据
let data_dialog = reactive({
    obj: {}
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        fields: []
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.fields.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        label: '',
        type: '',
        prop: {
            arr: []
        }
    }
    console.log(from_examine.item.fields)
    from_examine.item.fields.push(data)
}
// 删除 选项字段
const deleteServiceOptFunc = (i, j) => {
    from_examine.item.fields[i].prop.arr.splice(j, 1)
}
// 添加 选项字段
const addServiceOptFunc = index => {
    let data = {
        key: '',
        val: ''
    }
    if (!from_examine.item.fields[index].prop || !from_examine.item.fields[index].prop.arr) {
        from_examine.item.fields[index].prop = { arr: [] }
    }
    from_examine.item.fields[index].prop.arr.push(data)
}

// import {
//     APIgetTypeList
// } from '@/api/custom/custom.js'
import { Search, Plus } from '@element-plus/icons-vue'
// const options = reactive({ arr: [] })
// APIgetTypeList('announce').then(res => {
//     options.arr = res.data
// })
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetArticletplDetails(val.id).then(res => {
        data_details.item = res
        switch_details.value = true
    })
}

// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputArticletpl(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostArticletpl(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            }
        } else {
            return false
        }
    })
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
    }
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetArticletplList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteArticletpl(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加模板
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        fields: []
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetArticletplDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
    })
}
// 获取类别名称
let data_1 = reactive({
    arr: []
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
// 获取公式列表api请求
const main_type = ref('announce')
APIgetTypeList(main_type.value).then(res => {
    console.log(res)
    data_1.arr = res
})
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
// 监听分页
watch(page, () => {
    getTabListFunc()
}, { immediate: true, deep: true })
/* ----------------------------------------------------------------------------------------------------------------------- */

</script>
<style lang="scss">
.serve-box {
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    position: relative;
    .delete-service {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999999;
        cursor: pointer;
        background-color: #fff;
    }
}
::v-deep .el-cascader {
    width: 100% !important;
}
</style>
