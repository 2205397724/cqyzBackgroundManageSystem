<template>
    <div class="regioncity">
        <page-main>
            <div>
                <!-- <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-cascader
                                v-model="data_search.place"
                                :popper-append-to-body="false"
                                :props="{value:'value',label:'label',children:'children'}"
                                :options="opts_place" size="default" placeholder="地区" clearable
                            />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.type" class="head-btn" placeholder="类别" clearable>
                                <el-option label="按ID" :value="0" />
                                <el-option label="按企业名称" :value="1" />
                                <el-option label="按城市地址" :value="2" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.keyword" class="head-btn" placeholder="关键字" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div> -->
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加城市</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                    >
                        <el-table-column prop="name" label="名称" width="100">
                            <template #default="scope">
                                <span>{{ scope.row.name }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="china_code" label="区域代码" width="100">
                            <template #default="scope">
                                <span style="margin-left: 15px;">{{ scope.row.china_code }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ip" label="服务域名">
                            <template #default="scope">
                                <span>{{ scope.row.ip }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="rpc端口">
                            <template #default="scope">
                                <span>{{ scope.row.rpc_port }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="updated_at" label="auth_sk">
                            <template #default="scope">
                                <span>{{ scope.row.auth_sk }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="active" label="启用授权" width="100">
                            <template #default="scope">
                                <el-switch
                                    v-model="scope.row.active"
                                    class="switch"

                                    inline-prompt
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="switchFunk(scope.row.active)"
                                />
                            </template>
                            <!-- <template #default="scope">
                                <el-button
                                    size="small" :type="scope.row.active =='1'?'danger':'primary'"
                                    @click="suppstop(scope.row)"
                                >   @change="switchFunk(scope.row)"
                                    {{ scope.row.active =='1'?"禁用":"启用" }}
                                </el-button>
                            </template> -->
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
            draggable
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="名称" prop="name"
                                :error="from_error.msg&&from_error.msg.base_url?from_error.msg.base_url[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="区域代码" prop="china_code"
                                :error="from_error.msg&&from_error.msg.china_code?from_error.msg.china_code[0]:''"
                            >
                                <Cascaders v-model="from_examine.item.china_code" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="服务域名" prop="base_url"
                                :error="from_error.msg&&from_error.msg.base_url?from_error.msg.base_url[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.ip"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="rpc端口" prop="rpc_port"
                                :error="from_error.msg&&from_error.msg.base_url?from_error.msg.base_url[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.rpc_port"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="auth_sk" prop="auth_sk"
                                :error="from_error.msg&&from_error.msg.base_url?from_error.msg.base_url[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.auth_sk"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="启用授权" prop="active"
                                :error="from_error.msg&&from_error.msg.base_url?from_error.msg.base_url[0]:''"
                            >
                                <el-switch
                                    v-model="from_examine.item.active"
                                    class="switch"
                                    inline-prompt
                                    style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="switchFunk(from_examine.item.active)"
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
                    <div class="left">名称</div>
                    <div class="right">{{ data_details.item.name }} </div>
                </div>
                <div class="item">
                    <div class="left">区域代码</div>
                    <div class="right">{{ data_details.item.china_code }} </div>
                </div>
                <div class="item">
                    <div class="left">服务域名</div>
                    <div class="right">{{ data_details.item.ip }} </div>
                </div>

                <div class="item">
                    <div class="left">rpc端口</div>
                    <div class="right">{{ data_details.item.rpc_port }} </div>
                </div>
                <div class="item">
                    <div class="left">auth_sk</div>
                    <div class="right">{{ data_details.item.auth_sk }} </div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">修改时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
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
import Cascaders from '@/components/Cascaders/index.vue'
import {
    APIgetCityList,
    APIgetCityDetails,
    APIdeleteCity,
    APIputCity,
    APIpostCity
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
let per_page = ref(5)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
// let from_examine = reactive({
//     item: {
//         'building_id': '17',
//         'addr': '浙江省 杭州市 江干区',
//         'cnt_floor': 21,
//         'cnt_house': 15,
//         'time_build_end': '1980-04-26',
//         'name': '不片原济须',
//         'remark': '速',
//         'addition': {
//             'desc': '例火科准知根天且上了那他不。七社政于知克始术志线二计规在如。全认圆金值速权当二五且解平土办。话划西总确起该极叫可美原间不然生发四。'
//         }
//     }
// })
let from_examine = reactive({
    item: {
        'active': 1,
        'auth_sk': 'secret',
        'china_code': '50',
        'created_at': '2022-06-28T04:10:27.000000Z',
        'time_build_end': '1980-04-26',
        'id': '1',
        'ip': '192.168.110.37',
        'name': '重庆',
        'rpc_port': 30032,
        'updated_at': '2022-07-09T01:39:09.000000Z'
    }
})
let from_examine_ = reactive({
    item: {
        'active': '',
        'auth_sk': '',
        'china_code': '',
        'created_at': '',
        'time_build_end': '',
        'id': '',
        'ip': '',
        'name': '',
        'rpc_port': 0,
        'updated_at': ''
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 搜索
const searchFunc = () => {
    page.value = 1
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
    APIgetCityDetails(val.id).then(res => {
        if (res.status === 200) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
}
const switchFunk = row => {
    // let status = row.active == '1' ? '启用' : '禁用'
    // ElMessage({
    //     type: 'warning',
    //     showClose: true,
    //     message: `已${status}此接口状态`
    // })
    console.log(row)
    from_examine.item.active = row
    console.log(from_examine.item.active)
    // APIputCity(from_examine.item.id, from_examine.item).then(res => {
    //                 // console.log(res)
    //                 if (res.status === 200) {
    //                     ElMessage.success(res.statusText)
    //                     switch_examine.value = false
    //                 }
    //             }).catch(err => {
    //                 from_error.msg = err.data
    //             })
    // APIputCity(row.id, row).then(res => {
    //     // console.log(res)
    //     if (res.status === 200) {
    //         refreshFunc()
    //     }
    // }).catch(err => {
    //     from_error.msg = err.data
    // })
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
                switchFunk(from_examine.item.active)
                APIputCity(from_examine.item.id, from_examine.item).then(res => {
                    // console.log(res)
                    if (res.status === 200) {
                        refreshFunc()
                        ElMessage.success(res.statusText)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                switchFunk(from_examine.item.active)
                console.log(from_examine.item)
                APIpostCity(from_examine.item).then(res => {
                    // console.log(from_examine.item)
                    if (res.status === 200) {
                        refreshFunc()
                        ElMessage.success(res.statusText)
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
    APIgetCityList(params).then(res => {
        // console.log(res)
        if (res.status === 200) {
            loading_tab.value = false
            data_tab.arr = res.data
            total.value = res.data.rpc_port
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteCity(val.id).then(res => {
        refreshFunc()
        ElMessage.success(res.msg)
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_examine.item = {}
    from_error.msg = {}
    str_title.value = '添加'

    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetCityDetails(val.id).then(res => {
        console.log(res)
        if (res.status == 200) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
</script>
<style lang="scss">
    .regioncity {
        .el-cascader-box-my {
            .el-cascader {
                width: 100% !important;
                margin-bottom: 10px;
            }
        }
        .serve-box {
            border: 1px solid #eee;
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
                background-color: #fff;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .search-tips {
        color: #aaa;
        font-size: 14px;
        margin-bottom: 20px;
    }
</style>
