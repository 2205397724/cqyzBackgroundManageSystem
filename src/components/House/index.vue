<template>
    <div class="components-house" style="height: 100%;" :class="{ 'components-house-units': tree_item.type == 'units' }">
        <div class="tree-box" style="height: 100%;">
            <div class="tree-item">
                <div style="height: calc(100% - 60px);">
                    <position-tree :tree_item="tree_item" :type="no_zone" @checkFunc="checkFunc" />
                </div>
            </div>
            <div class="tree-details" style="display: flex; flex-direction: column;">
                <div style="height: 100%;">
                    <div :style="{ 'height': !active_obj.obj.name || active_obj.obj.type == 'region' || active_obj.obj.type == 'zone' ? '100%' : '100%' }"
                        style="position: relative;display: flex; flex-direction: column;overflow: scroll;">
                        <div v-if="!active_obj.obj.name || active_obj.obj.type == 'region' || active_obj.obj.type == 'zone'"
                            style="position: absolute;left: 0;right: 0;z-index: 9;height: 100%;width: 100%;background-color: rgb(255 255 255 / 50%);cursor: not-allowed;" />
                        <div style="padding: 20px 20px 0;box-sizing: border-box;">
                            <div class="search">
                                <el-row>
                                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                        <el-row>
                                            <el-col :sm="4" :xs="6" :md="11" class="search_th">
                                                房屋名称：
                                            </el-col>
                                            <el-col :sm="20" :xs="18" :md="13">
                                                <el-input v-model="data_search.obj.name" class="search_tb"
                                                    placeholder="名称" />
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                        <el-row>
                                            <el-col :sm="4" :xs="6" :md="11" class="search_th">
                                                房屋使用状态：
                                            </el-col>
                                            <el-col :sm="20" :xs="18" :md="13">
                                                <el-select v-model="data_search.obj.status_use" class="search_tb"
                                                    placeholder="*状态" clearable>
                                                    <el-option v-for="(item) in opts_all.obj.house_status_use"
                                                        :key="item.key" :label="item.val" :value="item.key" />
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                        <el-row>
                                            <el-col :sm="4" :xs="6" :md="11" class="search_th">
                                                是否绑定：
                                            </el-col>
                                            <el-col :sm="20" :xs="18" :md="13">
                                                <el-select v-model="data_search.obj.is_bind_property" class="search_tb"
                                                    placeholder="是否绑定" clearable>
                                                    <el-option v-for="(item) in opts_all.obj.house_has_property"
                                                        :key="item.key" :label="item.val" :value="item.key" />
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading"
                                            @click="refreshFunc">重置</el-button>
                                        <!-- <span v-show="switch_search == true" class="size-base">
                                            *共搜索到{{ total }}条。
                                        </span> -->
                                    </el-col>
                                </el-row>
                            </div>
                            <el-row :gutter="10" class="bottom-btn-box-2">
                                <el-col :xs="24">
                                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加房屋
                                    </el-button>
                                    <el-button class="head-btn" type="success"
                                        @click="() => { switch_files_list = true; refreshFilesListFunc() }">导入房屋</el-button>
                                    <el-popconfirm title="确定要删除当前页的所有房屋吗？" cancel-button-type="info"
                                        @confirm="deleteHouseAbleFunc">
                                        <template #reference>
                                            <el-button class="head-btn" type="danger">删除全部房屋
                                            </el-button>
                                        </template>
                                    </el-popconfirm>
                                    <el-button :disabled="choseIDs.arr.length <= 0" type="warning" class="head-btn"
                                        @click="modifyAllFunc">批量修改</el-button>
                                    <el-button class="head-btn" @click="refreshFunc">刷新</el-button>
                                    <el-button class="head-btn" type="info" @click="() => { switch_files_list_house = !switch_files_list_house;}">导出房屋</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div
                            style="padding: 20px;box-sizing: border-box;background-color: #f0f2f5;height: calc(100% - 155px);">
                            <div class="row-box row-box-title">
                                <div class="row-item-box row-item-tit-box">
                                    <div class="row-item row-item-tit row-item-tit-bgline">
                                        <div class="tit-fh">楼层</div>
                                        <div class="tit-lc">房号</div>
                                    </div>
                                </div>
                                <el-scrollbar style="white-space: nowrap;">
                                    <div v-for="(item, i) in house_num.arr" :key="i" class="row-item-box ">
                                        <div class="row-item">
                                            <el-checkbox v-model="checkFH.row[item].val"
                                                @change="(val) => { checkFH.row[item].val = val; rowClickFunc(item, val) }" />
                                            <div class="row-item-check">{{ item }}</div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                            <div style="height: calc(100% - 45px);overflow: auto;">
                                <div v-for="(child, j) in house_list.arr" :key="j" class="row-box">
                                    <div class="row-item-box row-item-tit-box">
                                        <div class="row-item row-item-tit row-item-tit-ceng">
                                            <el-checkbox v-model="checkFH.col[child.floor_truth].val"
                                                @change="(val) => { checkFH.col[child.floor_truth].val = val; colClickFunc(child.floor_truth, val) }" />
                                            <div>{{ child.floor_truth }}层</div>
                                        </div>
                                    </div>
                                    <el-scrollbar style="white-space: nowrap;">
                                        <div style="display: flex;">
                                            <div v-for="(item, i) in child.houses" :key="i" class="row-item-box">
                                                <div v-show="item.house_num ? true : false" class="row-item"
                                                    style="position: relative;" @click="houseDetailsFunc(item)">
                                                    <el-checkbox
                                                        v-if="checkFH.all[child.floor_truth] && checkFH.all[child.floor_truth][item.house_num]"
                                                        v-model="checkFH.all[child.floor_truth][item.house_num].val"
                                                        @change="(val) => { checkFH.all[child.floor_truth][item.house_num].val = val; allClickFunc(child.floor_truth, item.house_num, val) }"
                                                        @click.stop="" />
                                                    <div class="row-item-check">{{ item.house_num }}</div>
                                                    <el-popconfirm title="确定要删除当前项么?" cancel-button-type="info"
                                                        @confirm="deleteHouse(item)">
                                                        <template #reference>
                                                            <div class="del_house">✖</div>
                                                        </template>
                                                    </el-popconfirm>
                                                </div>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </div>
                            <el-drawer v-model="drawer" :direction="direction">
                                <template #title>
                                    <h4>房屋信息</h4>
                                </template>
                                <template #default>
                                    <HouseDetail v-model:house_detail="house_detail" @emitFunc="modifyResidentialFunc"></HouseDetail>
                                    <div class="m-t-10 m-l-20" />
                                </template>
                            </el-drawer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加修改房屋 -->
        <!-- 修改添加房屋 -->
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <el-form ref="ruleFormRef" :model="from_examine.item">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item label="物理楼层" prop="floor_truth"
                                :error="from_error.msg && from_error.msg.floor_truth ? from_error.msg.floor_truth[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.floor_truth" placeholder="">
                                    <template #append>层</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="名义层" prop="floor_alias"
                                :error="from_error.msg && from_error.msg.floor_alias ? from_error.msg.floor_alias[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.floor_alias" placeholder="">
                                    <template #append>层</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房屋名称" prop="name"
                                :error="from_error.msg && from_error.msg.name ? from_error.msg.name[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.name" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="地址" prop="addr"
                                :error="from_error.msg && from_error.msg.addr ? from_error.msg.addr[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.addr" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房号" prop="house_num"
                                :error="from_error.msg && from_error.msg.house_num ? from_error.msg.house_num[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.house_num" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="建筑面积" prop="area_build"
                                :error="from_error.msg && from_error.msg.area_build ? from_error.msg.area_build[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.area_build" placeholder="">
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="套内面积" prop="area_inside"
                                :error="from_error.msg && from_error.msg.area_inside ? from_error.msg.area_inside[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.area_inside" placeholder="">
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="分摊面积" prop="area_share"
                                :error="from_error.msg && from_error.msg.area_share ? from_error.msg.area_share[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.area_share" placeholder="">
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="户型" prop="type_model"
                                :error="from_error.msg && from_error.msg.type_model ? from_error.msg.type_model[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.type_model" class="head-btn" placeholder="户型"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_model" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="产权性质" prop="type_property"
                                :error="from_error.msg && from_error.msg.type_property ? from_error.msg.type_property[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.type_property" class="head-btn" placeholder="产权性质"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_property" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="楼栋性质" prop="type_building"
                                :error="from_error.msg && from_error.msg.type_building ? from_error.msg.type_building[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.type_building" class="head-btn" placeholder="楼栋性质"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_building" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房屋使用状态" prop="status_use"
                                :error="from_error.msg && from_error.msg.status_use ? from_error.msg.status_use[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.status_use" class="head-btn" placeholder="房屋使用状态"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_use" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房屋安全状态" prop="status_safe"
                                :error="from_error.msg && from_error.msg.status_safe ? from_error.msg.status_safe[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.status_safe" class="head-btn" placeholder="房屋安全状态"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_safe" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="规划用途" prop="status_plan"
                                :error="from_error.msg && from_error.msg.status_plan ? from_error.msg.status_plan[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.status_plan" class="head-btn" placeholder="规划用途"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="实际用途" prop="status_fact"
                                :error="from_error.msg && from_error.msg.status_fact ? from_error.msg.status_fact[0] : ''"
                                label-width="140px">
                                <el-select v-model="from_examine.item.status_fact" class="head-btn" placeholder="实际用途"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="当前产权ID" prop="curr_property_id"
                                :error="from_error.msg && from_error.msg.curr_property_id ? from_error.msg.curr_property_id[0] : ''"
                                label-width="140px">
                                <!-- <el-input
                                    v-model=""
                                    placeholder=""
                                /> -->
                                <div
                                    style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchProperty v-model:str="from_examine.item.curr_property_id" />
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item label="备注" prop="remark"
                                :error="from_error.msg && from_error.msg.remark ? from_error.msg.remark[0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.remark" :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col v-if="from_examine.item.addition" :md="24" :lg="24">
                            <el-form-item label="简介" prop="addition.desc"
                                :error="from_error.msg && from_error.msg['addition.desc'] ? from_error.msg['addition.desc'][0] : ''"
                                label-width="140px">
                                <el-input v-model="from_examine.item.addition.desc"
                                    :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" placeholder="" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 批量修改 -->
        <el-dialog v-model="switch_alldetails" title="批量修改" width="50%">
            <div>
                <div style="margin-bottom: 10px;font-size: 16px;font-weight: 600;">已选房屋：</div>
                <div style="margin-bottom: 10px;">
                    <span v-for="(item, i) in choseIDs.arr" :key="i"
                        style="display: inline-block;margin-right: 10px;box-sizing: border-box;padding: 8px 16px; font-size: 14px;border-radius: 6px;border: 1px solid #dcdfe6;color: #a8b3cd;">{{
                                item.name
                        }}</span>
                </div>
                <el-form :model="piliangxiugai.obj">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房号" prop="house_num"
                                :error="error_alldetails.msg && error_alldetails.msg.house_num ? error_alldetails.msg.house_num[0] : ''">
                                <el-input v-model="piliangxiugai.obj.house_num" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="建筑面积" prop="area_build"
                                :error="error_alldetails.msg && error_alldetails.msg.area_build ? error_alldetails.msg.area_build[0] : ''">
                                <el-input v-model="piliangxiugai.obj.area_build" placeholder="">
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="户型" prop="type_model"
                                :error="error_alldetails.msg && error_alldetails.msg.type_model ? error_alldetails.msg.type_model[0] : ''">
                                <el-select v-model="piliangxiugai.obj.type_model" class="head-btn" placeholder="户型"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_model" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="产权性质" prop="type_property"
                                :error="error_alldetails.msg && error_alldetails.msg.type_property ? error_alldetails.msg.type_property[0] : ''">
                                <el-select v-model="piliangxiugai.obj.type_property" class="head-btn" placeholder="产权性质"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_property" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="楼栋性质" prop="type_building"
                                :error="error_alldetails.msg && error_alldetails.msg.type_building ? error_alldetails.msg.type_building[0] : ''">
                                <el-select v-model="piliangxiugai.obj.type_building" class="head-btn" placeholder="楼栋性质"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_building" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房屋使用状态" prop="status_use"
                                :error="error_alldetails.msg && error_alldetails.msg.status_use ? error_alldetails.msg.status_use[0] : ''">
                                <el-select v-model="piliangxiugai.obj.status_use" class="head-btn" placeholder="房屋使用状态"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_use" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="房屋安全状态" prop="status_safe"
                                :error="error_alldetails.msg && error_alldetails.msg.status_safe ? error_alldetails.msg.status_safe[0] : ''">
                                <el-select v-model="piliangxiugai.obj.status_safe" class="head-btn" placeholder="房屋安全状态"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_safe" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="规划用途" prop="status_plan"
                                :error="error_alldetails.msg && error_alldetails.msg.status_plan ? error_alldetails.msg.status_plan[0] : ''">
                                <el-select v-model="piliangxiugai.obj.status_plan" class="head-btn" placeholder="实际用途"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item label="实际用途" prop="status_fact"
                                :error="error_alldetails.msg && error_alldetails.msg.status_fact ? error_alldetails.msg.status_fact[0] : ''">
                                <el-select v-model="piliangxiugai.obj.status_fact" class="head-btn" placeholder="实际用途"
                                    clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key"
                                        :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div style="display: flex;justify-content: flex-end;align-items: center;width: 100%;">
                    <el-button @click="switch_alldetails = false">取消</el-button>
                    <el-button type="primary" @click="alldetailsFunc()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 上传列表 -->
        <el-dialog v-model="switch_files_list" title="上传" width="70%">
            <div style="display: flex; flex-wrap: wrap;">
                <el-button class="head-btn" @click="refreshFilesListFunc">刷新</el-button>
                <el-button class="head-btn" type="success" @click="openFileFunc">导入房屋</el-button>
                <el-popover :width="220" trigger="hover" content="点击下载导入房屋的模板文件" effect="dark">
                    <template #reference>
                        <el-link class="head-btn" :underline="false" :href="VITE_APP_FOLDER_SRC + Record_key"
                            target="_blank">
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
            <el-table v-loading="files_loading" :data="files_tab.arr"
                :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }"
                style="width: 100%;min-height: 300px;margin-bottom: 10px;border: 1px solid #ebeef5;border-radius: 6px;"
                max-height="400">
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="desc" label="备注" />
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
                <el-table-column prop="created_at" label="导入时间" width="170" />
                <el-table-column prop="updated_at" label="更新时间" width="170" />
            </el-table>
        </el-dialog>
        <!-- 上传表单 -->
        <el-dialog v-model="switch_files" title="上传" width="50%">
            <div>
                <el-form :model="files_obj.obj">
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item label="任务名称" prop="name" label-width="120px"
                                :error="err_files.obj && err_files.obj.name ? err_files.obj.name[0] : ''">
                                <el-input v-model="files_obj.obj.name" placeholder="" />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24">
                            <el-form-item label="附件" prop="file_src" label-width="120px"
                                :error="err_files.obj && err_files.obj.file_src ? err_files.obj.file_src[0] : ''">
                                <el-upload class="upload-demo" drag :show-file-list="false" :auto-upload="false"
                                    action="Fake Action" :on-change="fileChangeFunc">
                                    <el-icon class="el-icon--upload">
                                        <el-icon-upload-filled />
                                    </el-icon>
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
                    <el-button @click="switch_files = false">取消</el-button>
                    <el-button type="primary" @click="filesUpFunc()">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 导出房屋 -->
        <ExportHouse
            v-if="switch_files_list_house"
            :switch_files_list_house="switch_files_list_house"
            :type="1"
            :tgt_id="tgt_id"
            :tgt_type="tgt_type"
            />
    </div>
