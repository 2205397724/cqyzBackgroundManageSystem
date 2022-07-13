<template>
    <div class="routineunit">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.obj.name" class="head-btn" placeholder="单元名称" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.obj.addr" class="head-btn" placeholder="地址" clearable />
                        </el-col>

                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div class="p-b-20">
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button size="large" type="primary" @click="addResidentialFunc">添加单元</el-button>
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
                        <el-table-column prop="name" label="单元名称" width="180" />
                        <el-table-column prop="addr" label="地址" width="220" />
                        <el-table-column prop="cnt_floor" label="楼层数" width="140">
                            <template #default="scope">
                                <span>{{ scope.row.cnt_floor }} 层</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_house" label="户数" width="140">
                            <template #default="scope">
                                <el-link class="el-button" :underline="false" style="padding: 0 10px;" type="primary" @click="showHouseFunc(scope.row)">
                                    {{ scope.row.cnt_house }} 户
                                </el-link>
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
                                label="单元名称" prop="name"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="地址" prop="addr"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.addr"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼层数" prop="cnt_floor"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.cnt_floor?from_error.msg.cnt_floor[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_floor"
                                    placeholder=""
                                >
                                    <template #append>层</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="户数" prop="cnt_house"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.cnt_house?from_error.msg.cnt_house[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.cnt_house"
                                    placeholder=""
                                >
                                    <template #append>户</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="建成时间" prop="time_build_end"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.time_build_end?from_error.msg.time_build_end[0]:''"
                            >
                                <el-date-picker
                                    v-model="from_examine.item.time_build_end"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注" prop="remark"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg.remark?from_error.msg.remark[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.remark"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col v-if="from_examine.item&&from_examine.item.addition" :md="24" :lg="24">
                            <el-form-item
                                label="简介" prop="addition.desc"
                                label-width="90px"
                                :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.addition.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
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
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基础信息" name="1">
                    <el-scrollbar height="400px">
                        <div class="details-box">
                            <div class="item">
                                <div class="left">单元名称</div>
                                <div class="right">{{ data_details.item.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">所属楼栋</div>
                                <div class="right">{{ data_details.item.building_id }} </div>
                            </div>
                            <div class="item">
                                <div class="left">地址</div>
                                <div class="right">{{ data_details.item.addr }} </div>
                            </div>
                            <div class="item">
                                <div class="left">楼层数</div>
                                <div class="right">{{ data_details.item.cnt_floor }} 层</div>
                            </div>
                            <div class="item">
                                <div class="left">户数</div>
                                <div class="right">{{ data_details.item.cnt_house }} 户</div>
                            </div>
                            <div class="item">
                                <div class="left">总专有面积</div>
                                <div class="right">{{ data_details.item.area_exc }} m²</div>
                            </div>
                            <div class="item">
                                <div class="left">创建时间</div>
                                <div class="right">{{ data_details.item.created_at }}</div>
                            </div>
                            <div class="item">
                                <div class="left">修改时间</div>
                                <div class="right">{{ data_details.item.updated_at }}</div>
                            </div>
                            <div class="item">
                                <div class="left">备注</div>
                                <div class="right">{{ data_details.item.remark }}</div>
                            </div>
                            <div v-if="data_details.item.addition&&data_details.item.addition.desc" class="item">
                                <div class="left">简介</div>
                                <div class="right">{{ data_details.item.addition?data_details.item.addition.desc:'' }}</div>
                            </div>
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="档案信息" name="2">
                    <el-scrollbar height="400px" />
                </el-tab-pane>
            </el-tabs>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 房屋 -->
        <el-dialog
            v-model="edit_house"
            title="房屋"
            width="70%"
        >
            <div style="overflow: auto;">
                <House :tree_item="tree_item.obj" />
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import House from '@/components/House/index.vue'
const tree_item = reactive({
    obj: {}
})
const activeName = ref('1')
const edit_house = ref(false)
const showHouseFunc = val => {
    tree_item.obj = {
        id: val.id,
        name: val.name,
        leaf: true,
        type: 'units'
    }
    edit_house.value = true
}
import SearchBuilding from '@/components/SearchBuilding/index.vue'
import {
    APIgetUnitsListHouse,
    APIgetUnitsDetailsHouse,
    APIdeleteUnitsHouse,
    APIputUnitsHouse,
    APIpostUnitsHouse
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
    obj: {}
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
            'desc': '例火科准知根天且上了那他不。七社政于知克始术志线二计规在如。全认圆金值速权当二五且解平土办。话划西总确起该极叫可美原间不然生发四。',
            'extra':null
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
    data_search.obj = {}
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetUnitsDetailsHouse(val.id).then(res => {
            data_details.item = res
            switch_details.value = true
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
            from_examine.item.building_id = route.query.building_id
            if (str_title.value == '修改') {
                APIputUnitsHouse(from_examine.item.id, from_examine.item).then(res => {
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('修改失败')
                })
            } else {
                APIpostUnitsHouse(from_examine.item).then(res => {
                        refreshFunc()
                        ElMessage.success('添加成功')
                        switch_examine.value = false
                }).catch(err => {
                    ElMessage.success('添加失败')
                })
            }
        } else {
            return false
        }
    })
}
// 获取列表api请求
import { useRoute } from 'vue-router'
const route = useRoute()
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    if (route.query.building_id) {
        params.building_id = route.query.building_id
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    if (params.time_build_end) {
        let created_str = ''
        for (let i in params.time_build_end) {
            created_str += ',' + params.time_build_end[i]
        }
        params.time_build_end = created_str.substring(1)
    }
    if (params.created_at) {
        let created_str = ''
        for (let i in params.created_at) {
            created_str += ',' + params.created_at[i]
        }
        params.created_at = created_str.substring(1)
    }
    if (params.updated_at) {
        let created_str = ''
        for (let i in params.updated_at) {
            created_str += ',' + params.updated_at[i]
        }
        params.updated_at = created_str.substring(1)
    }
    loading_tab.value = true
    APIgetUnitsListHouse(params).then(res => {
        console.log(res)
            loading_tab.value = false
            data_tab.arr = res
            total.value = res.length
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteUnitsHouse(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success('删除成功')
        }
    })
}
// 添加楼栋
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
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {}
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetUnitsDetailsHouse(val.id).then(res => {
            from_examine.item = res
            switch_examine.value = true
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
</script>
<style lang="scss">
    .routineunit {
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
