<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button
                    type="primary"
                    :icon="Plus"
                    size="large"
                    @click="addRecord"
                >
                    添加备案
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                备案名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18" class="search_tb">
                                <el-input v-model="data_1.search.title" class="search_tb" placeholder="名称" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                所在区域：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18" class="search_tb">
                                <div style="min-width: 150px;">
                                    <Cascaders v-model="data_1.search.china_code" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_1.search.status" class="search_tb" clearable placeholder="状态">
                                    <el-option v-for="(item,i) in opts_all.obj.information_status" :key="i" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button
                            type="primary" :icon="Search"
                            @click="
                                () => {
                                    data_1.switch_search = true;
                                    data_1.page = 1;
                                    getFunRecordList();
                                }
                            "
                        >
                            筛选
                        </el-button>
                        <el-button v-show="data_1.switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
                        <span v-show="data_1.switch_search == true" class="size-base">
                            *搜索到相关结果共{{ data_1.total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="recordList.arr"
                :header-cell-style="{
                    background: '#fbfbfb',
                    color: '#999999',
                    'font-size': '12px',
                }"
                style="
                                                                                                                                                                width: 100%;
                                                                                                                                                                min-height: 300px;
                                                                                                                                                                overflow: auto;
                                                                                                                                                                border: 1px solid #ebeef4;
                                                                                                                                                                box-sizing: border-box;
"
            >
                <el-table-column label="备案名称">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="类别">
                    <template #default="scope">
                        <span>{{ find_right_typeId_to_name(scope.row.type) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="备案主体">
                    <template #default="scope">
                        <span>{{ scope_row_group_id_chinese(scope.row.group_id) }} </span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="scope">
                        <el-switch
                            v-model="scope.row.status"
                            class="mb-2 switchStyle"
                            active-text="已审"
                            inactive-text="未审"
                            :active-value="1"
                            :inactive-value="0"
                            style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                            @change="(val) => switchRecordFun(val, scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="备案时间" width="150">
                    <template #default="scope">
                        <span>{{ scope.row.startat }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="small"
                            @click="putRecord(scope.row)"
                        >
                            修改
                        </el-button>
                        <el-link :underline="false" type="primary">
                            <router-link
                                class="el-button m-lr-10"
                                style="text-decoration: inherit;color: inherit;width: 52px;height: 26px;"
                                :to="{
                                    name: 'filingDetail',
                                    query: {
                                        type: scope.row.type,
                                        title: scope.row.title,
                                        zone_id: scope.row.zone_id,
                                        group_id: scope.row.group_id,
                                        sno: scope.row.sno,
                                        status: scope.row.status,
                                        id: scope.row.id,
                                        gruop_name: send_to_add_group_name,
                                    },
                                }"
                            >
                                详情
                            </router-link>
                        </el-link>
                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="deleteRecord(scope.row.id)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small"> 删除 </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <!-- <el-table-column /> -->
            </el-table>
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="Infinity"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <el-dialog
            v-model="switch_add_record"
            :title="add_put_title"
            @close="record_dialog_close"
        >
            <el-form ref="ruleFormRef" :model="from_record.item">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="类型">
                            <el-cascader
                                v-model="from_record.item.type"
                                :options="recordKindList.arr"
                                :show-all-levels="false"
                                :props="add_record_props.item"
                                @change="add_recode_type_change"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="备案小区">
                            <div
                                style="
                                                                                                                                                                                                                                                                                                                                width: 100%;
                                                                                                                                                                                                                                                                                                                                height: 32px;
                                                                                                                                                                                                                                                                                                                                border: 1px solid #dcdfe6;
                                                                                                                                                                                                                                                                                                                                border-radius: 4px;
"
                                @click="click_add_record_zone_id"
                            >
                                <span style="margin-left: 11px;">{{ selectedZone_id }}</span>
                                <span v-if="!selectedZone_id" style=" color: #c0c4cc;">请选择小区</span>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="备案主体">
                            <GroupListTabs
                                :placeholder="'请选择备案主体'"
                                @change="
                                    (val) => {
                                        from_record.item.group_id = val.id;
                                    }
                                "
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="备案主题">
                            <el-input
                                :value="add_record_title_computed"
                                placeholder="小区名称 类别名称"
                            />
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="状态">
                            <el-switch
                                v-if="add_put_title == '修改备案'"
                                v-model="from_record.item.status"
                                class="mb-2 switchStyle"
                                active-text="已审"
                                inactive-text="未审"
                                :active-value="1"
                                :inactive-value="0"
                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                @change="put_record_switch"
                            />
                            <el-switch
                                v-else
                                v-model="from_record.item.status"
                                class="mb-2 switchStyle"
                                active-text="已审"
                                inactive-text="未审"
                                :active-value="1"
                                :inactive-value="0"
                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="备案编号">
                            <el-input v-model="from_record.item.sno" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item label-width="70px" label="有效期">
                            <el-date-picker
                                v-model="from_record.item.startat"
                                style="width: 100%;"
                                start-placeholder="有效时间"
                                value-format="YYYY-MM-DD"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item label-width="70px">
                            <el-date-picker
                                v-model="from_record.item.endat"
                                style="width: 100%;"
                                value-format="YYYY-MM-DD"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <el-form-item label-width="70px" label="说明">
                            <el-input v-model="from_record.item.desc" type="textarea" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="m-b-10">
                    <el-button type="primary" plain @click="addRecordDialog_arr">
                        添加备案附件
                    </el-button>
                </div>
                <div
                    v-for="(item, i) in from_record.item.affix"
                    :key="i"
                    class="serve-box"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24">
                            <el-form-item label-width="70px" label="附件">
                                <el-upload
                                    multiple
                                    action="***"
                                    :auto-upload="false"
                                    :file-list="item.key"
                                    :on-change="
                                        (file, files) => {
                                            item.key = files;
                                        }
                                    "
                                    :on-remove="
                                        (file, files) => {
                                            item.key = files;
                                        }
                                    "
                                >
                                    <el-button type="primary">选择附件</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24">
                            <el-form-item label-width="70px" label="文件类型">
                                <el-radio-group v-model="item.type" class="ml-4">
                                    <el-radio label="image">图片</el-radio>
                                    <el-radio label="file">文件</el-radio>
                                    <el-radio label="audio">音频</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24">
                            <el-form-item label-width="70px" label="文件名">
                                <el-input v-model="item.name" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div

                        class="delete-service"
                        @click="deleteRecordDialog_arr(i)"
                    >
                        <el-icon :size="20" color="#F56C6C">
                            <el-icon-circle-close />
                        </el-icon>
                    </div>
                </div>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="dialogExamineCloseFunc">
                    确认
                </el-button>
            </template>
        </el-dialog>
        <el-dialog v-model="switch_choose_zone" title="选择小区">
            <el-scrollbar height="350px">
                <position-tree-fourth :tree_item="tree_item.arr" @checkFunc="checkFunc" />
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import {
    APIgetRecordList,
    APIpostRecord,
    APIputRecord,
    APIdeleteRecord,
    APIgetRecordDetail,
    APIgetKindList,
    APIgetResidentialDetailsHouse,
    APIgetGroupDetails,
    APIgetGroupList
} from '@/api/custom/custom'
import { ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { getFilesKeys } from '@/util/files.js'
const page = ref(1)
const per_page = ref(15)
const recordList = reactive({
    arr: []
})
// cascader配置
const add_record_props = reactive({
    item: {
        value: 'id',
        label: 'name',
        children: 'children'
    }
})
const selectedZone_id = ref('')
const switch_choose_zone = ref(false)
// 把备案ID转换成对应名字
const find_right_typeId_to_name = typeid => {
    let name = ''
    recordKindList.arr.find((item, index) => {
        for (let key in item) {
            if (item.children) {
                item.children.forEach(item => {
                    for (let key in item) {
                        if (item[key] == typeid) {
                            name = item['name']
                        }
                    }
                })
            }
            if (item[key] == typeid) {
                name = item['name']
            }
        }
    })
    return name
}
// 计算属性备案主体
const add_record_title_computed = computed(
    {
        get: () => {
            return (
                add_record_zone_id_compited.item +
                find_right_typeId_to_name(from_record.item.type)
            )
        }
    },
    { deep: true }
)
const switch_add_record = ref(false)
// 刷新获取列表
const refreshPage = () => {
    page.value = 1
    per_page.value = 10
    getRecordList()
    getRecordKindList()
}
const recordKindList = reactive({ arr: [] })
// 得到备案类型列表
const getRecordKindList = () => {
    APIgetKindList('filing').then(res => {
        recordKindList.arr = res
        // console.log(res)
    })
}

// 点击添加按钮中添加小区，弹窗dialog
const click_add_record_zone_id = () => {
    switch_choose_zone.value = true
}
const from_record = reactive({
    item: {
        china_code: '',
        type: '',
        zone_id: '',
        group_id: '',
        title: '',
        sno: '',
        desc: '',
        affix: [
            {
                name: '',
                key: [],
                type: ''
            }
        ],
        startat: '',
        endat: '',
        status: 0
    }
})
const add_put_title = ref('')
const addRecord = () => {
    current_record.item = {}
    switch_add_record.value = true
    add_put_title.value = '添加备案'
    getChinaName()
}
const put_record_switch = status => {
    current_record.item.status = status
    APIputRecord(current_record.item.id, current_record.item).then(res => {
        ElMessage.success('修改成功')
    })
}
// 用户组id转换成中文
const tab_group_list = reactive({ arr: [] })
const getGroupList = () => {
    APIgetGroupList().then(res => {
        // console.log(res)
        tab_group_list.arr = res
    })
}
getGroupList()
const send_to_add_group_name = ref('')
const scope_row_group_id_chinese = val => {
    let name = ''
    tab_group_list.arr.find((item, index) => {
        for (let key in item) {
            if (item[key] == val) {
                name = item['name']
                send_to_add_group_name.value = name
            }
        }
    })

    return name
}
// 添加 添加弹出框里面的附件数组
const addRecordDialog_arr = () => {
    let data = {
        'name': '',
        'type': '',
        'key': []
    }
    from_record.item.affix.push(data)
}
// 删除 添加弹出框里面的附件数组
const deleteRecordDialog_arr = i => {
    from_record.item.affix.splice(i, 1)
}
// 添加备案选择用户组Tabs事件
const group_tab_click = item => {
    // console.log(item)
}
// 备案列表详情
const getFunRecordList = () => {
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
    // console.log(data)
    APIgetRecordList(data).then(res => {
        // console.log(res)
        data_1.total = res.length
        data_1.list = res
        recordList.arr = res
        let btnNext = document.querySelector('.btn-next')
        if (res.length < data_1.per_page) {
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
// 关闭修改弹窗dialog事件
const record_dialog_close = () => {
    from_record.item = {
        china_code: '',
        type: '',
        zone_id: '',
        group_id: '',
        title: '',
        sno: '',
        desc: '',
        affix: [
            {
                name: '',
                key: [],
                type: ''
            }
        ],
        startat: '',
        endat: '',
        status: 0
    }
}
const add_record_zone_id_compited = reactive({ item: '' })
// 提那家备案选择类型级联选择器
const add_recode_type_change = val => {
    // console.log(val)
    from_record.item.type = val[val.length - 1]
    // console.log(from_record.item.type)
}
// 添加备案选择备案小区事件
const checkFunc = val => {
    // console.log("val",val)
    if (val.leaf) {
        from_record.item.zone_id = val.id
        from_record.item.china_code = val.china_code
        switch_choose_zone.value = false
        selectedZone_id.value = val.name
    }
    APIgetResidentialDetailsHouse(from_record.item.zone_id)
        .then(res => {
            add_record_zone_id_compited.item = res.name
        })
        .catch(err => {
            return
        })
}
// 文件上传
const fileListFn = val => {
    if (!val) {
        return []
    }
    if (typeof val == 'string') {
        return [
            {
                name: val
            }
        ]
    }
    return [val]
}
const data_1 = reactive({
    search: {},
    switch_search: false,
    page: Number(sessionStorage.getItem('currentPage')) || 1,
    total: 0,
    per_page: 15,
    add_switch: false
})
// 城市接口
const tree_item = reactive({
    arr: []
})
import { APIgetChinaRegion } from '@/api/custom/custom.js'
const getChinaName = () => {
    let params = {}
    if (localStorage.getItem('utype') == 'pt') {
        params = {
            p_code: localStorage.getItem('china_code')
        }
    } else if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))) {
        params = {
            p_code: JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).region_cc,
            w:3
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        for (let i in res) {
            if (res[i].level < 5) {
                tree_item.arr.push({ name: res[i].name, type: 'region', next_type: 'region', id: res[i].code })
            } else {
                tree_item.arr.push({ name: res[i].name, type: 'region', next_type: 'zone', id: res[i].code })
            }
        }
    })
}
// switch开关
const switchRecordFun = (status, val) => {
    let params = {}
    for (let key in val) {
        if (val[key] !== null) {
            // console.log(key)
            params[key] = val[key]
        }
    }
    params.status = status
    APIputRecord(val.id, params).then()
}
const deleteRecord = val => {
    APIdeleteRecord(val).then(res => {
        ElMessage.success('删除成功')
        refreshPage()
    })
}
// 筛选重置按钮
const refreshFunc = () => {
    data_1.search = {}
    data_1.switch_search = false
    getFunRecordList()
}
// 监听事件
watch(
    data_1.page,
    () => {
        sessionStorage.setItem('currentPage', data_1.page)
        getFunRecordList()
    },
    { immediate: true, deep: true }
)
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => {
    // console.log(to)
    if (to.meta.title == '详情') {
        return true
    } else {
        sessionStorage.removeItem('currentPage')
    }
})
// 得到备案列表
const getRecordList = () => {
    APIgetRecordList().then(res => {
        // console.log(res)
        recordList.arr = res
    })
}
// 修改备案
const putRecord = val => {
    switch_add_record.value = true
    add_put_title.value = '修改备案'
    getChinaName()
    current_record.item = val
    APIgetRecordDetail(val.id).then(res => {
        // console.log(res)
        for (let i in res.affix) {
            res.affix[i].arr = []
            if (res.affix[i]) {
                for (let j in res.affix[i].key) {
                    res.affix[i].arr.push({
                        name: res.affix[i].key[j]
                    })
                }
                res.affix[i].key = res.affix[i].arr
                delete res.affix[i].arr
            }
        }
        from_record.item = res
    })
}
const current_record = reactive({
    item: {}
})
// 添加确认按钮
const dialogExamineCloseFunc = () => {
    let files = []
    let everyKeyLength = [] // 多文件上传处理
    let everyKeyLength_1 = [] // 多文件上传处理
    from_record.item.affix.forEach((item, index) => {
        everyKeyLength.push(item.key.length)
    })
    for (let x in from_record.item.affix) {
        from_record.item.affix[x].Array = []
        for (let y in from_record.item.affix[x].key) {
            if (!from_record.item.affix[x].key[y].raw) {
                from_record.item.affix[x].Array.push(from_record.item.affix[x].key[y].name)
            } else {
                files.push(from_record.item.affix[x].key[y].raw)
            }
        }

        from_record.item.affix[x].key = from_record.item.affix[x].Array
        delete from_record.item.affix[x].Array
    }
    from_record.item.affix.forEach((item, index) => {
        everyKeyLength_1.push(item.key.length)
    })
    if (files.length > 0) {
        getFilesKeys(files, 'archive').then(res => {
            let whereKey = 0
            if (add_put_title.value == '添加备案') {
                for (let x = 0; x < everyKeyLength.length; x++) { // 多文件上传处理
                    for (let y = 0; y < everyKeyLength[x]; y++) {
                        from_record.item.affix[x].key[y] = res[whereKey]
                        whereKey++
                    }
                }
            } else {
                everyKeyLength.forEach((item, index) => {
                    if (item != everyKeyLength_1[index]) {
                        let key = 0
                        key = everyKeyLength[index] - everyKeyLength_1[index]
                        for (let i = 0; i < key; i++) {
                            from_record.item.affix[index].key.push(res[i])
                        }
                    }
                })
            }
            submit_post_put()
        })
        return false
    }
    submit_post_put()
    // add_put_title.value == '添加备案'
    // for (let i in from_record.item.affix) {
    //     if (typeof from_record.item.affix[i].key != 'string') {
    //         obj[i] = from_record.item.affix[i].key
    //     }
    // }
    // let files = []
    // for (let i in obj) {
    //     files.push(obj[i].raw)
    // }
    // if (files.length > 0) {
    //     getFilesKeys(files, 'record').then(arr => {
    //         let o = 0
    //         for (let i in obj) {
    //             from_record.item.affix[i].key = arr[o]
    //             o++
    //         }
    //         submit_post_put()
    //     })
    //     return false
    // }
    // submit_post_put()
}
const submit_post_put = () => {
    for (let key in from_record.item) {
        if (from_record.item[key] !== null) {
            if (from_record.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_record.item[key] !== 0 || from_record.item[key] !== false)) {
                delete from_record.item[key]
            }
        }
    }
    if (add_put_title.value == '修改备案') {
        APIputRecord(current_record.item.id, from_record.item).then(res => {
            ElMessage.success('修改成功')
            switch_add_record.value = false
            refreshPage()
        })
    }
    if (add_put_title.value == '添加备案') {
        from_record.item.title = add_record_title_computed.value
        APIpostRecord(from_record.item).then(res => {
            ElMessage.success('添加成功')
            switch_add_record.value = false
            refreshPage()
        })
    }
}
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['information_status']).then(res => {
    opts_all.obj = res
})
refreshPage()
</script>

<style scoped lang="scss">
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
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
    width: 50px !important;
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
</style>
