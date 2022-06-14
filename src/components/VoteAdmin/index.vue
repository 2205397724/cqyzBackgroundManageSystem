<template>
    <div>
        <el-dialog
            v-model="box_switch"
            width="70%"
            title="票管理"
            custom-class="box-dialog2"
            @close="dialogClose"
        >
            <div class="content">
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
                    <el-table-column fixed="right" label="操作" width="140">
                        <template #default="scope">
                            <el-button
                                size="small"
                                @click="clickFuncDetails(scope.row)"
                            >
                                详情
                            </el-button>
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

        <!-- 详情 -->
        <el-dialog
            v-model="data_1.details_switch"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">选项名称</div>
                    <div class="right">{{ data_1.details_data.name }}</div>
                </div>
                <div class="item">
                    <div class="left">选项值</div>
                    <div class="right">{{ data_1.details_data.val }}</div>
                </div>
                <div class="item">
                    <div class="left">排序</div>
                    <div class="right">{{ data_1.details_data.sort }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_1.details_data.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_1.details_data.updated_at }}</div>
                </div>
                <div class="item">
                    <div class="left">额外信息</div>
                    <div v-if="data_1.details_data.extra" class="right">{{ data_1.details_data.extra.desc }}</div>
                    <div v-else class="right">无</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
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
    APIgetTicketList,
    APIgetTicketDetails,
    APIdeleteTicket
} from '@/api/custom/custom.js'
const data_1 = reactive({
    list: [],
    details_switch: false,
    details_data: {},
    page:1,
    per_page:15,
    total:0
})
const getFuncVoteoptsList = () => {
    APIgetTicketList(id.value,{
        page:data_1.page,
        per_page:data_1.per_page
    }).then(res => {
        data_1.list = res.data.items
        data_1.total = res.data.aggregation.total_cnt
    })
}
const clickFuncDelete = val => {
    APIdeleteTicket(val.id).then(res => {
        ElMessage.success(res.msg)
        refreshFunc()
    })
}
const clickFuncDetails = val => {
    APIgetTicketDetails(val.id).then(res => {
        data_1.details_data = res.data
        data_1.details_switch = true
    })
}
/* -------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncVoteoptsList()
}
</script>
<style lang="scss" scoped>

</style>
