<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">
                    添加人员
                </el-button>
                <el-button class="m-l-20" :icon="Download" size="large" type="success" @click="getFilesFunc">人员导入</el-button>
            </div>
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                标签：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="person_tag_or" multiple class="search_tb" placeholder="请选择" clearable>
                                    <el-option v-for="(item,i) in personnelLabels.list" :key="item.id" :label="item.name" :value="item.name" />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20 m-l-20">
                        <el-row>
                            <el-button-group>
                                <el-button :type="!flag ? 'primary':''" @click="clickFeature_1">
                                    部分满足
                                </el-button>
                                <el-button :type="flag ? 'primary':''" @click="clickFeature">全部满足</el-button>
                            </el-button-group>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                姓名：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input
                                    v-model="search_str.obj.name" class="search_tb" placeholder="请输入姓名"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="8" class="search_th">
                                身份证号码：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="16">
                                <el-input
                                    v-model="search_str.obj.id_card" class="search_tb" placeholder="请输入身份证号码"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                电话：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input
                                    v-model="search_str.obj.mobile" class="search_tb" placeholder="请输入电话"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                        <el-button
                            v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading"
                            @click="refreshFunc"
                        >
                            重置
                        </el-button>
                        <span v-show="switch_search == true" class="size-base">
                            *共搜索到{{ total }}条。
                        </span>
                    </el-col>
                </el-row>
            </div>

            <el-table
                v-loading="loading_tab" :data="data.list"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}" class="tab_1"
            >
                <el-table-column prop="id" label="姓名">
                    <template #default="scope">
                        <span>{{ scope.row.name }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="身份证号" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.id_card }} </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="name" label="归档内容数量" width="180">
                    <span> {{ total2 }} </span>
                </el-table-column> -->

                <el-table-column prop="created_at" label="电话">
                    <template #default="scope">
                        <span>{{ scope.row.mobile }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="性别" align="center">
                    <template #default="scope">
                        <span>{{ getOptVal(opts_all.obj.gender,scope.row.gender) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="籍贯">
                    <template #default="scope">
                        <span>{{ scope.row.cc }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="职业">
                    <template #default="scope">
                        <span>{{ scope.row.job }} </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="280">
                    <template #default="scope">
                        <el-button type="success" size="small" @click="modifyFeatureFunc(scope.row)">
                            标签
                        </el-button>
                        <el-button type="primary" size="small" @click="modifyFunc(scope.row)">
                            修改
                        </el-button>
                        <el-button size="small" @click="detailsFunc(scope.row)">
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
            <el-pagination
                v-model:current-page="page" style="float: right;" layout="prev,next,jumper," :total="Infinity"
                :page-size="per_page" background prev-text="上一页" next-text="下一页" hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog v-model="switch_add" :title="str_title" width="60%" @closed="add_dialog_close">
            <div>
                <el-form ref="ruleFormRef" :model="from_add.obj">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="姓名" label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input v-model="from_add.obj.name" placeholder="" />
                                <!-- <el-input
                                    v-model="from_add.obj.logo"
                                    placeholder=""
                                /> -->
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="身份证号码" label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input v-model="from_add.obj.id_card" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="电话" label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-input v-model="from_add.obj.mobile" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="性别" label-width="100px"
                                :error="err_add.obj&&err_add.obj.user_id?err_add.obj.user_id[0]:''"
                            >
                                <el-select
                                    v-model="from_add.obj.gender" class="head-btn search_tb" placeholder="审核状态"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item,i) in opts_all.obj.gender" :key="item.key" :label="item.val"
                                        :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="籍贯" label-width="100px"
                                :error="err_add.obj&&err_add.obj.contact?err_add.obj.contact[0]:''"
                            >
                                <el-input v-model="from_add.obj.cc" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="职业" label-width="100px"
                                :error="err_add.obj&&err_add.obj.legal?err_add.obj.legal[0]:''"
                            >
                                <el-input v-model="from_add.obj.job" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="政治面貌" label-width="100px"
                                :error="err_add.obj&&err_add.obj.legal?err_add.obj.legal[0]:''"
                            >
                                <el-input v-model="from_add.obj.politics" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="出生日期" label-width="100px"
                                :error="err_add.obj&&err_add.obj.logo?err_add.obj.logo[0]:''"
                            >
                                <el-date-picker
                                    v-model="from_add.obj.birthday" type="datetime"
                                    value-format="YYYY-MM-DD" placeholder="" class="w-100"
                                    :default-value="new Date()"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注信息" label-width="100px"
                                :error="err_add.obj&&err_add.obj.desc?err_add.obj.desc[0]:''"
                            >
                                <el-input
                                    v-model="from_add.obj.desc" :autosize="{ minRows: 4, maxRows: 6 }"
                                    type="textarea" placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :md="24" :lg="24">
                            <div class="m-b-10 m-l-40">
                                <el-button type="primary" plain @click="addServiceFunc">添加自定义字段</el-button>
                            </div>
                            <div v-for="(item,i) in from_add.obj.extra" :key="i" class="serve-box">
                                <el-row :gutter="10" class="p-t-20">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="字段名" label-width="100px">
                                            <el-input
                                                v-model="item.lab"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item label="字段内容" label-width="100px">
                                            <el-input
                                                v-model="item.val"
                                                placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="delete-service" @click="deleteServiceFunc(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
                        </el-col> -->
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
        <el-dialog v-model="switch_details" title="详情" width="50%">
            <div class="details-box">
                <div class="item">
                    <div class="left">姓名</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">身份证号码</div>
                    <div class="right">{{ data_details.item.id_card }}</div>
                </div>
                <div class="item">
                    <div class="left">电话</div>
                    <div class="right">{{ data_details.item.mobile }}</div>
                </div>
                <div class="item">
                    <div class="left">性别</div>
                    <div class="right">{{ getOptVal(opts_all.obj.gender,data_details.item.gender) }}</div>
                </div>
                <div class="item">
                    <div class="left">籍贯</div>
                    <div class="right">{{ data_details.item.cc }}</div>
                </div>
                <div class="item">
                    <div class="left">职业</div>
                    <div class="right">{{ data_details.item.job }}</div>
                </div>
                <div class="item">
                    <div class="left">政治面貌</div>
                    <div class="right">{{ data_details.item.politics }}</div>
                </div>
                <div class="item">
                    <div class="left">出生日期</div>
                    <div class="right">{{ data_details.item.birthday }}</div>
                </div>
                <div class="item">
                    <div class="left">备注信息</div>
                    <div class="right">{{ data_details.item.birthday }}</div>
                </div>
                <div class="item">
                    <div class="left">人员id</div>
                    <div class="right">{{ data_details.item.id }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="switch_feature" :title="peopleName + '所属标签'" width="70%" destroy-on-close="true">
            <div style="height: 600px;">
                <div style="width: 50%;height: 600px; float: left;border-right: 1px solid #ccc;">
                    <div style="height: 20%; border-bottom: 1px solid #ccc;">
                        <div style="font-size: 12px; color: #bbb; margin-bottom: 15px;">已有标签</div>
                        <div v-for="item in tags.arr" :key="item.key" class="inline-block m-r-10 pointer">
                            <el-tag :type=" item.active == 1 ? 'success' : 'info'" size="large" @click="tagClick(item)">
                                {{ item.tag }}
                            </el-tag>
                        </div>
                    </div>
                    <div style="height: 80%;">
                        <div style="font-size: 12px; color: #bbb; margin: 14px 0 5px;">添加标签</div>
                        <!-- <el-scrollbar height="300px"> -->
                        <el-radio-group
                            v-for="(item,i) in personnelLabels.list" :key="i"
                            v-model="from_examine.item.tag"
                        >
                            <el-radio :label="item.name" border size="small" style="margin: 5px 10px 0 0;">{{ item.name }}</el-radio>
                        </el-radio-group>
                        <div style="margin-top: 30px;">
                            <el-form ref="ruleFormRef" :model="from_examine.item">
                                <el-row :gutter="10">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <el-form-item label="是否有效" label-width="73px">
                                            <el-switch
                                                v-model="from_examine.item.active" class="switch" inline-prompt
                                                style="

    --el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;" active-text="开启" inactive-text="关闭"
                                                :active-value="1" :inactive-value="0"
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                                        <el-form-item label="备注" label-width="73px">
                                            <el-input
                                                v-model="from_examine.item.desc"
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 6 }" placeholder=""
                                            />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="24" :lg="24">
                                        <el-form-item label="附件" prop="logo" label-width="73px">
                                            <el-upload
                                                action="***"
                                                :auto-upload="false"
                                                :file-list="file_list" :on-change="(file,files)=>{
                                                    file_list = files
                                                }" :on-remove="(file,files)=>{
                                                    file_list = files
                                                }"
                                            >
                                                <el-button type="primary" class="m-b-10">选择</el-button>
                                            </el-upload>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-button type="primary" style="position: absolute;right: 56%; bottom: 80px;" @click="addFeature">添加</el-button>
                        </div>

                        <!-- </el-scrollbar> -->
                    </div>
                </div>
                <div style="width: 50%;height: 600px; float: left;">
                    <div style="font-size: 12px; color: #bbb; margin: 0 0 15px 5px;">标签记录</div>
                    <div v-if="taglog.arr.length >0">
                        <el-scrollbar height="600px" width="400px">
                            <div class="m-l-10">
                                <el-timeline style="padding: 1px;">
                                    <el-timeline-item
                                        v-for="(item,index) in taglog.arr" :key="item.key"
                                        :timestamp="item.created_at" placement="top" :type="index == 0 ? 'primary' : ''"
                                    >
                                        <el-card>
                                            <div class="details-box">
                                                <div class="item">
                                                    <div class="left" style="width: 70px;">备注</div>
                                                    <div class="right">
                                                        <span>{{ item.desc }}</span>
                                                    </div>
                                                </div>
                                                <div v-if="item.affix && item.affix.length >= 1" class="item">
                                                    <div class="left" style="width: 70px;">附件</div>
                                                    <el-scrollbar width="300px">
                                                        <div class="right flx">
                                                            <div v-for="(val, i) in item.affix" :key="i" class="inline-block">
                                                                <el-image
                                                                    :preview-src-list="item.affixs"
                                                                    class="image m-r-10 m-l-10" :src="VITE_APP_FOLDER_SRC + val"
                                                                    fit="cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </el-scrollbar>
                                                </div>
                                                <div class="item">
                                                    <div class="left" style="width: 70px;">处理人</div>
                                                    <div class="right">
                                                        <span>{{ item.op_user?.name ? item.op_user?.name :item.op_user?.nickname ? item.op_user?.nickname :item.op_user?.username }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <template #footer>
                <el-button type="warning" plain @click="switch_feature = false">取消</el-button>
            </template>
        </el-dialog>
        <!-- 上传列表 -->
        <el-dialog
            v-model="switch_files_list"
            title="上传"
            width="70%"
        >
            <div style="display: flex; flex-wrap: wrap;">
                <el-button class="head-btn" @click="getFilesFunc">刷新</el-button>
                <el-button class="head-btn" type="success" @click="openFileFunc">导入人员</el-button>
                <el-popover
                    :width="220"
                    trigger="hover"
                    content="点击下载导入人员的模板文件"
                    effect="dark"
                >
                    <template #reference>
                        <el-link
                            class="head-btn"
                            :underline="false"
                            :href="VITE_APP_FOLDER_SRC+Record_key"
                            target="_blank"
                        >
                            <el-button>
                                <el-icon>
                                    <el-icon-download />
                                </el-icon>
                                下载导入示例
                            </el-button>
                        </el-link>
                    </template>
                </el-popover>
            </div>
            <el-table
                v-loading="files_loading"
                :data="files_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;margin-bottom: 10px;border: 1px solid #ebeef5;border-radius: 6px;"
                max-height="400"
            >
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="desc" label="备注" />
                <el-table-column prop="status" label="状态" width="100">
                    <template #default="scope">
                        <el-tag v-show="scope.row.status == 10" class="btnNone" type="warning" size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 15" class="btnNone" type="primary" size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 20" class="btnNone" type="success" size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status) }} </el-tag>
                        <el-tag v-show="scope.row.status == 30" class="btnNone" type="danger" size="small">{{ getOptVal(opts_all.obj.status_all,scope.row.status) }} </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="导入时间" width="170" />
                <el-table-column prop="updated_at" label="更新时间" width="170" />
            </el-table>
        </el-dialog>
        <!-- 上传表单 -->
        <el-dialog
            v-model="switch_files"
            title="上传"
            width="50%"
        >
            <div>
                <el-form
                    :model="files_obj.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="任务名称" prop="name" label-width="120px"
                                :error="err_files.obj&&err_files.obj.name?err_files.obj.name[0]:''"
                            >
                                <el-input
                                    v-model="files_obj.obj.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24">
                            <el-form-item
                                label="附件" prop="file_src" label-width="120px"
                                :error="err_files.obj&&err_files.obj.file_src?err_files.obj.file_src[0]:''"
                            >
                                <el-upload
                                    class="upload-demo"
                                    drag
                                    :show-file-list="false"
                                    :auto-upload="false"
                                    action="Fake Action"
                                    :on-change="fileChangeFunc"
                                >
                                    <el-icon class="el-icon--upload"><el-icon-upload-filled /></el-icon>
                                    <div class="el-upload__text">
                                        {{ upload_str }}
                                    </div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_files=false">取消</el-button>
                    <el-button type="primary" @click="filesUpFunc()">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup >
