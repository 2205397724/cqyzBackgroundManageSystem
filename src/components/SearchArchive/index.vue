<template>
    <div style="height: 100%;display: inline-block;width: 100%;">
        <div
            class="tit-box"
            :class="{'nostr':!userGroupName}"
            style="height: 100%;width: 100%;display: flex;align-items: center;cursor: pointer;padding-left: 11px;"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ userGroupName?userGroupName:'请点击选择公示' }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>

        <el-dialog
            v-model="switch_list"
            title="公示"
            width="70%"
        >
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">公示分类：</div>
                            <div class="search_tb">
                                <CascaderAnnounce v-model="data_search.obj.cid" />
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">发布人用户组：</div>

                            <div class="search_tb">
                                <div class="searchUserGroup">
                                    <SearchUserGroup ref="V_1" @checkName="checkNameFunc" />
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">状态：</div>

                            <el-select v-model="data_search.obj.status" class="search_tb" placeholder="审核状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.announce_status" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="24" :md="24" :lg="12">
                        <div class="flx">
                            <div class="w_30">
                                <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                            </div>
                            <div v-show="switch_search == true" class="w_70 m-l-30">
                                <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                                <div class="searchDetail">
                                    *搜索到相关结果共{{ total }}条。
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;padding-top: 8px;">*点击公示行选择该公示ID</div>
            <div>
                <el-scrollbar :height="data_tab.arr.length >= 8 ? '400px': ''">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                        @row-click="rowClickFunc"
                    >
                        <el-table-column label="公示主题" width="160">
                            <template #default="scope">
                                <span>{{ scope.row.title }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="公示id" width="220">
                            <template #default="scope">
                                <span>{{ scope.row.id }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="公示分类">
                            <template #default="scope">
                                <span>{{ getNameFunc(data_1.arr,scope.row.cid) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="公示对象类型" width="70">
                            <template #default="scope">
                                <span>{{ getOptVal(opts_all.obj.article_lv,scope.row.totype) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户组ID">
                            <template #default="scope">
                                <span>{{ getNameFunc(userData.arr,scope.row.groupid) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" width="150">
                            <template #default="scope">
                                <el-button v-show="scope.row.status == 1" class="btnNone" type="primary">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                <el-button v-show="scope.row.status == 2" class="btnNone noDeal" type="warning">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                <el-button v-show="scope.row.status == 3" class="btnNone" type="warning">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                <el-button v-show="scope.row.status == 4" class="btnNone" type="success">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                                <el-button v-show="scope.row.status == 5" class="btnNone" type="info">{{ getOptVal(opts_all.obj.announce_status,scope.row.status) }} </el-button>
                            </template>
                        </el-table-column>

                        <el-table-column />
                    </el-table>
                </el-scrollbar>
            </div>
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
        </el-dialog>
    </div>
</template>

<script setup>
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineEmits
} from 'vue'
import {
    APIgetEventArticleList
} from '@/api/custom/custom.js'
const switch_list = ref(false)
// const props = defineProps(['str'])
const emit = defineEmits(['checkUserNameFunc'])
const loading_tab = ref(false)
const data_tab = reactive({
    arr: []
})
const total = ref(100)
const per_page = ref(15)
const page = ref(1)
const switch_search = ref(false)
const data_search = reactive({
    obj: {}
})
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
// 打开弹窗
const openDigFunc = () => {
    switch_list.value = true
    getTabListFunc()
}
watch(page, () => {
    getTabListFunc()
})
// 获取列表
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
    loading_tab.value = true
    APIgetEventArticleList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
    })
}
const userGroupName = ref('')
const rowClickFunc = row => {
    emit('checkUserNameFunc', row)
    userGroupName.value = row.title
    switch_list.value = false
}
const clearFunc = () => {
    emit('checkUserNameFunc', '')
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const V_1 = ref(null)
const refreshFunc_1 = () => {
    V_1.value.clearFunc()
    refreshFunc()
}
// 选择用户组name
const userName = ref('')
const userData = reactive({
    arr: []
})
const checkNameFunc = val => {
    console.log(val)
    data_search.obj.groupid = val.id
    // from_examine.item.groupid = val.id
    userName.value = val.name
}
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
APIgetGroupList().then(res => {
    if (res.status == 200) {
        console.log(res)
        loading_tab.value = false
        userData.arr = res.data
    }
})
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
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
// 选择用户name
const usersName = ref('')
const checkUsersNameFunc = val => {
    console.log(val)
    data_search.obj.groupid = val.id
}

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['article_lv', 'article_type', 'terminal', 'article_lv', 'announce_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
.tit-box {
    position: relative;
    .tit-icon {
        position: absolute;
        right: 10px;
        top: calc(50% - 10px);
        background-color: #fff;
        z-index: 1;
    }
    .tit-icon-on {
        display: none;
    }
}
.nostr {
    color: #aaa;
}
.noDeal {
    margin-left: 6px;
}
</style>
