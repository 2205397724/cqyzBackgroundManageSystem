<template>
    <div class="propertypropertylist">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加产权
                </el-button>
            </div>
            <div :class="{search3: isSearch3,search2: isSearch2}">
                <div class="m-t-10">
                    <el-row :gutter="10">
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">房屋id：</div>

                                <div class="search_tb">
                                    <div class="searchUserGroup">
                                        <SearchHouse ref="V_1" @checkFunc="checkNameFunc" />
                                    </div>
                                </div>
                            </div>
                        <!-- <div class="search_th" style="width: 20%;">房屋id：</div> -->

                        <!-- <div class="searchUser search_tb" style="width: 80%;">
                            <div class="searchUserGroup">
                                <SearchHouse v-model:str="data_search.obj.house_id" />
                            </div>
                        </div> -->
                        </el-col>
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">产权证号：</div>
                                <el-input v-model="data_search.obj.code_property" class="head-btn search_tb" placeholder="产权证号" clearable />
                            </div>
                        </el-col>
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">
                                    地房籍号：
                                </div>
                                <el-input v-model="data_search.obj.code_room" class="head-btn search_tb" placeholder="地房籍号" clearable />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="btnClick==true" class="m-t-20" :gutter="10">
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">
                                    产权人姓名：
                                </div>
                                <el-input v-model="data_search.obj.owner_name" class="head-btn search_tb" placeholder="产权人姓名" clearable />
                            </div>
                        </el-col>
                        <el-col :xs="24" :md="12" :lg="8">
                            <div class="searchBox">
                                <div class="search_th">交易时间：</div>
                                <el-date-picker
                                    v-model="data_search.obj.time_deal"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="交易时间"
                                    end-placeholder="交易时间"
                                    class="search_tb"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="m-t-20">
                        <el-col :xs="24" :md="24" :lg="24">
                            <div class="searchBox">
                                <div class="search_th" />
                                <div class="search_tb">
                                    <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                                    <div v-show="switch_search == true" class="m-l-20 size-base inline-block">
                                        <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                                        <div class="searchDetail">
                                            *搜索到相关结果共{{ total }}条。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <div class="searchPlay" @click="btnClickFunc">
                            <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                            <el-button v-if="btnClick==false" :icon="CaretBottom" class="searchDeal">展开</el-button>
                            <el-button v-if="btnClick==true" :icon="CaretTop" class="searchDeal">收起</el-button>
                        </div>
                    </el-row>
                </div>
            </div>
            <div>
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab"
                >
                    <el-table-column prop="house_id" label="房屋" width="250">
                        <template #default="scope">
                            <span class="m-l-10">{{ getHouseNameFunc(allHouse_list.arr,scope.row.house_id) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_property" label="产权证号" width="250">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.code_property }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_room" label="地房籍号" width="250">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.code_room }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time_deal" label="交易时间" width="140">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.time_deal }} </span>
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
                            <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc(scope.row)">
                                <template #reference>
                                    <el-button type="danger" size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                    <el-table-column />
                </el-table>
            </div>
            <div class="p-t-20">
                <el-pagination
                    v-model:current-page="page"
                    layout="total,prev,pager,next,jumper,"
                    :total="total"
                    :page-size="per_page"
                    background
                    hide-on-single-page
                />
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
            @closed="dialogClosed"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="房屋" prop="house_id" :error="from_error.msg&&from_error.msg.house_id?from_error.msg.house_id[0]:''">
                                <div class="searchUserGroup">
                                    <SearchHouse ref="V" v-model:name="houseName" @checkFunc="checkNameFunc_1" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="交易时间" prop="time_deal" :error="from_error.msg&&from_error.msg.time_deal?from_error.msg.time_deal[0]:''">
                                <el-date-picker
                                    v-model="from_examine.item.time_deal"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="产权证号" prop="code_property" :error="from_error.msg&&from_error.msg.code_property?from_error.msg.code_property[0]:''">
                                <el-input
                                    v-model="from_examine.item.code_property"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="地房籍号" prop="code_room" :error="from_error.msg&&from_error.msg.code_room?from_error.msg.code_room[0]:''">
                                <el-input
                                    v-model="from_examine.item.code_room"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label-width="70px" label="绑定房屋" prop="should_bind_house" :error="from_error.msg&&from_error.msg.should_bind_house?from_error.msg.should_bind_house[0]:''">
                                <el-select v-model="from_examine.item.should_bind_house" class="head-btn" placeholder="是否绑定房屋" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_has_house" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <el-col :md="24" :lg="24">
                            <div class="m-b-10">
                                <el-button class="m-r-10" type="primary" @click="addServiceFunc">添加产权人</el-button>
                            </div>
                            <div>
                                <el-scrollbar :height="from_examine.item.owners.length >= 3 ? '400px' : ''">
                                    <div v-for="(item,i) in from_examine.item.owners" :key="i" class="serve-box">
                                        <el-row :gutter="10">
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item label-width="70px" label="姓名" :error="from_error.msg&&from_error.msg['owners.'+i+'.name']?from_error.msg['owners.'+i+'.name'][0]:''">
                                                    <el-input
                                                        v-model="item.name"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item label-width="70px" label="证件类型" :error="from_error.msg&&from_error.msg['owners.'+i+'.type_id_card']?from_error.msg['owners.'+i+'.type_id_card'][0]:''">
                                                    <el-select v-model="item.type_id_card" class="head-btn" placeholder="" clearable>
                                                        <el-option v-for="item in opts_all.obj.type_id_card" :key="item.key" :label="item.val" :value="item.key" />
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item label-width="70px" label="证件号" :error="from_error.msg&&from_error.msg['owners.'+i+'.id_card']?from_error.msg['owners.'+i+'.id_card'][0]:''">
                                                    <el-input
                                                        v-model="item.id_card"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item label-width="70px" label="联系方式" :error="from_error.msg&&from_error.msg['owners.'+i+'.mobile']?from_error.msg['owners.'+i+'.mobile'][0]:''">
                                                    <el-input
                                                        v-model="item.mobile"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                                <el-form-item label-width="70px" label="面积" :error="from_error.msg&&from_error.msg['owners.'+i+'.area']?from_error.msg['owners.'+i+'.area'][0]:''">
                                                    <el-input
                                                        v-model="item.area"
                                                        placeholder=""
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <div class="delete-service" style="z-index: 1;" @click="deleteServiceFunc(i)">
                                            <el-icon :size="20" color="#F56C6C">
                                                <el-icon-circle-close />
                                            </el-icon>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
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
                    <div class="left">房屋</div>
                    <div class="right">{{ getHouseNameFunc(allHouse_list.arr, data_details.item.house_id) }}</div>
                </div>
                <div class="item">
                    <div class="left">产权证号</div>
                    <div class="right">{{ data_details.item.code_property }}</div>
                </div>
                <div class="item">
                    <div class="left">地房籍号</div>
                    <div class="right">{{ data_details.item.code_room }}</div>
                </div>
                <div v-if="data_details.item.house_bind" class="item">
                    <div class="left">绑定的房屋名称</div>
                    <div class="right">{{ data_details.item.house_bind.name }}</div>
                </div>
                <div v-if="data_details.item.house_bind" class="item">
                    <div class="left">绑定的房屋地址</div>
                    <div class="right">{{ data_details.item.house_bind.addr }}</div>
                </div>
                <div class="item">
                    <div class="left">交易时间</div>
                    <div class="right">{{ data_details.item.time_deal }}</div>
                </div>
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ data_details.item.created_at }}</div>
                </div>
                <div class="item">
                    <div class="left">修改时间</div>
                    <div class="right">{{ data_details.item.updated_at }}</div>
                </div>
                <div v-if="data_details.item.owners">
                    <el-scrollbar :height="data_details.item.owners.length >= 3 ? '300px' : ''">
                        <div class="item">
                            <div class="left">产权人</div>
                            <div class="right">
                                <div
                                    v-for="(item,i) in data_details.item.owners" :key="i"
                                    class="owners"
                                >
                                    <div>
                                        <span>姓名：</span>{{ item.name }}
                                    </div>
                                    <div>
                                        <span>证件类型：</span>{{ item.type_id_card }}
                                    </div>
                                    <div>
                                        <span>证件号：</span>{{ item.id_card }}
                                    </div>
                                    <div>
                                        <span>联系方式：</span>{{ item.mobile }}
                                    </div>
                                    <div>
                                        <span>面积：</span>{{ item.area }} ㎡
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
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
import SearchHouse from '@/components/SearchHouse/index.vue'
import {
    APIgetPropertyList,
    APIgetPropertyDetails,
    APIdeleteProperty,
    APIputProperty,
    APIpostProperty,
    APIgetHouseListHouse
} from '@/api/custom/custom.js'
// import { showForm } from '@/util/form'
import {
    reactive,
    ref,
    watch
} from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus, CaretTop, CaretBottom } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
const searchVisible = ref(false)
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
    item: { }
})
const str_title = ref('添加')
const from_error = reactive({ msg: {} })
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
let btnClick = ref(false)
const isSearch3 = ref(false)
const isSearch2 = ref(true)
const btnClickFunc = () => {
    btnClick.value = !btnClick.value
    isSearch3.value = !isSearch3.value
    isSearch2.value = !isSearch2.value
}
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
const showForm = () => {
    searchVisible.value = !searchVisible.value
}
const V_1 = ref(null)
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const refreshFunc_1 = () => {
    V_1.value.clearFunc()
    refreshFunc()
}
// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetPropertyDetails(val.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
        if (res.status === 404) {
            ElMessage.error('改产权信息不存在')
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
                console.log(from_examine.item)
                APIputProperty(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostProperty(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('添加失败')
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
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
    }
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    loading_tab.value = true
    APIgetPropertyList(params).then(res => {
        console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = data_tab.arr.length
    })
    getHouseListFunc()
}
const allHouse_list = reactive({
    arr: []
})
const getHouseListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    APIgetHouseListHouse(params).then(res => {
        allHouse_list.arr = res
    })
}
const getHouseNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].name
        }
    }
    return ''
}
const checkNameFunc = row => {
    data_search.obj.house_id = row
}
// 删除
const deleteFunc = val => {
    APIdeleteProperty(val.house_id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加产权
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        owners: [],
        house_id: '',
        time_deal: '',
        code_property: '',
        code_room: '',
        should_bind_house: ''
    }
    switch_examine.value = true
}
const checkNameFunc_1 = row => {
    from_examine.item.house_id = row
}
const V = ref(null)
const dialogClosed = () => {
    V.value.clearFunc()
    houseName.value = ''
}
// 修改
const houseName = ref('')
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetPropertyDetails(val.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
        houseName.value = getHouseNameFunc(allHouse_list.arr, from_examine.item.house_id)
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.owners.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        name: '',
        type_id_card: '',
        id_card: '',
        mobile: '',
        area: ''
    }
    from_examine.item.owners.push(data)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['house_has_house', 'type_id_card']).then(res => {
    opts_all.obj = res
})

</script>
<style lang="scss">
    .propertypropertylist {
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
    .owners {
        display: flex;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
        flex-wrap: wrap;
        div {
            width: 50%;
            margin-bottom: 5px;
            span {
                color: #000;
            }
        }
    }
</style>
