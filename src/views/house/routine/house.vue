<template>
    <div class="routine-house">
        <page-main>
            <div>
                <div>
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.name" class="head-btn" placeholder="房屋名称" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.addr" class="head-btn" placeholder="地址" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.floor_truth" class="head-btn" placeholder="*物理楼层" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.floor_alias" class="head-btn" placeholder="*名义层" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.house_num" class="head-btn" placeholder="*房号" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.type_property" class="head-btn" placeholder="*产权性质" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_type_property" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.type_building" class="head-btn" placeholder="*楼栋性质" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.type_model" class="head-btn" placeholder="*户型" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.status_use" class="head-btn" placeholder="*房屋使用状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.status_safe" class="head-btn" placeholder="*房屋安全状态" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.status_plan" class="head-btn" placeholder="*规划用途" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.status_fact" class="head-btn" placeholder="*实际用途" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.is_bind_property" class="head-btn" placeholder="是否绑定产权" clearable>
                                <el-option v-for="(item,i) in opts_all.obj.house_has_property" :key="item.key" :label="item.val" :value="item.key" />
                            </el-select>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-input v-model="data_search.sync_china_code" class="head-btn" placeholder="区域code" clearable />
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                            <!-- <el-input v-model="data_search.sync_zone_id" class="head-btn" placeholder="小区ID" clearable /> -->
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchResidential v-model:str="data_search.sync_zone_id" />
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                            <!-- <el-input v-model="data_search.sync_building_id" class="head-btn" placeholder="楼栋ID" clearable /> -->
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchBuilding v-model:str="data_search.sync_building_id" />
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                            <!-- <el-input v-model="data_search.sync_unit_id" class="head-btn" placeholder="单元ID" clearable /> -->
                            <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchUnit v-model:str="data_search.sync_unit_id" />
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my">
                            <el-select v-model="data_search.houseable_type" class="head-btn" placeholder="直属上级类型" clearable @change="data_search.houseable_id=''">
                                <el-option label="楼栋" value="buildings" />
                                <el-option label="单元" value="units" />
                            </el-select>
                        </el-col>
                        <el-col v-if="data_search.houseable_type" :xs="12" :sm="8" :md="6" :lg="4" :xl="3" class="el-cascader-box-my" style="box-sizing: border-box;padding-bottom: 10px;font-size: 12px;">
                            <div v-if="data_search.houseable_type=='buildings'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchBuilding v-model:str="data_search.houseable_id" />
                            </div>
                            <div v-else-if="data_search.houseable_type=='units'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                <SearchUnit v-model:str="data_search.houseable_id" />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.created_at"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="创建时间"
                                    end-placeholder="创建时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" class="el-cascader-box-my">
                            <div class="head-btn">
                                <el-date-picker
                                    v-model="data_search.updated_at"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="更新时间"
                                    end-placeholder="更新时间"
                                    style="width: 100%;"
                                    value-format="YYYY-MM-DD"
                                />
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="8" :md="6" :lg="2" :xl="3">
                            <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="switch_search" class="search-tips">
                    <el-button style="margin-right: 10px;" @click="refreshFunc">重置</el-button>
                    *搜索到相关结果共{{ total }}条。
                </div>
                <div>
                    <el-row :gutter="10" class="bottom-btn-box-2">
                        <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="2">
                            <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加房屋</el-button>
                        </el-col>
                        <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="2">
                            <el-button :disabled="arr_selection.arr.length<=0" class="head-btn" type="warning" @click="modifyAllFunc">批量修改</el-button>
                        </el-col>
                        <el-col :xs="12" :sm="{span: 7, offset: 5}" :md="{span: 5, offset: 11}" :lg="{span: 4, offset: 14}" :xl="{span: 3, offset: 17}">
                            <div style="display: flex;align-items: center;height: 100%; box-sizing: border-box; padding-bottom: 10px;">
                                <el-button style="width: 100%;" type="success" @click="()=>{switch_files_list=true;refreshFilesListFunc()}">导入房屋</el-button>
                                <div style="margin-left: 10px;cursor: pointer;">
                                    <el-popover
                                        :width="220"
                                        trigger="hover"
                                        content="点击下载导入房屋的模板文件"
                                        effect="dark"
                                    >
                                        <template #reference>
                                            <el-link :underline="false" href="http://192.168.110.37:10090/excels/house_import_tpl.xlsx" target="_blank"><el-button style="width: 100%;"><el-icon><el-icon-download /></el-icon></el-button></el-link>
                                        </template>
                                    </el-popover>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="width: 100%; overflow: auto;border: 1px solid #ebeef4;box-sizing: border-box;">
                    <el-table
                        ref="multipleTableRef"
                        v-loading="loading_tab"
                        :data="data_tab.arr"
                        :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                        style="width: 100%;min-height: 300px;"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="name" label="房屋名称" width="180" />
                        <el-table-column prop="addr" label="地址" width="220" />
                        <el-table-column prop="floor_truth" label="物理层" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.floor_truth }} 层</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="floor_alias" label="名义层" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.floor_alias }} 层</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="house_num" label="房号" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.house_num }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="area_build" label="建筑面积" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ scope.row.area_build }} m²</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type_model" label="户型" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_type_model,scope.row.type_model) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type_property" label="产权性质" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_type_property,scope.row.type_property) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type_building" label="楼栋性质" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_type_building,scope.row.type_building) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status_use" label="房屋使用状态" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_status_use,scope.row.status_use) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status_safe" label="房屋安全状态" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_status_safe,scope.row.status_safe) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status_plan" label="规划用途" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_plan_fact,scope.row.status_plan) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status_fact" label="实际用途" width="140">
                            <template #default="scope">
                                <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.house_plan_fact,scope.row.status_fact) }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="200">
                            <template #default="scope">
                                <el-button
                                    :disabled="arr_selection.arr.length>0"
                                    type="primary" size="small"
                                    @click="modifyResidentialFunc(scope.row)"
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
                        <el-table-column />
                    </el-table>
                </div>
                <div style="padding-top: 20px;">
                    <el-pagination
                        v-model:current-page="page"
                        layout="total,prev,pager,next,jumper,"
                        :total="total"
                        :page-size="per_page"
                        background
                        hide-on-single-page
                    />
                </div>
            </div>
        </page-main>
        <!-- 修改添加 -->
        <el-dialog
            v-model="switch_examine"
            :title="str_title"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="from_examine.item"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="直属楼栋/单元类型" prop="houseable_type"
                                :error="from_error.msg&&from_error.msg.houseable_type?from_error.msg.houseable_type[0]:''"
                            >
                                <el-select
                                    v-model="from_examine.item.houseable_type" class="head-btn" placeholder="直属上级类型" clearable
                                    @change="from_examine.item.houseable_id = ''"
                                >
                                    <el-option label="楼栋" value="buildings" />
                                    <el-option label="单元" value="units" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="from_examine.item.houseable_type" :md="24" :lg="12">
                            <el-form-item
                                label="直属楼栋/单元ID" prop="houseable_id"
                                :error="from_error.msg&&from_error.msg.houseable_id?from_error.msg.houseable_id[0]:''"
                            >
                                <!-- <el-input
                                    v-model="from_examine.item.houseable_id"
                                    placeholder=""
                                /> -->
                                <div v-if="from_examine.item.houseable_type=='buildings'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchBuilding v-model:str="from_examine.item.houseable_id" />
                                </div>
                                <div v-else-if="from_examine.item.houseable_type=='units'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchUnit v-model:str="from_examine.item.houseable_id" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="物理楼层" prop="floor_truth"
                                :error="from_error.msg&&from_error.msg.floor_truth?from_error.msg.floor_truth[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.floor_truth"
                                    placeholder=""
                                >
                                    <template #append>层</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="名义层" prop="floor_alias"
                                :error="from_error.msg&&from_error.msg.floor_alias?from_error.msg.floor_alias[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.floor_alias"
                                    placeholder=""
                                >
                                    <template #append>层</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋名称" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="地址" prop="addr"
                                :error="from_error.msg&&from_error.msg.addr?from_error.msg.addr[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.addr"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房号" prop="house_num"
                                :error="from_error.msg&&from_error.msg.house_num?from_error.msg.house_num[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.house_num"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="建筑面积" prop="area_build"
                                :error="from_error.msg&&from_error.msg.area_build?from_error.msg.area_build[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.area_build"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="户型" prop="type_model"
                                :error="from_error.msg&&from_error.msg.type_model?from_error.msg.type_model[0]:''"
                            >
                                <el-select v-model="from_examine.item.type_model" class="head-btn" placeholder="户型" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="产权性质" prop="type_property"
                                :error="from_error.msg&&from_error.msg.type_property?from_error.msg.type_property[0]:''"
                            >
                                <el-select v-model="from_examine.item.type_property" class="head-btn" placeholder="产权性质" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_type_property" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼栋性质" prop="type_building"
                                :error="from_error.msg&&from_error.msg.type_building?from_error.msg.type_building[0]:''"
                            >
                                <el-select v-model="from_examine.item.type_building" class="head-btn" placeholder="楼栋性质" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋使用状态" prop="status_use"
                                :error="from_error.msg&&from_error.msg.status_use?from_error.msg.status_use[0]:''"
                            >
                                <el-select v-model="from_examine.item.status_use" class="head-btn" placeholder="房屋使用状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋安全状态" prop="status_safe"
                                :error="from_error.msg&&from_error.msg.status_safe?from_error.msg.status_safe[0]:''"
                            >
                                <el-select v-model="from_examine.item.status_safe" class="head-btn" placeholder="房屋安全状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="规划用途" prop="status_plan"
                                :error="from_error.msg&&from_error.msg.status_plan?from_error.msg.status_plan[0]:''"
                            >
                                <el-select v-model="from_examine.item.status_plan" class="head-btn" placeholder="规划用途" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="实际用途" prop="status_fact"
                                :error="from_error.msg&&from_error.msg.status_fact?from_error.msg.status_fact[0]:''"
                            >
                                <el-select v-model="from_examine.item.status_fact" class="head-btn" placeholder="实际用途" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="当前产权ID" prop="curr_property_id"
                                :error="from_error.msg&&from_error.msg.curr_property_id?from_error.msg.curr_property_id[0]:''"
                            >
                                <!-- <el-input
                                    v-model=""
                                    placeholder=""
                                /> -->
                                <div style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchProperty v-model:str="from_examine.item.curr_property_id" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注" prop="remark"
                                :error="from_error.msg&&from_error.msg.remark?from_error.msg.remark[0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.remark"
                                    :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col v-if="from_examine.item&&from_examine.item.addition" :md="24" :lg="24">
                            <el-form-item
                                label="模型简介" prop="addition.desc"
                                :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''"
                            >
                                <el-input
                                    v-model="from_examine.item.addition.desc"
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
                    <div class="left">直属楼栋/单元ID</div>
                    <div class="right">{{ data_details.item.houseable_id }}</div>
                </div>
                <div class="item">
                    <div class="left">直属楼栋/单元类型</div>
                    <div class="right">{{ getOptValFunc([{key:'buildings',val:'楼栋'},{key:'units',val:'单元'}],data_details.item.houseable_type) }}</div>
                </div>
                <div class="item">
                    <div class="left">物理楼层</div>
                    <div class="right">{{ data_details.item.floor_truth }} 层</div>
                </div>
                <div class="item">
                    <div class="left">名义层</div>
                    <div class="right">{{ data_details.item.floor_alias }} 层</div>
                </div>
                <div class="item">
                    <div class="left">房屋名称</div>
                    <div class="right">{{ data_details.item.name }}</div>
                </div>
                <div class="item">
                    <div class="left">地址</div>
                    <div class="right">{{ data_details.item.addr }}</div>
                </div>
                <div class="item">
                    <div class="left">房号</div>
                    <div class="right">{{ data_details.item.house_num }} </div>
                </div>
                <div class="item">
                    <div class="left">建筑面积</div>
                    <div class="right">{{ data_details.item.area_build }} m²</div>
                </div>
                <div class="item">
                    <div class="left">户型</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_type_model,data_details.item.type_model) }} </div>
                </div>
                <div class="item">
                    <div class="left">产权性质</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_type_property,data_details.item.type_property) }} </div>
                </div>
                <div class="item">
                    <div class="left">楼栋性质</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_type_building,data_details.item.type_building) }} </div>
                </div>
                <div class="item">
                    <div class="left">房屋使用状态</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_status_use,data_details.item.status_use) }} </div>
                </div>
                <div class="item">
                    <div class="left">房屋安全状态</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_status_safe,data_details.item.status_safe) }} </div>
                </div>
                <div class="item">
                    <div class="left">规划用途</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_plan_fact,data_details.item.status_plan) }} </div>
                </div>
                <div class="item">
                    <div class="left">实际用途</div>
                    <div class="right">{{ getOptValFunc(opts_all.obj.house_plan_fact,data_details.item.status_fact) }} </div>
                </div>
                <div class="item">
                    <div class="left">当前产权ID</div>
                    <div class="right">{{ data_details.item.curr_property_id }} </div>
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
                    <div class="left">备注</div>
                    <div class="right">{{ data_details.item.remark }}</div>
                </div>
                <div v-if="data_details.item.addition&&data_details.item.addition.desc" class="item">
                    <div class="left">模型简介</div>
                    <div class="right">{{ data_details.item.addition?data_details.item.addition.desc:'' }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 批量修改 -->
        <el-dialog
            v-model="switch_alldetails"
            title="批量修改"
            width="50%"
        >
            <div>
                <div style="margin-bottom: 10px;font-size: 16px;font-weight: 600;">已选房屋：</div>
                <div style="margin-bottom: 10px;">
                    <span v-for="(item,i) in data_alldetails.list" style="display: inline-block;margin-right: 10px;box-sizing: border-box;padding: 8px 16px; font-size: 14px;border-radius: 6px;border: 1px solid #dcdfe6;color: #a8b3cd;">{{ item.name }}</span>
                </div>
                <el-form
                    :model="data_alldetails.item"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房号" prop="house_num"
                                :error="error_alldetails.msg&&error_alldetails.msg.house_num?error_alldetails.msg.house_num[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.house_num"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="建筑面积" prop="area_build"
                                :error="error_alldetails.msg&&error_alldetails.msg.area_build?error_alldetails.msg.area_build[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.area_build"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="户型" prop="type_model"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_model?error_alldetails.msg.type_model[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.type_model"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="产权性质" prop="type_property"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_property?error_alldetails.msg.type_property[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.type_property"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼栋性质" prop="type_building"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_building?error_alldetails.msg.type_building[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.type_building"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋使用状态" prop="status_use"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_use?error_alldetails.msg.status_use[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.status_use"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋安全状态" prop="status_safe"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_safe?error_alldetails.msg.status_safe[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.status_safe"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="规划用途" prop="status_plan"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_plan?error_alldetails.msg.status_plan[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.status_plan"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="实际用途" prop="status_fact"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_fact?error_alldetails.msg.status_fact[0]:''"
                            >
                                <el-input
                                    v-model="data_alldetails.item.status_fact"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_alldetails=false">取消</el-button>
                    <el-button type="primary" @click="alldetailsFunc()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 上传列表 -->
        <el-dialog
            v-model="switch_files_list"
            title="上传"
            width="70%"
        >
            <el-row :gutter="20" class="bottom-btn-box-2">
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button class="head-btn" @click="refreshFilesListFunc">刷新</el-button>
                </el-col>
                <el-col :xs="8" :sm="4" :md="4" :lg="3" :xl="2">
                    <el-button type="success" @click="()=>{upload_str='请点击此处或拖拽需要上传的文件';switch_files=true;files_obj.obj={};}">导入房屋</el-button>
                </el-col>
            </el-row>
            <el-table
                v-loading="files_loading"
                :data="files_tab.arr"
                :header-cell-style="{background:'#fbfbfb',color:'#999999','font-size':'12px'}"
                style="width: 100%;min-height: 300px;margin-bottom: 10px;border: 1px solid #ebeef5;border-radius: 6px;"
                max-height="400"
            >
                <el-table-column prop="name" label="名称" width="180" />
                <el-table-column prop="desc" label="备注" width="280" />
                <el-table-column prop="status" label="状态" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ getOptValFunc(opts_all.obj.status_cert,scope.row.status) }} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="file_err" label="错误信息" width="280" />
                <el-table-column prop="created_at" label="创建时间" width="180" />
                <el-table-column prop="updated_at" label="更新时间" width="180" />
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
                                label="任务名称" prop="name"
                                :error="err_files.obj&&err_files.obj.name?err_files.obj.name[0]:''"
                            >
                                <el-input
                                    v-model="files_obj.obj.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="直属上级类型" prop="loc"
                                :error="err_files.obj&&err_files.obj.loc?err_files.obj.loc[0]:''"
                            >
                                <el-select v-model="files_obj.obj.loc" style="width: 100%;" placeholder="直属上级类型" clearable>
                                    <el-option label="楼栋" value="buildings" />
                                    <el-option label="单元" value="units" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="直属类型ID" prop="loc_id"
                                :error="err_files.obj&&err_files.obj.loc_id?err_files.obj.loc_id[0]:''"
                            >
                                <el-input
                                    v-model="files_obj.obj.loc_id"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24">
                            <el-form-item
                                label="选择文件" prop="file_src"
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
<script setup>
import SearchBuilding from '@/components/SearchBuilding/index.vue'
import SearchUnit from '@/components/SearchUnit/index.vue'
import SearchResidential from '@/components/SearchResidential/index.vue'
import SearchProperty from '@/components/SearchProperty/index.vue'
import {
    APIgetHouseListHouse,
    APIgetHouseDetailsHouse,
    APIdeleteHouseHouse,
    APIputHouseHouse,
    APIpostHouseHouse,
    APIputAllHouseHouse
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
let switch_search = ref(false)
let data_search = reactive({
    houseable_id: '',
    houseable_type: '',
    floor_truth: '',
    floor_alias: '',
    house_num: '',
    type_property: '',
    type_building: '',
    name: '',
    addr: '',
    type_model: '',
    status_use: '',
    status_safe: '',
    status_plan: '',
    status_fact: '',
    created_at: '',
    updated_at: '',
    is_bind_property: '',
    sync_china_code: '',
    sync_zone_id: '',
    sync_building_id: '',
    sync_unit_id: ''
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
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        'addition': { }
    }
})
const str_title = ref('添加')
// 添加修改表单错误信息
const from_error = reactive({
    msg: {}
})
// 批量修改多选项
const multipleTableRef = ref('')
const arr_selection = reactive({ arr: [] })
const switch_alldetails = ref(false)
const data_alldetails = reactive({
    list: [],
    item: {
        'house_ids': [],
        'type_model': 0,
        'area_build': '',
        'house_num': '',
        'status_safe': 0,
        'status_use': 0,
        'type_building': 0,
        'type_property': 0,
        'status_fact': 0,
        'status_plan': 0
    }
})
const error_alldetails = reactive({
    msg: {}
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
// 确认批量修改
const alldetailsFunc = () => {
    error_alldetails.msg = {}
    data_alldetails.item.house_ids = []
    for (let i in data_alldetails.list) {
        data_alldetails.item.house_ids.push(data_alldetails.list[i].id)
    }
    APIputAllHouseHouse(data_alldetails.item).then(res => {
        if (!res.code) {
            switch_alldetails.value = false
            ElMessage.success(res.msg)
            refreshFunc()
        }
    }).catch(err => {
        error_alldetails.msg = err.data
    })
}
// 打开批量修改弹窗
const modifyAllFunc = () => {
    data_alldetails.item = {
        'house_ids': [],
        'type_model': 0,
        'area_build': '',
        'house_num': '',
        'status_safe': 0,
        'status_use': 0,
        'type_building': 0,
        'type_property': 0,
        'status_fact': 0,
        'status_plan': 0
    }
    data_alldetails.list = arr_selection.arr
    multipleTableRef.value?.clearSelection()
    switch_alldetails.value = true
}
// 批量修改多选后
const handleSelectionChange = res => {
    arr_selection.arr = res
}
// 搜索
const searchFunc = () => {
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.houseable_type = ''
    data_search.houseable_id = ''
    data_search.floor_truth = ''
    data_search.floor_alias = ''
    data_search.house_num = ''
    data_search.type_property = ''
    data_search.type_building = ''
    data_search.name = ''
    data_search.addr = ''
    data_search.type_model = ''
    data_search.status_use = ''
    data_search.status_safe = ''
    data_search.status_plan = ''
    data_search.status_fact = ''
    data_search.created_at = ''
    data_search.updated_at = ''
    data_search.is_bind_property = ''
    data_search.sync_china_code = ''
    data_search.sync_zone_id = ''
    data_search.sync_building_id = ''
    data_search.sync_unit_id = ''
    getTabListFunc()
}

// 详情
const detailsFunc = val => {
    data_dialog.obj = val
    APIgetHouseDetailsHouse(val.id).then(res => {
        if (!res.code) {
            data_details.item = res.data
            switch_details.value = true
        }
    })
}
// 监听分页
watch(page, () => {
    getTabListFunc()
})
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputHouseHouse(from_examine.item.id, from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
                }).catch(err => {
                    from_error.msg = err.data
                })
            } else {
                APIpostHouseHouse(from_examine.item).then(res => {
                    if (!res.code) {
                        refreshFunc()
                        ElMessage.success(res.msg)
                        switch_examine.value = false
                    }
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
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search) {
        if (data_search[key] || data_search[key] === 0) {
            if (data_search[key] instanceof Array && data_search[key].length <= 0) {
                continue
            }
            params[key] = data_search[key]
        }
    }
    loading_tab.value = true
    if (params.created_at) {
        let created_str = ''
        for (let i in params.created_at) {
            created_str += ',' + params.created_at[i]
        }
        params.created_at = created_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    APIgetHouseListHouse(params).then(res => {
        if (res.code === 0) {
            loading_tab.value = false
            data_tab.arr = res.data.items
            total.value = res.data.aggregation.total_cnt
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteHouseHouse(val.id).then(res => {
        if (res.code === 0) {
            refreshFunc()
            ElMessage.success(res.msg)
        }
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'building_id': '',
        'addr': '',
        'cnt_floor': 0,
        'cnt_house': 0,
        'time_build_end': '',
        'name': '',
        'remark': '',
        'addition': {
            'desc': ''
        }
    }
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetHouseDetailsHouse(val.id).then(res => {
        if (!res.code) {
            from_examine.item = res.data
            switch_examine.value = true
        }
    })
}
// 上传
import axios from 'axios'
import {
    APIgetFilesList,
    APIpostFiles
} from '@/api/custom/custom.js'
const switch_files = ref(false)
const files_obj = reactive({
    obj: {
        'loc': '',
        'loc_id': '',
        'file_src': '',
        'name': ''
    }
})
const err_files = reactive({
    obj: {}
})
const switch_files_list = ref(false)
const files_loading = ref(true)
const files_tab = reactive({
    arr: []
})
const upload_str = ref('请点击此处或拖拽需要上传的文件')
const fileChangeFunc = (file, fileList) => {
    if (fileList.length > 1) {
        fileList.splice(0, 1)
    }
    upload_str.value = file.raw.name
    files_obj.obj.file_src = file.raw
}

const getFilesFunc = () => {
    files_loading.value = true
    APIgetFilesList().then(res => {
        if (!res.code) {
            files_tab.arr = res.data.items
            files_loading.value = false
        }
    })
}

const filesUpFunc = () => {
    err_files.obj = {}
    let error = false
    if (!files_obj.obj.file_src) {
        err_files.obj.file_src = ['请选择需要上传的文件']
        error = true
    }
    if (!files_obj.obj.loc) {
        err_files.obj.loc = ['请选择直属上级类型']
        error = true
    }
    if (!files_obj.obj.loc_id) {
        err_files.obj.loc_id = ['请选择直属类型ID']
        error = true
    }
    if (!files_obj.obj.name) {
        err_files.obj.name = ['请输入任务名称']
        error = true
    }
    if (error) {
        return false
    }
    APIpostFiles({ 'folder': import.meta.env.VITE_APP_FOLDER_ADDHOUSE, 'number': 1 }).then(res => {
        // 发送 POST 请求
        console.log(files_obj.obj.file_src)
        console.log(typeof files_obj.obj.file_src)
        const formData = new FormData()
        formData.append('Policy', res.data.inputs.Policy)
        formData.append('X-Amz-Algorithm', res.data.inputs['X-Amz-Algorithm'])
        formData.append('X-Amz-Credential', res.data.inputs['X-Amz-Credential'])
        formData.append('X-Amz-Date', res.data.inputs['X-Amz-Date'])
        formData.append('X-Amz-Signature', res.data.inputs['X-Amz-Signature'])
        formData.append('acl', res.data.inputs.acl)
        formData.append('key', `${import.meta.env.VITE_APP_FOLDER_ADDHOUSE}/${res.data.keys[0]}`)
        formData.append('Content-Type', files_obj.obj.file_src.type)
        formData.append('file', files_obj.obj.file_src)
        const api = axios.create({
            baseURL: res.data.attrs.action,
            timeout: 1000,
            headers: { 'Content-Type': res.data.attrs.enctype }
        })
        api[res.data.attrs.method.toLowerCase()]('', formData)
            .then(res => {
                ElMessage.success(res.statusText)
                switch_files.value = false
                refreshFilesListFunc()
            }).catch(err => {
                ElMessage.error(res.statusText)
            })
    })
}
const refreshFilesListFunc = () => {
    getFilesFunc()
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 执行
refreshFunc()

/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import {
    APIpostGetOpts
} from '@/api/custom/custom.js'
const opts_all = reactive({
    obj: {}
})
APIpostGetOpts({ lab: ['house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_plan_fact'] }).then(res => {
    opts_all.obj = res.data
})
const getOptValFunc = (arr, key) => {
    for (let i in arr) {
        if (arr[i].key == key) {
            return arr[i].val
        }
    }
    return ''
}
</script>
<style lang="scss">
    .routine-house {
        .el-cascader-box-my {
            .el-cascader {
                width: 100% !important;
                margin-bottom: 10px;
            }
        }

        .serve-box {
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 6px;
            position: relative;

            .el-form-item {
                margin: 0;
            }

            .delete-service {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 999999;
                cursor: pointer;
                background-color: #ffffff;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .routine-house {
        .head-btn {
            width: 100%;
            margin-bottom: 10px;
        }
    }

    .search-tips {
        color: #aaaaaa;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .details-box {
        .item {
            display: flex;
            color: #333333;
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
                content: '：';
            }

            .right {
                width: 100%;
                color: #666666;
            }
        }

        .item:last-child {
            border-style: none;
        }
    }
</style>
