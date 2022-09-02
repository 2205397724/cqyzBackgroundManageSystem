<template>
    <div style="height: 100%;display: inline-block;width: 100%;">
        <div
            class="tit-box"
            :class="{'nostr':!userName}"
            style="height: 100%;width: 100%;display: flex;align-items: center;cursor: pointer;padding-left: 11px;"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span v-if="!props.name" style="line-height: 1rem;white-space: nowrap;overflow: hidden;">{{ userName?userName:'请点击选择用户' }}</span>
            <span v-if="props.name" class="head_tb" style="color: #626466;">{{ props.name }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>

        <el-dialog
            v-model="switch_list"
            title="用户"
            width="70%"
            class="hidden"
        >
            <el-row :gutter="10">
                <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                    <el-input v-model="data_search.obj.username" class="head-btn" placeholder="用户名" clearable />
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                    <el-input v-model="data_search.obj.mobile" class="head-btn" placeholder="手机号" clearable />
                </el-col>
                <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                    <el-input v-model="data_search.obj.id_card" class="head-btn" placeholder="身份证号" clearable />
                </el-col>
                <!-- <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.gender" class="head-btn" placeholder="性别" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.gender" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.status_cert" class="head-btn" placeholder="认证状态" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.status_all" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.house_id" class="head-btn" placeholder="终端类型" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.terminal" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <el-select v-model="data_search.obj.oauth_type" class="head-btn" placeholder="第三方登录类型" clearable>
                        <el-option v-for="(item,i) in opts_all.obj.login_type" :key="item.key" :label="item.val" :value="item.key" />
                    </el-select>
                </el-col>
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                    <Cascaders v-model="data_search.obj.region" />
                </el-col> -->
                </el-row>
                <el-row>
            <el-col :xs="24" :md="12" :lg="24">
                <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                <el-button style="margin-right: 10px;" :icon="Loading" @click="refreshFunc" v-show="switch_search == true">重置</el-button>
                <span class="size-base" v-show="switch_search == true">
                *搜索到相关结果共{{ total }}条。
            </span>
            </el-col>
        </el-row>
            <div style="font-size: 14px;color: #aaa;margin-bottom: 8px;padding-top: 8px;">*点击用户所在行选择该用户</div>

            <el-scrollbar height="450px">
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                    @row-click="rowClickFunc"
                >
                    <el-table-column prop="username" label="用户名" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.username }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号" width="180">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.mobile }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户ID" width="250">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id_card" label="身份证号" width="220">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ scope.row.id_card }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" label="性别" width="90">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.gender,scope.row.gender) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_cert" label="认证状态" width="120">
                        <template #default="scope">
                            <span style="margin-left: 10px;">{{ getOptVal(opts_all.obj.status_all,scope.row.status_cert) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table>
            </el-scrollbar>
            <div style="padding-top: 20px;">
                <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="50"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import { Loading,Search } from '@element-plus/icons-vue'
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineExpose,
    defineEmits
} from 'vue'
import {
    APIgetUserList
} from '@/api/custom/custom.js'
const switch_list = ref(false)
const props = defineProps(['name'])
const emit = defineEmits(['update:name', 'checkName'])
// const name = ref('请点击选择房屋')
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
    emit('update:name', '')
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
    // APIgetUserList(params).then(res => {
    //         loading_tab.value = false
    //         data_tab.arr = res
    //         total.value = res.length
    // })
    APIgetUserList(params).then(res => {
        if (res.status == 200) {
            console.log(res)
            loading_tab.value = false
            data_tab.arr = res.data
            total.value = res.data.length
            let btnNext = document.querySelector('.btn-next')
        if (res.length <= per_page.value) {
            flag.value = true
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            flag.value = false
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
        }
    })
}
const userName = ref('')
const rowClickFunc = row => {
    // name.value = row.name
    emit('checkName', row)
    userName.value = row.username
    switch_list.value = false
}
const clearFunc = () => {
    userName.value = ''
}
defineExpose({
    clearFunc
})
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['status_all', 'other_auth', 'gender', 'terminal', 'login_type']).then(res => {
    opts_all.obj = res
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
</style>
