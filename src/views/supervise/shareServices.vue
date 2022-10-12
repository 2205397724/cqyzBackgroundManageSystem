<template>
    <div>
        <page-main class="hidden">
            <el-button-group class="btn m-b-20">
                <!-- <el-badge :value="index == 0 ? total : ''" class="item" :hidden="flag"> -->
                <el-button :type="index == 0 ? 'primary' : ''" @click="StatusFunk(0)">全部</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 10 ? total : ''" class="item" :hidden="flag1"> -->
                <el-button :type="index == 10 ? 'primary' : ''" @click="StatusFunk(10)">待补充资料</el-button>
                <!-- </el-badge> -->
                <!-- <el-badge :value="index == 20 ? total : ''" class="item" :hidden="flag2"> -->
                <el-button :type="index == 20 ? 'primary' : ''" @click="StatusFunk(20)">共享结束</el-button>
                <!-- </el-badge> -->
            </el-button-group>

            <el-table
                v-loading="loading_tab"
                :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                class="tab_1"
            >
                <el-table-column prop="id" label="业务编号">
                    <template #default="scope">
                        <span>{{ scope.row.auditable?.title ? scope.row.auditable?.title:scope.row.auditable?.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.tgt_type }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="相关单位">
                    <template #default="scope">
                        <span>{{ scope.row.reply }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="状态" align="center">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status== 10" type="warning" effect="dark" size="small" @click="examineListFunc(scope.row)">
                            未处理
                        </el-tag>
                        <el-tag v-if="scope.row.status == 20" type="success" size="small">
                            审核通过
                        </el-tag>
                        <el-tag v-if="scope.row.status == 30" type="danger" size="small">
                            审核失败
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="结束时间">
                    <template #default="scope">
                        <span>{{ scope.row.reply }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                    <template #default="scope">
                        <el-button
                            type="success" size="small"
                            @click="examineListFunc(scope.row)"
                        >
                            补充材料
                        </el-button>
                        <el-button
                            type="primary" size="small"
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
    APIgetListArchiveAudit,
    APIputArchiveAudit,
    APIgetDetailsArchiveAudit
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
import { Search, Plus, Loading } from '@element-plus/icons-vue'
const loading_tab = ref(false)
const data = reactive({
    list: []
})
const index = ref(0)
const flag = ref(true)
const flag1 = ref(true)
const flag2 = ref(true)
const page = ref(1)
const StatusFunk = val => {
    page.value = 1
    index.value = val
    getShareServicesList()
    flag.value = false
    flag1.value = false
    flag2.value = false
    console.log(flag.value)
}
const getShareServicesList = () => {
    console.log('a')
}
</script>
<style lang="scss" scoped>
.btn button {
    padding: 20px 40px;
}
</style>
