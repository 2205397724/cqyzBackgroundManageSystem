<template>
    <div class="components-house" style="box-sizing: border-box;padding: 4px;">
        <table class="table" border="1">
            <tr>
                <td class="table_td">房屋名称：</td>
                <td colspan="3">{{ data_details.item.name }}</td>
            </tr>
            <tr>
                <td class="table_td">地址：</td>
                <td colspan="3">{{ data_details.item.addr }}</td>
            </tr>
            <tr>
                <td class="table_td">名义层：</td>
                <td>{{ data_details.item.floor_alias }}</td>
                <td class="table_td">物理楼层：</td>
                <td>{{ data_details.item.floor_truth }}</td>
            </tr>
            <tr>
                <td class="table_td">房号:</td>
                <td>{{ data_details.item.house_num }}</td>
                <td class="table_td">建筑面积：</td>
                <td>{{ data_details.item.area_build }} m²</td>
            </tr>
            <tr>
                <td class="table_td">套内面积:</td>
                <td>{{ data_details.item.area_inside }} m²</td>
                <td class="table_td">分摊面积：</td>
                <td>{{ data_details.item.area_share }} m²</td>
            </tr>
            <tr>
                <td class="table_td">户型：</td>
                <td colspan="3">{{
                        getOptVal(opts_all.obj.house_type_model, data_details.item.type_model)
                }}</td>
            </tr>
            <tr>
                <td class="table_td">产权性质：</td>
                <td colspan="3">{{
                        getOptVal(opts_all.obj.house_type_property, data_details.item.type_property)
                }}</td>
            </tr>
            <tr>
                <td class="table_td">使用状态：</td>
                <td colspan="3">{{
                        getOptVal(opts_all.obj.house_status_use, data_details.item.status_use)
                }}</td>
            </tr>
            <tr>
                <td class="table_td">安全状态：</td>
                <td colspan="3">{{
                        getOptVal(opts_all.obj.house_status_safe, data_details.item.status_safe)
                }}</td>
            </tr>
            <tr>
                <td class="table_td">规划用途：</td>
                <td colspan="3">{{
                        getOptVal(opts_all.obj.house_status_plan_fact, data_details.item.status_plan)
                }}</td>
            </tr>
            <tr>
                <td class="table_td">实际用途：</td>
                <td colspan="3">{{
                        getOptVal(opts_all.obj.house_status_plan_fact, data_details.item.status_fact)
                }}</td>
            </tr>
            <tr v-if="data_details.item.addition">
                <td class="table_td">简介：</td>
                <td colspan="3">{{ data_details.item.addition.desc }}</td>
            </tr>
            <tr>
                <td class="table_td">房屋id：</td>
                <td colspan="3">{{ data_details.item.id }}</td>
            </tr>
            <tr>
                <td class="table_td">创建时间：</td>
                <td colspan="3">{{ data_details.item.created_at }}</td>
            </tr>
            <tr>
                <td class="table_td">更新时间：</td>
                <td colspan="3">{{ data_details.item.updated_at }}</td>
            </tr>
            <tr>
                <td colspan="4">
                    <el-button type="primary" @click="modifyEmitFunc">修改房屋信息
                    </el-button>
                    <el-button type="warning" @click="showPropertyFunc">产权信息</el-button>
                    <el-button type="success" @click="showNumbersFunc">随住人员</el-button>
                </td>
            </tr>
        </table>
    </div>
    <!-- 产权 -->
    <el-dialog v-model="switch_property" :title="read_state ? '产权详情' : add_state ? '变更产权' : '修改产权'" width="70%">
        <div class="m-b-20">
            <el-button :disabled="!(read_state || !add_state)" type="primary" @click="modifyPropertyFunc(true)">变更产权
            </el-button>
            <el-button :disabled="!(read_state || add_state)" type="primary" @click="modifyPropertyFunc(false)">修改产权
            </el-button>
            <el-button v-if="!read_state" @click="modifycancel">取消</el-button>
        </div>
        <div :class="{ 'property-read-state': read_state }"
            style="height: 60vh;width: 100%;overflow-y: auto; overflow-x: hidden;">
            <el-form ref="ruleFormRef" :model="property_form.obj">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="产权信息" name="first">
                        <el-form-item label-width="80px" label="产权证号" prop="code_property"
                            :error="from_error_property.msg && from_error_property.msg.code_property ? from_error_property.msg.code_property[0] : ''">
                            <el-input v-if="!read_state" v-model="property_form.obj.code_property" placeholder="" />
                            <span v-else>{{ property_form.obj.code_property }}</span>
                        </el-form-item>
                        <el-form-item label-width="80px" label="地房籍号" prop="code_room"
                            :error="from_error_property.msg && from_error_property.msg.code_room ? from_error_property.msg.code_room[0] : ''">
                            <el-input v-if="!read_state" v-model="property_form.obj.code_room" placeholder="" />
                            <span v-else>{{ property_form.obj.code_room }}</span>
                        </el-form-item>
                        <el-form-item label-width="80px" label="交易时间" prop="time_deal"
                            :error="from_error_property.msg && from_error_property.msg.time_deal ? from_error_property.msg.time_deal[0] : ''">
                            <el-date-picker v-if="!read_state" v-model="property_form.obj.time_deal" type="date"
                                value-format="YYYY-MM-DD" placeholder="" style="width: 100%;"
                                :default-value="new Date()" />
                            <span v-else>{{ property_form.obj.time_deal }}</span>
                        </el-form-item>
                        <el-form-item label-width="80px" label="附件" prop="affix"
                            :error="from_error_property.msg && from_error_property.msg.affix ? from_error_property.msg.affix[0] : ''">
                            <div v-if="!add_state && read_state">
                                <div v-if="property_form.obj.affix">
                                    <el-image v-for="item in property_form.obj.affix.bdcz" :key="item"
                                        :preview-src-list="property_form.obj.affix.bdcz" class="image" :src="item" lazy>
                                    </el-image>
                                </div>
                            </div>
                            <div v-else>
                                <el-upload ref="uploadRef" action="***" :auto-upload="false" :file-list="file_list"
                                    list-type="picture-card" :on-change="(file, files) => {
                                        file_list = files
                                    }" :on-remove="(file, files) => {
    file_list = files
}"></el-upload>
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="产权人" name="second">
                        <div v-for="(item, i) in property_form.obj.owners" :key="i" class="serve-box">
                            <el-row>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                    <el-form-item label-width="80px" label="姓名"
                                        :error="from_error_property.msg && from_error_property.msg['owners.' + i + '.name'] ? from_error_property.msg['owners.' + i + '.name'][0] : ''">
                                        <el-input v-if="!read_state" v-model="item.name" placeholder="" />
                                        <span v-else>{{ item.name }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                    <el-form-item label-width="80px" label="证件类型"
                                        :error="from_error_property.msg && from_error_property.msg['owners.' + i + '.type_id_card'] ? from_error_property.msg['owners.' + i + '.type_id_card'][0] : ''">
                                        <el-select v-if="!read_state" v-model="item.type_id_card" class="head-btn"
                                            placeholder="" clearable>
                                            <el-option v-for="(item) in opts_all.obj.type_id_card" :key="item.key"
                                                :label="item.val" :value="item.key" />
                                        </el-select>
                                        <span v-else>{{ getOptVal(opts_all.obj.type_id_card,item.type_id_card) }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                    <el-form-item label-width="80px" label="证件号"
                                        :error="from_error_property.msg && from_error_property.msg['owners.' + i + '.id_card'] ? from_error_property.msg['owners.' + i + '.id_card'][0] : ''">
                                        <el-input v-if="!read_state" v-model="item.id_card" placeholder="" />
                                        <span v-else>{{ item.id_card }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                    <el-form-item label-width="80px" label="联系方式"
                                        :error="from_error_property.msg && from_error_property.msg['owners.' + i + '.mobile'] ? from_error_property.msg['owners.' + i + '.mobile'][0] : ''">
                                        <el-input v-if="!read_state" v-model="item.mobile" placeholder="" />
                                        <span v-else>{{ item.mobile }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                    <el-form-item label-width="80px" label="面积"
                                        :error="from_error_property.msg && from_error_property.msg['owners.' + i + '.area'] ? from_error_property.msg['owners.' + i + '.area'][0] : ''">
                                        <el-input v-if="!read_state" v-model="item.area" placeholder="" />
                                        <span v-else>{{ item.area }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                    <el-form-item label-width="80px" label="附件"
                                        :error="from_error_property.msg && from_error_property.msg['owners.' + i + '.area'] ? from_error_property.msg['owners.' + i + '.area'][0] : ''">
                                        <div v-if="!add_state && read_state">
                                            <div v-if="item.affix">
                                                <el-image v-for="picture in item.affix.sfz" :key="picture"
                                                    :preview-src-list="item.affix.sfz" class="image" :src="picture"
                                                    lazy></el-image>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <el-upload ref="uploadRef" action="***" :auto-upload="false"
                                                :file-list="file_list_1[i]" list-type="picture-card" :on-change="(file, files) => {
                                                    file_list_1[i] = files
                                                }" :on-remove="(file, files) => {
    file_list_1[i] = files
}"></el-upload>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div v-if="!read_state" class="delete-service" @click="deleteServiceFunc(i)">
                                <el-icon :size="20" color="#F56C6C">
                                    <el-icon-circle-close />
                                </el-icon>
                            </div>
                        </div>
                        <el-button v-if="!read_state" style="margin-right: 10px;" @click="addServiceFunc">添加产权人
                        </el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <div v-if="!read_state && add_state" class="size-base font-grey p-t-20 line-height-170">
                <div class="font-red">变更提示：</div>
                <div>
                    1、变更原因一般为房屋买卖、承租人变化等产权人正常变更；<br>
                    2、变更后，原产权人成为历史，新产权人为现势产权人；<br>
                    3、若有错别字或录入错误，请到产权人修改页面修改。
                </div>
            </div>
            <div v-if="!read_state && !add_state" class="size-base font-grey p-t-20 line-height-170">
                <div class="font-red">修改提示：</div>
                <div>
                    1，修改原因一般为修改错别字、身份证错误、录入错误等错误信息；<br>
                    2，每次只能修改一个人信息，修改不改变绑定委托等状态；<br>
                    3，若产权人发生正常变更，请到产权人变更页面变更。
                </div>
            </div>
        </div>
        <template #footer>
            <div v-if="!read_state" style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                <el-button @click="switch_property = false">取消</el-button>
                <el-button type="primary" @click="postPropertyFunc">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <!-- 房屋成员 -->
    <el-dialog v-model="switch_numbers" title="房屋成员" width="70%">
        <div>
            <el-button class="m-b-20 " type="primary" :icon="Plus" @click="addHouseNumberFunc">
                添加成员
            </el-button>
        </div>
        <div>
            <el-scollbar :height="houseNumbers_list.arr.length >= 8 ? '400' : ''">
                <el-table v-loading="loading_tab" :data="houseNumbers_list.arr" :header-cell-style="{
                    background: '#fbfbfb',
                    color: '#999999',
                    'font-size': '12px',
                }" style="width: 100%;min-height: 300px;" @selection-change="handleSelectionChange">
                    <el-table-column size="small" type="selection" align="center" width="55" />
                    <el-table-column prop="name" label="成员姓名">
                        <template #default="scope">
                            <span>{{ scope.row?.person?.name || scope.row.user?.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="身份证号码" width="250">
                        <template #default="scope">
                            <span>{{ scope.row?.person?.id_card || scope.row.id_card }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="手机号" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.user?.mobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="性别">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.gender, scope.row.user?.gender) }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-scollbar>
        </div>
        <div>
            <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info" @confirm="deleteFunc_2">
                <template #reference>
                    <el-button type="danger"> 删除 </el-button>
                </template>
            </el-popconfirm>
        </div>
    </el-dialog>
    <!-- 添加成员 -->
    <el-dialog v-model="switch_houseNumber" title="添加成员" width="50%">
        <div>
            <el-form ref="ruleFormRef" :model="number.item">
                <el-row :gutter="10">
                    <el-col :md="24" :lg="12">
                        <el-form-item label="身份证号" prop="name"
                            :error="from_error.msg && from_error.msg.name ? from_error.msg.name[0] : ''"
                            label-width="80px">
                            <el-input v-model="number.item.id_card" placeholder="" @blur="blurIbCard" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="12">
                        <el-form-item label="姓名" prop="name"
                            :error="from_error.msg && from_error.msg.name ? from_error.msg.name[0] : ''"
                            label-width="80px">
                            <el-input v-model="number.item.name" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="12">
                        <el-form-item label="姓别" prop="gender" label-width="80px">
                            <el-select v-model="number.item.gender" class="search_tb" placeholder="请选择" clearable>
                                <el-option v-for="item in opts_all.obj.gender" :key="item.key" :label="item.val"
                                    :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="12">
                        <el-form-item label="手机号" prop="mobile"
                            :error="from_error.msg && from_error.msg.mobile ? from_error.msg.mobile[0] : ''"
                            label-width="80px">
                            <el-input v-model="number.item.mobile" placeholder="" />
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="24">
                        <el-form-item label="备注信息">
                            <el-input v-model="number.item.desc" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                                placeholder="" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <template #footer>
            <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                <el-button @click="switch_houseNumber = false">取消</el-button>
                <el-button type="primary" @click="dialogExamineCloseFunc_1()">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {
    APIgetHouseDetailsHouse,
    APIgetPropertyDetails,
    APIputProperty,
    APIpostProperty,
    APIgetHouseNumbersSort,
    APIpostHouseNumbers,
    APIdeleteHouseNumbers,
    APIpostPersonnelManage,
    APIputPersonnelManage,
    APIgetPersonnelManageList,
} from '@/api/custom/custom.js'
import { getOpts, getOptVal } from '@/util/opts.js'
import { onUpdated, defineProps, defineEmits } from 'vue'
import { getFilesKeys } from '@/util/files.js'
import {
    ElMessage
} from 'element-plus'
const props = defineProps(['house_detail'])
const emit = defineEmits(['modifyResidentialFunc'])
let per_page = ref(15)
let page = ref(1)
const data_details = reactive({
    item: {}
})
onUpdated(() => {
    data_details.item = props.house_detail
})
const VITE_APP_FOLDER_SRC = import.meta.env.VITE_APP_FOLDER_SRC
// 产权信息弹窗默认显示产权信息
const activeName = ref('first')
// const houseDetailsFunc = row => {
//     data_details.item = row
//     drawer.value = true
// }
// 添加
const switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'addition': {}
    }
})
// 添加修改表单错误信息
const from_error = reactive({
    msg: {}
})
const str_title = ref('添加')
// 修改房屋，调用父组件的方法
const modifyEmitFunc = () => {
    emit('emitFunc',data_details.item.id);
}
const from_error_property = reactive({
    msg: {}
})
// 产权
const switch_property = ref(false)
const property_obj = reactive({
    obj: {}
})
const property_form = reactive({
    obj: {}
})
const copy_property = reactive({
    obj: {}
})
// 查看状态
const read_state = ref(true)
const add_state = ref(false)
// 显示产权信息
const showPropertyFunc = () => {
    from_error_property.msg = {}
    property_obj.obj = JSON.parse(JSON.stringify(data_details.item))
    if (property_obj.obj.curr_property) {
        APIgetPropertyDetails(property_obj.obj.curr_property.id).then(res => {
            // 遍历附件加上图片服务器地址前缀
            if (res.affix) {
                for (let i in res.affix.bdcz) {
                    res.affix.bdcz[i] = VITE_APP_FOLDER_SRC + res.affix.bdcz[i]
                }
            }
            res.owners.map(item => {
                if (item.affix) {
                    for (let i in item.affix.sfz) {
                        item.affix.sfz[i] = VITE_APP_FOLDER_SRC + item.affix.sfz[i]
                    }
                }
            })
            console.log("res", res)
            property_form.obj = res
            copy_property.obj = JSON.parse(JSON.stringify(res))

        })
    } else {
        property_form.obj = { house_id: property_obj.obj.id }
        copy_property.obj = { house_id: property_obj.obj.id }
    }
    read_state.value = true
    switch_property.value = true
}

const house_id = ref('')
// 显示随住人员
const showNumbersFunc = () => {
    house_id.value = data_details.item.id
    getHouseNumbersFunc()
}

const houseNumbers_list = reactive({
    arr: []
})
const loading_tab = ref(true)
const switch_numbers = ref(false)
// 获取房屋成员
const getHouseNumbersFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        hid: house_id.value
    }
    loading_tab.value = true
    APIgetHouseNumbersSort(params).then(res => {
        houseNumbers_list.arr = res
        loading_tab.value = false
        switch_numbers.value = true
    })
}