</template>
<script setup>
import {
    reactive,
    ref,
    defineProps
} from 'vue'
import {
    ElMessage
} from 'element-plus'
import HouseDetail from './detail.vue'
const VITE_APP_UPLOAD = ref(import.meta.env.VITE_APP_UPLOAD)
const VITE_APP_FOLDER_SRC = import.meta.env.VITE_APP_FOLDER_SRC
const props = defineProps(['tree_item'])
const { tree_item } = toRefs(props)
const active_obj = reactive({
    obj: {}
})
const tgt_id = ref('')
const tgt_type = ref('')
const checkFunc = val => {
    if(val.type === 'zone' || val.type === 'buildings' || val.type === 'units' ) {
        tgt_id.value = val.id
        if(val.type === 'zone') {
            tgt_id.value = 'zones'
            return
        }
        tgt_type.value = val.type
    }
    house_num.arr = []
    house_list.arr = []
    active_obj.obj = val
    if (active_obj.obj.id && active_obj.obj.name && (active_obj.obj.type == 'units' || active_obj.obj.type ==
        'buildings')) {
        refreshFunc()
    }
}
const switch_search = ref(false)
// 分页
const total = ref(74751)
let per_page = ref(500)
let page = ref(1)
const data_search = reactive({
    obj: {}
})

