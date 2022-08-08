<template>
    <div class="keep-on-record">
        <page-main>
            <div>
                <el-button
                    class="head-btn" type="primary" :icon="Plus"
                    @click="addResidentialFunc"
                >
                    添加企业
                </el-button>
            </div>
            <div class="search">
                <el-row :gutter="10">
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">
                                关键字：
                            </div>
                            <el-input v-model="search_str.obj.keyword" class="search_tb" placeholder="" clearable />
                        </div>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8">
                        <div class="searchBox">
                            <div class="search_th">用户名：</div>
                            <div class="search_tb">
                                <div class="searchUserGroup">
                                    <SearchUser ref="V" @checkName="checkUsersNameFunc" />
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-20">
                    <el-col :xs="12" :md="12" :lg="10">
                        <div class="flx">
                            <div class="w_30%">
                                <el-button class="m-l-20" type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                            </div>
                            <div v-show="switch_search" class="w_70% m-l-30">
                                <el-button class="m-r-10" @click="refreshFunc_1">重置</el-button>
                                *搜索到相关结果共{{ total }}条。
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="from_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="logo" label="企业图标" width="140">
                    <template #default="scope">
                        <span class="m-l-10">
                            <img :src="scope.row.logo" alt="" style="width: 25px;">
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="企业名称" />
                <el-table-column prop="user_id" label="用户名">
                    <template #default="scope">
                        <span class="m-l-10">{{ getNameFunc(userData.arr,scope.row.user_id) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="social_code" label="社会信用代码" width="140">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.social_code }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="企业类型">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="legal" label="法人" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.legal }} </span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="contact" label="联系方式" width="140">
                    <template #default="scope">
                        <span class="m-l-10">{{ scope.row.contact }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="desc" label="简介" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px;">{{ scope.row.desc }} </span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column /> -->
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="applyFunc(scope.row)"
                        >
                            企业申请
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
                layout="total,prev,pager,next,jumper,"
                :total="total"
                :page-size="per_page"
                background
                hide-on-single-page
                class="p-t-20"
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_add"
            :title="str_title"
            width="50%"
            @closed="add_dialog_close"
        >
            <div>
                <el-form
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="用户名"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <div class="wh_100">
                                    <div class="searchUserGroup">
                                        <SearchUser ref="V_1" @checkName="checkUsersNameFunc" />
                                    </div>
                                </div>
                                <!-- <el-input
                                    v-model="from_add.obj.logo"
                                    placeholder=""
                                /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="公司名称"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="社会信用代码"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.social_code"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="公司类型"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-select v-model="from_add.obj.type" class="head-btn search_tb" placeholder="审核状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.enterprise_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="企业图标"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-upload
                                    action="***"
                                    :auto-upload="false"
                                    :file-list="file_list"
                                    :on-change="(file,files)=>{
                                        file_list = files
                                    }"
                                    :on-remove="(file,files)=>{
                                        file_list = files
                                    }"
                                >
                                    <el-button type="primary">选择图标</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="法人"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.legal"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col> -->
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="联系方式"
                                label-width="120px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.contact"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="简介"
                                label-width="120px"
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
                    <div class="left">ID</div>
                    <div class="right">{{ details_item.obj.id }} </div>
                </div>
                <div class="item">
                    <div class="left">用户名</div>
                    <div class="right">{{ getNameFunc(userData.arr,details_item.obj.user_id) }} </div>
                </div>
                <div class="item">
                    <div class="left">企业名称</div>
                    <div class="right">{{ details_item.obj.name }} </div>
                </div>
                <div class="item">
                    <div class="left">社会责任代码</div>
                    <div class="right">{{ details_item.obj.social_code }} </div>
                </div>
                <div class="item">
                    <div class="left">类型</div>
                    <div class="right">{{ getOptVal(opts_all.obj.enterprise_type,details_item.obj.type) }} </div>
                </div>
                <div class="item">
                    <div class="left">图标</div>
                    <div class="right">
                        <!-- <el-image
                            v-for="(item,i) in details_item.obj.logo" :key="i" :preview-src-list="details_item.obj.logo" class="wh_100p m-r-10" :src="item" fit="cover"
                        /> -->
                        <img :src="details_item.obj.logo" alt="" style="width: 40px;">
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="left">法人</div>
                    <div class="right">{{ details_item.obj.legal }} </div>
                </div> -->
                <div class="item">
                    <div class="left">联系方式</div>
                    <div class="right">{{ details_item.obj.contact }} </div>
                </div>
                <div class="item">
                    <div class="left">简介</div>
                    <div class="right">{{ details_item.obj.desc }} </div>
                </div>
                <!-- <div class="item">
                    <div class="left">extra</div>
                    <div class="right">{{ details_item.obj.extra }} </div>
                </div> -->
                <div class="item">
                    <div class="left">创建时间</div>
                    <div class="right">{{ details_item.obj.created_at }} </div>
                </div>
                <div class="item">
                    <div class="left">更新时间</div>
                    <div class="right">{{ details_item.obj.updated_at }} </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="switch_replay"
            title="企业申请列表"
            width="70%"
        >
            <el-table
                :data="data_applyList.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="name" label="企业名称" />
                <el-table-column prop="user_id" label="用户名">
                    <template #default="scope">
                        <span v-if="getNameFunc(userData.arr,scope.row.user_id)" class="m-l-10">{{ getNameFunc(userData.arr,scope.row.user_id) }} </span>
                        <span class="m-l-10" else>{{ scope.row.user_id }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="企业类型">
                    <template #default="scope">
                        <span class="m-l-10">{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="处理状态">
                    <template #default="scope">
                        <el-tag v-if="scope.row.process_status == 10" type="warning" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 15" type="primary" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 20" type="success" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                        <el-tag v-if="scope.row.process_status == 30" type="danger" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,scope.row.process_status) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <el-button
                            type="primary" size="small"
                            @click="examineFunc(scope.row)"
                        >
                            审核
                        </el-button>
                        <el-button
                            size="small"
                            @click="detailsFunc_1(scope.row)"
                        >
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_replay = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 申请详情 -->
        <el-dialog
            v-model="switch_details_1"
            title="申请详情"
            width="50%"
        >
            <div class="details-box">
                <div class="item">
                    <div class="left">企业名称</div>
                    <div class="right">{{ apply_details.obj.name }} </div>
                </div>
                <div class="item">
                    <div class="left">用户名</div>
                    <div v-if="getNameFunc(userData.arr,apply_details.obj.user_id)" class="right">{{ getNameFunc(userData.arr,apply_details.obj.user_id) }} </div>
                    <div class="right" else>{{ apply_details.obj.user_id }} </div>
                </div>
                <div class="item">
                    <div class="left">企业类型</div>
                    <div class="right">{{ apply_details.obj.type }} </div>
                </div>
                <div class="item">
                    <div class="left">处理状态</div>
                    <div class="right">
                        <el-tag v-if="apply_details.obj.process_status == 10" type="warning" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        <el-tag v-if="apply_details.obj.process_status == 15" type="primary" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        <el-tag v-if="apply_details.obj.process_status == 20" type="success" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                        <el-tag v-if="apply_details.obj.process_status == 30" type="danger" round effect="dark">{{ getOptVal(opts_all.obj.enterpriseStatus,apply_details.obj.process_status) }}</el-tag>
                    </div>
                </div>
                <!-- <div class="item">
                    <div class="left">图标</div>
                    <div class="right">
                        <img :src="apply_details.obj.logo" alt="" style="width: 40px;">
                    </div>
                </div> -->
                <!-- <div class="item">
                    <div class="left">法人</div>
                    <div class="right">{{ details_item.obj.legal }} </div>
                </div> -->
                <div class="item">
                    <div class="left">申请时间</div>
                    <div class="right">{{ apply_details.obj.created_at }} </div>
                </div>
                <div v-if="apply_details.obj.reply" class="item">
                    <div class="left">回复内容</div>
                    <div class="right">{{ apply_details.obj.reply }} </div>
                </div>
                <div style="border: 1px solid #ccc;">
                    相关信息
                    <div class="item">
                        <div class="left">申请人</div>
                        <div class="right">{{ apply_details.obj.content.legal }} </div>
                    </div>
                    <div class="item">
                        <div class="left">申请地址</div>
                        <div class="right">{{ apply_details.obj.content.com_addr }} </div>
                    </div>
                    <div class="item">
                        <div class="left">营业执照</div>
                        <div class="right">
                            <img :src="apply_details.obj.content.biz_lic" alt="" style="width: 120px;">
                        </div>
                    </div>
                    <div class="item">
                        <div class="left">社会信用代码</div>
                        <div class="right">{{ apply_details.obj.content.social_code }} </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details_1 = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 审核  -->
        <el-dialog
            v-model="switch_examine_1"
            title="审核申请"
            width="40%"
            @closed="add_dialog_close"
        >
            <div>
                <el-form
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="审核状态"
                                label-width="80px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-select v-model="examine_item.obj.process_status" class="head-btn" placeholder="" clearable>
                                    <el-option v-for="item in opts_all.obj.examine_status" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="回复"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="examine_item.obj.reply"
                                    :autosize="{ minRows: 4, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine_1=false">取消</el-button>
                    <el-button type="primary" @click="postFunc_2">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const search_str = reactive({
    obj: {}
})
const switch_search = ref(false)
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
watch(page, () => {
    getTabListFunc()
})
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
const refreshFunc = () => {
    search_str.obj = {}
    switch_search.value = false
    getTabListFunc()
}
const V = ref(null)
const refreshFunc_1 = () => {
    V.value.clearFunc()
    refreshFunc()
}
const from_tab = reactive({
    arr: []
})
const file_list = ref([])
import { getFilesKeys } from '@/util/files.js'
import {
    APIgetEnterpriseList,
    APIgetEnterpriseDetails,
    APIdeleteEnterprise,
    APIputEnterprise,
    APIpostEnterprise
} from '@/api/custom/custom.js'

// 获取列表
const loading_tab = ref(false)
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
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
    APIgetEnterpriseList(params).then(res => {
        if (res.status === 200) {
            console.log(res)
            loading_tab.value = false
            from_tab.arr = res.data
            total.value = res.data.length
        }
    })
}

