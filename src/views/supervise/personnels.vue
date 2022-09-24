<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    添加人员
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                姓名：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="search_str.obj.name" class="search_tb" placeholder="请输入姓名" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                身份证号码：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="search_str.obj.id_card" class="search_tb" placeholder="请输入身份证号码" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                电话：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input v-model="search_str.obj.mobile" class="search_tb" placeholder="请输入电话" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>
            <el-table
                v-loading="loading_tab"
                :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="id" label="姓名">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="身份证号" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.id_card }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="电话">
                    <template #default="scope">
                        <span>{{ scope.row.mobile }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="性别" align="center">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.gender,scope.row.gender) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="籍贯">
                    <template #default="scope">
                        <span>{{ scope.row.cc }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="职业">
                    <template #default="scope">
                        <span>{{ scope.row.job }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="280">
                    <template #default="scope">
                        <el-button
                            type="success" size="small"
                            @click="modifyFeatureFunc(scope.row)"
                        >
                            标签
                        </el-button>
                        <el-button
                            type="primary" size="small"
                            @click="modifyFunc(scope.row)"
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
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="50"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_add"
            :title="str_title"
            width="60%"
            @closed="add_dialog_close"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="姓名"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.name"
                                    placeholder=""
                                />
                                <!-- <el-input
                                    v-model="from_add.obj.logo"
                                    placeholder=""
                                /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="身份证号码"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.id_card"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="电话"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.mobile"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="性别"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.user_id?err_add.obj.user_id[0]:''"
                            >
                                <el-select v-model="from_add.obj.gender" class="head-btn search_tb" placeholder="审核状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.gender" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="籍贯"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.cc"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="职业"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.legal?err_add.obj.legal[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.job"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="政治面貌"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.legal?err_add.obj.legal[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.politics"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="出生日期"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-date-picker
                                    v-model="from_add.obj.birthday"
                                    type="datetime"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    class="w-100"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注信息"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.desc?err_add.obj.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.desc"
                                    :autosize="{ minRows: 4, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :md="24" :lg="24">
                            <div class="m-b-10 m-l-40">
                                <el-button type="primary" plain @click="addServiceFunc">添加自定义字段</el-button>
                            </div>
                            <div v-for="(item,i) in from_add.obj.extra" :key="i" class="serve-box">
                                <el-row :gutter="10" class="p-t-20">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="字段名" label-width="100px">
                                            <el-input
                                                v-model="item.lab"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="字段内容" label-width="100px">
                                            <el-input
                                                v-model="item.val"
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
                        </el-col> -->
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_add=false">取消</el-button>
                    <el-button type="primary" @click="postFunc">确定</el-button>
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
                    <div class="left">姓名</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">身份证号码</div>
                    <div class="right">{{ data_details.item.id_card }}</div>
                </div>
                <div class="item">
                    <div class="left">电话</div>
                    <div class="right">{{ data_details.item.mobile }}</div>
                </div>
                <div class="item">
                    <div class="left">性别</div>
                    <div class="right">{{ getOptVal(opts_all.obj.gender,data_details.item.gender) }}</div>
                </div>
                <div class="item">
                    <div class="left">籍贯</div>
                    <div class="right">{{ data_details.item.cc }}</div>
                </div>
                <div class="item">
                    <div class="left">职业</div>
                    <div class="right">{{ data_details.item.job }}</div>
                </div>
                <div class="item">
                    <div class="left">政治面貌</div>
                    <div class="right">{{ data_details.item.politics }}</div>
                </div>
                <div class="item">
                    <div class="left">出生日期</div>
                    <div class="right">{{ data_details.item.birthday }}</div>
                </div>
                <div class="item">
                    <div class="left">备注信息</div>
                    <div class="right">{{ data_details.item.birthday }}</div>
                </div>
                <div class="item">
                    <div class="left">人员id</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="switch_feature" title="标签" width="70%" destroy-on-close="true">
            <div style="height: 500px;">
                <div style="width: 50%;height: 500px; float: left;">
                    <div>
                        <el-button plain type="primary">
                            残疾人
                        </el-button>
                        <el-button plain type="danger">
                            罪犯
                        </el-button>
                        <el-button plain type="success">
                            群众
                        </el-button>
                    </div>
                </div>
                <div style="width: 50%;height: 500px; background-color: #eee; float: left;" />
            </div>
            <template #footer>
                <el-button type="warning" plain @click="switch_feature = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetPersonnelManageList,
    APIputPersonnelManage,
    APIpostPersonnelManage,
    APIdeletePersonnelManage,
    APIgetPersonnelManageDetails
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
import md5 from 'md5'
const data = reactive({
    list: []
})
const page = ref(1)
const per_page = ref(15)
const total = ref(50)
const loading_tab = ref(false)
const search_str = reactive({
    obj: {}
})
const switch_search = ref(false)
watch(page, () => {
    getPersonnelManageList()
})
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getPersonnelManageList()
}
const refreshFunc = () => {
    search_str.obj = {}
    switch_search.value = false
    getPersonnelManageList()
}
const getPersonnelManageList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    if (sessionStorage.getItem('groupChinaCode') && localStorage.getItem('utype') != md5('pt')) {
        params.group_id = sessionStorage.getItem('groupChinaCode')
    }
    for (let key in search_str.obj) {
        if (search_str.obj[key] || search_str.obj[key] === 0) {
            if (search_str.obj[key] instanceof Array && search_str.obj[key].length <= 0) {
                continue
            }
            params[key] = search_str.obj[key]
        }
    }
    loading_tab.value = true
    APIgetPersonnelManageList(params).then(res => {
        console.log(res)
        data.list = res
        total.value = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length < per_page.value) {
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
        loading_tab.value = false
    })
}
const data_details = reactive({
    item: {}
})
const from_add = reactive({
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const switch_add = ref(false)
const str_title = ref('')
const switch_details = ref(false)
const detailsFunc = row => {
    APIgetPersonnelManageDetails(row.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
    })
}
// 同意拒绝提交
const postFunc = formEl => {
    from_add.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    console.log(from_add.obj)
    for (let key in from_add.obj) {
        if (from_add.obj[key] !== null) {
            if (from_add.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_add.obj[key] !== 0 || from_add.obj[key] !== false)) {
                delete from_add.obj[key]
            }
        }

    }
    if (str_title.value == '修改') {
        console.log(from_add.obj)
        APIputPersonnelManage(from_add.obj.id, from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_add.value = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostPersonnelManage(from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_add.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
    // } else {
    //     return false
    // }
    // })
}
// 添加
const addResidentialFunc = () => {
    from_add.obj = {}
    err_add.obj = {}
    str_title.value = '添加'
    switch_add.value = true
}
// 修改
const modifyFunc = val => {
    APIgetPersonnelManageDetails(val.id).then(res => {
        from_add.obj = res
    })
    err_add.obj = {}
    str_title.value = '修改'
    switch_add.value = true
}
const deleteFunc = val => {
    APIdeletePersonnelManage(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 标签
const switch_feature = ref(false)
const modifyFeatureFunc = val => {
    switch_feature.value = true
}
refreshFunc()
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['gender']).then(res => {
    opts_all.obj = res
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.switchStyle ::v-deep .el-switch__label {
    position: absolute !important;
    display: none !important;
    color: #fff !important;
    width: 80px;
}
.switchStyle ::v-deep .el-switch__label--left {
    z-index: 9 !important;
    left: 17px !important;
}
.switchStyle ::v-deep .el-switch__label--right {
    z-index: 9 !important;
    left: -5px !important;
}
.switchStyle ::v-deep .el-switch__label.is-active {
    display: block !important;
}
.switchStyle.el-switch ::v-deep .el-switch__core,
.switchStyle ::v-deep .el-switch__label {
    width: 60px !important;
}
</style>
