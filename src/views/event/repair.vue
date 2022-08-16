<template>
    <div class="vote">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus" @click="()=>{
                        data_1.add_form={status:opts_all.obj.toushu_status[0].key};
                        data_1.add_error={};
                        data_1.add_switch=true;
                        file_list=[];
                        data_1.add_title = '添加'
                    }"
                >
                    添加报修
                </el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                            报修名称：
                            </div>
                            <el-input v-model="data_1.search.title" class="search_tb" placeholder="报修名称" clearable />
                        </div>
                    </el-col>
                     <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                        <div class="search_th">报修状态：</div>
                        <el-select v-model="data_1.search.status" class="search_tb" clearable placeholder="状态">
                            <el-option v-for="(item,i) in opts_all.obj.toushu_status" :key="item.key" :label="item.val" :value="item.key" />
                        </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="24" :md="24" :lg="10">
                        <div class="flx">
                            <div class="w_30">
                        <el-button
                            class="m-l-20" type="primary" :icon="Search"
                            @click="()=>{
                                data_1.switch_search = true;
                                data_1.page = 1;
                                getFuncVoteList()
                            }"
                        >
                            筛选
                        </el-button>
                    </div>
                            <div v-show=" data_1.switch_search == true" class="w_70 m-l-30">
                        <el-button class="m-r-10" @click="refreshFunc">重置</el-button>
                        <div class="searchDetail">
                        *搜索到相关结果共{{ data_1.total }}条。
                        </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="data_1.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="投诉名称" width="120">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="所在区域">
                    <template #default="scope">
                        <span>{{ scope.row.cc_name}} </span>
                    </template>
                </el-table-column>
                <el-table-column label="业务编号" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.sno }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 0" class="btnNone" type="danger" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 2" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="success" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 4" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 5" class="btnNone" type="warning" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 6" class="btnNone" type="primary" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 7" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 8" class="btnNone" type="info" effect="dark" size="large">{{ getOptVal(opts_all.obj.toushu_status,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否匿名">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_ano,scope.row.ano) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="是否公开">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.toushu_pub,scope.row.pub) }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
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
            @closed="dialogClosed"
        >
            <el-form
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="报修名称"
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
                            label="小区id"
                            :error="data_1.add_error&&data_1.add_error.zid?data_1.add_error.zid[0]:''"
                        >
                            <div style="margin-bottom: 10px;width: 100%;">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchResidential ref="V" v-model:name="zoneName" @checkName="checkNameFunc" />
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
                    <div class="left">报修id</div>
                    <div class="right">{{ data_1.details_data.id }}</div>
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
                    <div class="left">所在小区</div>
                    <div class="right">{{ data_1.details_data.zid}}</div>
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
    APIgetComplaintList,
    APIgetComplaintDetails,
    APIputComplaint,
    APIpostComplaint,
    APIgetResidentialListHouse
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
        console.log(res)
        data_1.total = res.length
        data_1.list = res
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
                    ElMessage.success('添加成功')
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            } else {
                APIputComplaint(data_1.add_form.id, data_1.add_form).then(res => {
                    getFuncVoteList()
                    data_1.add_switch = false
                    ElMessage.success('修改成功 ')
                }).catch(err => {
                    ElMessage.error('修改失败 ')
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
            ElMessage.success('添加成功')
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else {
        APIputComplaint(data_1.add_form.id, data_1.add_form).then(res => {
            getFuncVoteList()
            data_1.add_switch = false
            ElMessage.success('修改成功 ')
        }).catch(err => {
            ElMessage.error('修改失败 ')
        })
    }
}
const V=ref(null)
const dialogClosed=()=>{
    V.value.clearFunc()
    zoneName.value=''
}
const checkNameFunc=row=>{
    data_1.add_form.zid=row.id
}
const getZoneListFunc=()=>{
    let params={
        page: data_1.page,
        per_page: data_1.per_page
    }
    APIgetResidentialListHouse(params).then(res=>{
        zone_list.arr=res
    })
}
const zoneName=ref('')
const zone_list=reactive({
    arr:[]
})
const clickFuncModify = val => {
    getZoneListFunc()
    data_1.add_error = {}
    data_1.add_title = '修改'
    data_1.add_switch
    APIgetComplaintDetails(val.id).then(res => {
        console.log(res)
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
        zoneName.value=getNameFunc(zone_list.arr,data_1.add_form.zid)
    })
}
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
}
const zoneNAme_1=ref('')
const clickFuncDeteails = val => {
    APIgetComplaintDetails(val.id).then(res => {
        res.affixs = []
        for (let i in res.affix) {
            res.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.affix[i])
        }
        for (let i in res.totlogs) {
            res.totlogs[i].logable.affixs = []
            for (let j in res.totlogs[i].logable.affix) {
                res.totlogs[i].logable.affixs.push(import.meta.env.VITE_APP_FOLDER_SRC + res.totlogs[i].logable.affix[j])
            }
        }
        console.log(res)
        data_1.details_data = res
        data_1.details_switch = true
    })
}
// 转办
const popup_1 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const clickFuncAllot = val => {
    popup_1.msg = {}
    popup_1.form = {
        id: val.id
    }
    popup_1.switch = true
}
import {
    APIpostAllot
} from '@/api/custom/custom.js'
const popupFuncAdd = val => {
    popup_1.msg = {}
    APIpostAllot(popup_1.form.id, { type: popup_1.form.type }).then(res => {
        console.log(res)

        ElMessage.success('转办成功')
        popup_1.switch = false
        refreshFunc()
    }).catch(err => {
        ElMessage.error('转办失败')
    })
}
// 转办状态
const popup_2 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const clickFuncOpenPopup2 = id => {
    popup_2.msg = {}
    popup_2.form = {
        id: id
    }
    popup_2.switch = true
}
import {
    APIputAllot
} from '@/api/custom/custom.js'
const popupFuncAdd2 = val => {
    popup_2.msg = {}
    APIputAllot(popup_2.form.id, { status: popup_2.form.status }).then(res => {
        ElMessage.success(res.msg)
        popup_2.switch = false
        refreshFunc()
        clickFuncDeteails(data_1.details_data)
    }).catch(err => {
        popup_2.msg = err.data
    })
}
// 修改处理
const file_list3 = ref([])
const popup_3 = reactive({
    switch: false,
    form: {},
    msg: {},
    title: '添加投诉处理'
})
const clickFuncOpenPopup3 = val => {
    popup_3.msg = {}
    popup_3.title = '修改投诉处理'
    popup_3.tid = ''
    popup_3.form = {
        caid: val.id,
        content: val.content,
        affix: val.affix,
        type: val.type,
        flg: val.flg
    }
    popup_3.switch = true
    let arr = []
    for (let i in val.affix) {
        if (val.affix[i]) {
            arr.push({
                name: val.affix[i]
            })
        }
    }
    file_list3.value = arr
}
import {
    APIputDeal,
    APIpostDealAdd
} from '@/api/custom/custom.js'
const dealFuncAddPut = (data, id) => {
    if (id) {
        APIpostDealAdd(id, data).then(res => {
            ElMessage.success(res.msg)
            popup_3.switch = false
            clickFuncDeteails(data_1.details_data)
        }).catch(err => {
            popup_3.msg = err.data
        })
        return false
    }
    APIputDeal(data.caid, data).then(res => {
        ElMessage.success(res.msg)
        popup_3.switch = false
        clickFuncDeteails(data_1.details_data)
    }).catch(err => {
        popup_3.msg = err.data
    })

}
const popupFuncAdd3 = val => {
    let files = []
    let file_key = []
    if (file_list3.value.length > 0) {
        for (let i in file_list3.value) {
            if (!file_list3.value[i].raw) {
                file_key.push(file_list3.value[i].name)
            } else {
                files.push(file_list3.value[i].raw)
            }
        }
    }
    let data = {
        caid: popup_3.form.caid,
        content: popup_3.form.content,
        affix: file_key,
        type: popup_3.form.type,
        flg: popup_3.form.flg
    }
    popup_3.msg = {}
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            data.affix = file_key.concat(arr)
            dealFuncAddPut(data, popup_3.tid)
        })
        return false
    }
    dealFuncAddPut(data)
}
// 添加转办处理
const clickFuncOpenPopup4 = (val, id) => {
    popup_3.msg = {}
    popup_3.title = '添加投诉处理'
    popup_3.tid = id
    popup_3.form = {
        caid: val.id,
        content: '',
        affix: [],
        type: ''
    }
    popup_3.switch = true
    let arr = []
    for (let i in val.affix) {
        if (val.affix[i]) {
            arr.push({
                name: val.affix[i]
            })
        }
    }
    file_list3.value = arr
}
// 违建
const popup_4 = reactive({
    switch: false,
    form: {},
    msg: {}
})
const clickFuncAllot4 = id => {
    popup_4.msg = {}
    popup_4.form = {
        id: id
    }
    popup_4.switch = true
}
import {
    APIpostIllegal
} from '@/api/custom/custom.js'
const popupFuncAdd4 = val => {
    popup_4.msg = {}
    let data = {
        type: popup_4.form.type,
        status: popup_4.form.status
    }
    APIpostIllegal(popup_4.form.id, popup_4.form).then(res => {
        ElMessage.success('添加违建成功')
        popup_4.switch = false
        refreshFunc()
    }).catch(err => {
        ElMessage.error('添加违建失败')
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    data_1.search = {
        kind: 3
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
getOpts(['flg_type', 'tousu_type_kind', 'toushu_status', 'toushu_ano', 'toushu_pub', 'kind', 'toushu_return_type', 'toushu_illegal', 'illegal_type', 'illegal_user']).then(res => {
    opts_all.obj = res
    APIgetTypeList(opts_all.obj.kind[1].key).then(res => {
        console.log(res)
        opts_all.obj.problem_type = res
    })
    APIgetTypeList(opts_all.obj.kind[2].key).then(res => {
        opts_all.obj.toushu_user_type = res
    })
})

</script>
<style lang="scss" scoped>
    ::v-deep .el-cascader {
        width: 100%;
    }
</style>
