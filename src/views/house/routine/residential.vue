<template>
    <div class="routine-residential">
        <page-main>
            <div>
                <div>
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
                                <el-option label="按小区地址" :value="2" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
                            <el-input v-model="data_search.keyword" class="head-btn" placeholder="关键字" clearable />
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
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加小区</el-button>
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
                        <el-table-column prop="name" label="名称" width="220" />
                        <el-table-column prop="addr" label="地址" width="180" />
                        <el-table-column prop="area_floor" label="总占地面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_floor }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_build" label="总建筑面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_build }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_support" label="配套用房总面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_support }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_building" label="楼栋数" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_building }} 栋</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_live" label="住房总套数" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_live }} 套</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cnt_support" label="配套用房总套数" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.cnt_support }} 套</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="company_build" label="建设单位名称" width="140" />
                        <el-table-column prop="time_use" label="投用时间" width="140" />
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
                    :rules="rule_examine"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item label="名称" prop="name" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="地址" prop="addr" :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''">
                                <el-input
                                    v-model="from_examine.item.addr"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="总占地面积" prop="area_floor" :error="from_error.msg&&from_error.msg.area_floor?from_error.msg.area_floor[0]:''">
                                <el-input
                                    v-model="from_examine.item.area_floor"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="总建筑面积" prop="area_build" :error="from_error.msg&&from_error.msg.area_build?from_error.msg.area_build[0]:''">
                                <el-input
                                    v-model="from_examine.item.area_build"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="配套用房总面积" prop="area_support" :error="from_error.msg&&from_error.msg.area_support?from_error.msg.area_support[0]:''">
                                <el-input
                                    v-model="from_examine.item.area_support"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="楼栋数" prop="cnt_building" :error="from_error.msg&&from_error.msg.cnt_building?from_error.msg.cnt_building[0]:''">
                                <el-input
                                    v-model="from_examine.item.cnt_building"
                                    placeholder=""
                                >
                                    <template #append>栋</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="住房总套数" prop="cnt_live" :error="from_error.msg&&from_error.msg.cnt_live?from_error.msg.cnt_live[0]:''">
                                <el-input
                                    v-model="from_examine.item.cnt_live"
                                    placeholder=""
                                >
                                    <template #append>套</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="配套用房总套数" prop="cnt_support" :error="from_error.msg&&from_error.msg.cnt_support?from_error.msg.cnt_support[0]:''">
                                <el-input
                                    v-model="from_examine.item.cnt_support"
                                    placeholder=""
                                >
                                    <template #append>套</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="建设单位名称" prop="company_build" :error="from_error.msg&&from_error.msg.company_build?from_error.msg.company_build[0]:''">
                                <el-input
                                    v-model="from_examine.item.company_build"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="竣工时间" prop="time_build_end" :error="from_error.msg&&from_error.msg.time_build_end?from_error.msg.time_build_end[0]:''">
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
                        <el-col :md="24" :lg="12">
                            <el-form-item label="开工时间" prop="time_build_start" :error="from_error.msg&&from_error.msg.time_build_start?from_error.msg.time_build_start[0]:''">
                                <el-date-picker
                                    v-model="from_examine.item.time_build_start"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="立项时间" prop="time_pro_setup" :error="from_error.msg&&from_error.msg.time_pro_setup?from_error.msg.time_pro_setup[0]:''">
                                <el-date-picker
                                    v-model="from_examine.item.time_pro_setup"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="移交时间" prop="time_turn" :error="from_error.msg&&from_error.msg.time_turn?from_error.msg.time_turn[0]:''">
                                <el-date-picker
                                    v-model="from_examine.item.time_turn"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="投用时间" prop="time_use" :error="from_error.msg&&from_error.msg.time_use?from_error.msg.time_use[0]:''">
                                <el-date-picker
                                    v-model="from_examine.item.time_use"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="所在区域code" prop="china_code" :error="from_error.msg&&from_error.msg.china_code?from_error.msg.china_code[0]:''">
                                <el-input
                                    v-model="from_examine.item.china_code"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item label="备注" prop="remark" :error="from_error.msg&&from_error.msg.remark?from_error.msg.remark[0]:''">
                                <el-input
                                    v-model="from_examine.item.remark"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item label="模型简介" :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''">
                                <el-input
                                    v-model="from_examine.item.addition.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div style="margin-bottom: 10px;">
                                <el-button style="margin-right: 10px;" @click="addServiceFunc">添加服务名称和电话</el-button>
                            </div>
                            <div v-for="(item,i) in from_examine.item.addition.extra.convenience" class="serve-box">
                                <el-row :gutter="10">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="服务名称">
                                            <el-input
                                                v-model="item.title"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="联系方式">
                                            <el-input
                                                v-model="item.phone"
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
                    <div class="left">名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">地址</div>
                    <div class="right">{{ data_details.item.addr }}</div>
                </div>
                <div class="item">
                    <div class="left">总占地面积</div>
                    <div class="right">{{ data_details.item.area_floor }}</div>
                </div>
                <div class="item">
                    <div class="left">总建筑面积</div>
                    <div class="right">{{ data_details.item.area_build }}</div>
                </div>
                <div class="item">
                    <div class="left">配套用房总面积</div>
                    <div class="right">{{ data_details.item.area_support }}</div>
                </div>
                <div class="item">
                    <div class="left">楼栋数</div>
                    <div class="right">{{ data_details.item.cnt_building }}</div>
                </div>
                <div class="item">
                    <div class="left">住房总套数</div>
                    <div class="right">{{ data_details.item.cnt_live }}</div>
                </div>
                <div class="item">
                    <div class="left">配套用房总套数</div>
                    <div class="right">{{ data_details.item.cnt_support }}</div>
                </div>
                <div class="item">
                    <div class="left">建设单位名称</div>
                    <div class="right">{{ data_details.item.company_build }}</div>
                </div>
                <div class="item">
                    <div class="left">竣工时间</div>
                    <div class="right">{{ data_details.item.time_build_end }}</div>
                </div>
                <div class="item">
                    <div class="left">开工时间</div>
                    <div class="right">{{ data_details.item.time_build_start }}</div>
                </div>
                <div class="item">
                    <div class="left">立项时间</div>
                    <div class="right">{{ data_details.item.time_pro_setup }}</div>
                </div>
                <div class="item">
                    <div class="left">移交时间</div>
                    <div class="right">{{ data_details.item.time_turn }}</div>
                </div>
                <div class="item">
                    <div class="left">投用时间</div>
                    <div class="right">{{ data_details.item.time_use }}</div>
                </div>
                <div class="item">
                    <div class="left">所在区域code</div>
                    <div class="right">{{ data_details.item.china_code }}</div>
                </div>
                <div class="item">
                    <div class="left">备注</div>
                    <div class="right">{{ data_details.item.remark }}</div>
                </div>
                <div>
                    <div class="item">
                        <div class="left">便民服务</div>
                        <div class="right">
                            <div style="font-size: #666666;font-size: 14px;margin-bottom: 10px;">
                                *{{ data_details.item.addition.desc }}
                            </div>
                            <div
                                v-for="(item,i) in data_details.item.addition.extra.convenience"
                                class="convenience-item"
                                style="display: flex;margin-bottom: 10px;border-bottom: 1px solid #eee;padding-bottom: 8px;"
                            >
                                <div class="conve-left" style="flex:1;">
                                    <span
                                        style="color: #000000;"
                                    >服务名称：</span>{{ item.title }}
                                </div>
                                <div class="conve-right" style="flex:1;">
                                    <span
                                        style="color: #000000;"
                                    >联系方式：</span>{{ item.phone }}
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
import {
    APIgetResidentialListHouse,
    APIgetResidentialDetailsHouse,
    APIdeleteResidentialHouse,
    APIputResidentialHouse,
    APIpostResidentialHouse
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
    type: '',
    keyword: '',
    place: []
})
let opts_place = [{
    value: '0',
    label: 'Guide',
    children: [{
                   value: '001',
                   label: 'Disciplines'
               },
               {
                   value: '002',
                   label: '11111'
               }
    ]
}]
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
        'name': '',
        'addr': '',
        'area_floor': '',
        'area_build': '',
        'area_support': '',
        'cnt_building': 0,
        'cnt_live': 0,
        'cnt_support': 0,
        'company_build': '',
        'time_build_end': '',
        'time_build_start': '',
        'time_pro_setup': '',
        'time_turn': '',
        'time_use': '',
        'china_code': '',
        'remark': '',
        'addition': {
            'extra': {
                'convenience': []
            },
            'desc': ''
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
const from_error = reactive({ msg: {} })
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
    data_search.type = ''
    data_search.keyword = ''
    data_search.place = []
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetResidentialDetailsHouse(val.id).then(res => {
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
                APIputResidentialHouse(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostResidentialHouse(from_examine.item).then(res => {
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
        if (data_search[key]) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
        }
    }
    loading_tab.value = true
    APIgetResidentialListHouse(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteResidentialHouse(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加小区
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'name': '',
        'addr': '',
        'area_floor': '',
        'area_build': '',
        'area_support': '',
        'cnt_building': 0,
        'cnt_live': 0,
        'cnt_support': 0,
        'company_build': '',
        'time_build_end': '',
        'time_build_start': '',
        'time_pro_setup': '',
        'time_turn': '',
        'time_use': '',
        'china_code': '',
        'remark': '',
        'addition': {
            'extra': {
                'convenience': []
            },
            'desc': ''
        }
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetResidentialDetailsHouse(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    from_examine.item.addition.extra.convenience.splice(index, 1)
}
// 添加 服务名称和联系方式
const addServiceFunc = index => {
    let data = {
        'title': '',
        'phone': ''
    }
    from_examine.item.addition.extra.convenience.push(data)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()
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
