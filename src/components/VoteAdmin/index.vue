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
                <div>
                    <el-button
                        class="head-btn" type="primary"
                        @click="getFnOpts"
                    >
                        录入线下票
                    </el-button>
                    <el-button
                        :disabled="true||data_1.hebing_piao.length<=0"
                        class="head-btn" type="primary"
                        @click="()=>{

                        }"
                    >
                        <!-- 票id?合并为准的id？ -->
                        合并票
                    </el-button>
                </div>
                <el-table
                    :data="data_1.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="max-height: calc(85vh - 50px - 40px - 54px - 42px);width: 100%;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                    @selection-change="(val)=>{
                        data_1.hebing_piao = val
                    }"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="ID" width="240">
                        <template #default="scope">
                            <span>{{ scope.row.id }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户" width="110">
                        <template #default="scope">
                            <span>{{ scope.row.uinfo.realname }} </span>
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
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_1.details_data.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_1.details_data.updated_at }}</div>
                </div>
                <div class="item">
                    <div class="left">所属房屋</div>
                    <div class="right">
                        <div v-for="(item,i) in data_1.details_data.votehouses" style="display: flex;">
                            <div style="margin-right: 100px;">房屋id：{{ item.hid }}</div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="left">选项</div>
                    <div class="right">
                        <div v-for="(item,i) in data_1.details_data.voteconts" style="display: flex;">
                            <div style="margin-right: 100px;">选项id：{{ item.optid }}</div>
                            <div>选择值：{{ getOptVal(opts_all.obj.vote_toupiao,item.sure) }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 修改添加 -->
        <el-dialog
            v-model="data_1.offline_switch"
            title="录入线下票"
            width="50%"
        >
            <el-form
                :model="data_1.offline_form"
            >
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="用户身份证号"
                            :error="data_1.offline_err&&data_1.offline_err.idcard&&data_1.offline_err.idcard[0]"
                        >
                            <el-input
                                v-model="data_1.offline_form.idcard"
                                class="head-btn"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="投几项"
                        >
                            {{ vmax }}
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item
                            label-width="100px"
                            label="投票选项"
                            :error="data_1.offline_err&&data_1.offline_err.optid&&data_1.offline_err.optid[0]"
                        >
                            <el-button
                                class="head-btn"
                                size="small"
                                @click="()=>{
                                    data_1.offline_form.optid = []
                                    data_1.offline_form.optval = []
                                }"
                            >
                                重选
                            </el-button>
                            <div style="width: 100%;">
                                <div v-for="(opt,o) in data_1.vote_opts" style="display: flex;justify-content: space-between;border-bottom: 1px solid #eeeeee;margin-bottom: 10px;padding-bottom: 4px;">
                                    <div style="margin-right: 30px;">{{ opt.name }}</div>
                                    <div style="margin-left: auto;">
                                        <el-radio-group
                                            v-model="data_1.offline_form.optval[o]" :disabled="data_1.offline_form.optid.length>=vmax" style="flex-wrap: initial;" @change="()=>{
                                                data_1.offline_form.optid.push(opt.id)
                                            }"
                                        >
                                            <el-radio v-for="(item,i) in opts_all.obj.vote_toupiao" :label="item.key">{{ item.val }}</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.offline_switch=false">取消</el-button>
                    <el-button type="primary" @click="offlineFnUp">确定</el-button>
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
const props = defineProps(['dialog_switch', 'id', 'vmax'])
const {
    dialog_switch,
    id,
    vmax
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
    APIdeleteTicket,
    APIgetVoteoptsList,
    APIpostOfflineAdd
} from '@/api/custom/custom.js'
const data_1 = reactive({
    list: [],
    details_switch: false,
    details_data: {},
    page: 1,
    per_page: 15,
    total: 0,
    hebing_piao: [],
    offline_switch: false,
    offline_form: {},
    offline_err: {},
    vote_opts: []
})
const getFuncVoteoptsList = () => {
    APIgetTicketList(id.value, {
        page: data_1.page,
        per_page: data_1.per_page
    }).then(res => {
        data_1.list = res.data.items
        data_1.total = res.data.aggregation.total_cnt
    })
}
const clickFuncDelete = val => {
    APIdeleteTicket(val.id).then(res => {
        ElMessage.success(res.msg || '删除成功！')
        refreshFunc()
    })
}
const clickFuncDetails = val => {
    APIgetTicketDetails(val.id).then(res => {
        data_1.details_data = res.data
        data_1.details_switch = true
    })
}
const getFnOpts = () => {
    data_1.offline_err = {}
    data_1.offline_form = {}
    data_1.offline_form.optid = []
    data_1.offline_form.optval = []
    APIgetVoteoptsList({ vid: id.value }).then(res => {
        data_1.vote_opts = res.data
        data_1.offline_switch = true
    })
}
const offlineFnUp = () => {
    data_1.offline_err = {}
    data_1.offline_form.optval = data_1.offline_form.optval.filter(item => { if (item || item === 0) { return item } })
    APIpostOfflineAdd(id.value, data_1.offline_form).then(res => {
        ElMessage.success(res.msg)
        data_1.offline_switch = false
        refreshFunc()
    }).catch(err => {
        data_1.offline_err = err.data
    })
}
/* -------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncVoteoptsList()
}
/* -------------------------------------------------------------------------------------------------------- */
// // 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts([ 'vote_toupiao']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss" scoped>

</style>
