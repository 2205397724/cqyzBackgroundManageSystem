<template>
    <div>
        <page-main>
            <div class="m-b-20">
                <el-button

                    type="primary"
                    :icon="Plus"
                    size="large"
                    @click="addRecordKind"
                >
                    添加分类
                </el-button>
            </div>
            <!-- <div class="search m-t-10">
        <el-row>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="searchKey">
            <div>关键字</div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="m-r-10">
            <el-input
              v-model="data_1.search.kind"
              placeholder="名称"
              clearable
            />
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
            <Cascaders v-model="data_1.search.china_code" />
          </el-col>
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="m-l-10">
            <el-select
              v-model="data_1.search.status"
              clearable
              placeholder="状态"
            >
              <el-option
                v-for="item in opts_all.obj.information_status"
                :key="item.key"
                :label="item.val"
                :value="item.key"
              />
            </el-select>
          </el-col>
        </el-row>
        <br />
        <el-button
          class="m-l-20"
          type="primary"
          :icon="Search"
          @click="
            () => {
              data_1.switch_search = true;
              data_1.page = 1;
              getFunRecordKindList();
            }
          "
        >
          筛选
        </el-button>
      </div> -->
            <!-- <div v-show="data_1.switch_search" style="margin-bottom: 10px;">
                <el-button
                    style="margin-right: 10px;"
                    type="primary"
                    @click="refreshFunc()"
                >
                    重置
                </el-button>
                *搜索到相关结果共{{ data_1.total }}条。
            </div> -->
            <el-table
                :data="recordKindList.arr"
                row-key="id"
                :header-cell-style="{
                    background: '#fbfbfb',
                    color: '#999999',
                    'font-size': '12px',
                }"
                class="tab_1"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column label="分类名称" prop="name" width="220" />
                <el-table-column label="级别">
                    <template #default="scope">
                        <el-tag :type="level_tag_type(scope.row.level)">{{ level_number_chiese(scope.row.level) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="排序">
                    <template #default="scope">
                        <span>{{ scope.row.sort }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template #default="scope">
                        <el-button size="small" type="success" @click="add_record_type(scope.row)">
                            添加子分类
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click="putRecordKind(scope.row)"
                        >
                            修改
                        </el-button>
                        <!-- <el-link :underline="false" type="primary">
                            <router-link class="el-button details" :to="{name: 'complaintDetails',query:{ id : scope.row.id }}">详情</router-link>
                        </el-link> -->

                        <el-popconfirm
                            title="确定要删除当前项么?"
                            cancel-button-type="info"
                            @confirm="deleteRecordKind(scope.row)"
                        >
                            <template #reference>
                                <el-button type="danger" size="small"> 删除 </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
                <el-table-column />
            </el-table>
            <!--   <el-pagination
                v-model:current-page="data_1.page"
                style="padding-top: 20px;"
                layout="total,prev,pager,next,jumper,"
                :total="data_1.total"
                :page-size="data_1.per_page"
                background
                hide-on-single-page
            /> -->
        </page-main>
        <!-- 添加dialog -->
        <el-dialog v-model="switch_add_recordKind" :title="add_put_title" width="30%" @close="add_dialog_close">
            <el-form ref="ruleFormRef" :model="from_record.item">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label-width="85px" prop="name" label="分类名称">
                            <el-input v-model="from_record.item.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="add_put_title=='添加'||from_record.item.pid" :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label-width="85px" label="上级分类ID">
                            <el-input v-model="from_record.item.pid" placeholder="可不填(一级)" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label-width="85px" label="排序">
                            <el-input
                                v-model="from_record.item.sort"
                                placeholder="可不填(0)"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="submit_post_put">确认</el-button>
            </template>
        </el-dialog>
        <!-- 添加子类别 -->
        <el-dialog v-model="switch_add_recordKind_children" width="30%" title="添加子分类">
            <el-form :model="from_record_children.item">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="子分类名称" prop="name" label-width="110px">
                            <el-input v-model="from_record_children.item.name" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="排序" prop="sort" label-width="110px">
                            <el-input v-model="from_record_children.item.sort" placeholder="可不填(0)" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="submit_post_put_children">
                    确认
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
    APIgetRecordList,
    APIpostRecord,
    APIputRecord,
    APIdeleteRecord,
    APIgetRecordDetail,
    APIpostkind,
    APIgetKindList,
    APIputKind,
    APIdeleteKind
} from '@/api/custom/custom'
import { ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
const page = ref(1)
const per_page = ref(10)
const recordList = reactive({
    arr: []
})
const switch_add_recordKind_children = ref(false)
const from_record_children = reactive({
    item: {
        name: '',
        pid: ''
    }
})
const switch_add_recordKind = ref(false)
const refreshPage = () => {
    page.value = 1
    per_page.value = 10
    getTypeList()
}
const data_1 = reactive({
    search: {},
    switch_search: false,
    page: 1,
    total: 0,
    per_page: 15,
    add_switch: false
})
const from_record = reactive({
    item: {}
})
const add_put_title = ref('')
const addRecordKind = () => {
    switch_add_recordKind.value = true
    add_put_title.value = '添加'
}
const recordKindList = reactive({
    arr: []
})
// 根据level转换tag的type
const level_tag_type = val => {
    switch (val) {
        case 1:
            return ''
            break
        case 2:
            return 'success'
            break
        case 3:
            return 'info'
            break
        case 4:
            return 'danger'
            break
        case 5:
            return 'warning'
            break
    }
}
// 级别数字变为中文
const level_number_chiese = val => {
    switch (val) {
        case 1:
            return '一级'
            break
        case 2:
            return '二级'
            break
        case 3:
            return '三级'
            break
        case 4:
            return '四级'
            break
        case 5:
            return '四级'
            break
    }
}
// 关闭dialog ，清除表单
const add_dialog_close = () => {
    from_record.item.name = ''
    from_record.item.pid = ''
}
// 添加备案子类型
const add_record_type = val => {
    switch_add_recordKind_children.value = true
    from_record_children.item.pid = val.id
    add_put_title.value == '添加'
}
const submit_post_put_children = () => {
    APIpostkind('filing', from_record_children.item).then(res => {
        if (res.status == 200) {
            ElMessage.success('添加子备案类型成功')
        }
    })
}
// 筛选按钮
const getFunRecordKindList = () => {
    let data = {
    // page: data_1.page,
    // per_page: data_1.per_page
    }
    for (let key in data_1.search) {
        let item = data_1.search[key]
        if (item || item === 0) {
            data[key] = item
        }
    }
    console.log(data)
    APIgetKindList('filing', data).then(res => {
        console.log(res)
        data_1.total = res.length
        data_1.list = res
    })
}
// switch按钮方法
const switchRecordFun = val => {
    if (val.status == 1) {
        val.status = 0
        APIputRecord(val.id, val).then(res => {
            if ((res = 200)) {
                ElMessage.success('修改成功')
            }
        })
    }
    if (val.status == 0) {
        val.status = 1
        APIputRecord(val.id, val).then(res => {
            if ((res = 200)) {
                ElMessage.success('修改成功')
            }
        })
    }
}
// 删除分类
const deleteRecordKind = val => {
    APIdeleteKind('filing', val.id).then(res => {
        ElMessage.success('删除成功')
    })
}
// 得到分类列表
const getTypeList = () => {
    APIgetKindList('filing').then(res => {
        console.log(res)
        recordKindList.arr = res
    })
}
// 修改备案分类
const putRecordKind = val => {
    switch_add_recordKind.value = true
    add_put_title.value = '修改'
    from_record.item.name = val.name
    from_record.item.pid = val.pid
    current_recordKind.item = val
}
const current_recordKind = reactive({
    item: {}
})
// 添加修改确认按钮
const submit_post_put = () => {
    for (let key in from_record.item) {
        if (from_record.item[key] !== null) {
            if (from_record.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_record.item[key] !== 0 || from_record.item[key] !== false)) {
                delete from_record.item[key]
            }
        }
    }
    if (add_put_title.value == '修改') {
        APIputKind('filing', current_recordKind.item.id, from_record.item).then(
            res => {
                ElMessage.success('修改成功')
                switch_add_recordKind.value = false
                refreshPage()
            }
        )
    }
    if (add_put_title.value == '添加') {
        APIpostkind('filing', from_record.item).then(res => {
            console.log(res)
            ElMessage.success('添加成功')
            switch_add_recordKind.value = false
            switch_add_recordKind_children.value = false
            refreshPage()
        })
    }
}
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['information_status']).then(res => {
    opts_all.obj = res
})
refreshPage()
</script>

<style scoped lang="scss">
.search {
    background-color: #fafafa;
    height: 150px;
    width: 100%;
    padding: 20px;
    margin-bottom: 15px;
}
.searchKey {
    text-align: center;
    margin-top: 5px;
}
.searchSele {
    margin: 10px 0 0 15px;
}
</style>
