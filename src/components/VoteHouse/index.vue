<template>
    <div>
        <el-dialog
            v-model="box_switch"
            width="70%"
            title="投票房屋"
            custom-class="box-dialog2"
            @close="dialogClose"
        >
            <div class="content">
                <div>
                    <el-button
                        class="head-btn" type="primary"
                        @click="()=>{
                            data_1.add_form = {}
                            data_1.add_error={};
                            data_1.add_title = '添加';
                            data_1.add_switch = true;
                        }"
                    >
                        添加投票房屋
                    </el-button>
                </div>
                <el-table
                    :data="data_1.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="max-height: calc(85vh - 50px - 40px - 54px - 42px);width: 100%;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column label="选项名称" width="300">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="90">
                        <template #default="scope">
                            <el-popconfirm
                                title="确定要删除当前项么?"
                                cancel-button-type="info"
                                @confirm="clickFuncDelete(scope.row)"
                            >
                                <template #reference>
                                    <el-button
                                        type="danger"
                                        size="small"
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table>
            </div>
        </el-dialog>

        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="60%"
        >
            <ChooseHouse @chooseData="chooseDataFunc" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVoteopt">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import ChooseHouse from '@/components/ChooseHouse/index.vue'
import {
    reactive,
    ref,
    toRefs
} from 'vue'
import {
    ElMessage
} from 'element-plus'
const props = defineProps(['dialog_switch', 'id'])
const {
    dialog_switch,
    id
} = toRefs(props)
const box_switch = ref('')
watch(dialog_switch, new_val => {
    box_switch.value = new_val
    if (box_switch.value) {
        // refreshFunc()
    }
}, {
    immediate: true,
    deep: true
})
const emit = defineEmits(['update:dialog_switch'])
const dialogClose = () => {
    emit('update:dialog_switch', false)
}
/* -------------------------------------------------------------------------------------------------------- */
import {
    // APIgetVoteHouseUnit,
    APIgetVoteHouse,
    APIdeleteVoteHouse,
    APIpostVoteHouse
} from '@/api/custom/custom.js'
const data_1 = reactive({
    list: [],
    add_form: { },
    add_error: {},
    add_switch: false,
    add_title: '添加'
})
const getFuncVoteoptsList = () => {
    APIgetVoteHouse(id.value).then(res => {
        data_1.list = res.data
    })
}
const clickFuncAddVoteopt = () => {
    data_1.add_error = {}
    if (data_1.add_title == '添加') {
        console.log(choose_data.arr)
        let data = {
            b: '',
            u: '',
            h: []
        }
        APIpostVoteHouse(id.value, data).then(res => {
            ElMessage.success(res.msg)
            refreshFunc()
            data_1.add_switch = false
        }).catch(err => {
            data_1.add_error = err.data
        })
    }
}

const clickFuncDelete = val => {
    APIdeleteVoteHouse(val.id).then(res => {
        ElMessage.success(res.msg)
        refreshFunc()
    })
}
const choose_data = reactive({
    arr: []
})
const chooseDataFunc = val => {
    choose_data.arr = val
}
/* -------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncVoteoptsList()
}
</script>
<style lang="scss" scoped>

</style>
