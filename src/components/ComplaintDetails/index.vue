<template>
    <div style="height: 25px;display: inline-block;width: 50px;">
        <!-- <el-tooltip
            effect="dark"
            :content="'ID：'+props.str"
        > -->
        <div
            class="tit-box"
            style="height: 25px;width: 50px;display: flex;align-items: center;cursor: pointer;padding: 0 10px; border: 1px solid #ccc; font-size: small; border-radius: 2px;"
            @click="detailsFunc"
        >
            <span v-show="type.value == 1" style="line-height: 1rem;white-space: nowrap;overflow: hidden;">详情</span>
            <span v-show="type.value === 2" style="line-height: 1rem;white-space: nowrap;overflow: hidden;">档案</span>
            <span v-show="type.value === 3" style="line-height: 1rem;white-space: nowrap;overflow: hidden;">维保记录</span>
            <!-- <el-icon class="tit-icon" :class="{'tit-icon-on':!icon_hover}" :size="20" color="#aaaaaa" @click.stop="clearFunc"><el-icon-circle-close /></el-icon> -->
        </div>
        <!-- </el-tooltip> -->

        <el-dialog
            v-model="switch_details"
            title="详情"
            width="100%"
            destroy-on-close
            @closed="closeDialog"
        >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="1">
                    <el-scrollbar height="400px">
                        <div class="details-box">
                            <div class="item">
                                <div class="left">设备名称</div>
                                <div class="right">{{ data_details.item.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">小区>楼栋>单元</div>
                                <div class="right">{{ zoneName.name }} {{ buildingName.name }} {{ unitName.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">所在地址</div>
                                <div class="right">{{ data_details.item.addr }}</div>
                            </div>
                            <div class="item">
                                <div class="left">编号</div>
                                <div class="right">{{ data_details.item.sno }}</div>
                            </div>
                            <div class="item">
                                <div class="left">品牌</div>
                                <div class="right">{{ data_details.item.brand }}</div>
                            </div>
                            <div class="item">
                                <div class="left">提醒信息</div>
                                <div class="right">{{ data_details.item.warn }}</div>
                            </div>
                            <div class="item">
                                <div class="left">类型</div>
                                <div class="right">{{ getOptVal(opts_all.obj.device_type,data_details.item.type) }}</div>
                            </div>
                            <div class="item">
                                <div class="left">状态</div>
                                <div class="right">{{ getOptVal(opts_all.obj.device_status,data_details.item.status) }}</div>
                            </div>
                            <div class="item">
                                <div class="left">是否显示</div>
                                <div class="right">{{ getOptVal(opts_all.obj.device_show,data_details.item.show) }}</div>
                            </div>
                            <div class="item">
                                <div class="left">创建时间</div>
                                <div class="right">{{ data_details.item.created_at }}</div>
                            </div>
                            <div class="item">
                                <div class="left">更新时间</div>
                                <div class="right">{{ data_details.item.updated_at }}</div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="档案信息" name="2">
                    <el-scrollbar height="400px">
                        <div>
                            <el-timeline v-for="(item,index) in data_archive.arr" :key="index">
                                <el-timeline-item :timestamp="item.created_at" placement="top">
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">档案名称</div>
                                                <div class="right">{{ item.title }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">档案id</div>
                                                <div class="right">{{ item.id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">设备id</div>
                                                <div class="right">{{ item.did }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">是否显示</div>
                                                <div class="right">{{ getOptVal(opts_all.obj.device_show,item.show) }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">更新时间</div>

                                                <div class="right">{{ item.updated_at }}</div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="data_archive.arr.length <= 0" class="size-lx">此设备无档案信息</div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="维保记录" name="3">
                    <el-scrollbar height="400px">
                        <div>
                            <el-timeline v-for="(item,index) in data_repair.arr" :key="index">
                                <el-timeline-item :timestamp="item.created_at" placement="top">
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">维保名称</div>
                                                <div class="right">{{ item.title }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">维保id</div>
                                                <div class="right">{{ item.id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">设备id</div>
                                                <div class="right">{{ item.did }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">详细记录</div>
                                                <div class="right">{{ item.content }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">类型</div>
                                                <div class="right">{{ getOptVal(opts_all.obj.repair_type,item.type) }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">是否显示</div>
                                                <div class="right">{{ getOptVal(opts_all.obj.device_show,item.show) }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">更新时间</div>
                                                <div class="right">{{ item.updated_at }}</div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="data_archive.arr.length <= 0" class="size-lx">此设备无维保记录</div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {
    APIgetDeviceDetails,
    APIgetDeviceArchiveList,
    APIgetDeviceRepairList
} from '@/api/custom/custom.js'
// const icon_hover = ref(false)
import {
    reactive,
    ref,
    defineProps
} from 'vue'
const props = defineProps(['id', 'switchName'])
// // const emit = defineEmits(['update:str'])
// // const name = ref('请点击选择产权')
const { id } = toRefs(props)
const type = ref(props.switchName)
console.log(type.value)
let switch_details = ref(false)
// // 详情
const data_details = reactive({
    item: ''
})
const data_archive = reactive({
    arr: []
})
const data_repair = reactive({
    arr: []
})
let per_page = ref(15)
let page = ref(1)
const zoneName = ref('')
const buildingName = ref('')
const unitName = ref('')
const activeName = ref('1')
// 详情
const detailsFunc = () => {
    // data_dialog.obj = val
    console.log(id.value)
    console.log(type.value)
    APIgetDeviceDetails(id.value).then(res => {
        // console.log(res)
        data_details.item = res
        switch_details.value = true
        console.log(data_details.item)
        zoneName.value = data_details.item.zoneinfo
        buildingName.value = data_details.item.buildinginfo
        unitName.value = data_details.item.unitinfo
    })

    let params = {
        page: page.value,
        per_page: per_page.value,
        did: id.value
    }
    APIgetDeviceArchiveList(params).then(res => {
        console.log(res)
        data_archive.arr = res
        switch_details.value = true
    })
    let params1 = {
        page: page.value,
        per_page: per_page.value,
        did: id.value
    }
    APIgetDeviceRepairList(params1).then(res => {
        console.log(res)
        data_repair.arr = res
        switch_details.value = true
    })

}

// 关闭详情对话框
const closeDialog = () => {
    activeName.value = '1'
}
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['illegal_user', 'illegal_type', 'device_status', 'device_type', 'device_show', 'kind', 'repair_type']).then(res => {
    // console.log(res)
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
</style>