// 搜索
let no_zone = ref(true)
const searchFunc = () => {
    switch_search.value = true
    getHouseListFunc()
}
// 刷新
const refreshFunc = () => {
    switch_search.value = false
    data_search.obj = {}
    getHouseListFunc()
}
import {
    APIgetHouseListSort,
    APIgetUnitsDetailsHouse,
    APIgetBuildDetailsHouse,
    APIdeleteHouseHouse,
    APIdeleteHouseAbleHouse
} from '@/api/custom/custom.js'
import { Loading, Search, Plus } from '@element-plus/icons-vue'
// 获取楼栋单元
const details_data = reactive({
    obj: {}
})
const getUnitBuildFunc = () => {
    if (active_obj.obj.type == 'units') {
        APIgetUnitsDetailsHouse(active_obj.obj.id).then(res => {
            details_data.obj = res
        })
    } else {
        APIgetBuildDetailsHouse(active_obj.obj.id).then(res => {
            details_data.obj = res

        })
    }
}
// 获取房屋层级列表
const house_num = reactive({
    arr: []
})
const house_list = reactive({
    arr: []
})
// 写反了 row列，col行
const checkFH = reactive({
    row: {},
    col: {},
    all: {}
})
const choseIDs = reactive({
    arr: []
})
const piliangxiugai = reactive({
    obj: {
        house_ids: []
    }
})
const getStateFunc = () => {
    let data = checkFH.all
    choseIDs.arr = []
    for (let i in data) {
        for (let j in data[i]) {
            if (data[i][j].val) {
                choseIDs.arr.push(data[i][j].data)
            }
        }
    }
}
// 传递子组件的房屋信息详情
let house_detail = ref('')
const houseDetailsFunc = row => {
    house_detail.value = row
    drawer.value = true
}
const getHouseListFunc = () => {
    choseIDs.arr = []
    getUnitBuildFunc()
    let params = {

        // houseable_type: tree_item.value.type == 'units' ? 'units' : active_obj.obj.type,
        // houseable_id: tree_item.value.type == 'units' ? tree_item.value.id : active_obj.obj.id
        // houseable_type: active_obj.obj.type,
        houseable_id: active_obj.obj.id
    }
    if (active_obj.obj.type == 'building') {
        params.houseable_type = 'buildings'
    } else {
        params.houseable_type = active_obj.obj.type
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
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
    APIgetHouseListSort(params).then(res => {
        total.value = 0
        // 处理空白格
        let nums = res.house_nums
        let list = res.floors
        for (let i in list) {
            if (list[i].houses.length < nums.length) {
                for (let j in nums) {
                    if (!list[i].houses[j] || !list[i].houses[j].house_num || (list[i].houses[j]
                        .house_num != nums[j])) {
                        list[i].houses.splice(j, 0, {})
                    }
                }
            }
            house_num.arr = nums
            house_list.arr = list
            // 处理默认选择项目
            for (let i in house_num.arr) {
                checkFH.row[house_num.arr[i]] = {
                    val: false
                }
            }
            for (let i in house_list.arr) {
                checkFH.col[house_list.arr[i].floor_truth] = {
                    val: false
                }
                checkFH.all[house_list.arr[i].floor_truth] = {}
                for (let j in house_list.arr[i].houses) {
                    if (house_list.arr[i].houses[j].house_num) {
                        total.value++
                        checkFH.all[house_list.arr[i].floor_truth][house_list.arr[i].houses[j]
                            .house_num] = {
                            val: false,
                            data: house_list.arr[i].houses[j]
                        }
                    }
                }
            }
        }
    })
}
// 在父组件中清理数据
const clear_house_data = () => {
    house_num.arr = []
    house_list.area = []
    active_obj.obj.name = ''
}
import { defineExpose } from 'vue'
defineExpose({
    clear_house_data
})
// houseable_type=units&houseable_id=62be6497b55f2676b8065601
// 更新check状态
// row点击
const rowClickFunc = (col, val) => {
    for (let i in checkFH.all) {
        if (checkFH.all[i][col]) {
            checkFH.all[i][col].val = val
        }
    }
    for (let i in checkFH.all) {
        let row_val = val
        for (let j in checkFH.all[i]) {
            if (checkFH.all[i][j].val != val) {
                row_val = !val
                break
            }
        }
        checkFH.col[i].val = row_val
    }
    getStateFunc()
}
// col点击
const colClickFunc = (row, val) => {
    for (let i in checkFH.all[row]) {
        if (checkFH.all[row][i]) {
            checkFH.all[row][i].val = val
        }
    }
    for (let i in checkFH.row) {
        let col_val = val
        for (let j in checkFH.all) {
            if (checkFH.all[j][i] && checkFH.all[j][i].val != val) {
                col_val = !val
                break
            }
        }
        checkFH.row[i].val = col_val
    }
    getStateFunc()
}
// 内部点击
const allClickFunc = (row, col, val) => {
    // 看行
    for (let i in checkFH.all[row]) {
        if (checkFH.all[row][i].val != val) {
            checkFH.col[row].val = !val
            return false
        }
    }
    checkFH.col[row].val = val
    // 看列
    for (let i in checkFH.all) {
        if (checkFH.all[i][col] && checkFH.all[i][col].val != val) {
            checkFH.row[col].val = !val
            return false
        }
    }
    checkFH.row[col].val = val
    getStateFunc()
}
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
// 打开批量修改弹窗
const error_alldetails = reactive({
    msg: {}
})
const switch_alldetails = ref(false)
const modifyAllFunc = () => {
    piliangxiugai.obj = {
        'house_ids': []
    }
    for (let i in choseIDs.arr) {
        piliangxiugai.obj.house_ids.push(choseIDs.arr[i].id)
    }
    error_alldetails.msg = {}
    switch_alldetails.value = true
}
const upload_str = ref('请点击此处或拖拽需要上传的文件')
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
import {
    APIpostFilesList,
    APIgetHouseimptpl
} from '@/api/custom/custom.js'
import { getFilesKeys } from '@/util/files.js'
const filesUpFunc = () => {
    err_files.obj = {}
    let error = false
    if (active_obj.obj.type == 'buildings') {
        files_obj.obj.loc = 'buildings'
    } else {
        files_obj.obj.loc = 'units'
    }
    files_obj.obj.loc_id = active_obj.obj.id
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
            APIpostFilesList(files_obj.obj).then(res => {
                ElMessage.success('导入成功')
                refreshFilesListFunc()
                switch_files.value = false
                arr = []
            }).catch(() => {
                ElMessage.error('上传失败')
            })

        })
    }

}
const switch_files_list = ref(false)
const switch_files_list_house = ref(false)
const files_loading = ref(true)
const files_tab = reactive({
    arr: []
})
const refreshFilesListFunc = () => {
    getFilesFunc()
}
import {
    APIgetFilesList
} from '@/api/custom/custom.js'
const Record_key = ref('')
const getFilesFunc = () => {
    files_loading.value = true
    APIgetFilesList().then(res => {
        files_tab.arr = res
        files_loading.value = false
    })
    APIgetHouseimptpl().then(res => {
        Record_key.value = res.key
    })
}
const fileChangeFunc = (file, fileList) => {
    if (fileList.length > 1) {
        fileList.splice(0, 1)
    }
    upload_str.value = file.raw.name
    files_obj.obj.file_src = file.raw
}
const str_title = ref('添加')
// 确认批量修改
import {
    APIputAllHouseHouse
} from '@/api/custom/custom.js'
const alldetailsFunc = () => {
    error_alldetails.msg = {}
    APIputAllHouseHouse(piliangxiugai.obj).then(res => {
        switch_alldetails.value = false
        ElMessage.success('修改成功')
        refreshFunc()
    }).catch(err => {
        error_alldetails.msg = err.data
    })
}
// 添加修改房屋
import {
    APIputHouseHouse,
    APIpostHouseHouse,
    APIgetHouseDetailsHouse
} from '@/api/custom/custom.js'
// 同意拒绝提交
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
    from_examine.item.houseable_type = active_obj.obj.type
    from_examine.item.houseable_id = active_obj.obj.id

    if (tree_item.value.type == 'units') {
        from_examine.item.houseable_type = 'units',
            from_examine.item.houseable_id = tree_item.value.id
    }
    let data = {}
    for (let i in from_examine.item) {
        if (from_examine.item[i] || from_examine.item[i] === 0) {
            data[i] = from_examine.item[i]
        }
    }
    for (let key in from_examine.item) {
        if (from_examine.item[key] !== null) {
            if (from_examine.item[key].toString().replace(/(^\s*)|(\s*$)/g, '') == '' && (from_examine.item[key] !== 0 || from_examine.item[key] !== false)) {
                delete from_examine.item[key]
            }
        }

    }
    if (str_title.value == '修改') {
        APIputHouseHouse(data.id, data).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_examine.value = false
        }).catch(err => {
            from_error.msg = err.data
        })
    } else {
        APIpostHouseHouse(data).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            refreshFunc()
            switch_examine.value = false
        }).catch(err => {
            from_error.msg = err.data
        })
    }
}
// 修改
const modifyResidentialFunc = (id) => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetHouseDetailsHouse(id).then(res => {
        from_examine.item = res
        switch_examine.value = true
    })
}
// 添加楼栋
const addResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        'addition': {
            'desc': ''
        }
    }
    switch_examine.value = true
}
// 打开导入房屋from
const openFileFunc = () => {
    upload_str.value = '请点击此处或拖拽需要上传的文件'
    switch_files.value = true
    files_obj.obj = {
        // loc: active_obj.obj.type,
        // loc_id: active_obj.obj.id
    }
}
const drawer = ref(false)
// 删除房屋
const deleteHouse = val => {
    APIdeleteHouseHouse(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// 删除楼栋或单元下的房屋
const deleteHouseAbleFunc = () => {
    let data = {
        houseable_type:active_obj.obj.type,
        houseable_id:active_obj.obj.id,
    }
    APIdeleteHouseAbleHouse(data).then(res=>{
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
// refreshFunc()
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['status_all', 'houseable_type', 'house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_status_plan_fact']).then(res => {
    opts_all.obj = res
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
}
// 覆盖样式
.el-tree-node__content {
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
<style lang="scss" scoped>
.components-house {
    background-color: #fff;
    .tree-box {
        border-top: 1px solid #efefef;
        display: flex;
    }
    .tree-item {
        min-width: 250px;
        width: 250px;
        border-right: 1px solid #e9e9e9;
        .tree-title {
            height: 60px;
            line-height: 60px;
            padding-left: 20px;
            color: #aaa;
            font-size: 14px;
            border-bottom: 1px solid #e9e9e9;
        }
    }
    .tree-details {
        flex-grow: 1;
        max-width: calc(100% - 200px);
        .bottom-btn-box-2 {
            margin-bottom: 10px;
        }
    }
}
.row-box {
    border-bottom: 1px solid #f2f2f2;
    background-color: #fff;
    display: flex;
    .row-item-box {
        display: inline-block;
        box-sizing: border-box;
        padding: 6px;
        min-width: 84px;
        height: 44px;
        .row-item {
            width: 100%;
            height: 100%;
            border: 1px solid #e9e9e9;
            font-size: 14px;
            vertical-align: top;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            padding: 6px;
            cursor: pointer;
            // justify-content: space-between;
        }
        .row-item-tit-ceng {
            border: 0 solid #e9e9e9;
        }
    }
    .row-item-tit-box {
        border-right: 1px solid #e9e9e9;
        width: 84px;
        .row-item-tit {
            border: 0 solid #e9e9e9 !important;
            font-size: 12px;
            .tit-fh {
                margin-bottom: -18px;
            }
            .tit-lc {
                margin-top: -18px;
            }
        }
        .row-item-tit-bgline {
            background-image: linear-gradient(to top right, #fff 49%, #e9e9e9, #fff 51%);
            justify-content: space-between;
            cursor: initial;
        }
    }
}
.row-box-title {
    .row-item-box {
        .row-item {
            border: 1px solid #fff;
        }
    }
}
.count {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    font-size: 14px;
    color: #666;
}
.count-item {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
}
.count_item_i1 {
    background: #900;
    color: #fff;
    border: 1px solid #900;
}
.count_item_i2 {
    background: #2dc26b;
    color: #fff;
    border: 1px solid #2dc26b;
}
.count_item_i3 {
    background: #f90;
    color: #fff;
    border: 1px solid #f90;
}
.count_item_i4 {
    background: #ccc;
    color: #fff;
    border: 1px solid #ccc;
}
.tip-title {
    font-size: 14px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.components-house-units {
    .tree-item {
        display: none;
    }
    .tree-details {
        max-width: 100%;
    }
}
:deep .el-tree {
    --el-tree-node-hover-bg-color: #e9f4ff;
}
:deep .el-overlay {
    background-color: rgb(0 0 0 / 40%);
}
.del_house {
    position: absolute;
    top: -10px;
    left: 63px;
    color: red;
    font-size: 16px;
}
:deep .el-drawer__header {
    margin-bottom: 0;
}
</style>
