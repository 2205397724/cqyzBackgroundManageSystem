<template>
    <div>
        <!-- 导出列表 -->
        <el-dialog v-model="switch_files_list_house" title="导出" width="70%">
            <div style="display: flex; flex-wrap: wrap;">
                <el-button class="head-btn" @click="refreshFilesListFunc">刷新</el-button>
                <el-button class="head-btn" type="success" @click="switch_files = true">{{str_title}}</el-button>
            </div>
            <el-table :data="files_tab.arr"
                :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }"
                style="width: 100%;min-height: 300px;margin-bottom: 10px;border: 1px solid #ebeef5;border-radius: 6px;"
                max-height="400">
                <el-table-column prop="title" label="任务名称" />
                <el-table-column prop="uid" label="用户id" />
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 10" class="btnNone" type="warning" size="small">{{
                                getOptVal(opts_all.obj.status_all, scope.row.status)
                        }} </el-tag>
                        <el-tag v-show="scope.row.status == 15" class="btnNone" type="primary" size="small">{{
                                getOptVal(opts_all.obj.status_all, scope.row.status)
                        }} </el-tag>
                        <el-tag v-show="scope.row.status == 20" class="btnNone" type="success" size="small">{{
                                getOptVal(opts_all.obj.status_all, scope.row.status)
                        }} </el-tag>
                        <el-tag v-show="scope.row.status == 30" class="btnNone" type="danger" size="small">{{
                                getOptVal(opts_all.obj.status_all, scope.row.status)
                        }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="导出时间" width="170" />
                <el-table-column prop="updated_at" label="更新时间" width="170" />
                <el-table-column fixed="right" label="操作" width="160">
                    <template #default="scope">
                        <el-button
                            type="primary" class="btnfix"
                            @click="downloadFile(scope.row.content)"
                            v-if="(scope.row.status === 20)"
                        >
                            下载
                        </el-button>
                        <el-popconfirm
                            title="确定要删除当前导出任务么?"
                            @confirm="deleteTaskFunc(scope.row.id)"
                        >
                            <template #reference>
                                <el-button type="danger" class="btnfix">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 导出表单 -->
        <el-dialog v-model="switch_files" :title="str_title" width="50%">
            <div>
                <el-form :model="files_obj.obj">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item label="任务名称" prop="title" label-width="120px">
                                <el-input v-model="files_obj.obj.title" placeholder="" />
                            </el-form-item>
                            <div v-if="type === 1">
                                <el-form-item label="是否启用人员标签过滤" prop="title" label-width="auto">
                                    <el-switch v-model="files_obj.obj.p_tag_open" @change="changeStatus"/>
                                </el-form-item>
                                <div v-show="files_obj.obj.p_tag_open">
                                    <el-form-item label="标签关系" prop="title" label-width="120px">
                                        <el-radio-group v-model="files_obj.obj.p_tag_andor" class="ml-4">
                                            <el-radio label="AND" size="large">同时满足</el-radio>
                                            <el-radio label="OR" size="large">部分满足</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="过滤标签" prop="title" label-width="120px">
                                        <el-checkbox-group v-model="files_obj.obj.p_tag" size="small" @change="changeTag">
                                            <span v-for="item in tag_list.arr" :key="item.id">
                                                <el-checkbox :label="item.name" class="m-l-10"/>
                                            </span>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_files = false">取消</el-button>
                    <el-button type="primary" @click="filesUpFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="ExportHouse">
import { reactive, ref, defineProps} from 'vue'
import { ElMessage } from 'element-plus'
import {
    APIgetExportTask,
    APIgetExportTaskDetail,
    APIdeleteExportTask,
    APIpostTaskSurvey,
    APIpostTastGenHouse,
    APIgetPersonnelLabels
} from '@/api/custom/custom.js'
import { getOpts, getOptVal } from '@/util/opts.js'

const props = defineProps(['type','sid','tgt_type','tgt_id','switch_files_list_house'])
const { type, sid, switch_files_list_house, tgt_id, tgt_type } = toRefs(props)
// 导出未参与房屋
// const switch_files_list_house = ref(false)
const files_tab = reactive({
    arr: []
})
const str_title = ref('')
onMounted(() => {
    if(type.value === 1) {
        str_title.value = '生成房屋导出任务'
    }else {
        str_title.value = '生成未参与房屋'
    }
    refreshFilesListFunc()
})
const refreshFilesListFunc = () => {
    let params = {
        type:type.value,
        uid:localStorage.getItem('uid')
    }
    APIgetExportTask(params).then(res=>{
        files_tab.arr = res
    })
    files_obj.obj.title = ''
    files_obj.obj.p_tag_open = false
    files_obj.obj.p_tag_andor = ''
    files_obj.obj.p_tag = []
}
// 打开导出未参与房屋from
const switch_files = ref(false)
const files_obj = reactive({
    obj: {
        title:'',
        sid:sid,
        tgt_type:tgt_type.value,
        tgt_id:tgt_id.value,
        p_tag_open:false,
        p_tag_andor:'',
        p_tag:[]
    }
})
// 提交执行导出任务
const filesUpFunc = () => {
    if(type.value === 1) {
        // 通用房屋导出
        if(files_obj.obj.p_tag_open) {
            files_obj.obj.p_tag_open = 1
        }else {
            files_obj.obj.p_tag_open = 0
        }
        APIpostTastGenHouse(files_obj.obj).then(res=>{
            ElMessage.success('导出成功')
            switch_files.value = false
            refreshFilesListFunc()
        })
    }else if(type.value === 2) {
        APIpostTaskSurvey(files_obj.obj).then(res=>{
            ElMessage.success('导出成功')
            switch_files.value = false
            refreshFilesListFunc()
        })
    }
}
// 下载未参与房屋数据
const downloadFile = (content) => {
    window.location.href = import.meta.env.VITE_APP_FOLDER_SRC + content
}
// 删除下载任务
const deleteTaskFunc = (id) => {
    APIdeleteExportTask(id).then(res=>{
        ElMessage.success('删除成功')
        refreshFilesListFunc()
    })
}
const tag_list = reactive({
    arr:[]
})
// 标签过滤开关的变化
const changeStatus = () => {
    if(tag_list.arr.length === 0) {
        APIgetPersonnelLabels({type:1}).then(res=>{
            tag_list.arr = res
        })
    }
}
// 过滤标签的变化
const changeTag = (e) => {
    files_obj.obj.p_tag = e
}
// 配置项
const opts_all = reactive({
    obj: {}
})
getOpts(['status_all']).then(res => {
    opts_all.obj = res
})
</script>

<style lang="scss" scoped>
// scss
</style>
