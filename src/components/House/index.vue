<template>
    <div class="components-house" style="height: 100%;" :class="{'components-house-units':tree_item.type=='units'}">
        <div class="tree-box" style="height: 100%;">
            <div class="tree-item">
                <div style="height: calc(100% - 60px);">
                    <position-tree
                        :tree_item="tree_item"
                        @checkFunc="checkFunc"
                    />
                </div>
            </div>
            <div class="tree-details" style="display: flex; flex-direction: column;">
                <div style="height: 100%;">
                    <div :style="{'height':!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'?'calc(100% - 60px)':'100%'}" style="position: relative;display: flex; flex-direction: column;  }">
                        <div
                            v-if="!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'"
                            style="position: absolute;left: 0;right: 0;z-index: 9;height: 100%;width: 100%;background-color: rgba(255,255,255,0.5);cursor: not-allowed;"
                        />
                        <div style="padding: 20px 20px 0 20px;box-sizing: border-box;">
                            <el-row :gutter="10">
                                <el-col :xs="24" class="el-cascader-box-my">
                                    <el-select
                                        v-model="data_search.obj.status_use"
                                        class="head-btn width-sm" placeholder="*房屋使用状态"
                                        clearable
                                    >
                                        <el-option
                                            v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key"
                                            :label="item.val" :value="item.key"
                                        />
                                    </el-select>
                                    <el-select
                                        v-model="data_search.obj.status_safe"
                                        class="head-btn width-sm" placeholder="*房屋安全状态"
                                        clearable
                                    >
                                        <el-option
                                            v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key"
                                            :label="item.val" :value="item.key"
                                        />
                                    </el-select>
                                    <el-select
                                        v-model="data_search.obj.status_plan"
                                        class="head-btn width-sm" placeholder="*规划用途"
                                        clearable
                                    >
                                        <el-option
                                            v-for="(item,i) in opts_all.obj.house_status_plan_fact" :key="item.key"
                                            :label="item.val" :value="item.key"
                                        />
                                    </el-select>
                                    <el-select
                                        v-model="data_search.obj.status_fact"
                                        class="head-btn width-sm" placeholder="*实际用途"
                                        clearable
                                    >
                                        <el-option
                                            v-for="(item,i) in opts_all.obj.house_status_plan_fact" :key="item.key"
                                            :label="item.val" :value="item.key"
                                        />
                                    </el-select>
                                    <el-select
                                        v-model="data_search.obj.is_bind_property"
                                        class="head-btn width-sm"
                                        placeholder="是否绑定"
                                        clearable
                                    >
                                        <el-option
                                            v-for="(item,i) in opts_all.obj.house_has_property" :key="item.key"
                                            :label="item.val" :value="item.key"
                                        />
                                    </el-select>
                                    <el-button class="head-btn" type="primary" @click="searchFunc">搜索</el-button>
                                    <el-button class="head-btn" @click="refreshFunc">重置</el-button>
                                    <span v-show="switch_search" class="size-sm font-grey">*搜索到相关结果共{{ total }}条。</span>
                                </el-col>
                            </el-row>
                            <div v-if="active_obj.obj.type=='units'" class="count p-t-10">
                                <div class="font-grey size-base">户数：<strong class="font-darkgrey size-lg">{{ details_data.obj.cnt_house }} </strong>户</div>
                            </div>
                            <div v-if="active_obj.obj.type=='building'" class="count p-t-10">
                                <div class="font-grey size-base">住宅总面积：<strong class="font-darkgrey size-lg">{{ details_data.obj.area_live }}</strong>㎡，</div>
                                <div class="font-grey size-base">住宅总套数：<strong class="font-darkgrey size-lg">{{ details_data.obj.cnt_live }}</strong>套</div>
                            </div>
                            <el-row :gutter="10" class="bottom-btn-box-2  p-t-10">
                                <el-col :xs="24">
                                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加房屋</el-button>
                                    <el-button :disabled="choseIDs.arr.length<=0" type="warning" class="head-btn" @click="modifyAllFunc">批量修改</el-button>
                                    <el-button class="head-btn" type="success" @click="()=>{switch_files_list=true;refreshFilesListFunc()}">导入房屋</el-button>
                                </el-col>
                            </el-row>
                            <!-- <div class="count">
                                    <div class="count-item count_item_i2">在租({{ leaseNum }})</div>
                                    <div class="count-item count_item_i1">已配未租({{ renting }})</div>
                                    <div class="count-item count_item_i3">未配({{ finishBuild }})</div>
                                    <div class="count-item count_item_i4">闲置({{ otherHouse }})</div>
                                </div> -->
                        </div>
                        <div
                            style="padding: 20px;box-sizing: border-box;background-color: #f0f2f5;height: calc(100% - 155px);"
                        >
                            <div class="row-box row-box-title">
                                <div class="row-item-box row-item-tit-box">
                                    <div class="row-item row-item-tit row-item-tit-bgline">
                                        <div class="tit-fh">楼层</div>
                                        <div class="tit-lc">房号</div>
                                    </div>
                                </div>
                                <el-scrollbar style="white-space: nowrap;">
                                    <div v-for="(item,i) in house_num.arr" class="row-item-box ">
                                        <div class="row-item">
                                            <el-checkbox
                                                v-model="checkFH.row[item].val"
                                                @change="(val)=>{checkFH.row[item].val= val;rowClickFunc(item,val)}"
                                            />
                                            <div class="row-item-check">{{ item }}#</div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                            <div style="height: calc(100% - 45px );overflow: auto;">
                                <div v-for="(child,j) in house_list.arr" class="row-box">
                                    <div class="row-item-box row-item-tit-box">
                                        <div class="row-item row-item-tit row-item-tit-ceng">
                                            <el-checkbox
                                                v-model="checkFH.col[child.floor_truth].val"
                                                @change="(val)=>{checkFH.col[child.floor_truth].val= val;colClickFunc(child.floor_truth,val)}"
                                            />
                                            <div>{{ child.floor_truth }}层</div>
                                        </div>
                                    </div>
                                    <el-scrollbar style="white-space: nowrap;">
                                        <div style="display: flex;">
                                            <div v-for="(item,i) in child.houses" class="row-item-box">
                                                <div v-show="item.house_num?true:false" class="row-item">
                                                    <el-checkbox
                                                        v-if="checkFH.all[child.floor_truth]&&checkFH.all[child.floor_truth][item.house_num]"
                                                        v-model="checkFH.all[child.floor_truth][item.house_num].val"
                                                        @change="(val)=>{checkFH.all[child.floor_truth][item.house_num].val= val;allClickFunc(child.floor_truth,item.house_num,val)}"
                                                    />
                                                    <el-popover
                                                        :width="200"
                                                        trigger="hover"

                                                        placement="top"
                                                    >
                                                        <template #reference>
                                                            <div class="row-item-check">{{ item.house_num }}#</div>
                                                        </template>
                                                        <div style="box-sizing: border-box;padding: 4px;">
                                                            <div class="tip-title">房屋：{{ item.name }}</div>
                                                            <div class="tip-title">使用状态：{{ getOptVal(opts_all.obj.house_status_use,item.status_use) }}</div>
                                                            <div class="tip-title">安全状态：{{ getOptVal(opts_all.obj.house_status_safe,item.status_safe) }}</div>
                                                            <div class="tip-title">产权性质：{{ getOptVal(opts_all.obj.house_type_property,item.type_property) }}</div>
                                                            <div class="tip-title">户型：{{ getOptVal(opts_all.obj.house_type_model,item.type_model) }}</div>
                                                            <div>
                                                                <el-button type="primary" plain @click="modifyResidentialFunc(item)">修改</el-button>
                                                                <el-button type="warning" plain @click="showPropertyFunc(item)">产权</el-button>
                                                            </div>
                                                        </div>
                                                    </el-popover>
                                                </div>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                                label-width="140px"
                            >
                                <el-select v-model="from_examine.item.houseable_type" class="head-btn" placeholder="直属上级类型" clearable @change="from_examine.item.houseable_id = ''">
                                    <el-option v-for="(item,i) in opts_all.obj.houseable_type" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="from_examine.item.houseable_type" :md="24" :lg="12">
                            <el-form-item
                                label="直属楼栋/单元ID" prop="houseable_id"
                                :error="from_error.msg&&from_error.msg.houseable_id?from_error.msg.houseable_id[0]:''"
                                label-width="140px"
                            >
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
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
                                label-width="140px"
                            >
                                <el-select v-model="from_examine.item.status_plan" class="head-btn" placeholder="规划用途" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="实际用途" prop="status_fact"
                                :error="from_error.msg&&from_error.msg.status_fact?from_error.msg.status_fact[0]:''"
                                label-width="140px"
                            >
                                <el-select v-model="from_examine.item.status_fact" class="head-btn" placeholder="实际用途" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="当前产权ID" prop="curr_property_id"
                                :error="from_error.msg&&from_error.msg.curr_property_id?from_error.msg.curr_property_id[0]:''"
                                label-width="140px"
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
                                label-width="140px"
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
                                label="简介" prop="addition.desc"
                                :error="from_error.msg&&from_error.msg['addition.desc']?from_error.msg['addition.desc'][0]:''"
                                label-width="140px"
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
        <!-- 批量修改 -->
        <el-dialog
            v-model="switch_alldetails"
            title="批量修改"
            width="50%"
        >
            <div>
                <div style="margin-bottom: 10px;font-size: 16px;font-weight: 600;">已选房屋：</div>
                <div style="margin-bottom: 10px;">
                    <span v-for="(item,i) in choseIDs.arr" style="display: inline-block;margin-right: 10px;box-sizing: border-box;padding: 8px 16px; font-size: 14px;border-radius: 6px;border: 1px solid #dcdfe6;color: #a8b3cd;">{{ item.name }}</span>
                </div>
                <el-form
                    :model="piliangxiugai.obj"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房号" prop="house_num"
                                :error="error_alldetails.msg&&error_alldetails.msg.house_num?error_alldetails.msg.house_num[0]:''"
                            >
                                <el-input
                                    v-model="piliangxiugai.obj.house_num"
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
                                    v-model="piliangxiugai.obj.area_build"
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
                                <el-select v-model="piliangxiugai.obj.type_model" class="head-btn" placeholder="户型" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="产权性质" prop="type_property"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_property?error_alldetails.msg.type_property[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.type_property" class="head-btn" placeholder="产权性质" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_type_property" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼栋性质" prop="type_building"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_building?error_alldetails.msg.type_building[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.type_building" class="head-btn" placeholder="楼栋性质" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋使用状态" prop="status_use"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_use?error_alldetails.msg.status_use[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_use" class="head-btn" placeholder="房屋使用状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋安全状态" prop="status_safe"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_safe?error_alldetails.msg.status_safe[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_safe" class="head-btn" placeholder="房屋安全状态" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="规划用途" prop="status_plan"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_plan?error_alldetails.msg.status_plan[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_plan" class="head-btn" placeholder="实际用途" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="实际用途" prop="status_fact"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_fact?error_alldetails.msg.status_fact[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_fact" class="head-btn" placeholder="实际用途" clearable>
                                    <el-option v-for="(item,i) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
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
            <div>
                <el-button class="head-btn" @click="refreshFilesListFunc">刷新</el-button>
                <el-button class="head-btn" type="success" @click="()=>{upload_str='请点击此处或拖拽需要上传的文件';switch_files=true;files_obj.obj={};}">导入房屋</el-button>
                <el-popover
                    :width="220"
                    trigger="hover"
                    content="点击下载导入房屋的模板文件"
                    effect="dark"
                >
                    <template #reference>
                        <el-link
                            class="head-btn"
                            :underline="false"
                            href="http://192.168.110.37:10090/zgj/excels/house_import_tpl.xlsx"
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
                <el-table-column prop="name" label="名称" width="180" />
                <el-table-column prop="desc" label="备注" width="280" />
                <el-table-column prop="status" label="状态" width="90">
                    <template #default="scope">
                        <span style="margin-left: 10px">{{ getOptVal(opts_all.obj.status_cert,scope.row.status) }} </span>
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
        <!-- 产权 -->
        <el-dialog
            v-model="switch_property"
            :title="read_state?'产权详情':add_state?'变更产权':'修改产权'"
            width="70%"
        >
            <div class="m-b-20">
                <el-button :disabled="!(read_state||!add_state)" type="primary" @click="modifyPropertyFunc(true)">变更产权</el-button>
                <el-button :disabled="!(read_state||add_state)" type="primary" @click="modifyPropertyFunc(false)">修改错误</el-button>
                <el-button v-if="!read_state" @click="modifycancel">取消</el-button>
            </div>
            <div :class="{'property-read-state':read_state}" style="height: 60vh;width: 100%;overflow-y: auto; overflow-x: hidden;">
                <el-form
                    ref="ruleFormRef"
                    :model="property_form.obj"
                >
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="产权信息" name="first">
                            <el-form-item label-width="80px" label="产权证号" prop="code_property" :error="from_error_property.msg&&from_error_property.msg.code_property?from_error_property.msg.code_property[0]:''">
                                <el-input
                                    v-if="!read_state"
                                    v-model="property_form.obj.code_property"
                                    placeholder=""
                                />
                                <span v-else>{{ property_form.obj.code_property }}</span>
                            </el-form-item>
                            <el-form-item label-width="80px" label="地房籍号" prop="code_room" :error="from_error_property.msg&&from_error_property.msg.code_room?from_error_property.msg.code_room[0]:''">
                                <el-input
                                    v-if="!read_state"
                                    v-model="property_form.obj.code_room"
                                    placeholder=""
                                />
                                <span v-else>{{ property_form.obj.code_room }}</span>
                            </el-form-item>
                            <el-form-item label-width="80px" label="交易时间" prop="time_deal" :error="from_error_property.msg&&from_error_property.msg.time_deal?from_error_property.msg.time_deal[0]:''">
                                <el-date-picker
                                    v-if="!read_state"
                                    v-model="property_form.obj.time_deal"
                                    type="date"
                                    value-format="YYYY-MM-DD"
                                    placeholder=""
                                    style="width: 100%;"
                                    :default-value="new Date()"
                                />
                                <span v-else>{{ property_form.obj.time_deal }}</span>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="产权人" name="second">
                            <div v-for="(item,i) in property_form.obj.property_owners" class="serve-box">
                                <el-row>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="姓名" :error="from_error_property.msg&&from_error_property.msg['property_owners.'+i+'.name']?from_error_property.msg['property_owners.'+i+'.name'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.name"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.name }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="证件类型" :error="from_error_property.msg&&from_error_property.msg['property_owners.'+i+'.type_id_card']?from_error_property.msg['property_owners.'+i+'.type_id_card'][0]:''">
                                            <el-select
                                                v-if="!read_state"
                                                v-model="item.type_id_card" class="head-btn" placeholder=""
                                                clearable
                                            >
                                                <el-option
                                                    v-for="(item,i) in opts_all.obj.type_id_card" :key="item.key"
                                                    :label="item.val" :value="item.key"
                                                />
                                            </el-select>
                                            <span v-else>{{ item.type_id_card }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="证件号" :error="from_error_property.msg&&from_error_property.msg['property_owners.'+i+'.id_card']?from_error_property.msg['property_owners.'+i+'.id_card'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.id_card"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.id_card }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="联系方式" :error="from_error_property.msg&&from_error_property.msg['property_owners.'+i+'.mobile']?from_error_property.msg['property_owners.'+i+'.mobile'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.mobile"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.mobile }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="面积" :error="from_error_property.msg&&from_error_property.msg['property_owners.'+i+'.area']?from_error_property.msg['property_owners.'+i+'.area'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.area"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.area }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div v-if="!read_state" class="delete-service" @click="deleteServiceFunc(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
                            <el-button v-if="!read_state" style="margin-right: 10px;" @click="addServiceFunc">添加产权人</el-button>
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
                    <el-button @click="switch_property=false">取消</el-button>
                    <el-button type="primary" @click="postPropertyFunc">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    reactive,
    ref,
    watch,
    defineProps
} from 'vue'
import {
    ElMessage
} from 'element-plus'
const activeName = ref('first')
const props = defineProps(['tree_item'])
const { tree_item } = toRefs(props)
// const tree_item = ref({
//     id: '50',
//     name: '测试',
//     next_type: 'region',
//     type: 'region'
// })
const active_obj = reactive({
    obj: {}
})
const checkFunc = val => {
    console.log(val)
    active_obj.obj = val
    if (active_obj.obj.id && active_obj.obj.name && (active_obj.obj.type == 'units' || active_obj.obj.type ==
        'building')) {
        getHouseListFunc()
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
const searchFunc = () => {
    switch_search.value = true
    getHouseListFunc()
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getHouseListFunc()
}
import {
    APIgetHouseListSort,
    APIgetUnitsDetailsHouse,
    APIgetBuildDetailsHouse
} from '@/api/custom/custom.js'
// 获取楼栋单元
const details_data = reactive({
    obj: {}
})
const getUnitBuildFunc = () => {
    if (active_obj.obj.type == 'units') {
        APIgetUnitsDetailsHouse(active_obj.obj.id).then(res => {
            details_data.obj = res.data
        })
    } else if (active_obj.obj.type == 'building') {
        APIgetBuildDetailsHouse(active_obj.obj.id).then(res => {
            details_data.obj = res.data
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
    console.log(choseIDs.arr)
}

const getHouseListFunc = () => {
    choseIDs.arr = []
    getUnitBuildFunc()
    let params = {
        houseable_type: active_obj.obj.type,
        houseable_id: active_obj.obj.id
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
        if (!res.code) {
            total.value = 0
            // 处理空白格
            let nums = res.data.house_nums
            let list = res.data.houses
            for (let i in list) {
                if (list[i].houses.length < nums.length) {
                    for (let j in nums) {
                        if (!list[i].houses[j] || !list[i].houses[j].house_num || (list[i].houses[j]
                            .house_num != nums[j])) {
                            list[i].houses.splice(j, 0, {})
                        }
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
        'addition': { }
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
    console.log(piliangxiugai.obj)
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
import { APIpostFiles } from '@/api/custom/custom.js'
import axios from 'axios'
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
const switch_files_list = ref(false)
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
const getFilesFunc = () => {
    files_loading.value = true
    APIgetFilesList().then(res => {
        if (!res.code) {
            files_tab.arr = res.data.items
            files_loading.value = false
        }
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
        if (!res.code) {
            switch_alldetails.value = false
            ElMessage.success(res.msg)
            refreshFunc()
        }
    }).catch(err => {
        error_alldetails.msg = err.data
    })
}
// 同意拒绝提交
import {
    APIputHouseHouse,
    APIpostHouseHouse
} from '@/api/custom/custom.js'
const dialogExamineCloseFunc = () => {
    from_error.msg = {}
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
// 修改
import {
    APIgetHouseDetailsHouse
} from '@/api/custom/custom.js'
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
import { APIgetPropertyDetails } from '@/api/custom/custom.js'
const showPropertyFunc = val => {
    from_error_property.msg = {}
    property_obj.obj = val
    APIgetPropertyDetails(property_obj.obj.curr_property_id).then(res => {
        property_form.obj = res.data
        copy_property.obj = JSON.parse(JSON.stringify(res.data))
        read_state.value = true
        switch_property.value = true
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    property_form.obj.property_owners.splice(index, 1)
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
    property_form.obj.property_owners.push(data)
}
const from_error_property = reactive({
    msg: {}
})
const read_state = ref(true)
const add_state = ref(false)
const modifyPropertyFunc = val => {
    if (val) {
        from_error_property.msg = {}
        /* property_form.obj = {
            property_owners: [],
            house_id: copy_property.obj.house_id,
            should_bind_house: 1
        } */
        read_state.value = false
        add_state.value = true
    } else {
        from_error_property.msg = {}
        // property_form.obj =  JSON.parse(JSON.stringify(copy_property.obj))
        read_state.value = false
        add_state.value = false
    }
}
const modifycancel = () => {
    read_state.value = true
    add_state.value = false
    property_form.obj =  JSON.parse(JSON.stringify(copy_property.obj))
}
// 同意拒绝提交
import { APIputProperty, APIpostProperty } from '@/api/custom/custom.js'
const postPropertyFunc = () => {
    from_error_property.msg = {}
    if (!add_state.value) {
        APIputProperty(property_form.obj.id, property_form.obj).then(res => {
            if (!res.code) {
                refreshFunc()
                ElMessage.success(res.msg)
                switch_property.value = false
            }
        }).catch(err => {
            from_error_property.msg = err.data
        })
    } else {
        APIpostProperty(property_form.obj).then(res => {
            if (!res.code) {
                refreshFunc()
                ElMessage.success(res.msg)
                switch_property.value = false
            }
        }).catch(err => {
            from_error_property.msg = err.data
        })
    }
}
/* ----------------------------------------------------------------------------------------------------------------------- */
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['type_id_card', 'houseable_type', 'house_has_house', 'house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_status_plan_fact']).then(res => {
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

        .serve-box {
            border: 1px solid #eeeeee;
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
                background-color: #ffffff;
            }
        }
        .property-read-state{
            .el-form-item {
                margin: 0;
            }
        }
    }
    // 覆盖样式
    .el-tree-node__content{
        padding-top:20px;
        padding-bottom: 20px;
    }
</style>
<style lang="scss" scoped>
    .components-house{
        background-color: #ffffff;

        .tree-box {
            border-top: 1px solid #efefef;
            display: flex;
             }

            .tree-item {
                min-width: 300px;
                width: 300px;
                border-right: 1px solid #e9e9e9;

                .tree-title {
                    height: 60px;
                    line-height: 60px;
                    padding-left: 20px;
                    color: #aaaaaa;
                    font-size: 14px;
                    border-bottom: 1px solid #e9e9e9;
                }
            }

            .tree-details {
                flex-grow: 1;
                max-width: calc(100% - 300px);

                .el-cascader-box-my {}

                .bottom-btn-box-2 {
                    margin-bottom: 10px;

                }
            }

    }

    .row-box {
        border-bottom: 1px solid #f2f2f2;
        background-color: #ffffff;
        display: flex;
        .row-item-box {
            display: inline-block;
            box-sizing: border-box;
            padding:6px;
            min-width:84px;
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
                justify-content: space-between;

                .row-item-check {}
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
                background-image: linear-gradient(to top right, #ffffff 49%, #e9e9e9, #ffffff 51%);
                justify-content: space-between;
                cursor: initial;
            }
        }
    }
    .row-box-title{
        .row-item-box{
            .row-item {
                border: 1px solid #ffffff;
            }
        }
    }
    .count{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        font-size: 14px;
        color:#666666;
    }
    .count-item{
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
    }
    .count_item_i1{
        background: #990000;
        color: #FFFFFF;
         border:1px solid #990000
    }
    .count_item_i2{
        background: #2DC26B;
        color: #FFFFFF;
        border:1px solid #2DC26B
    }
    .count_item_i3{
        background: #FF9900;
        color: #FFFFFF;
         border:1px solid #FF9900
    }
    .count_item_i4{
        background: #CCCCCC;
        color: #FFFFFF;
         border:1px solid #CCCCCC
    }
    .tip-title{
        font-size: 14px;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .components-house-units{
        .tree-item {
            display: none;
        }

        .tree-details {
            max-width: 100%;
        }
    }

</style>
