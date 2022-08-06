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
                    <el-col :xs="8" :sm="10" :md="12" :lg="8" :xl="8">
                        <div class="size-base p-l-20">
                            关键字:
                            <el-input v-model="data_1.search.title" class=".head-btn search_tb p-l-5" placeholder="标题名称" clearable />
                        </div>
                    </el-col>
                    <el-col :xs="8" :sm="10" :md="12" :lg="8" :xl="8">
                        <div class="search_th">区域代码：</div>
                        <div class="search_tb">
                            <Cascaders v-model="data_1.search.china_code" />
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="10" :lg="8" :xl="8">
                        <div class="search_th">状态：</div>
                        <el-select v-model="data_1.search.status" clearable placeholder="状态" class="head-btn search_tb">
                            <el-option v-for="(item) in opts_all.obj.information_status" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="4" :sm="6" :md="6" :lg="3" :xl="8">
                        <el-button
                            class="m-l-20" type="primary" :icon="Search" @click="()=>{
                                data_1.switch_search = true;
                                data_1.page = 1;
                                getFuncManageList()
                            }"
                        >
                            筛选
                        </el-button>
                    </el-col>
                    <el-col v-show="data_1.switch_search" :xs="4" :sm="6" :md="6" :lg="21" :xl="8">
                        <el-button class="m-r-10" @click="refreshFunc">重置</el-button>
                        *搜索到相关结果共{{ data_1.total }}条。
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="标题">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="资讯id" width="240">
                    <template #default="scope">
                        <span>{{ scope.row.id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="资讯类别id">
                    <template #default="scope">
                        <span>{{ scope.row.cate_id }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="所在区域">
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
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="clickFuncModify(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="clickFuncDetails(scope.row)"
                        >
                            详情
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
                    <!-- <template v-if="data_1.add_title !== '添加子栏目'"> -->
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="标题"
                            :error="data_1.add_error&&data_1.add_error.pub?data_1.add_error.pub[0]:''"
                        >
                            <el-input v-model="data_1.add_form.title" />
                        </el-form-item>
                    </el-col>
                    <!-- </template> -->
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="资讯类别"
                            :error="data_1.add_error&&data_1.add_error.pub?data_1.add_error.pub[0]:''"
                        >
                            <!-- <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;">
                                <CategoryList v-model:id="data_1.add_form.cate_id" />
                            </div> -->
                            <!-- <el-select v-model="data_1.add_form.cate_id" class="head-btn" placeholder="" clearable>
                                <el-option v-for="(item) in NewArr.arr" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select> -->
                            <el-cascader
                                v-model="data_1.add_form.cate_id" :options="data_tab.arr" collapse-tags
                                placeholder="类别"
                                :show-all-levels="false"
                                :props="props"
                                clearable
                            >
                                <template #default="{ node, data }">
                                    <span>{{ data.name }}</span>
                                </template>
                            </el-cascader>
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
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="附件"
                            :error="data_1.add_error&&data_1.add_error.affix?data_1.add_error.affix[0]:''"
                        >
                            <el-upload
                                ref="uploadRef"
                                action="***"
                                :auto-upload="false"
                                :file-list="file_list"
                                :on-change="(file,files)=>{
                                    file_list = files
                                }"
                                :on-remove="(file,files)=>{
                                    file_list = files
                                }"
                            >
                                <el-button type="primary">选择附件</el-button>
                            </el-upload>
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
                    <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="内容"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.content"
                                class="head-btn"
                                :autosize="{ minRows: 4, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col> -->
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div class="m-l-10 m-b-10">资讯内容</div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <!-- <el-form-item
                            label=""
                            label-width="120px"
                            :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                        > -->
                        <!-- <el-input
                                v-model="from_examine.item.content"
                                :autosize="{ minRows: 2, maxRows: 10 }"
                                type="textarea"
                                placeholder=""
                            /> -->
                        <editor v-model="data_1.add_form.content" style="width: 100%;" />
                        <!-- </el-form-item> -->
                    </el-col>
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
        <el-dialog
            v-model="data_1.details_switch"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">标题</div>
                    <div class="right">{{ data_1.details_data.title }}</div>
                </div>
                <div class="item">
                    <div class="left">资讯id</div>
                    <div class="right">{{ data_1.details_data.id }}</div>
                </div>
                <div v-if="data_1.details_data.zone_id" class="item">
                    <div class="left">小区id</div>
                    <div class="right">{{ data_1.details_data.zone_id }}</div>
                </div>
                <div class="item">
                    <div class="left">资讯类别id</div>
                    <div class="right">{{ data_1.details_data.cate_id }}</div>
                </div>
                <div class="item">
                    <div class="left">所在区域</div>
                    <div class="right">{{ data_1.details_data.china_name }}</div>
                </div>
                <div v-if="data_1.details_data.affix&&data_1.details_data.affix.length>0" class="item">
                    <div class="left">附件</div>
                    <div class="right">
                        <el-image
                            v-for="(item,i) in data_1.details_data.affixs" :key="i" :preview-src-list="data_1.details_data.affixs" style="width: 100px; height: 100px;margin-right: 10px;" :src="item" fit="cover"
                        />
                    </div>
                </div>
                <div class="item">
                    <div class="left">资讯时间</div>
                    <div class="right">{{ data_1.details_data.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">修改时间</div>
                    <div class="right">{{ data_1.details_data.updated_at }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">
                        <el-tag v-if=" data_1.details_data.status == 1" type="success" effect="dark" round class="btnNone">已审</el-tag>
                        <el-tag v-if="data_1.details_data.status == 0" type="danger" effect="dark" round class="btnNone">未审</el-tag>
                    </div>
                </div>
                <div class="item">
                    <div class="left">内容</div>
                    <div class="right">{{ AudioContext }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
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
import { Search, Plus } from '@element-plus/icons-vue'

/* ----------------------------------------------------------------------------------------------------------------------- */
import {
    APIgetInforManageList,
    APIgetInforManageDetails,
    APIpostInforManage,
    APIputInforManage,
    APIdeleteInforManage
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
const file_list = ref([])
import { getFilesKeys } from '@/util/files.js'
const getFuncManageList = () => {
    let params = {
        // page: data_1.page,
        // per_page: data_1.per_page
    }
    for (let key in data_1.search) {
        let item = data_1.search[key]
        if (item || item === 0) {
            params[key] = item
        }
    }
    console.log(params)
    APIgetInforManageList(params).then(res => {
        console.log(res)
        data_1.total = res.length
        data_1.list = res
    })
}
// 添加修改 同意拒绝提交
const clickFuncCategory = () => {
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
    data_1.add_error = {}
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            data_1.add_form.affix = file_key.concat(arr)
            if (data_1.add_title == '添加') {
                console.log(data_1.add_form.cate_id)
                APIpostInforManage(data_1.add_form).then(res => {
                    // console.log(res)
                    refreshFunc()
                    ElMessage.success('添加成功')
                    data_1.add_switch = false
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            } else {
                data_1.add_form.setting = []
                // data_1.add_form.thumb = ''
                console.log(data_1.add_form)
                APIputInforManage(data_1.add_form.id, data_1.add_form).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    data_1.add_switch = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            }
        })
        return false
    }
    data_1.add_form.affix = file_key
    if (data_1.add_title == '添加') {
        APIpostInforManage(data_1.add_form).then(res => {
            // console.log(res)
            refreshFunc()
            ElMessage.success('添加成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else {
        // data_1.add_form.thumb = ''
        console.log(data_1.add_form)
        APIputInforManage(data_1.add_form.id, data_1.add_form).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            data_1.add_switch = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    }
}
// 资讯列表
// const getFuncCategoryList = () => {
import {
    APIgetInforCategoryList
} from '@/api/custom/custom.js'
const data_tab = reactive({
    arr: []
})
const NewArr = reactive({
    arr: []
})
let params = {
    // page: page.value,
    // per_page: per_page.value
}
APIgetInforCategoryList(params).then(res => {
    console.log(res)
    data_tab.arr = res
    // NewArr.arr = data_tab.arr.map(item => { return Object.assign({}, { 'id': item.id, 'name': item.name }) })
    // console.log(NewArr.arr)
})
const props = { multiple: false, emitPath: false, checkStrictly: true, value: 'id', label: 'name' }

// }
// 修改
const clickFuncModify = row => {
    data_1.add_title = '修改'
    console.log(row)
    APIgetInforManageDetails(row.id).then(res => {
        data_1.add_form = res
        let arr = []
        for (let i in res.affix) {
            if (res.affix[i]) {
                arr.push({
                    name: res.affix[i]
                })
            }
        }
        file_list.value = arr
        data_1.add_switch = true
    })
}
// 详情
const AudioContext = ref('')
const clickFuncDetails = val => {
    APIgetInforManageDetails(val.id).then(res => {
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i])
        }
        data_1.details_data = res
        data_1.details_switch = true
        AudioContext.value = data_1.details_data.content.replace(/<[^>]+>|&[^>]+;/g, '').trim()
        console.log(AudioContext.value)
    })
}
// 删除
const clickFuncDelete = id => {
    APIdeleteInforManage(id).then(() => {
        ElMessage.success('删除成功')
        refreshFunc()
    })
}
// switch 状态改变事件
const SwitchFunc = row => {
    console.log(row)
    data_1.add_form = row
    APIputInforManage(data_1.add_form.id, data_1.add_form)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {}
    data_1.switch_search = false
    data_1.page = 1
    getFuncManageList()
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
<style  scoped>
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

/* .el-button--small {
    height: 32px;
    width: 58px;
} */
.el-badge {
    margin-right: 25px;
}
::v-deep .el-form-item__content {
    align-items: inherit !important;
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