const switch_add = ref(false)
const str_title = ref('添加')
const from_add = reactive({
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const checkUsersNameFunc = val => {
    console.log(val)
    search_str.obj.user_id = val.id
    from_add.obj.user_id = val.id
}
// dialog关闭回调
const V_1 = ref(null)
const add_dialog_close = () => {
    // V_1.value.clearFunc()
}
// // 添加
// const addFunc = () => {
//     from_add.obj = {}
//     err_add.obj = {}
//     str_title.value = '添加'
//     switch_add.value = true
// }
// 添加
const addResidentialFunc = () => {
    from_add.obj = {}
    err_add.obj = {}
    str_title.value = '添加'
    switch_add.value = true
    file_list.value = []
}
const modifyFunc = val => {
    APIgetEnterpriseDetails(val.id).then(res => {
        from_add.obj = res.data
        // file_list.value = res.data.logo
    })
    err_add.obj = {}
    str_title.value = '修改'
    switch_add.value = true
}
const switch_details = ref(false)
const details_item = reactive({
    obj: {}
})
const detailsFunc = val => {
    APIgetEnterpriseDetails(val.id).then(res => {
        // res.data.logo = import.meta.env.VITE_APP_FOLDER_SRC + res.data.lofo
        details_item.obj = res.data
        switch_details.value = true
        console.log(res.data)
    })
}
const deleteFunc = val => {
    APIdeleteEnterprise(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 提交
const postFunc_1 = () => {
    if (str_title.value == '添加') {
        APIpostEnterprise(from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_add.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    } else if (str_title.value == '修改') {
        APIputEnterprise(from_add.obj.id, from_add.obj).then(() => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_add.value = false
        }).catch(() => {
            ElMessage.error('修改失败')
        })
    }
}
const postFunc = () => {
    // let files = ""
    // let file_key = []
    // if (file_list.value.length > 0) {
    //     for (let i in file_list.value) {
    //         if (!file_list.value[i].raw) {
    //             file_key.push(file_list.value[i].name)
    //         } else {
    // files.push(file_list.value[i].raw)
    //         }
    //     }
    // }
    // console.log(file_list.value)
    from_add.obj.logo = file_list.value[0].name
    // if (files.length > 0) {
    // getFilesKeys(file_list.value.row, 'folder').then(arr => {
    //     from_add.obj.logo = file_list.value.name.concat(arr)
    //     postFunc_1()
    // })
    console.log(from_add.obj.logo)
    // return false
    // }
    postFunc_1()
    // let data = {
    //     biz_lic: 'gdrtrye5t.jpg',
    //     type: 1
    // }
    // APIpostEnterpriseApply(data).then(res => {

    // })
    // let params = {
    //     page: page.value,
    //     per_page: per_page.value,
    //     tyle: 1
    // }
    // APIgetEnterpriseApplyList(params).then(res => {
    //     console.log(res)
    // })
}
// 选择用户名
const userData = reactive({
    arr: []
})
import {
    APIgetUserList
} from '@/api/custom/custom.js'
APIgetUserList().then(res => {
    if (res.status == 200) {
        console.log(res)
        userData.arr = res.data
    }
})
const getNameFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].id == key) {
            return arr[i].username
        }
    }
}
// 企业申请
const data_applyList = reactive({
    arr: []
})
const switch_replay = ref(false)
import {
    APIgetEnterpriseApplyDetails,
    APIgetEnterpriseApplyList,
    APIpostEnterpriseExamine
} from '@/api/custom/custom.js'
const applyFunc = row => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        tyle: 1
    }
    APIgetEnterpriseApplyList(params).then(res => {
        console.log(res)
        data_applyList.arr = res.data
        switch_replay.value = true
    })
}
const switch_details_1 = ref(false)
const apply_details = reactive({
    obj: {}
})
const examine_item = reactive({
    obj: {}
})
const switch_examine_1 = ref(false)
const detailsFunc_1 = row => {
    APIgetEnterpriseApplyDetails(row.id).then(res => {
        console.log(res)
        apply_details.obj = res.data
        switch_details_1.value = true
        apply_details.obj.content.biz_lic = import.meta.env.VITE_APP_FOLDER_SRC + apply_details.obj.content.biz_lic
    })
}
const examineFunc = row => {
    switch_examine_1.value = true
    apply_details.obj = row

}
const postFunc_2 = () => {
    APIpostEnterpriseExamine(apply_details.obj.id, examine_item.obj).then(res => {
        ElMessage.success('审核成功')
        switch_examine_1.value = false
    })
}
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['enterprise_type', 'enterpriseStatus', 'examine_status']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
    .keep-on-record {
        .tit-box-box {
            display: flex;
            padding: 0;
            .tit-box {
                height: 60px;
                box-sizing: border-box;
                margin-right: 30px;
                padding: 0 20px;
                font-size: 13px;
                color: #8c8c8c;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                position: relative;
                .tips {
                    position: absolute;
                    right: 0;
                    top: 8px;
                    box-sizing: border-box;
                    padding: 0 8px;
                    border-radius: 14px;
                    font-size: 12px;
                    color: #fff;
                    background-color: #e55055;
                }
            }
            .tit-box.on {
                border-bottom: 2px solid rgb(2 167 240 / 100%);
            }
            .tit-box:last-child {
                margin-right: 0;
            }
        }
    }

</style>
