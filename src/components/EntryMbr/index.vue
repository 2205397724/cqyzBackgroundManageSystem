<template>
    <div>
        <el-dialog
            v-model="box_switch"
            width="70%"
            title="报名成员"
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
                        添加报名成员
                    </el-button>
                </div>
                <el-table
                    :data="data_1.list"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="max-height: calc(85vh - 50px - 40px - 54px - 42px);width: 100%;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column label="用户id" width="300">
                        <template #default="scope">
                            <span>{{ scope.row.oid }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否有效" width="90">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.isvalid_opt,scope.row.isvalid) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="赞" width="90">
                        <template #default="scope">
                            <span>{{ scope.row.zan }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="踩" width="90">
                        <template #default="scope">
                            <span>{{ scope.row.cai }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="270">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="clickFuncModify(scope.row)"
                            >
                                修改
                            </el-button>
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
                            <el-button
                                size="small"
                                @click="()=>{
                                    data_1.zan_id = scope.row.id;
                                    data_1.zan_page = 1;
                                    getFuncZanList();
                                    data_1.zan_switch = true;
                                }"
                            >
                                赞列表
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table>
            </div>
            <el-pagination
                v-model:current-page="data_1.page"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.total"
                :page-size="data_1.per_page"
                background
                hide-on-single-page
            />
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
                :model="data_1.add_form"
            >
                <el-row :gutter="10">
                    <el-col v-if="data_1.add_title=='添加'" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-form-item
                            label-width="70px"
                            label="选项名称"
                            :error="data_1.add_error&&data_1.add_error.name?data_1.add_error.name[0]:''"
                        >
                            <div style="height: 100%;width: 100%;">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;font-size: 14px;">
                                    <SearchUser v-model:str="data_1.add_form.oid" />
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <template v-else>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label-width="70px"
                                label="是否生效"
                                :error="data_1.add_error&&data_1.add_error.isvalid?data_1.add_error.isvalid[0]:''"
                            >
                                <el-select v-model="data_1.add_form.isvalid" class="el-select" clearable placeholder="">
                                    <el-option v-for="(item,i) in opts_all.obj.isvalid_opt" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
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
                    </template>
                </el-row>
            </el-form>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="data_1.add_switch=false">取消</el-button>
                    <el-button type="primary" @click="clickFuncAddVoteopt">确定</el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 详情 -->
        <el-dialog
            v-model="data_1.details_switch"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">用户id</div>
                    <div class="right">{{ data_1.details_data.oid }}</div>
                </div>
                <div class="item">
                    <div class="left">排序</div>
                    <div class="right">{{ data_1.details_data.sort }}</div>
                </div>
                <div class="item">
                    <div class="left">是否有效</div>
                    <div class="right">{{ getOptVal(opts_all.obj.isvalid_opt,data_1.details_data.isvalid) }}</div>
                </div>
                <div class="item">
                    <div class="left">赞</div>
                    <div class="right">{{ data_1.details_data.zan }}</div>
                </div>
                <div class="item">
                    <div class="left">踩</div>
                    <div class="right">{{ data_1.details_data.cai }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_1.details_data.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_1.details_data.updated_at }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.details_switch = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 赞列表 -->
        <el-dialog
            v-model="data_1.zan_switch"
            title="点赞详情"
            width="50%"
        >
            <div>
                <el-select
                    v-model="data_1.zan_iszan" class="input-b-r" clearable placeholder="" @change="()=>{
                        data_1.zan_page = 1;
                        getFuncZanList()
                    }"
                >
                    <el-option v-for="(item,i) in opts_all.obj.isvalid_opt" :key="item.key" :label="item.val" :value="item.key" />
                </el-select>
            </div>
            <el-table
                :data="data_1.zan_list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="max-height: calc(85vh - 50px - 40px - 54px - 42px);width: 100%;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column label="用户id" width="300">
                    <template #default="scope">
                        <span>{{ scope.row.user.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <el-pagination
                v-model:current-page="data_1.zan_page"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.zan_total"
                :page-size="data_1.zan_per_page"
                background
                hide-on-single-page
            />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="data_1.zan_switch = false">取消</el-button>
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
        data_1.page = 1
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
    APIgetEntryMbrList,
    APIgetEntryMbrDetails,
    APIdeleteEntryMbr,
    APIputEntryMbr,
    APIpostEntryMbr,
    APIgetEntryMbrZanList
} from '@/api/custom/custom.js'
const data_1 = reactive({
    list: [],
    add_form: {
        extra: {}
    },
    page: 1,
    total: 0,
    per_page: 15,
    add_error: {},
    add_switch: false,
    add_title: '添加',
    details_switch: false,
    details_data: {},
    zan_switch: false,
    zan_list: [],
    zan_page: 1,
    zan_total: 0,
    zan_per_page: 15,
    zan_id: '',
    zan_iszan: 1
})
const getFuncVoteoptsList = () => {
    let data = {
        page: data_1.page,
        per_page: data_1.per_page,
        eid: id.value
    }
    APIgetEntryMbrList(data).then(res => {
        data_1.list = res.items
        data_1.total = res.aggregation.total_cnt
    })
}
watch(() => data_1.page, new_val => {
    getFuncVoteoptsList()
}, { deep: true })
const clickFuncAddVoteopt = () => {
    data_1.add_error = {}
    if (data_1.add_title == '添加') {
        let data = {
            eid: id.value,
            oid: data_1.add_form.oid
        }
        APIpostEntryMbr(data).then(res => {
            ElMessage.success(res.msg)
            refreshFunc()
            data_1.add_switch = false
        }).catch(err => {
            data_1.add_error = err.data
        })
    } else {
        APIputEntryMbr(data_1.add_form.id, data_1.add_form).then(res => {
            ElMessage.success(res.msg)
            refreshFunc()
            data_1.add_switch = false
        }).catch(err => {
            data_1.add_error = err.data
        })
    }
}
const clickFuncModify = val => {
    APIgetEntryMbrDetails(val.id).then(res => {
        if (!res.extra) {
            res.extra = {}
        }
        data_1.add_form = res
        data_1.add_title = '修改'
        data_1.add_switch = true
    })
}
const clickFuncDelete = val => {
    APIdeleteEntryMbr(val.id).then(res => {
        ElMessage.success(res.msg)
        refreshFunc()
    })
}
const clickFuncDetails = val => {
    APIgetEntryMbrDetails(val.id).then(res => {
        data_1.details_data = res
        data_1.details_switch = true
    })
}
const getFuncZanList = () => {
    let data = {
        mid: data_1.zan_id,
        page: data_1.zan_page,
        per_page: data_1.zan_per_page,
        iszan: data_1.zan_iszan
    }
    APIgetEntryMbrZanList(data).then(res => {
        data_1.zan_total = res.aggregation.total_cnt
        data_1.zan_list = res.items
    })
}
watch(() => data_1.zan_page, new_val => {
    getFuncZanList()
}, {
    deep: true
})
/* -------------------------------------------------------------------------------------------------------- */
const refreshFunc = () => {
    getFuncVoteoptsList()
}

/* -------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    getOpts,
    getOptVal
} from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['isvalid_opt']).then(res => {
    opts_all.obj = res
})
</script>
