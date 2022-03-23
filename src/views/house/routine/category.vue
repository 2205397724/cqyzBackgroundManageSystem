<template>
    <div class="routine-category">
        <page-main>
            <div>
                <div style="margin-bottom: 20px;margin-left: 0;">
                    <el-button class="head-btn" type="primary">添加分类</el-button>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        :data="data.table_list"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%" border
                    >
                        <el-table-column prop="type" label="配置类别" width="400" />
                        <el-table-column prop="choice" label="类型" width="90" />
                        <el-table-column prop="state" label="状态" width="90" />
                        <!-- <el-table-column fixed="right" label="操作" width="140">
                            <template #default>
                                <el-button type="success" size="small">产权</el-button>
                                <el-button type="primary" size="small">修改</el-button>
                            </template>
                        </el-table-column> -->
                        <el-table-column />
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="data.pagination.current_page" layout="total,prev,pager,next,jumper,"
                        :total="data.pagination.total" :page-size="data.pagination.page_size"
                        background hide-on-single-page
                    />
                </div>
            </div>
        </page-main>
    </div>
</template>
<script setup>
import {
    reactive
} from 'vue'
const data = reactive({
    table_list: '',
    pagination: {
        total: 150,
        page_size: 15,
        current_page: 2
    }
})
// 表格
data.table_list = [{
                       type: '房屋类型',
                       choice: '单选',
                       state: 1
                   },
                   {
                       type: '房屋特色',
                       choice: '单选',
                       state: 1
                   },
                   {
                       type: '装修程度',
                       choice: '单选',
                       state: 1
                   }
]
</script>
<style lang="scss" scoped>
    .routine-category {

        .bottom-btn-box-2 {
            margin-bottom: 10px;

            .head-btn {
                // width: 100%;

            }
        }

    }
</style>