// 变更产权
const modifyPropertyFunc = val => {
    if (val) {
        from_error_property.msg = {}
        property_form.obj = {
            owners: [],
            house_id: copy_property.obj.house_id,
            should_bind_house: 1
        }
        read_state.value = false
        add_state.value = true
    } else {
        from_error_property.msg = {}
        property_form.obj = JSON.parse(JSON.stringify(copy_property.obj))
        read_state.value = false
        add_state.value = false
    }
}
// 取消产权变更
const modifycancel = () => {
    read_state.value = true
    add_state.value = false
    property_form.obj = JSON.parse(JSON.stringify(copy_property.obj))
}
// 同意拒绝提交
const file_list = ref([])
const file_list_1 = ref([])
const postPropertyFunc = () => {
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
    for (let key in property_form.obj) {
        if (property_form.obj[key] !== null) {
            if (property_form.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (property_form.obj[key] !== 0 || property_form.obj[key] !== false)) {
                delete property_form.obj[key]
            }
        }
    }
    if (files.length > 0) {
        getFilesKeys(files, 'property').then(arr => {
            // affix为null
            property_form.obj.affix = { bdcz: [] }
            property_form.obj.affix.bdcz = arr
            // console.log("aaaa",files,arr)
        })
    }
    // 遍历处理不同产权人的身份证附件信息
    for (let j in file_list_1.value) {
        let files_1 = []
        files_1[j] = []
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
                property_form.obj.owners[j].affix = { sfz: [] }
                property_form.obj.owners[j].affix.sfz = arr
            })
        }
    }
    from_error_property.msg = {}
    setTimeout(() => {
        if (!add_state.value) {
            APIputProperty(property_form.obj.id, property_form.obj).then(res => {
                // refreshFunc()
                ElMessage.success('修改成功')
                switch_property.value = false
            }, err => {
                console.log(err)
            })
        } else {
            APIpostProperty(property_form.obj).then(res => {
                // refreshFunc()
                ElMessage.success('添加成功')
                switch_property.value = false
            }).catch(err => {
                from_error_property.msg = err.data
            })
        }
    }, 700)
}

