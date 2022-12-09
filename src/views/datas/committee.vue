<template>
    <div>
        <page-main class="hidden">
            <div>
                <el-button type="primary" :icon="Plus" size="large" @click="addCommitteeFunc">
                    添加业委会
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                业委会名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input
                                    v-model="data_search.obj.name" class="search_tb" placeholder="业委会名称"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select
                                    v-model="data_search.obj.active" class="search_tb" placeholder="状态"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item) in opts_all.obj.group_active" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button
                            v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading"
                            @click="refreshFunc"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table
                    :data="data_tab.arr"
                    :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }" class="tab_1"
                >
                    <el-table-column prop="id" label="业委会名称">
                        <template #default="scope">
                            <span>{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="用户组ID">
                        <template #default="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="状态">
                        <template #default="scope">
                            <el-tag v-show="scope.row.active == 1" class="btnNone" type="success" size="small">
                                启用
                            </el-tag>
                            <el-tag v-show="scope.row.active == 0" class="btnNone noDeal" type="danger" size="small">
                                禁用
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="modifyCommitteeFunc(scope.row)">
                                修改
                            </el-button>
                            <el-button size="small" @click="getGroupDetail(scope.row)">
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
            <el-pagination
                v-model:current-page="page" style="float: right;" layout="prev,next,jumper," :total="Infinity"
                :page-size="per_page" background prev-text="上一页" next-text="下一页" hide-on-single-page
            />
        </page-main>
        <!-- 修改添加用户组 -->
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                    label-position="left"
                >
                    <el-row :gutter="10">
                        <el-col :md="24">
                            <el-form-item
                                label="业委会名称"
                                prop="name"
                                label-width="110px"
                                :error="
                                    from_error.msg && from_error.msg.name
                                        ? from_error.msg.name[0]
                                        : ''
                                "
                            >
                                <el-input v-model="from_examine.item.name" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24">
                            <el-form-item
                                label="所在小区"
                                prop="region_val"
                                label-width="110px"
                                :error="
                                    from_error.msg && from_error.msg.name
                                        ? from_error.msg.name[0]
                                        : ''
                                "
                            >
                                <div
                                    style="width: 100%;
                                    height: 32px;
                                    border: 1px solid #dcdfe6;
                                    border-radius: 4px;"
                                    @click="click_add_group_zone_id"
                                >
                                    <span v-if="!selectedZone_id" style="margin-left: 11px; color: #c0c4cc;">请选择区域</span>
                                    <span v-else style="margin-left: 11px;">{{ selectedZone_id }}</span>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :md="24">
                            <el-form-item
                                label="业委会状态"
                                prop="active"
                                label-width="110px"
                                :error="
                                    from_error.msg && from_error.msg.active
                                        ? from_error.msg.active[0]
                                        : ''
                                "
                            >
                                <el-select
                                    v-model="from_examine.item.active" placeholder="状态"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item) in opts_all.obj.group_active" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div
                    style="display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: 100%;"
                >
                    <el-button @click="switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 添加用户组弹窗中选择区域弹窗 -->
        <el-dialog v-model="switch_choose_zone" title="选择小区">
            <el-scrollbar height="250px">
                <position-tree
                    :tree_item="tree_item.arr"
                    :check_type="true"
                    :no_buildings="true"
                    @checkChangeFunc="checkChangeFunc"
                    @checkFuncDate="checkFunc"
                />
            </el-scrollbar>
        </el-dialog>
        <!-- 用户组详情 -->
        <el-dialog v-model="switch_group_details" title="详情" width="50%">
            <div class="details-box">
                <div class="item">
                    <div class="left">用户组名称</div>
                    <div class="right">{{ data_group_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">所在区域</div>
                    <div class="right">{{ data_group_details.item.region_val_name || data_group_details.item.region_cc_name }}</div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">
                        {{
                            getOptVal(
                                opts_all.obj.toushu_return_type,
                                data_group_details.item.type
                            )
                        }}
                    </div>
                </div>

                <div class="item">
                    <div class="left">区域类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.group_user_region_type,data_group_details.item.region_type) }}</div>
                </div>
                <div class="item">
                    <div class="left">是否启用</div>
                    <div class="right">
                        <el-tag v-if="data_group_details.item.active == 1" type="success" round size="small"> 启用</el-tag>
                        <el-tag v-if="data_group_details.item.active == 0" type="danger" round size="small"> 禁用</el-tag>
                    </div>
                </div>
                <div class="item">
                    <div class="left">用户组ID</div>
                    <div class="right">{{ data_group_details.item.id }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_group_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ data_group_details.item.updated_at }}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetGroupList,
    APIgetGroupDetails,
    APIpostGroup,
    APIdeleteGroup,
    APIputGroup,
    APIgetChinaRegion
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { getOpts, getOptVal } from '@/util/opts.js'
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 搜索
let switch_search = ref(false)
let data_search = reactive({ obj: {} })
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        name:'',
        type:6,
        region_type: 0,
        region_val: '',
        region_cc: '',
        active: ''
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
// 添加业委会
const addCommitteeFunc = () => {
    selectedZone_id.value = ''
    from_examine.item = {
        type:6
    }
    from_error.msg = {}
    str_title.value = '添加业委会'
    switch_examine.value = true
    getChinaName()
}
// 修改业委会
const modifyCommitteeFunc = val => {
    from_error.msg = {}
    str_title.value = '修改业委会'
    from_examine.item = {
        ...val
    }
    selectedZone_id.value = from_examine.item.region_val_name
    switch_examine.value = true
    getChinaName()
}
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    console.log("from_examine",from_examine)
    if (str_title.value == '修改业委会') {
        APIputGroup(from_examine.item.id, from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_examine.value = false
        })
        .catch(err => {
            from_error.msg = err.data
        })
    } else {
        APIpostGroup(from_examine.item).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_examine.value = false
        })
        .catch(err => {
            from_error.msg = err.data
        })
    }
}
// 查看业委会详情
const switch_group_details = ref(false)
const data_group_details = reactive({
    item: {}
})
const getGroupDetail = val => {
    APIgetGroupDetails(val.id).then(res => {
        data_group_details.item = res
        switch_group_details.value = true
    })
}
// 删除业委会
const deleteFunc = val => {
    APIdeleteGroup(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 获取列表api请求
let data_tab = reactive({
    arr: []
})
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        type: 6,//业委会
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    console.log(params)
    APIgetGroupList(params).then(res => {
        console.log("res",res)
        total.value = res.length
        data_tab.arr = res
    })
}
const tree_item = reactive({
    arr: []
})
const selectedZone_id = ref('')
// 添加弹出框选择小区
const getChinaName = () => {
    tree_item.arr = []
    let params = {}
    if (localStorage.getItem('utype') == 'pt') {
        params = {
            p_code: localStorage.getItem('china_code')
        }
    } else if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group'))) {
        params = {
            p_code: JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).region_cc,
            w:3
        }
    } else {
        params = {}
    }
    APIgetChinaRegion(params).then(res => {
        for (let i in res) {
            if (res[i].level < 5) {
                tree_item.arr.push({ name: res[i].name, type: 'region', next_type: 'region', id: res[i].code })
            } else {
                tree_item.arr.push({ name: res[i].name, type: 'region', next_type: 'zone', id: res[i].code })
            }
        }
    })
}

// 选择所在小区
const switch_choose_zone = ref(false)
const click_add_group_zone_id = () => {
    switch_choose_zone.value = true
}
const checkChangeFunc = val => {
    switch_choose_zone.value = false
}
// 选中区域的处理事件
const checkFunc = val => {
    selectedZone_id.value = val.name
    if (val.type == 'region') {
        from_examine.item.region_type = 1
        from_examine.item.region_val = val.china_code || val.id
        from_examine.item.region_cc = val.china_code || val.id
    }
    if ((val.type == 'zone')) {
        from_examine.item.region_type = 2
        from_examine.item.region_val = val.id
        from_examine.item.region_cc = val.china_code
    }
}

// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
// 监听分页
watch(page, () => {
    refreshFunc()
}, { immediate: true, deep: true })
// 配置项
const opts_all = reactive({
    obj: {}
})
getOpts(['group_active','toushu_return_type','group_user_region_type']).then(res => {
    // toushu_return_type包含了用户组的相关类型
    // console.log(res)
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
</style>
