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
                            data_1.add_form = {extra:{}}
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
            <!-- <template #footer>
                <span class="dialog-footer">
                    <el-button>Cancel</el-button>
                    <el-button type="primary">Confirm</el-button>
                </span>
            </template> -->
        </el-dialog>

        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.add_switch"
            :title="data_1.add_title"
            width="50%"
        >
            <el-form
                ref="ruleFormRef"
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="选项名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.name"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="选项值"
                            :error="data_1.add_error&&data_1.add_error.val?data_1.add_error.val[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.val"
                                placeholder="不能重复"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="排序"
                            :error="data_1.add_error&&data_1.add_error.sort?data_1.add_error.sort[0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.sort"
                                placeholder="数字越大越靠前"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="70px"
                            label="额外信息"
                            :error="data_1.add_error&&data_1.add_error['extra.desc']?data_1.add_error['extra.desc'][0]:''"
                        >
                            <el-input
                                v-model="data_1.add_form.extra.desc"
                                :autosize="{ minRows: 2, maxRows: 6 }"
                                type="textarea"
                                placeholder=""
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVoteopt">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
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
    // APIgetVoteHouse,
    // APIdeleteVoteHouse,
    // APIpostVoteHouse

    APIgetVoteoptsList,
    APIdeleteVoteopts,
    APIpostVoteopts
} from '@/api/custom/custom.js'
const data_1 = reactive({
    list: [],
    add_form: {
        extra: {}
    },
    add_error: {},
    add_switch: false,
    add_title: '添加'
})
const getFuncVoteoptsList = () => {
    APIgetVoteoptsList({ vid: id.value }).then(res => {
        data_1.list = res.data
    })
}
const clickFuncAddVoteopt = () => {
    data_1.add_error = {}
    if (data_1.add_title == '添加') {
        let data = {
            vid: id.value,
            name: data_1.add_form.name,
            val: data_1.add_form.val,
            sort: data_1.add_form.sort,
            extra: {
                desc: data_1.add_form.extra.desc
            }
        }
        APIpostVoteopts(data).then(res => {
            ElMessage.success(res.msg)
            refreshFunc()
            data_1.add_switch = false
        }).catch(err => {
            data_1.add_error = err.data
        })
    }
}

const clickFuncDelete = val => {
    APIdeleteVoteopts(val.id).then(res => {
        ElMessage.success(res.msg)
        refreshFunc()
    })
}
/* -------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncVoteoptsList()
}
</script>
<style lang="scss" scoped>

</style>