import {
    ref,
    reactive,
    watch
} from 'vue'
import {
    APIgetPersonnelManageList,
    APIputPersonnelManage,
    APIpostPersonnelManage,
    APIdeletePersonnelManage,
    APIgetPersonnelManageDetails,
    APIgetPersonnelLabels,
    APIpostPersonnelTag,
    APIgetPersonnelTag,
    APIgetPersonnelTaglog
} from '@/api/custom/custom.js'
import {
    ElMessage
} from 'element-plus'
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
import { Download, Search, Plus, Loading } from '@element-plus/icons-vue'
const data = reactive({
    list: []
})
const radio = ref('1')
const page = ref(1)
const per_page = ref(15)
const total = ref(50)
const loading_tab = ref(false)
const search_str = reactive({
    obj: {}
})
const switch_search = ref(false)
watch(page, () => {
    getPersonnelManageList()
})
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getPersonnelManageList()
}
const refreshFunc = () => {
    person_tag_or.value = []
    flag.value = false
    flag_1.value = true
    search_str.obj = {}
    switch_search.value = false
    getPersonnelManageList()
}
const person_tag_or = ref([])
const getPersonnelManageList = () => {
    console.log(document.getElementsByClassName('el-select-dropdown__list'))
    let val = document.getElementsByClassName('el-select-dropdown__list')[0]
    console.log(val)
    // val.style.diaplay = 'flex'
    // val.style.diaplay = 'flex'
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    if (JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_city')) && localStorage.getItem('utype') != 'pt') {
        params.group_id = JSON.parse(localStorage.getItem(localStorage.getItem('uid') + '_user_city')).china_code
    }

    if (flag.value == true && flag_1.value == false) {
        search_str.obj.person_tag_and = person_tag_or.value.join(',')
    } else {
        search_str.obj.person_tag_or = person_tag_or.value.join(',')
    }
    console.log(person_tag_or.value.join(','))
    for (let key in search_str.obj) {
        if (search_str.obj[key] || search_str.obj[key] === 0) {
            if (search_str.obj[key] instanceof Array && search_str.obj[key].length <= 0) {
                continue
            }
            params[key] = search_str.obj[key]
        }
    }
    loading_tab.value = true
    APIgetPersonnelManageList(params).then(res => {
        console.log(res)
        data.list = res
        total.value = res.length
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
        loading_tab.value = false
    })
    APIgetPersonnelLabels({ type: 1 }).then(res => {
        console.log(res)
        personnelLabels.list = res
    })
}
const flag = ref(false)
const flag_1 = ref(true)
const clickFeature = () => {
    flag.value = true
    flag_1.value = false
}
const clickFeature_1 = () => {
    flag.value = false
    flag_1.value = true
}
const data_details = reactive({
    item: {}
})
const from_add = reactive({
    obj: {}
})
const err_add = reactive({
    obj: {}
})
const switch_add = ref(false)
const str_title = ref('')
const switch_details = ref(false)
const personnelLabels = reactive({
    list: []
})
const detailsFunc = row => {
    APIgetPersonnelManageDetails(row.id).then(res => {
        console.log(res)
        data_details.item = res
        switch_details.value = true
    })

}
// 同意拒绝提交
const postFunc = formEl => {
    from_add.msg = {}
    // if (!formEl) return
    // formEl.validate(valid => {
    //     if (valid) {
    console.log(from_add.obj)
    for (let key in from_add.obj) {
        if (from_add.obj[key] !== null) {
            if (from_add.obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_add.obj[key] !== 0 || from_add.obj[key] !== false)) {
                delete from_add.obj[key]
            }
        }

    }
    if (str_title.value == '修改') {
        console.log(from_add.obj)
        APIputPersonnelManage(from_add.obj.id, from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_add.value = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostPersonnelManage(from_add.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_add.value = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
    // } else {
    //     return false
    // }
    // })
}
// 添加
const addResidentialFunc = () => {
    from_add.obj = {}
    err_add.obj = {}
    str_title.value = '添加'
    switch_add.value = true
}
// 修改
const modifyFunc = val => {
    APIgetPersonnelManageDetails(val.id).then(res => {
        from_add.obj = res
    })
    err_add.obj = {}
    str_title.value = '修改'
    switch_add.value = true
}
const deleteFunc = val => {
    APIdeletePersonnelManage(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 标签
const from_examine = reactive({
    item: {}
})
const tags = reactive({
    arr: []
})
const tag = ref('')
const peopleName = ref('')
const switch_feature = ref(false)
const modifyFeatureFunc = val => {
    taglog.arr = []
    peopleName.value = val.name
    tag.value = val.id
    from_examine.item = {}
    file_list.value = []
    APIgetPersonnelLabels({ type: 1 }).then(res => {
        console.log(res)
        personnelLabels.list = res
    })
    APIgetPersonnelTag({ tgt_id: tag.value }).then(res => {
        console.log(res)
        tags.arr = res
    })
    switch_feature.value = true
}
const file_list = ref([])
import { getFilesKeys } from '@/util/files.js'
const addFeature = () => {
    console.log(from_examine.item)
    let files = []
    let file_key = []
    console.log(file_list.value)
    if (file_list.value.length > 0) {
        for (let i in file_list.value) {
            if (!file_list.value[i].raw) {
                file_key.push(file_list.value[i].name)
            } else {
                files.push(file_list.value[i].raw)
            }
        }
    }
    // files.push(from_examine.item.affix.raw)
    if (files.length > 0) {
        getFilesKeys(files, 'tag').then(arr => {
            console.log(arr)
            from_examine.item.affix = arr
            from_examine.item.tgt_type = 1
            from_examine.item.tgt_id = tag.value
            APIpostPersonnelTag(from_examine.item).then(res => {
                console.log(res)
                ElMessage.success('添加成功')
                switch_feature.value = false
            }).catch(error => {
                ElMessage.error('添加失败')
            })
        })
    } else {
        from_examine.item.tgt_type = 1
        from_examine.item.tgt_id = tag.value
        APIpostPersonnelTag(from_examine.item).then(res => {
            console.log(res)
            ElMessage.success('添加成功')
            switch_feature.value = false
        }).catch(error => {
            ElMessage.error('添加失败')
        })
    }

}
const taglog = reactive({
    arr: []
})
const tagClick = val => {
    APIgetPersonnelTaglog({ page: 1, per_page: 500, tag_id: val.id }).then(res => {
        console.log(res)

        res.forEach((item, key) => {
            res[key].affixs = []
            for (let i in item.affix)
                res[key].affixs.push(VITE_APP_FOLDER_SRC.value + item.affix[i])
        })
        taglog.arr = res
    })
}
// 人员导入
import {
    APIgetPersonimptask,
    APIgetPersonimptpl_1,
    APIpostPersonimptask
} from '@/api/custom/custom.js'
const switch_files_list = ref(false)
const files_loading = ref(false)
const files_tab = reactive({
    arr: []
})
const Record_key = ref('')
const getFilesFunc = () => {
    files_loading.value = true
    APIgetPersonimptask({ page: 1, per_page: 15 }).then(res => {
        console.log(res)
        files_tab.arr = res
        files_loading.value = false
        switch_files_list.value = true
    })
    APIgetPersonimptpl_1().then(res => {
        console.log(res)
        Record_key.value = res.key
    })

}
const upload_str = ref('')
// 打开导入人员from
const openFileFunc = () => {
    upload_str.value = '请点击此处或拖拽需要上传的文件'
    switch_files.value = true
    files_obj.obj = {
        // loc: active_obj.obj.type,
        // loc_id: active_obj.obj.id
    }
}
const err_files = reactive({
    obj: {}
})
const files_obj = reactive({
    obj: {}
})
const switch_files = ref(false)
const filesUpFunc = () => {
    err_files.obj = {}
    let error = false
    if (!files_obj.obj.file_src) {
        err_files.obj.file_src = ['请选择需要上传的文件']
        error = true
    }
    if (!files_obj.obj.name) {
        err_files.obj.name = ['请输入任务名称']
        error = true
    }
    if (error) {
        return false
    }
    let arr = []
    arr.push(files_obj.obj.file_src)
    if (files_obj.obj.file_src) {
        getFilesKeys(arr, 'addHouse').then(arr => {
            files_obj.obj.file_src = arr[0]
            for (let key in files_obj.obj) {
                if (files_obj.obj[key] == '') {
                    delete files_obj.obj[key]
                }
            }
            APIpostPersonimptask(files_obj.obj).then(res => {
                ElMessage.success('导入成功')
                getFilesFunc()
                switch_files.value = false
                arr = []
            }).catch(() => {
                ElMessage.error('上传失败')
            })

        })
    }
}
const fileChangeFunc = (file, fileList) => {
    if (fileList.length > 1) {
        fileList.splice(0, 1)
    }
    upload_str.value = file.raw.name
    files_obj.obj.file_src = file.raw
}
refreshFunc()
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {
        status_all: []
    }
})
getOpts(['gender', 'status_all']).then(res => {
    opts_all.obj = res
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.switchStyle ::v-deep .el-switch__label {
    position: absolute !important;
    display: none !important;
    color: #fff !important;
    width: 80px;
}
.switchStyle ::v-deep .el-switch__label--left {
    z-index: 9 !important;
    left: 17px !important;
}
.switchStyle ::v-deep .el-switch__label--right {
    z-index: 9 !important;
    left: -5px !important;
}
.switchStyle ::v-deep .el-switch__label.is-active {
    display: block !important;
}
.switchStyle.el-switch ::v-deep .el-switch__core,
.switchStyle ::v-deep .el-switch__label {
    width: 60px !important;
}
:deep(.el-select-dropdown__list) {
    display: flex;
    width: 300px;
    flex-wrap: wrap;
}
.el-select-dropdown__item {
    flex: 50%;
}
</style>
