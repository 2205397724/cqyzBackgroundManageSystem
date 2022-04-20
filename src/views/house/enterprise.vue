<template>
    <div class="keep-on-record">
        <page-main class="tit-box-box">
            <div class="tit-box" :class="{'on':!search_str.obj.tit_on}" @click="search_str.obj.tit_on=''">
                <div class="tit">
                    <div>企业备案</div>
                </div>
            </div>
            <div class="tit-box" :class="{'on':search_str.obj.tit_on==1}" @click="search_str.obj.tit_on=1">
                <div class="tit">待审备案</div>
                <div v-if="total" class="tips">{{ total }}</div>
            </div>
        </page-main>
        <page-main>
            <div style="margin-bottom: 10px;">
                <Cascaders v-model="search_str.obj.china_code" style="margin-bottom: 10px;margin-right: 10px;width: 200px;" />
                <el-input v-model="search_str.obj.keyword" style="margin-bottom: 10px;margin-right: 10px;width: 200px;" placeholder="关键字" clearable />
                <el-button style="margin-bottom: 10px;margin-right: 10px;" type="primary" @click="searchFunc">搜索</el-button>
            </div>
            <div v-show="switch_search" style="color: #aaa; font-size: 14px; margin-bottom: 10px;">
                <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                *搜索到相关结果共{{ total }}条。
            </div>
            <!-- <div style="margin-bottom: 10px;">
                <el-button type="primary" @click="addFunc">添加企业</el-button>
            </div> -->
            <el-table
                :data="from_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;"
            >
                <el-table-column prop="name" label="企业名称" width="180" />
                <el-table-column prop="user_id" label="user_id" width="250" />
                <el-table-column prop="social_code" label="社会责任代码" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.social_code }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="企业类型" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ getOptVal(opts_all.obj.enterprise_type,scope.row.type) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="logo" label="企业图标" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.logo }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="legal" label="legal" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.legal }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="contact" label="联系方式" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.contact }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="简介" width="140">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ scope.row.desc }} </span>
                    </template>
                </el-table-column>
                <el-table-column />
                <el-table-column fixed="right" label="操作" width="200">
                    <template #default="scope">
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
                style="padding-top: 20px;"
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_add"
            :title="str_title"
            width="50%"
        >
            <div>
                <el-form
                    :model="from_add.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="logo"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.logo"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="联系方式"
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
                                :error="err_add.obj&&err_add.obj.desc?err_add.obj.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.desc"
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
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
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
                    <div class="left">user_id</div>
                    <div class="right">{{ details_item.obj.user_id }} </div>
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
                    <div class="right">{{ details_item.obj.logo }} </div>
                </div>
                <div class="item">
                    <div class="left">legal</div>
                    <div class="right">{{ details_item.obj.legal }} </div>
                </div>
                <div class="item">
                    <div class="left">联系方式</div>
                    <div class="right">{{ details_item.obj.contact }} </div>
                </div>
                <div class="item">
                    <div class="left">简介</div>
                    <div class="right">{{ details_item.obj.desc }} </div>
                </div>
                <div class="item">
                    <div class="left">extra</div>
                    <div class="right">{{ details_item.obj.extra }} </div>
                </div>
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
    </div>
</template>
<script setup>
import Cascaders from '@/components/Cascaders/index.vue'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
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
const from_tab = reactive({
    arr: []
})

import {
    APIgetEnterpriseList,
    APIgetEnterpriseDetails,
    APIdeleteEnterprise,
    APIputEnterprise
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
        if (res.code === 0) {
            loading_tab.value = false
            from_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
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
// 添加
const addFunc = () => {
    from_add.obj = {}
    err_add.obj = {}
    str_title.value = '添加'
    switch_add.value = true
}
const modifyFunc = val => {
    from_add.obj = val
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
        details_item.obj = res.data
        switch_details.value = true
    })
}
const deleteFunc = val => {
    APIdeleteEnterprise(val.id).then(res => {
        refreshFunc()
        ElMessage.success(res.msg)
    })
}
// 提交
const postFunc = () => {
    if (str_title.value == '添加') {
        // APIpostEnterprise(from_add.obj).then(res => {
        //     refreshFunc()
        //     ElMessage.success(res.msg)
        //     switch_add.value = false
        // }).catch(err => {
        //     err_add.obj = err.data
        // })
    } else if (str_title.value == '修改') {
        APIputEnterprise(from_add.obj.id, from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success(res.msg)
            switch_add.value = false
        }).catch(err => {
            err_add.obj = err.data
        })
    }
}
refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['enterprise_type']).then(res => {
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
					color: #FFFFFF;
					background-color: #e55055;
				}
			}

			.tit-box.on {
				border-bottom: 2px solid rgba(2, 167, 240, 1);
			}

			.tit-box:last-child {
				margin-right: 0;
			}
		}
	}

    // 详情样式
    .details-box {
    	.item {
    		display: flex;
    		color: #333;
    		font-size: 16px;
    		margin-bottom: 20px;
    		border-bottom: 1px solid #eee;
    		padding-bottom: 10px;

    		.left {
    			box-sizing: border-box;
    			width: 160px;
    			white-space: nowrap;
    			margin-right: 20px;
    			text-align: right;
    			font-weight: 600;
    		}

    		.left::after {
    			content: "：";
    		}

    		.right {
    			width: 100%;
    			color: #666;
    		}
    	}

    	.item:last-child {
    		border-style: none;
    	}
    }
</style>
