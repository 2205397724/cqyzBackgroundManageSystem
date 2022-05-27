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
                            choose_data.arr = data_1.list;
                            choose_data.oldval = data_1.list;
                        }"
                    >
                        添加投票房屋
                    </el-button>
                    <el-popconfirm
                        title="确定要删除当前事项下所有房屋么?"
                        cancel-button-type="info"
                        @confirm="clickFuncDelete"
                    >
                        <template #reference>
                            <el-button
                                type="danger"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </div>
                <el-table
                    :data="data_1.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="max-height: calc(85vh - 50px - 40px - 54px - 42px);width: 100%;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column label="房屋ID" width="300">
                        <template #default="scope">
                            <span>{{ scope.row }} </span>
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
            <ChooseHouse v-if="data_1.add_switch" v-model:houses="choose_data.arr" :oldval="choose_data.oldval" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" :disabled="choose_data.arr.length<=0" @click="clickFuncAddVoteopt">确定</el-button>
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
        refreshFunc()
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
        let data = {
            // b: '',
            // u: '',
            h: choose_data.arr
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

const clickFuncDelete = () => {
    APIdeleteVoteHouse(id.value).then(res => {
        ElMessage.success(res.msg)
        refreshFunc()
    })
}
const choose_data = reactive({
    arr: [],
    oldval: []
})
/* -------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncVoteoptsList()
}
</script>
<style lang="scss" scoped>

</style>
