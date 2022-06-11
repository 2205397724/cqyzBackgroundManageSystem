<template>
    <div class="vote">
        <page-main>
            <div>
                <el-input v-model="data_1.search.title" class="input-b-r" placeholder="标题名称" clearable />
                <el-select v-model="data_1.search.illegal" class="input-b-r" placeholder="是否违建">
                    <el-option label="是违建" :value="1" />
                    <el-option label="不是违建" :value="0" />
                </el-select>
                <el-select v-model="data_1.search.status" class="input-b-r" clearable placeholder="状态">
                    <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                </el-select>
                <el-button
                    class="btn-b-r" type="primary"
                    @click="()=>{
                        data_1.switch_search = true;
                        data_1.page = 1;
                        getFuncVoteList()
                    }"
                >
                    搜索
                </el-button>
            </div>
            <div v-show="data_1.switch_search" style="margin-bottom: 10px;">
                <el-button style="margin-right: 10px;" @click="refreshFunc()">重置</el-button>
                *搜索到相关结果共{{ data_1.total }}条。
            </div>
            <div>
                <el-button
                    class="head-btn" type="primary"
                    @click="()=>{
                        data_1.add_form={status:opts_all.obj.toushu_status[0].key};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        file_list=[];
                        data_1.add_title = '添加'
                    }"
                >
                    添加投诉
                </el-button>
            </div>
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="投诉名称" width="250">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="90">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否匿名" width="90">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_ano,scope.row.ano) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否公开" width="90">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_pub,scope.row.pub) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="210">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="clickFuncModify(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            size="small"
                            @click="clickFuncDeteails(scope.row)"
                        >
                            详情
                        </el-button>
                        <el-button
                            size="small"
                            @click="()=>{
                                vote_opts.opts_voteid=scope.row.id;
                                vote_opts.opts_switch=true;
                            }"
                        >
                            成员
                        </el-button>
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
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="标题名称"
                            :error="data_1.add_error&&data_1.add_error.title?data_1.add_error.title[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.title"
                                class="head-btn"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="是否公开"
                            :error="data_1.add_error&&data_1.add_error.pub?data_1.add_error.pub[0]:''"
                        >
                            <el-select v-model="data_1.add_form.pub" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_pub" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="是否匿名"
                            :error="data_1.add_error&&data_1.add_error.ano?data_1.add_error.ano[0]:''"
                        >
                            <el-select v-model="data_1.add_form.ano" class="head-btn" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.toushu_ano" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="是否违建"
                            :error="data_1.add_error&&data_1.add_error.illegal?data_1.add_error.illegal[0]:''"
                        >
                            <el-select v-model="data_1.add_form.illegal" class="head-btn" clearable>
                                <el-option label="是" :value="1" />
                                <el-option label="否" :value="0" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="小区"
                            :error="data_1.add_error&&data_1.add_error.zid?data_1.add_error.zid[0]:''"
                        >
                            <div style="margin-bottom: 10px;width: 100%;">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchResidential v-model:str="data_1.add_form.zid" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <template v-if="data_1.add_title=='修改'">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="问题分类"
                                :error="data_1.add_error&&data_1.add_error.catpro?data_1.add_error.catpro[0]:''"
                            >
                                <el-cascader
                                    v-model="data_1.add_form.catpro"
                                    placeholder=""
                                    :options="opts_all.obj.problem_type"
                                    :props="{
                                        multiple: false,
                                        emitPath: false,
                                        lazy: false,
                                        value: 'id',
                                        label: 'name',
                                        checkStrictly: true
                                    }"
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :show-all-levels="false"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="投诉对象"
                                :error="data_1.add_error&&data_1.add_error.catob?data_1.add_error.catob[0]:''"
                            >
                                <el-cascader
                                    v-model="data_1.add_form.catob"
                                    style="width: 100%;"
                                    placeholder=""
                                    :options="opts_all.obj.toushu_user_type"
                                    :props="{
                                        multiple: false,
                                        emitPath: false,
                                        lazy: false,
                                        value: 'id',
                                        label: 'name',
                                        checkStrictly: true
                                    }"
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :show-all-levels="false"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="状态"
                                :error="data_1.add_error&&data_1.add_error.status?data_1.add_error.status[0]:''"
                            >
                                <el-select v-model="data_1.add_form.status" class="head-btn" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>
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
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="内容"
                            :error="data_1.add_error&&data_1.add_error.content?data_1.add_error.content[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.content"
                                class="head-btn"
                                :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVote">确定</el-button>
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
                    <div class="left">标题名称</div>
                    <div class="right">{{ data_1.details_data.title }}</div>
                </div>
                <div class="item">
                    <div class="left">是否公开</div>
                    <div class="right">{{ data_1.details_data.pub }}</div>
                </div>
                <div class="item">
                    <div class="left">是否匿名</div>
                    <div class="right">{{ data_1.details_data.ano }}</div>
                </div>
                <div class="item">
                    <div class="left">是否违建</div>
                    <div class="right">{{ data_1.details_data.illegal }}</div>
                </div>
                <div class="item">
                    <div class="left">小区</div>
                    <div class="right">{{ data_1.details_data.zid }}</div>
                </div>
                <div class="item">
                    <div class="left">问题分类</div>
                    <div class="right">{{ data_1.details_data.catpro }}</div>
                </div>
                <div class="item">
                    <div class="left">投诉对象</div>
                    <div class="right">{{ data_1.details_data.catob }}</div>
                </div>
                <div class="item">
                    <div class="left">状态</div>
                    <div class="right">{{ data_1.details_data.status }}</div>
                </div>
                <div v-if="data_1.details_data.affix&&data_1.details_data.affix.length>0" class="item">
                    <div class="left">附件</div>
                    <div class="right">
                        <!-- 两种模式任君选择 -->
                        <el-image
                            v-for="(item,i) in data_1.details_data.affixs" :preview-src-list="data_1.details_data.affixs" style="width: 100px; height: 100px;margin-right: 10px;" :src="item" fit="cover"
                        />
                        <!-- <div v-for="(item,i) in data_1.details_data.affixs">
                            <el-link type="success" :href="item" target="_blank">{{ item }}</el-link>
                        </div> -->
                    </div>
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
        </el-dialog>

        <!-- 投票选项 -->
        <EntryMbr :id="vote_opts.opts_voteid" v-model:dialog_switch="vote_opts.opts_switch" />
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
/* ----------------------------------------------------------------------------------------------------------------------- */
// const fileChange = file => {
//     if (!data_1.add_form.affix) {
//         data_1.add_form.affix = []
//     }
//     data_1.add_form.affix.push({
//         name: file.name,
//         url: document.getElementsByClassName('el-upload__input')[0].value
//     })
// }
// const  fileRemove = file => {
//     for (let i in data_1.add_form.affix) {
//         if (typeof data_1.add_form.affix[i] == 'string') {
//             if (data_1.add_form.affix[i] = file.name) {
//                 data_1.add_form.affix.splice(i, 1)
//                 return false
//             }
//         } else {
//             if (data_1.add_form.affix[i].name = file.name) {
//                 data_1.add_form.affix.splice(i, 1)
//                 return false
//             }
//         }
//     }
// }
import {
    APIgetComplaintList,
    APIgetComplaintDetails,
    APIputComplaint,
    APIpostComplaint
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
const getFuncVoteList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page
    }
    for (let key in data_1.search) {
        let item = data_1.search[key]
        if (item || item === 0) {
            data[key] = item
        }
    }
    APIgetComplaintList(data).then(res => {
        data_1.total = res.data.aggregation.total_cnt
        data_1.list = res.data.items
    })
}
const file_list = ref([])
import { getFilesKeys } from '@/util/files.js'
const clickFuncAddVote = () => {
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
                APIpostComplaint(data_1.add_form).then(res => {
                    refreshFunc()
                    data_1.add_switch = false
                    ElMessage.success(res.msg)
                }).catch(err => {
                    data_1.add_error = err.data
                })
            } else {
                APIputComplaint(data_1.add_form.id, data_1.add_form).then(res => {
                    getFuncVoteList()
                    data_1.add_switch = false
                    ElMessage.success(res.msg)
                }).catch(err => {
                    data_1.add_error = err.data
                })
            }
        })
        return false
    }
    data_1.add_form.affix = file_key
    if (data_1.add_title == '添加') {
        APIpostComplaint(data_1.add_form).then(res => {
            refreshFunc()
            data_1.add_switch = false
            ElMessage.success(res.msg)
        }).catch(err => {
            data_1.add_error = err.data
        })
    } else {
        APIputComplaint(data_1.add_form.id, data_1.add_form).then(res => {
            getFuncVoteList()
            data_1.add_switch = false
            ElMessage.success(res.msg)
        }).catch(err => {
            data_1.add_error = err.data
        })
    }
}

