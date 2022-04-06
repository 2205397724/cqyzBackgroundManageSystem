<template>
    <div class="routine-residential">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchHouse v-model:str="data_search.obj.house_id" />
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.code_property" class="head-btn" placeholder="产权证号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.code_room" class="head-btn" placeholder="地房籍号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.owner_name" class="head-btn" placeholder="产权人姓名" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.owner_id_card" class="head-btn" placeholder="产权人证件号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-input v-model="data_search.obj.owner_mobile" class="head-btn" placeholder="产权人手机号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                            <el-select v-model="data_search.obj.is_bind_house" class="head-btn" placeholder="*是否绑定房屋" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_has_house" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.obj.time_deal"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="交易时间"
                                    end-placeholder="交易时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.obj.created_at"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="创建时间"
                                    end-placeholder="创建时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.obj.updated_at"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="更新时间"
                                    end-placeholder="更新时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="20" class="bottom-btn-box-2">
                        <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加产权</el-button>
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
                        <el-table-column prop="house_id" label="房屋ID" width="250">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.house_id }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code_property" label="产权证号" width="250">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.code_property }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="code_room" label="地房籍号" width="250">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.code_room }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time_deal" label="交易时间" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.time_deal }} </span>
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
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="房屋ID" prop="house_id" :error="from_error.msg&&from_error.msg.house_id?from_error.msg.house_id[0]:''">
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchHouse v-model:str="from_examine.item.house_id" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="交易时间" prop="time_deal" :error="from_error.msg&&from_error.msg.time_deal?from_error.msg.time_deal[0]:''">
                                <el-input
                                    v-model="from_examine.item.time_deal"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="产权证号" prop="code_property" :error="from_error.msg&&from_error.msg.code_property?from_error.msg.code_property[0]:''">
                                <el-input
                                    v-model="from_examine.item.code_property"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="地房籍号" prop="code_room" :error="from_error.msg&&from_error.msg.code_room?from_error.msg.code_room[0]:''">
                                <el-input
                                    v-model="from_examine.item.code_room"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="绑定房屋" prop="should_bind_house" :error="from_error.msg&&from_error.msg.should_bind_house?from_error.msg.should_bind_house[0]:''">
                                <el-select v-model="from_examine.item.should_bind_house" class="head-btn" placeholder="是否绑定房屋" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_has_house" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div style="margin-bottom: 10px;">
                                <el-button style="margin-right: 10px;" @click="addServiceFunc">添加产权人</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.property_owners" class="serve-box">
                                <el-row :gutter="10">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="姓名" :error="from_error.msg&&from_error.msg['property_owners.'+i+'.name']?from_error.msg['property_owners.'+i+'.name'][0]:''">
                                            <el-input
                                                v-model="item.name"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="证件类型" :error="from_error.msg&&from_error.msg['property_owners.'+i+'.type_id_card']?from_error.msg['property_owners.'+i+'.type_id_card'][0]:''">
                                            <el-input
                                                v-model="item.type_id_card"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="证件号" :error="from_error.msg&&from_error.msg['property_owners.'+i+'.id_card']?from_error.msg['property_owners.'+i+'.id_card'][0]:''">
                                            <el-input
                                                v-model="item.id_card"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="联系方式" :error="from_error.msg&&from_error.msg['property_owners.'+i+'.mobile']?from_error.msg['property_owners.'+i+'.mobile'][0]:''">
                                            <el-input
                                                v-model="item.mobile"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                        <el-form-item label="面积" :error="from_error.msg&&from_error.msg['property_owners.'+i+'.area']?from_error.msg['property_owners.'+i+'.area'][0]:''">
                                            <el-input
                                                v-model="item.area"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="delete-service" @click="deleteServiceFunc(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
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
                    <div class="left">房屋ID</div>
                    <div class="right">{{ data_details.item.house_id }}</div>
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
                <div v-if="data_details.item.property_owners">
                    <div class="item">
                        <div class="left">产权人</div>
                        <div class="right">
                            <div
                                v-for="(item,i) in data_details.item.property_owners"
                                class="convenience-item"
                                style="display: flex;margin-bottom: 10px;border-bottom: 1px solid #eee;padding-bottom: 8px;flex-wrap: wrap;"
                            >
                                <div class="conve-left" style="width: 50%;">
                                    <span
                                        style="color: #000000;"
                                    >姓名：</span>{{ item.name }}
                                </div>
                                <div class="conve-right" style="width: 50%;">
                                    <span
                                        style="color: #000000;"
                                    >证件类型：</span>{{ item.type_id_card }}
                                </div>
                                <div class="conve-right" style="width: 50%;">
                                    <span
                                        style="color: #000000;"
                                    >证件号：</span>{{ item.id_card }}
                                </div>
                                <div class="conve-right" style="width: 50%;">
                                    <span
                                        style="color: #000000;"
                                    >联系方式：</span>{{ item.mobile }}
                                </div>
                                <div class="conve-right" style="width: 50%;">
                                    <span
                                        style="color: #000000;"
                                    >面积：</span>{{ item.area }} ㎡
                                </div>
                            </div>
                        </div>
                    </div>
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
    APIpostProperty
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import { ElMessage } from 'element-plus'
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
    item: { }
})
const str_title = ref('添加')
const from_error = reactive({ msg: {} })
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
    data_search.obj = {}
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetPropertyDetails(val.id).then(res => {
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
                APIputProperty(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostProperty(from_examine.item).then(res => {
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
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteProperty(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加产权
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        property_owners: [],
        house_id: '',
        time_deal: '',
        code_property: '',
        code_room: '',
        should_bind_house: ''
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetPropertyDetails(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.property_owners.splice(index, 1)
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
    from_examine.item.property_owners.push(data)
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
APIpostGetOpts({ lab: ['house_has_house'] }).then(res => {
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
