<template>
    <div>
        <page-main class="hidden">
            <el-button class="m-b-20 m-r-10" type="primary" size="large" :icon="Plus" @click="addResidentialFunc">添加标签</el-button>

            <el-select v-model="main_type" class="head-btn" placeholder="请选择类型" style="width: 200px;">
                <el-option
                    v-for="item in opts_all.obj.labels_kind" :key="item.key" :label="item.val"
                    :value="item.key"
                />
            </el-select>
            <el-table
                v-loading="loading_tab"
                :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="id" label="标签名">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="类型" width="180">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.labels_kind,scope.row.type) }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="创建时间">
                    <template #default="scope">
                        <span>{{ scope.row.created_at }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="修改时间" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.updated_at }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
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
                                label="标签名"
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
                                label="类型"
                                label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-select v-model="from_add.obj.type" class="head-btn" placeholder="请选择类型" style="width: 200px;">
                                    <el-option
                                        v-for="item in opts_all.obj.labels_kind" :key="item.key" :label="item.val"
                                        :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
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
    APIgetPersonnelLabels,
    APIputPersonnelManage,
    APIpostPersonnelLabels,
    APIdeletePersonnelLabels,
    APIgetPersonnelManageDetails
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const data = reactive({
    list: []
})
const main_type = ref(1)
const loading_tab = ref(false)
const search_str = reactive({
    obj: {}
})
const switch_search = ref(false)
watch(main_type, () => {
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
        type: parseInt(main_type.value)
    }
    if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_city')) && localStorage.getItem('utype') != 'pt') {
        params.group_id = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_group')).region_cc
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
    APIgetPersonnelLabels(params).then(res => {
        console.log(res)
        data.list = res
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
        APIpostPersonnelLabels(from_add.obj).then(res => {
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
    let names = []
    names.push(val.name)
    APIdeletePersonnelLabels({ data: { type: main_type.value, names } }).then(res => {
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
getOpts(['labels_kind']).then(res => {
    opts_all.obj = res
})
</script>
