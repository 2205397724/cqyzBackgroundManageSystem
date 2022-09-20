<template>
    <div style="width: 100%;height: 32px;border: 1px solid #dcdfe6;border-radius: 4px;" @click="click">
        <span v-if="!selectGroup_name.item" style="margin-left: 11px;color: #c0c4cc;">{{ placeholder }}</span>
        <span v-else style="margin-left: 11px;">{{ selectGroup_name.item }}</span>
        <el-dialog v-model="switchTabs" title="选择备案主体">
            <el-tabs>
                <el-tab-pane label="住建">
                    <div v-if="groupType_3.arr.length!=0">
                        <el-tag v-for="item in groupType_3.arr" :key="item.id" type="success" size="large" class="m-r-10" @click="clickTag(item)">{{ item.name }}</el-tag>
                    </div>
                    <div v-else class="flex-row flex-center">
                        <div class="font-grey">~无类型分类~</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="街道">
                    <div v-if="groupType_4.arr.length!=0">
                        <el-tag v-for="item in groupType_4.arr" :key="item.id" type="success" size="large" class="m-r-10" @click="clickTag(item)">{{ item.name }}</el-tag>
                    </div>
                    <div v-else class="flex-row flex-center">
                        <div class="font-grey">~无类型分类~</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="社区">
                    <div v-if="groupType_5.arr.length!=0">
                        <el-tag v-for="item in groupType_5.arr" :key="item.id" type="success" size="large" class="m-r-10" @click="clickTag(item)">{{ item.name }}</el-tag>
                    </div>
                    <div v-else class="flex-row flex-center">
                        <div class="font-grey">~无类型分类~</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="业委会">
                    <div v-if="groupType_6.arr.length!=0">
                        <el-tag v-for="item in groupType_6.arr" :key="item.id" type="success" size="large" class="m-r-10" @click="clickTag(item)">{{ item.name }}</el-tag>
                    </div>
                    <div v-else class="flex-row flex-center">
                        <div class="font-grey">~无类型分类~</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="物业">
                    <div v-if="groupType_7.arr.length!=0">
                        <el-tag v-for="item in groupType_7.arr" :key="item.id" type="success" size="large" class="m-r-10" @click="clickTag(item)">{{ item.name }}</el-tag>
                    </div>

                    <div v-else class="flex-row flex-center">
                        <div class="font-grey">~无类型分类~</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他">
                    <div v-if="groupType_99.arr.length!=0">
                        <el-tag v-for="item in groupType_99.arr" :key="item.id" type="success" size="large" class="m-r-10" @click="clickTag(item)">{{ item.name }}</el-tag>
                    </div>
                    <div v-else class="flex-row flex-center">
                        <div class="font-grey">~无类型分类~</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <el-button type="primary">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {
    ref, reactive, toRefs, defineEmits, defineProps
} from 'vue'
import {
    APIgetGroupList
} from '@/api/custom/custom'
const groupType_3 = reactive({ arr: [] })
const groupType_4 = reactive({ arr: [] })
const groupType_5 = reactive({ arr: [] })
const groupType_6 = reactive({ arr: [] })
const groupType_7 = reactive({ arr: [] })
const groupType_99 = reactive({ arr: [] })
// props 参数说明   placeholder:未选择时的文字描述
const prop = defineProps({ placeholder: { type: String, default: '请选择' } })
const { placeholder } = toRefs(prop)
const emit = defineEmits(['change'])
const switchTabs = ref(false)
const tab_group_list = reactive({
    arr: []
})
const getGroupList = () => {
    APIgetGroupList().then(res => {
        tab_group_list.arr = res.data
        groupType_3.arr = tab_group_list.arr.filter(item => {
            return item.type == 3
        })
        groupType_4.arr = tab_group_list.arr.filter(item => {
            return item.type == 4
        })
        groupType_5.arr = tab_group_list.arr.filter(item => {
            return item.type == 5
        })
        groupType_6.arr = tab_group_list.arr.filter(item => {
            return item.type == 6
        })
        groupType_99.arr = tab_group_list.arr.filter(item => {
            return item.type == 99
        })
        console.log(tab_group_list.arr)
    })
}
const selectGroup_name = reactive({
    item: ''
})
const clickTag = item => {
    selectGroup_name.item = item.name
    emit('change', item)
    switchTabs.value = false
}
const click = () => {
    switchTabs.value = true
}
getGroupList()
</script>
