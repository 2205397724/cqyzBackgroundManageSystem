<template>
    <div>
        <page-main>
            <div style="font-size: 22px;">
                {{ route.query.title }}
            </div>
            <div class="flex-row flex-zhu-center flex-between" style="width: 200px;height: 60px;">
                <div class="size-sm" style="color: #999;">备案编号: {{ route.query.sno }}</div>
                <div>
                    <el-switch
                        v-model="current_record_detail.item.status" active-text="已审" inactive-text="未审"
                        :active-value="1"
                        :inactive-value="0"
                        class="mb-2 switchStyle"
                        style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                        @change="switchRecordFun"
                    />
                </div>
            </div>
            <div class="flex-row m-t-40">
                <div class="flex-column" style="flex: 1;">
                    <span style="color: #409eff;" class="size-base strong">备案主体</span>
                    <div style="width: 90%;height: 1px;background-color: #dcdfe6;" class="m-tb-10" />
                    <span style="color: #909399;" class="size-base m-t-10">主体名称: {{ route.query.gruop_name }}</span>
                    <span style="color: #909399;" class="size-base">统一信用代码:{{}}</span>
                </div>
                <div class="flex-column" style="flex: 1;">
                    <span style="color: #409eff;" class="size-base strong">备案项目</span>
                    <div style="width: 90%;height: 1px;background-color: #dcdfe6;" class=" m-tb-10" />
                    <span style="color: #909399;" class="size-base m-t-10">项目名称:{{ current_record_detail.item.zone_info.name }}</span>
                    <span style="color: #909399;" class="size-base">项目地址:{{ current_record_detail.item.zone_info.addr }}</span>
                </div>
            </div>
            <div class="flex-column m-t-40">
                <span style="color: #409eff;" class="size-base strong">备案资料</span>
                <!-- <div style="width: 96%;height: 1px;background-color: #dcdfe6;" class="m-tb-10" />
                <div v-for="(item,index) in current_record_detail.item.affix" :key="item.key">
                    <div style="color: #909399;" class="size-base m-tb-10">{{ item.name }}</div>
                    <div class="flex-row">
                        <el-image
                            :src="'http://192.168.110.37:10090/zgj/'+item.key" lazy style="width: 100px;height: 100px;"
                            :preview-src-list="preImg.arr"
                            :initial-index="index"
                            class="m-r-20 m-b-20"
                        />
                    </div>
                </div> -->
                <div v-if="current_record_detail.item.affix && current_record_detail.item.affix.length >= 1" class="item">
                    <div class="m-t-20 flx">
                        <div v-for="(val, i) in current_record_detail.item.affix" :key="i" class="inline-block">
                            <div v-for="(row, j) in val.key" v-if="val.type == 'file'" class="inline-block image m-r-10" style="text-align: center; background-color: #f0f9eb; vertical-align: center;">
                                <el-link type="success" class="link" :href="VITE_APP_FOLDER_SRC+row" target="_blank">{{ val.name }}</el-link>
                            </div>
                            <!-- <el-tag
                                                            v-if="val.type == 'file'" type="success" size="small"
                                                            class="m-r-10"
                                                        >
                                                            {{ val.name }}
                                                        </el-tag> -->
                            <el-image
                                v-for="(row, j) in val.key" v-if="val.type == 'image'"
                                :preview-src-list="val.keys"
                                class="image m-r-10 m-l-10" :src="VITE_APP_FOLDER_SRC + row"
                                fit="cover"
                            />
                            <vue3VideoPlay
                                v-for="(row, j) in val.key"
                                v-if="val.type == 'audio'" v-bind="optionsAll"
                                :src="VITE_APP_FOLDER_SRC + row" class="image m-r-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import {
    ref, reactive
} from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { APIgetRecordList,
    APIgetRecordDetail,
    APIgetKindList,
    APIputRecord } from '@/api/custom/custom'
const VITE_APP_FOLDER_SRC = import.meta.env.VITE_APP_FOLDER_SRC
const route = useRoute()
const preImg = reactive({
    arr: []
})
const all_filing_recordList = reactive({
    arr: []
})
const typeId_to = ref('')
const recordKindList = reactive({ arr: [] })
// switch修改备案
const switchRecordFun = val => {
    console.log(val)
    APIputRecord(route.query.id, { status: parseInt(val) }).then(res => {
        ElMessage.success('修改成功')
    })
}
// 拿去备案类型列表
const current_record_detail = reactive({
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
        status: 0,
        zone_info: {
            name: '',
            addr: ''
        }
    }
})
const getRecordKindList = () => {
    APIgetRecordDetail(route.query.id).then(res => {
        current_record_detail.item = res
        current_record_detail.item.affix.forEach(item => {
            preImg.arr.push('http://192.168.110.37:10090/zgj/' + item.key)
        })
        console.log(current_record_detail.item)
    })
    APIgetKindList('filing').then(res => {
        recordKindList.arr = res
    })
}
getRecordKindList()
// 根据typeid找name
const find_right_typeId_to_name = typeid => {
    let name = ''
    recordKindList.arr.find((item, index) => {
        for (let key in item) {
            if (item[key] == typeid) {
                console.log(item.name)
                name = item['name']
            }
        }
    })
    return name
}
</script>

<style scoped lang="scss">
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
.link {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.d-player-wrap {
    width: 160px;
    height: 100px;
}
</style>
