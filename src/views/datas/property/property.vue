<template>
    <div class="propertypropertylist">
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button
                    type="primary" :icon="Plus" size="large"
                    @click="addResidentialFunc"
                >
                    添加产权
                </el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                房屋：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16" class="search_tb">
                                <div class="searchUserGroup">
                                    <SearchHouse ref="V_1" @checkFunc="checkNameFunc" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                产权证号：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="data_search.obj.code_property" class="search_tb" placeholder="产权证号" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                地房籍号：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="data_search.obj.code_room" class="search_tb" placeholder="地房籍号" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="btnClick==true">
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                产权人姓名：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input v-model="data_search.obj.owner_name" class="search_tb" placeholder="产权人姓名" clearable />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                交易时间：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-date-picker
                                    v-model="data_search.obj.time_deal"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="交易时间"
                                    end-placeholder="交易时间"
                                    class="search_tb"
                                    value-format="YYYY-MM-DD"
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc_1">重置</el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="searchPlay" @click="btnClickFunc">
                        <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                        <el-button v-if="btnClick==false" :icon="CaretBottom" class="searchDeal" size="small">展开</el-button>
                        <el-button v-if="btnClick==true" :icon="CaretTop" class="searchDeal" size="small">收起</el-button>
                    </div>
                </el-row>
            </div>
            <div>
                <el-table
                    v-loading="loading_tab"
                    :data="data_tab.arr"
                    :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                    class="tab_1"
                >
                    <el-table-column prop="house_id" label="房屋">
                        <template #default="scope">
                            <span>{{ scope.row?.house?.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_property" label="产权证号">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.code_property }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code_room" label="地房籍号">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.code_room }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time_deal" label="交易时间">
                        <template #default="scope">
                            <span class="m-l-10">{{ scope.row.time_deal }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button
                                type="primary" size="small"
                                @click="modifyResidentialFunc(scope.row)"
                            >
                                变更
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
                </el-table>
            </div>
            <el-pagination
                v-model:current-page="page"
                style="float: right;"
                layout="prev,next,jumper,"
                :total="Infinity"
                :page-size="per_page"
                background
                prev-text="上一页"
                next-text="下一页"
                hide-on-single-page
            />
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
                                    <SearchHouse ref="V" :name="houseName" @checkFunc="checkNameFunc_1" />
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
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item
                                label-width="70px"
                                label="附件"
                                :error="from_error.msg&&from_error.msg.affix?from_error.msg.affix[0]:''"
                            >
                                <el-upload
                                    ref="uploadRef"
                                    action="***"
                                    :auto-upload="false"
                                    :file-list="file_list"
                                    list-type="picture-card"
                                    :on-change="(file,files)=>{
                                        file_list = files
                                    }"
                                    :on-remove="(file,files)=>{
                                        file_list = files
                                    }"
                                >
                                    <!-- <el-button type="primary" plain>选择</el-button> -->
                                </el-upload>
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
                                <!-- <el-scrollbar :height="from_examine.item.owners.length >= 3 ? '400px' : ''"> -->
                                <div v-for="(item,i) in from_examine.item.owners" :key="i" class="serve-box">
                                    <el-row :gutter="10">
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                            <el-form-item label-width="70px" label="名称" :error="from_error.msg&&from_error.msg['owners.'+i+'.name']?from_error.msg['owners.'+i+'.name'][0]:''">
                                                <el-input
                                                    v-model="item.name"
                                                    placeholder=""
                                                />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                            <el-form-item label-width="70px" label="证件类型" :error="from_error.msg&&from_error.msg['owners.'+i+'.type_id_card']?from_error.msg['owners.'+i+'.type_id_card'][0]:''">
                                                <el-select v-model="item.type_id_card" class="head-btn" placeholder="" clearable>
                                                    <el-option v-for="value in opts_all.obj.card_type" :key="value.key" :label="value.val" :value="value.key" />
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
                                            <el-form-item label-width="70px" label="拥有面积" :error="from_error.msg&&from_error.msg['owners.'+i+'.area']?from_error.msg['owners.'+i+'.area'][0]:''">
                                                <el-input
                                                    v-model="item.area"
                                                    placeholder=""
                                                />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                            <el-form-item
                                                label-width="70px"
                                                label="附件"
                                                :error="from_error.msg&&from_error.msg.affix?from_error.msg.affix[0]:''"
                                            >
                                                <el-upload
                                                    ref="uploadRef"
                                                    action="***"
                                                    :auto-upload="false"
                                                    :file-list="file_list_1[i]"
                                                    list-type="picture-card"
                                                    :on-change="(file,files)=>{
                                                        file_list_1[i] = files
                                                    }"
                                                    :on-remove="(file,files)=>{
                                                        file_list_1[i] = files
                                                    }"
                                                >
                                                    <!-- <el-button type="primary" plain>选择</el-button> -->
                                                </el-upload>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <div class="delete-service" @click="deleteServiceFunc(i)">
                                        <el-icon :size="20" color="#F56C6C">
                                            <el-icon-circle-close />
                                        </el-icon>
                                    </div>
                                </div>
                                <!-- </el-scrollbar> -->
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
                    <div class="right">{{ data_details.item.house.name }}</div>
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
                <div class="item">
                    <div class="left">附件</div>
                    <div class="right" v-if="data_details.item.affix">
                        <el-image
                            v-for="item in data_details.item.affix.bdcz"
                            :key="item"
                            :preview-src-list="data_details.item.affix.bdcz"
                            class="image"
                            :src="item"
                            lazy
                        ></el-image>
                    </div>
                    <div class="right" v-else>待补充</div>
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
                                        <span>房屋面积：</span>{{ item.area }} ㎡
                                    </div>
                                    <div></div>
                                    <div>
                                        <span>附件：</span>
                                        <div class="right" v-if="item.affix">
                                            <el-image
                                                v-for="picture in item.affix.sfz"
                                                :key="picture"
                                                :preview-src-list="item.affix.sfz"
                                                class="image"
                                                :src="picture"
                                                lazy
                                            ></el-image>
                                        </div>
                                        <div class="right" v-else>待补充</div>
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
import { Search, Plus, CaretTop, CaretBottom, Loading } from '@element-plus/icons-vue'
import { getOpts, getOptVal } from '@/util/opts.js'
import { getFilesKeys } from '@/util/files.js'
/* ----------------------------------------------------------------------------------------------------------------------- */
const searchVisible = ref(false)
const VITE_APP_FOLDER_SRC = import.meta.env.VITE_APP_FOLDER_SRC
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
let per_page_1 = ref(15)
let page_1 = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        affix: {
            bdcz: []
        },
        owners: [{
            affix: {
                sfz: []
            }
        }]
    }
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
        // 遍历附件加上图片服务器地址前缀
        if(res.affix) {
            for(let i in res.affix.bdcz) {
                res.affix.bdcz[i] = VITE_APP_FOLDER_SRC + res.affix.bdcz[i]
            }
        }
        res.owners.map(item=>{
            if(item.affix) {
                for(let i in item.affix.sfz) {
                    item.affix.sfz[i] = VITE_APP_FOLDER_SRC + item.affix.sfz[i]
                }
            }
        })
        // console.log('111',res)
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
const file_list = ref([])
const file_list_1 = ref([])
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            let files = []
            let file_key = []
            if (file_list.value.length > 0) {
                for (let i in file_list.value) {
                    if (!file_list.value[i].raw) {
                        file_key.push(file_list.value[i].name)
                    } else {
                        files.push(file_list.value[i].raw)
                    }
                }
            }
            from_error.msg = {}
            for (let key in from_examine.item) {
                if (from_examine.item[key] !== null) {
                    if (from_examine.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item[key] !== 0 || from_examine.item[key] !== false)) {
                        delete from_examine.item[key]
                    }
                }
            }
            if (files.length > 0) {
                getFilesKeys(files, 'property').then(arr => {
                    // affix为null
                    from_examine.item.affix = {bdcz:[]}
                    from_examine.item.affix.bdcz = arr
                    // console.log("aaaa",files,arr)
                })
            }
            // 遍历处理不同产权人的身份证附件信息
            for(let j in file_list_1.value) {
                let files_1 = []
                files_1[j] =[]
                let file_key_1 = []
                file_key_1[j] = []
                if (file_list_1.value[j].length > 0) {
                    for (let i in file_list_1.value[j]) {
                        if (!file_list_1.value[j][i].raw) {
                            file_key_1[j].push(file_list_1.value[j][i].name)
                        } else {
                            files_1[j].push(file_list_1.value[j][i].raw)
                        }
                    }
                }
                from_error.msg = {}
                if (files_1[j].length > 0) {
                    getFilesKeys(files_1[j], 'propertyOwners').then(arr => {
                        from_examine.item.owners[j].affix = {sfz:[]}
                        from_examine.item.owners[j].affix.sfz = arr
                    })
                }
            }
            setTimeout(() => {
                if (str_title.value == '修改') {
                    // console.log(from_examine.item)
                    APIputProperty(from_examine.item.id, from_examine.item).then(res => {
                        refreshFunc()
                        ElMessage.success('修改成功')
                        switch_examine.value = false
                    }).catch(err => {
                        ElMessage.error('修改失败')
                    })
                } else {
                    // console.log(from_examine.item)
                    APIpostProperty(from_examine.item).then(res => {
                        refreshFunc()
                        ElMessage.success('添加成功')
                        switch_examine.value = false
                    }).catch(err => {
                        ElMessage.error('添加失败')
                    })
                }
            }, 700)
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
        // console.log(res)
        loading_tab.value = false
        data_tab.arr = res
        total.value = data_tab.arr.length
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
    })
}
const allHouse_list = reactive({
    arr: []
})

const checkNameFunc = row => {
    data_search.obj.house_id = row
}
// 删除
const deleteFunc = val => {
    APIdeleteProperty(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 添加产权
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        house_id: '',
        time_deal: '',
        code_property: '',
        code_room: '',
        should_bind_house: '',
        affix: {
            bdcz: []
        },
        owners: [{
            affix: {
                sfz: []
            }
        }]
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
        file_list.value = []
        file_list_1.value = []
        res.affix?.bdcz.map(item=>{
            file_list.value.push({'url':VITE_APP_FOLDER_SRC+item})
        })
        res.owners.map((e,i)=>{
            file_list_1.value[i] = []
            for(let j in e.affix?.sfz) {
                file_list_1.value[i].push({'url':VITE_APP_FOLDER_SRC+e.affix?.sfz[j]})
            }
        })
        // console.log("res",res)
        from_examine.item = res
        switch_examine.value = true
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
        area: '',
        affix:{siz:[]}
    }
    from_examine.item.owners.push(data)
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
const opts_all = reactive({
    obj: {}
})
getOpts(['house_has_house', 'card_type']).then(res => {
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
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
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
