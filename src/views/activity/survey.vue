<template>
    <div>
        <page-main>
            <div>
                <el-row :gutter="20" class="bottom-btn-box-1">
                    <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                        <el-button class="head-btn" style="width: 150px;height: 40px;" type="primary" @click="addResidentialFunc()">
                            <el-icon size="16px" class="m-r-10">
                                <svg-icon name="plus" />
                            </el-icon>
                            添加问卷
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 搜索框 -->
            <div class="m-tb-10 p-tb-30 p-l-40" style="background-color: #fafafa;">
                <span style="margin: 0 20px;">关键字</span>
                <el-input v-model="data_search.obj.name" class="input-b-r" placeholder="标题名称" clearable />
                <el-select v-model="data_search.obj.status" class="input-b-r" placeholder="状态">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-select v-model="data_search.obj.utype" class="input-b-r" placeholder="用户类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <br>
                <el-button class="head-btn" type="primary" style="margin-left: 90px;" @click="searchFunc">
                    <svg-icon name="search" />筛选
                </el-button>
                <div>
                    <span v-show="switch_search" class="font-grey m-l-40">累计搜索到相关结果共<span style="font-size: 24px;">{{ total }}</span>条。</span>
                </div>
            </div>
            <el-radio-group v-model="activeName" size="large" class="m-b-20" @change="handleClick">
                <el-radio-button label="全部" />>
                <el-radio-button label="筹备阶段" />>
                <el-radio-button label="待审" />>
                <el-radio-button label="未开始" />>
                <el-radio-button label="进行中" />>
                <el-radio-button label="暂停" />>
                <el-radio-button label="终止" />>
                <el-radio-button label="已结束" />>
            </el-radio-group>
            <!-- 问卷列表 -->
            <div>
                <el-table
                    v-loading="loading_tab" :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    style="width: 100%;min-height: 300px;overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
                >
                    <el-table-column prop="name" label="问卷标题" width="150px" />
                    <el-table-column prop="content" label="问卷内容" width="350px" />
                    <el-table-column label="问卷状态" width="200px" align="center">
                        <template #default="scope">
                            <el-button v-if="scope.row.status == '1'" size="small" round>筹备阶段</el-button>
                            <el-button v-else-if="scope.row.status == '2'" size="small" type="primary" round>待审</el-button>
                            <el-button v-else-if="scope.row.status == '3'" size="small" type="info" round>未开始</el-button>
                            <el-button v-else-if="scope.row.status == '4'" size="small" type="success" round>进行中</el-button>
                            <el-button v-else-if="scope.row.status == '5'" size="small" type="warning" round>暂停</el-button>
                            <el-button v-else-if="scope.row.status == '6'" size="small" type="warning" round>终止</el-button>
                            <el-button v-else-if="scope.row.status == '7'" size="small" type="danger" round>已结束</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="问卷时间" align="center" show-overflow-tooltip>
                        <template #default="scope">
                            <span>{{ scope.row.startat }} -  {{ scope.row.endat }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="250px" label="操作">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="modifySurvey(scope.row)">
                                修改
                            </el-button>
                            <el-button size="small" @click="detailsFunc(scope.row)">
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
            <!-- 修改添加 -->
            <el-dialog v-model="switch_examine" :title="str_title" width="50%">
                <div>
                    <el-scrollbar style="height: 400px;">
                        <div class="details-box p-lr-10">
                            <el-form ref="ruleFormRef" :model="from_examine.item">
                                <el-row :gutter="10">
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="区域类型" label-width="120px" prop="author_type" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.author_type"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="区域对应值" label-width="120px" prop="author_tgt" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.author_tgt"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="区域代码" label-width="120px" prop="author_cc" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.author_cc"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="开始时间" label-width="120px" prop="author_tgt" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-date-picker
                                                v-model="value1"
                                                type="datetime"
                                                :placeholder="from_examine.item.startat"
                                                format="YYYY-MM-DD hh:mm:ss"
                                                value-format="YYYY-MM-DD hh:mm:ss"
                                                style="width: 100%;"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="结束时间" label-width="120px" prop="endat" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-date-picker
                                                v-model="value2"
                                                type="datetime"
                                                :placeholder="from_examine.item.endat"
                                                format="YYYY-MM-DD hh:mm:ss"
                                                value-format="YYYY-MM-DD hh:mm:ss"
                                                style="width: 100%;"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="总票数" label-width="120px" prop="ticketall" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.ticketall"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="同时投几项（0表示全投）" label-width="120px" prop="vmax" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.vmax"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="总面积" label-width="120px" prop="areaall" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.areaall"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="开放—关闭" label-width="120px" prop="pub" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-radio-group v-model="from_examine.item.pub" class="ml-4">
                                                <el-radio label="1" size="large">开放</el-radio>
                                                <el-radio label="0" size="large">关闭</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="状态" label-width="120px" prop="status" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <!-- <el-input
                                            v-model="from_examine.item.status"
                                            placeholder=""
                                        ></el-input> -->
                                            <el-radio-group v-model="from_examine.item.status" class="ml-4">
                                                <el-radio label="1">筹备阶段</el-radio>
                                                <el-radio label="2">待审</el-radio>
                                                <el-radio label="3">未开始</el-radio>
                                                <el-radio label="4">进行中</el-radio>
                                                <el-radio label="5">暂停</el-radio>
                                                <el-radio label="6">终止</el-radio>
                                                <el-radio label="7">已结束</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="12">
                                        <el-form-item label="标题" label-width="120px" prop="name" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.name"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="24">
                                        <el-form-item label="问卷内容" label-width="120px" prop="content" :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''">
                                            <el-input
                                                v-model="from_examine.item.content"
                                                type="textarea"
                                                :autosize="{ minRows: 4, maxRows: 16 }"
                                                placeholder=""
                                                style="width: 100%;"
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-scrollbar>
                </div>
                <template #footer>
                    <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                        <el-button @click="switch_examine=false">取消</el-button>
                        <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef,id)">确定</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 详情 -->
            <el-dialog v-model="switch_details" :title="data_details.item.name" width="80%" destroy-on-close="true">
                <Detail :id="data_details.item.id" />
                <template #footer>
                    <el-button type="warning" plain @click="switch_details = false">取消</el-button>
                </template>
            </el-dialog>
        </page-main>
    </div>
