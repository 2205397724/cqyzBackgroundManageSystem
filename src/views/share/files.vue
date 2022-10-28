<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">
                    添加要件
                </el-button>
            </div>
            <el-table
                v-loading="loading_tab" :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
            >
                <el-table-column prop="id" label="要件名称">
                    <template #default="scope">
                        <span>{{ scope.row.title }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="状态" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.desc }} </span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="type" label="要件类型">
                    <template #default="scope">
                        <span v-if="scope.row.type == 1">文本</span>
                        <span v-if="scope.row.type == 2">图片</span>
                        <span v-if="scope.row.type == 3">文件</span>
                        <span v-if="scope.row.type == 4">签字</span>
                    </template>
                </el-table-column>
                <el-table-column prop="src" label="要件来源">
                    <template #default="scope">
                        <span v-if="scope.row.src == 1">用户上传 </span>
                        <span v-if="scope.row.src == 2">不动产登记中心</span>
                    </template>
                </el-table-column>
                <el-table-column prop="src_sys" label="来源类型">
                    <template #default="scope">
                        <span v-if="scope.row.src_sys == 1">身份证 </span>
                        <span v-if="scope.row.src_sys == 2">不动产权证</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="examineListFunc(scope.row)">
                            修改
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
            <!-- 修改添加 -->
            <el-dialog v-model="data.switch" :title="str_title" width="50%">
                <div>
                    <el-form ref="ruleFormRef" :model="data.obj">
                        <el-row :gutter="10">
                            <el-col :md="24" :lg="12">
                                <el-form-item
                                    label="要件名称" label-width="140px"
                                    :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                                >
                                    <el-input v-model="data.obj.title" placeholder="" />
                                <!-- <el-input
                                    v-model="data.obj.logo"
                                    placeholder=""
                                /> -->
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24">
                                <el-form-item
                                    label-width="140px" label="要件类型"
                                >
                                    <el-radio-group v-model="data.obj.type" class="ml-4">
                                        <el-radio label="1">文本</el-radio>
                                        <el-radio label="2">图片</el-radio>
                                        <el-radio label="3">文件</el-radio>
                                        <el-radio label="4">签字</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="data.obj.type == '2'" :xs="24" :sm="24">
                                <el-form-item
                                    label-width="140px" label="是否需要正反两面" style="text-align: left;"
                                >
                                    <el-radio-group v-model="data.obj.is_two_side" class="ml-4">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="0">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24">
                                <el-form-item label-width="140px" label="要件来源">
                                    <el-radio-group v-model="data.obj.src" class="ml-4">
                                        <el-radio label="1">用户上传</el-radio>
                                        <el-radio label="2">不动产登记中心提供</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="data.obj.src == '2'" :xs="24" :sm="24">
                                <el-form-item label-width="140px" label="来源类型">
                                    <el-radio-group v-model="data.obj.src_sys" class="ml-4">
                                        <el-radio label="1">身份证</el-radio>
                                        <el-radio label="2">不动产权证</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :md="24" :lg="24">
                                <el-form-item
                                    label="简介"
                                    label-width="140px"
                                >
                                    <el-input
                                        v-model="data.obj.desc"
                                        :autosize="{ minRows: 2, maxRows: 6 }"
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
                        <el-button @click="data.switch=false">取消</el-button>
                        <el-button type="primary" @click="postFunc">确定</el-button>
                    </div>
                </template>
            </el-dialog>
        </page-main>
    </div>
</template>
<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetShareElementsList,
    APIdeleteShareElements,
    APIputShareElements,
    APIpostShareElements
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const loading_tab = ref(false)
const data = reactive({
    list: [],
    switch: false,
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const page = ref(1)
const per_page = ref(15)
const str_title = ref('添加要件')
const getShareElementsList = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    loading_tab.value = true
    APIgetShareElementsList(params).then(res => {
        console.log(res)
        data.list = res
        loading_tab.value = false
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
// 监听分页
watch(page, () => {
    getShareElementsList()
})
const refreshFunc = () => {
    getShareElementsList()
}
refreshFunc()
const addResidentialFunc = () => {
    data.obj = {}
    str_title.value = '添加要件'
    data.switch = true
}

// 同意拒绝提交
const postFunc = () => {
    // console.log(formEl)
    // from_error.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    for (let key in data.obj) {
        if (data.obj[key] !== null) {
            if (data.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (data.obj[key] !== 0 || data.obj[key] !== false)) {
                delete data.obj[key]
            }
        }
    }
    if (str_title.value == '修改要件') {
        console.log(data.obj)
        APIputShareElements(data.obj.id, data.obj).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            data.switch = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostShareElements(data.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            data.switch = false
        }).catch(() => {
            ElMessage.error('添加失败')
        })
    }
    //     } else {
    //         return false
    //     }
    // })
}
const examineListFunc = val => {
    str_title.value = '修改要件'
    data.switch = true
    val.type = val.type + ''
    val.is_two_side = val.is_two_side + ''
    val.src = val.src + ''
    val.src_sys = val.src_sys + ''
    data.obj = val
}
const deleteFunc = val => {
    APIdeleteShareElements(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const addRelatedMaterialFunc = id => {

}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['flow_active', 'card_type']).then(res => {
    opts_all.obj = res
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.btn button {
    padding: 20px 40px;
}
</style>
