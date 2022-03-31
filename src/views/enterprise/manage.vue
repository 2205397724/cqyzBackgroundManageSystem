<template>
    <div class="routine-residential">
        <page-main>
            <div>
                <!-- <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加企业</el-button>
                        </el-col>
                    </el-row>
                </div> -->
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="name" label="企业名称" width="180" />
                        <el-table-column prop="user_id" label="user_id" width="250" />
                        <el-table-column prop="social_code" label="社会责任代码" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.social_code }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="企业类型" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.enterprise_type,scope.row.type) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="logo" label="企业图标" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.logo }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="legal" label="legal" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.legal }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="contact" label="contact" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.contact }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="desc" label="简介" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.desc }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column />
                        <el-table-column fixed="right" label="操作" width="200">
                            <template #default="scope">
                                <el-button
                                    type="primary" size="small"
                                    @click="modifyResidentialFunc(scope.row)"
                                >
                                    修改
                                </el-button>
                                <el-button
                                    size="small"
                                    @click="detailsFunc(scope.row)"
                                >
                                    详情
                                </el-button>
                                <el-popconfirm
                                    title="确定要删除当前项么?" cancel-button-type="info"
                                    @confirm="deleteFunc(scope.row)"
                                >
                                    <template #reference>
                                        <el-button type="danger" size="small">
                                            删除
                                        </el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="page"
                        layout="total,prev,pager,next,jumper,"
                        :total="total"
                        :page-size="per_page"
                        background
                        hide-on-single-page
                    />
                </div>
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                    :rules="rule_examine"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="logo" prop="logo"
                                :error="from_error.msg&&from_error.msg.logo?from_error.msg.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.logo"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="contact" prop="contact"
                                :error="from_error.msg&&from_error.msg.contact?from_error.msg.contact[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.contact"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="简介" prop="desc"
                                :error="from_error.msg&&from_error.msg.desc?from_error.msg.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.desc"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
            v-model="switch_details"
            title="详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">id</div>
                    <div class="right">{{ data_details.item.id }} </div>
                </div>
                <div class="item">
                    <div class="left">user_id</div>
                    <div class="right">{{ data_details.item.user_id }} </div>
                </div>
                <div class="item">
                    <div class="left">企业名称</div>
                    <div class="right">{{ data_details.item.name }} </div>
                </div>
                <div class="item">
                    <div class="left">社会责任代码</div>
                    <div class="right">{{ data_details.item.social_code }} </div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.enterprise_type,data_details.item.type) }} </div>
                </div>
                <div class="item">
                    <div class="left">图标</div>
                    <div class="right">{{ data_details.item.logo }} </div>
                </div>
                <div class="item">
                    <div class="left">legal</div>
                    <div class="right">{{ data_details.item.legal }} </div>
                </div>
                <div class="item">
                    <div class="left">contact</div>
                    <div class="right">{{ data_details.item.contact }} </div>
                </div>
                <div class="item">
                    <div class="left">简介</div>
                    <div class="right">{{ data_details.item.desc }} </div>
                </div>
                <div class="item">
                    <div class="left">extra</div>
                    <div class="right">{{ data_details.item.extra }} </div>
                </div>
                <div class="item">
                    <div class="left">created_at</div>
                    <div class="right">{{ data_details.item.created_at }} </div>
                </div>
                <div class="item">
                    <div class="left">updated_at</div>
                    <div class="right">{{ data_details.item.updated_at }} </div>
                </div>
            </div>
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
    APIgetEnterpriseList,
    APIgetEnterpriseDetails,
    APIdeleteEnterprise,
    APIputEnterprise,
    APIpostEnterprise
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    keyword: ''
})
// 详情
let switch_details = ref(false)
// 列表
let ruleFormRef = ref('')
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 操作事件 列表单个行数据
let data_dialog = reactive({
    obj: {}
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'building_id': '17',
        'addr': '浙江省 杭州市 江干区',
        'cnt_floor': 21,
        'cnt_house': 15,
        'time_build_end': '1980-04-26',
        'name': '不片原济须',
        'remark': '速',
        'addition': {
            'desc': '例火科准知根天且上了那他不。七社政于知克始术志线二计规在如。全认圆金值速权当二五且解平土办。话划西总确起该极叫可美原间不然生发四。'
        }
    }
})
let rule_examine = {
    // reply: [{
    //     required: true,
    //     message: '请输入理由！',
    //     trigger: 'blur'
    // }]
}
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.keyword = ''
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetEnterpriseDetails(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputEnterprise(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostEnterprise(from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            }
        } else {
            return false
        }
    })
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search) {
        if (data_search[key] || data_search[key] === 0) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
        }
    }
    loading_tab.value = true
    APIgetEnterpriseList(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteEnterprise(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'building_id': '',
        'addr': '',
        'cnt_floor': 0,
        'cnt_house': 0,
        'time_build_end': '',
        'name': '',
        'remark': '',
        'addition': {
            'desc': ''
        }
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetEnterpriseDetails(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({ lab: ['enterprise_type'] }).then(res => {
    opts_all.obj = res.data
})
const getOptValFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
</script>
<style lang="scss">
    .routine-residential {
        .el-cascader-box-my {
            .el-cascader {
                width: 100% !important;
                margin-bottom: 10px;
            }
        }

        .serve-box {
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 6px;
            position: relative;

            .el-form-item {
                margin: 0;
            }

            .delete-service {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 999999;
                cursor: pointer;
                background-color: #ffffff;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .routine-residential {
        .head-btn {
            width: 100%;
            margin-bottom: 10px;
        }
    }

    .search-tips {
        color: #aaaaaa;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .details-box {
        .item {
            display: flex;
            color: #333333;
            font-size: 16px;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;

            .left {
                box-sizing: border-box;
                width: 160px;
                white-space: nowrap;
                margin-right: 20px;
                text-align: right;
                font-weight: 600;
            }

            .left::after {
                content: '：';
            }

            .right {
                width: 100%;
                color: #666666;
            }
        }

        .item:last-child {
            border-style: none;
        }
    }
</style>