</template>

<script lang="ts" setup>
import {
    APIgetSurvey,
    APIaddSurvey,
    APIdeleteSurvey,
    APImodifySurvey,
    APImodifySurveyStatus,
    APIgetSurveyDetails
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import { log } from 'console'
import { valid } from 'mockjs'
const value = ref('')
// 选项数据
const options = [
    { value: 1, label: '筹备阶段' },
    { value: 2, label: '待审' },
    { value: 3, label: '未开始' },
    { value: 4, label: '进行中' },
    { value: 5, label: '暂停' },
    { value: 6, label: '终止' },
    { value: 7, label: '已结束' }
]
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    obj: {}
})
// 标签页
const activeName = ref('全部')
// 列表
let ruleFormRef = ref('')
// 是否加载中（element UI）
let loading_tab = ref(false)
let data_tab = reactive({
    arr: []
})
// 详情
const data_details = reactive({
    item: ''
})
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 详情
let switch_details = ref(false)
// 添加 修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        // 'type':83,
        // 'author_type': 1,
        // 'author_tgt': '62bd6f76ee071f1789147d41',
        // 'author_cc': '500101001002',
        // 'name': '高温补贴征集',
        // 'startat':'2022-07-13 11:00:00',
        // 'endat': '2022-08-13 11:00:00',
        // 'content':'是否需要安装空调',
        // 'ticketall':2,
        // 'areaall':42,
        // 'pub':1,
        // 'status':1,
        // 'vmax':14,
        // 'uid':"62d0c1f95c611c26d344b114",
        // 'utype':'mbr',
        // 'id':'62bd6f76ee071f1789147d41',
        // 'updated_at': '2022-07-13 11:00:00',
        // 'created_at': '2022-07-13 11:00:00',
    }
})
// 开始结束时间
const value1 = ref('')
const value2 = ref('')
// 修改弹出框的标题
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
// 刷新
const refreshFunc = () => {
    page.value = 1
    getTabListFunc()
}
// 详情
const detailsFunc = val => {
    data_details.item = ''
    console.log(val.id)
    APIgetSurveyDetails(val.id).then(res => {
        if (res.status === 200) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
    // switch_details.value = true
}
// Tabs标签页点击切换事件,切换显示不同状态的问卷
// 切换标签后，根据label的值进行if判断，切换不同状态问卷
const handleClick = tab => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        status: ''
    }
    // tab未label的值
    if (tab === '筹备阶段') {
        params.status = 1
    } else if (tab === '待审') {
        params.status = 2
    } else if (tab === '未开始') {
        params.status = 3
    } else if (tab === '进行中') {
        params.status = 4
    } else if (tab === '暂停') {
        params.status = 5
    } else if (tab === '终止') {
        params.status = 6
    } else if (tab === '已结束') {
        params.status = 7
    } else {
        return getTabListFunc()
    }
    APIgetSurvey(params).then(res => {
        if (res.status === 200) {
            loading_tab.value = false
            data_tab.arr = res.data
            total.value = data_tab.arr.length
        }
        // console.log(data_tab.arr)
    }).catch(err => {
        from_error.msg = err.data
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const dialogExamineCloseFunc = (formEl, id) => {
    from_error.msg = {}
    id = from_examine.item.id
    // 使用element UI的时间处理器，要将修改的时间传给要提交的对象，因为placeholder绑定了旧值，最新的时间数据绑定value1
    from_examine.item.startat = value1.value._value ? value1.value._value : from_examine.item.startat
    from_examine.item.endat = value2.value._value ? value2.value._value : from_examine.item.endat
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                console.log(from_examine.item)
                APImodifySurvey(id, from_examine.item).then(res => {
                    if (res.status === 200) {
                        refreshFunc()
                        // ElMessage.success(res.statusText)
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                    }
                    // 如果传递了状态码，就修改状态信息
                    APImodifySurveyStatus(id, { 'status': from_examine.item.status }).then(res => {
                        refreshFunc()
                    })
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIaddSurvey(from_examine.item).then(res => {
                    refreshFunc()
                    // ElMessage.success(res.msg)
                    ElMessage.success('添加成功')
                    switch_examine.value = false
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
    // 请求信息
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
    loading_tab.value = true
    APIgetSurvey(params).then(res => {
        if (res.status === 200) {
            loading_tab.value = false
            data_tab.arr = res.data
            total.value = data_tab.arr.length
        }
        console.log(data_tab.arr)
    }).catch(err => {
        from_error.msg = err.data
    })
}
// 添加问卷
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        type: 1,
        areaall: 51,
        author_cc: '500101001003',
        author_cc_name: '王家坡社区',
        author_tgt: '62bd6f76ee071f1789147d41',
        author_tgt_region: null,
        author_type: 1,
        content: '明年结婚后',
        created_at: '2022-08-04 08:52:21',
        endat: '2022-08-31 12:00:00',
        id: '62eb1845cb6268571f43d368',
        name: '几天后',
        pub: 1,
        startat: '2022-08-01 12:00:00',
        status: 2,
        ticketall: 20,
        uid: '62bc2250cda5d91c771a1de1',
        updated_at: '2022-08-04 08:52:21',
        utype: 'pt',
        vmax: 0
    }
    switch_examine.value = true
}
// 删除
const deleteFunc = val => {
    APIdeleteSurvey(val.id).then(res => {
        refreshFunc()
        // ElMessage.success(res.statusText)
        ElMessage.success('删除成功')
    }).catch(err => {
        from_error.msg = err.data
    })
}
// 修改问卷
const modifySurvey = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetSurveyDetails(val.id).then(res => {
        if (res.status == 200) {
            from_examine.item = res.data
            from_examine.item.pub += ''
            from_examine.item.status += ''
            switch_examine.value = true
        }
    }).catch(err => {
        from_error.msg = err.data
    })
}
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
    // console.log('aaa')
    // 搜索结束后，清空筛选条件
    data_search.obj = {}
}
refreshFunc()
</script>