const switch_houseNumber = ref(false)
const number = reactive({
    item: {}
})
// 添加成员
const addHouseNumberFunc = () => {
    switch_houseNumber.value = true
    number.item = {}
}

const flag = ref(false)
// 提交添加成员
const dialogExamineCloseFunc_1 = () => {
    if (flag.value == true) {
        APIputPersonnelManage(number.item.id, number.item).then(res => {
            getHouseNumbersFunc()
        })
    } else {
        APIpostPersonnelManage(number.item).then(res => {
            getHouseNumbersFunc()
        })
    }
    number.item.hid = house_id.value
    APIpostHouseNumbers(number.item).then(res => {
        ElMessage.success('添加成功')
        getHouseNumbersFunc()
    }).catch(err => {
        ElMessage.error('添加失败')
    })
    switch_houseNumber.value = false
}

const number_ids = reactive({
    arr: []
})
const handleSelectionChange = val => {
    console.log("val", val)
    let number_id = []
    val.forEach(function (value, index, array) {
        number_id.push(value.id)
        number_ids.arr = number_id
    })
}

// 删除成员
const deleteFunc_2 = () => {
    APIdeleteHouseNumbers({ data: { ids: number_ids.arr } }).then(res => {
        ElMessage.success('删除成功')
        getHouseNumbersFunc()
    })
}
// 身份证号输入框失去焦点事件
const blurIbCard = () => {
    if (number.item.id_card) {
        let params = {
            page: 1,
            per_page: 500
        }
        if (number.item.id_card) {
            params.id_card = number.item.id_card
        } else {
            params = {}
        }
        APIgetPersonnelManageList(params).then(res => {
            if (res.length > 0) {
                flag.value = true
                number.item = res[0]
                // number.item=
            } else {
                flag.value = false
            }
        })
    }
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
    if (!property_form.obj.owners) {
        property_form.obj.owners = []
    }
    property_form.obj.owners.push(data)
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    property_form.obj.owners.splice(index, 1)
}
// 配置项
const opts_all = reactive({
    obj: {}
})
getOpts(['status_all', 'gender', 'type_id_card', 'houseable_type', 'house_has_house', 'house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_status_plan_fact']).then(res => {
    opts_all.obj = res
    console.log("opts_all.obj",opts_all.obj.type_id_card)
})
</script>

<style lang="scss">
.components-house {
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
            // margin: 0;
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
    .property-read-state {
        .el-form-item {
            margin: 0;
        }
    }
}
.table_td {
    color: #72767b;
}
.table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #efefef;
    font-size: 14px;
}
table tr td {
    padding: 10px;
}
</style>