const clickFuncModify = val => {
    data_1.add_error = {}
    data_1.add_title = '修改'
    data_1.add_switch
    APIgetComplaintDetails(val.id).then(res => {
        data_1.add_form = res.data
        let arr = []
        for (let i in res.data.affix) {
            if (res.data.affix[i]) {
                arr.push({
                    name: res.data.affix[i]
                })
            }
        }
        file_list.value = arr
        data_1.add_switch = true
    })
}
const clickFuncDeteails = val => {
    APIgetComplaintDetails(val.id).then(res => {
        res.data.affixs = []
        for (let i in res.data.affix) {
            res.data.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.data.affix[i])
        }
        data_1.details_data = res.data
        data_1.details_switch = true
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
const vote_opts = reactive({
    opts_switch: false,
    opts_voteid: ''
})

/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {
        illegal: 0
    }
    data_1.switch_search = false
    data_1.page = 1
    getFuncVoteList()
}
watch(() => data_1.page, new_val => {
    refreshFunc()
}, { immediate: true, deep: true })
/* ----------------------------------------------------------------------------------------------------------------------- */
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
getOpts([ 'toushu_status', 'toushu_ano', 'toushu_pub', 'type_type']).then(res => {
    opts_all.obj = res
    // , 'toushu_user_type', 'problem_type'
    APIgetTypeList(opts_all.obj.type_type[2].key).then(res => {
        opts_all.obj.problem_type = res.data
    })
    APIgetTypeList(opts_all.obj.type_type[3].key).then(res => {
        opts_all.obj.toushu_user_type = res.data
    })
})

</script>
<style lang="scss" scoped>
	::v-deep .el-cascader{
        width: 100%;
    }
</style>
