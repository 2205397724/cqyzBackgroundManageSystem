<template>
    <div class="head">
        <div
            class="tit-box head_th"
            :class="{'nostr':!userName}"
            @click="openDigFunc"
            @mouseenter="icon_hover=true" @mouseleave="icon_hover=false"
        >
            <span v-if="!props.name" class="head_tb">{{ userName?userName:'请点击选择设备' }}</span>
            <span v-if="props.name" class="head_tb" style="color: #626466;">{{ props.name }}</span>
            <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon>
        </div>

        <el-dialog
            v-model="switch_list"
            title="设备"
            width="70%"
        >
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="设备" name="1">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="id" label="设备名称">
                                    <template #default="scope">
                                        <span>{{ scope.row.name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="设备编号">
                                    <template #default="scope">
                                        <span>{{ scope.row.sno }} </span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="id" label="所在位置">
                        <template #default="scope">
                            <span>{{ scope.row.zoneinfo.name }} {{ scope.row.buildinginfo.name }} {{ scope.row.unitinfo.name }} </span>
                        </template>
                    </el-table-column> -->
                                <el-table-column prop="cid" label="类型" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_type,scope.row.type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="是否显示" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cid" label="状态" width="90">
                                    <template #default="scope">
                                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark">正常</el-tag>
                                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="danger" effect="dark"> 故障</el-tag>
                                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" effect="dark">维修</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column />
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="设施" name="2">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="id" label="设备名称">
                                    <template #default="scope">
                                        <span>{{ scope.row.name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="设备编号">
                                    <template #default="scope">
                                        <span>{{ scope.row.sno }} </span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="id" label="所在位置">
                        <template #default="scope">
                            <span>{{ scope.row.zoneinfo.name }} {{ scope.row.buildinginfo.name }} {{ scope.row.unitinfo.name }} </span>
                        </template>
                    </el-table-column> -->
                                <el-table-column prop="cid" label="类型" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_type,scope.row.type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="是否显示" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cid" label="状态" width="90">
                                    <template #default="scope">
                                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark">正常</el-tag>
                                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="danger" effect="dark"> 故障</el-tag>
                                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" effect="dark">维修</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column />
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="部位" name="3">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="id" label="设备名称">
                                    <template #default="scope">
                                        <span>{{ scope.row.name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="设备编号">
                                    <template #default="scope">
                                        <span>{{ scope.row.sno }} </span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="id" label="所在位置">
                        <template #default="scope">
                            <span>{{ scope.row.zoneinfo.name }} {{ scope.row.buildinginfo.name }} {{ scope.row.unitinfo.name }} </span>
                        </template>
                    </el-table-column> -->
                                <el-table-column prop="cid" label="类型" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_type,scope.row.type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="是否显示" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cid" label="状态" width="90">
                                    <template #default="scope">
                                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark">正常</el-tag>
                                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="danger" effect="dark"> 故障</el-tag>
                                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" effect="dark">维修</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column />
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                    <el-tab-pane label="其他" name="9">
                        <el-scrollbar height="300px">
                            <el-table
                                v-loading="loading_tab"
                                :data="data_tab.arr"
                                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                                style="width: 100%;min-height: 300px;border: 1px solid rgb(235 238 245); border-radius: 6px;"
                                @row-click="rowClickFunc"
                            >
                                <el-table-column prop="id" label="设备名称">
                                    <template #default="scope">
                                        <span>{{ scope.row.name }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="设备编号">
                                    <template #default="scope">
                                        <span>{{ scope.row.sno }} </span>
                                    </template>
                                </el-table-column>
                                <!-- <el-table-column prop="id" label="所在位置">
                        <template #default="scope">
                            <span>{{ scope.row.zoneinfo.name }} {{ scope.row.buildinginfo.name }} {{ scope.row.unitinfo.name }} </span>
                        </template>
                    </el-table-column> -->
                                <el-table-column prop="cid" label="类型" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_type,scope.row.type) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="id" label="是否显示" width="90">
                                    <template #default="scope">
                                        <span>{{ getOptVal(opts_all.obj.device_show,scope.row.show) }} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="cid" label="状态" width="90">
                                    <template #default="scope">
                                        <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" effect="dark">正常</el-tag>
                                        <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="danger" effect="dark"> 故障</el-tag>
                                        <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" effect="dark">维修</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column />
                            </el-table>
                        </el-scrollbar>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps,
    defineExpose,
    defineEmits
} from 'vue'
import {
    APIgetDeviceList
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
const data_search = reactive({
    obj: {}
})
const activeName = ref('1')
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
        per_page: per_page.value,
        type: parseInt(activeName.value)
    }
    loading_tab.value = true
    APIgetDeviceList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
    })
}
const handleClick = () => {
    getTabListFunc()
    activeName.value = '1'
}
const userName = ref('')
const rowClickFunc = row => {
    // name.value = row.name
    emit('checkName', row)
    userName.value = row.name
    switch_list.value = false
}
const clearFunc = () => {
    userName.value = ''
}
defineExpose({
    clearFunc
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['device_type', 'device_show']).then(res => {
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
