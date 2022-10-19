<template>
    <div class="head">
        <div
            class="tit-box head_th"
            :class="{'nostr':!userName}"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span v-if="!props.name" class="head_tb">{{ userName?userName:'请点击选择' }}</span>
            <span v-if="props.name" class="head_tb" style="color: #626466;">{{ props.name }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>

        <el-dialog
            v-model="switch_list"
            title="用户组"
            width="70%"
            style="z-index: 999999;"
        >
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                用户组名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input
                                    v-model="data_search.obj.name" class="search_tb" placeholder="用户名"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                区域：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <Cascaders v-model="data_search.obj.region_cc" style="max-width: 200px;margin-bottom: 10px;" />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button
                            v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading"
                            @click="refreshFunc"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>

            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;">*点击列表选择用户组</div>
            <div class="hidden">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;border-bottom: 0 solid #fff !important;"
                    :tree-props="{ children: 'children' }"
                    row-key="id"
                    default-expand-all
                    @row-click="rowClickFunc"
                    @selection-change="selectionChangeFunc"
                >
                    <el-table-column v-if="props.checkbox" type="selection" width="55" />
                    <el-table-column prop="name" label="名称" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="ID" width="250">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="上级ID" width="250">
                        <template #default="scope">
                            <span>{{ scope.row.pid }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="等级" width="90">
                        <template #default="scope">
                            <span>{{ scope.row.level }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" label="创建时间" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.created_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updated_at" label="更新时间" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.updated_at }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table>
                <el-pagination
                    v-model:current-page="data.page" class="btnClass" style="float: right;" layout="prev,next,jumper," :total="50"
                    :page-size="data.per_page" background prev-text="上一页" next-text="下一页" hide-on-single-page
                />
            </div>
            <template #footer>
                <span v-if="props.checkbox" style="width: 100%;text-align: right;">
                    <el-button type="primary" @click="getUsers">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
const  code = ref('')
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineExpose,
    defineEmits
} from 'vue'
const data_search = reactive({
    obj: {}
})
import {
    APIgetGroupList
} from '@/api/custom/custom.js'
const switch_list = ref(false)
// const props = defineProps({ 'str': { type: String, default: '' }, checkbox: { type: Boolean, default: false } })
const props = defineProps(['name'])
const emit = defineEmits(['update:name', 'checkName'])
// const { name } = toRefs(props)
const loading_tab = ref(false)
const data_tab = reactive({
    arr: []
})
const switch_search = ref(false)
// 打开弹窗
const openDigFunc = () => {
    emit('update:name', '')
    switch_list.value = true
    getTabListFunc()
}
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
const data = reactive({
    page: 1,
    per_page: 15
})
// 刷新
const refreshFunc = () => {
    data.page = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
watch(() => data.page, new_val => {
    console.log(data.page)
    getTabListFunc()
}, { deep: true })
// let per_page = ref(500)
// let page = ref(1)
let total = ref(100)
// const UserGroupClosed = () => {
//     userName.value = ''
// }
// 获取列表
const getTabListFunc = () => {
    let params = {
        page: data.page,
        per_page: data.per_page
    }
    loading_tab.value = true
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    APIgetGroupList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        total.value = res.length
        data_tab.arr = res
        let btnNext1 = document.querySelector('.btnClass')
        let btnNext2 = btnNext1.children[1]
        console.log(btnNext2)
        if (res.length < data.per_page) {
            console.log('a')
            btnNext2.classList.add('not_allowed')
            btnNext2.setAttribute('disabled', true)
            btnNext2.setAttribute('aria-disabled', true)
        } else {
            btnNext2.classList.remove('not_allowed')
            btnNext2.removeAttribute('disabled')
            btnNext2.setAttribute('aria-disabled', false)
        }
    })
}
const userName = ref('')
const userId = ref('')
const rowClickFunc = row => {
    if (!props.checkbox) {
        console.log(props.str)
        // console.log(props.str)
        emit('checkName', row)
        userName.value = row.name
        userId.value = row.id
        switch_list.value = false
    }
}
const users = reactive({
    arr: []
})
const selectionChangeFunc = val => {
    users.arr = val
}
const getUsers = () => {
    let arr = []
    for (let i in users.arr) {
        arr.push(users.arr[i].id)
    }
    emit('update:str', arr)
    switch_list.value = false
}
const clearFunc = () => {
    // emit('update:str', '')
    userName.value = ''
}
defineExpose({
    clearFunc,
    userId
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
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
.head {
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background-color: #fff;
    .head_th {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: 11px;
        .head_tb {
            line-height: 1rem;
            white-space: nowrap;
        }
    }
}
</style>
