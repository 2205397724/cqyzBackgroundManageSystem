<template>
    <div class="components-house" style="height: 100%;" :class="{'components-house-units':tree_item.type=='units'}">
        <div class="tree-box" style="height: 100%;">
            <div class="tree-item">
                <div style="height: calc(100% - 60px);">
                    <position-tree
                        :tree_item="tree_item"
                        :type="no_zone"
                        @checkFunc="checkFunc"
                    />
                </div>
            </div>
            <div class="tree-details" style="display: flex; flex-direction: column;">
                <div style="height: 100%;">
                    <div :style="{'height':!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'?'100%':'100%'}" style="position: relative;display: flex; flex-direction: column;overflow: scroll;">
                        <div
                            v-if="!active_obj.obj.name||active_obj.obj.type=='region'||active_obj.obj.type=='zone'"
                            style="position: absolute;left: 0;right: 0;z-index: 9;height: 100%;width: 100%;background-color: rgb(255 255 255 / 50%);cursor: not-allowed;"
                        />
                        <div style="padding: 20px 20px 0;box-sizing: border-box;">
                            <div class="search">
                                <el-row>
                                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                        <el-row>
                                            <el-col :sm="4" :xs="6" :md="11" class="search_th">
                                                房屋名称：
                                            </el-col>
                                            <el-col :sm="20" :xs="18" :md="13">
                                                <el-input v-model="data_search.obj.name" class="search_tb" placeholder="名称" />
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                                        <el-row>
                                            <el-col :sm="4" :xs="6" :md="11" class="search_th">
                                                房屋使用状态：
                                            </el-col>
                                            <el-col :sm="20" :xs="18" :md="13">
                                                <el-select
                                                    v-model="data_search.obj.status_use"
                                                    class="search_tb" placeholder="*状态"
                                                    clearable
                                                >
                                                    <el-option
                                                        v-for="(item) in opts_all.obj.house_status_use" :key="item.key"
                                                        :label="item.val" :value="item.key"
                                                    />
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
                                                <el-select
                                                    v-model="data_search.obj.is_bind_property"
                                                    class="search_tb"
                                                    placeholder="是否绑定"
                                                    clearable
                                                >
                                                    <el-option
                                                        v-for="(item) in opts_all.obj.house_has_property" :key="item.key"
                                                        :label="item.val" :value="item.key"
                                                    />
                                                </el-select>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :xs="0" :sm="4" :md="3" :lg="2" />
                                    <el-col :xs="24" :sm="20" :md="21" :lg="22">
                                        <el-button type="primary" :icon="Search" @click="searchFunc">筛选</el-button>
                                        <el-button v-show="switch_search == true" class="m-l-20 m-r-10" :icon="Loading" @click="refreshFunc">重置</el-button>
                                        <span v-show="switch_search == true" class="size-base">
                                            *共搜索到{{ total }}条。
                                        </span>
                                    </el-col>
                                </el-row>
                            </div>
                            <!-- <div v-if="active_obj.obj.type=='units'" class="count p-t-10">
                                <div class="font-grey size-base">户数：<strong class="font-darkgrey size-lg">{{ details_data.obj.cnt_house }} </strong>户</div>
                            </div>
                            <div v-if="active_obj.obj.type=='buildings'" class="count p-t-10">
                                <div class="font-grey size-base">住宅总面积：<strong class="font-darkgrey size-lg">{{ details_data.obj.area_live }}</strong>㎡，</div>
                                <div class="font-grey size-base">住宅总套数：<strong class="font-darkgrey size-lg">{{ details_data.obj.cnt_live }}</strong>套</div>
                            </div> -->
                            <el-row :gutter="10" class="bottom-btn-box-2">
                                <el-col :xs="24">
                                    <el-button class="head-btn" type="primary" @click="addResidentialFunc">添加房屋</el-button>
                                    <el-button class="head-btn" type="success" @click="()=>{switch_files_list=true;refreshFilesListFunc()}">导入房屋</el-button>
                                    <el-button :disabled="choseIDs.arr.length<=0" type="warning" class="head-btn" @click="modifyAllFunc">批量修改</el-button>
                                    <el-button @click="refreshFunc">刷新</el-button>
                                    <!-- <el-button class="head-btn" type="primary" @click="houseBindFunc">房屋绑定申请</el-button> -->
                                </el-col>
                            </el-row>
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
                                    <div v-for="(item,i) in house_num.arr" :key="i" class="row-item-box ">
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
                            <div style="height: calc(100% - 45px);overflow: auto;">
                                <div v-for="(child,j) in house_list.arr" :key="j" class="row-box">
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
                                            <div v-for="(item,i) in child.houses" :key="i" class="row-item-box">
                                                <!-- <div v-for="(item,i) in house_list.arr" :key="i" class="row-item-box"> -->
                                                <div v-show="item.house_num?true:false" class="row-item" style="position: relative;" @click="houseDetailsFunc(item)">
                                                    <el-checkbox
                                                        v-if="checkFH.all[child.floor_truth]&&checkFH.all[child.floor_truth][item.house_num]"
                                                        v-model="checkFH.all[child.floor_truth][item.house_num].val"
                                                        @change="(val)=>{checkFH.all[child.floor_truth][item.house_num].val= val;allClickFunc(child.floor_truth,item.house_num,val)}"
                                                        @click.stop=""
                                                    />
                                                    <!-- <el-popover
                                                        :width="250"
                                                        trigger="hover"

                                                        placement="top"
                                                    >
                                                        <template #reference> -->
                                                    <div class="row-item-check">{{ item.house_num }}#</div>
                                                    <!-- </template>
                                                        <div style="box-sizing: border-box;padding: 4px;">
                                                            <div class="tip-title">房屋：{{ item.name }}</div>
                                                            <div class="tip-title">使用状态：{{ getOptVal(opts_all.obj.house_status_use,item.status_use) }}</div>
                                                            <div class="tip-title">安全状态：{{ getOptVal(opts_all.obj.house_status_safe,item.status_safe) }}</div>
                                                            <div class="tip-title">产权性质：{{ getOptVal(opts_all.obj.house_type_property,item.type_property) }}</div>
                                                            <div class="tip-title">户型：{{ getOptVal(opts_all.obj.house_type_model,item.type_model) }}</div>
                                                            <div>
                                                                <el-button type="primary" plain @click="modifyResidentialFunc(item)">修改</el-button>
                                                                <el-button v-if="item.curr_property" type="warning" plain @click="showPropertyFunc(item)">产权</el-button>
                                                                <el-button type="success" plain @click="showNumbersFunc(item)">成员</el-button>
                                                            </div>
                                                        </div>
                                                    </el-popover> -->
                                                    <el-popconfirm
                                                        title="确定要删除当前项么?"
                                                        cancel-button-type="info"
                                                        @confirm="deleteHouse(item)"
                                                    >
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
                                    <div style="box-sizing: border-box;padding: 4px;">
                                        <!-- <div class="details-box">
                                            <div class="item">
                                                <div class="left">房屋名称</div>
                                                <div class="right">{{ data_details.item.name }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">地址</div>
                                                <div class="right">{{ data_details.item.addr }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">物理楼层</div>
                                                <div class="right">{{ data_details.item.floor_truth }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">名义层</div>
                                                <div class="right">{{ data_details.item.floor_alias }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">房号</div>
                                                <div class="right">{{ data_details.item.house_num }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">房屋id</div>
                                                <div class="right">{{ data_details.item.id }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">创建时间</div>
                                                <div class="right">{{ data_details.item.created_at }}</div>
                                            </div>
                                            <div class="item">
                                                <div class="left">更新时间</div>
                                                <div class="right">{{ data_details.item.updated_at }}</div>
                                            </div>
                                        </div> -->
                                        <table class="table" border="1">
                                            <tr>
                                                <td class="table_td">房屋名称：</td>
                                                <td colspan="3">{{ data_details.item.name }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">地址：</td>
                                                <td colspan="3">{{ data_details.item.addr }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">名义层：</td>
                                                <td>{{ data_details.item.floor_alias }}</td>
                                                <td class="table_td">物理楼层：</td>
                                                <td>{{ data_details.item.floor_truth }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">房号:</td>
                                                <td>{{ data_details.item.house_num }}</td>
                                                <td class="table_td">建筑面积：</td>
                                                <td>{{ data_details.item.area_build }} m²</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">套内面积:</td>
                                                <td>{{ data_details.item.area_inside }} m²</td>
                                                <td class="table_td">分摊面积：</td>
                                                <td>{{ data_details.item.area_share }} m²</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">户型：</td>
                                                <td colspan="3">{{ getOptVal(opts_all.obj.house_type_model,data_details.item.type_model) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">产权性质：</td>
                                                <td colspan="3">{{ getOptVal(opts_all.obj.house_type_property,data_details.item.type_property) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">使用状态：</td>
                                                <td colspan="3">{{ getOptVal(opts_all.obj.house_status_use,data_details.item.status_use) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">安全状态：</td>
                                                <td colspan="3">{{ getOptVal(opts_all.obj.house_status_safe,data_details.item.status_safe) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">规划用途：</td>
                                                <td colspan="3">{{ getOptVal(opts_all.obj.house_status_plan_fact,data_details.item.status_plan) }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">实际用途：</td>
                                                <td colspan="3">{{ getOptVal(opts_all.obj.house_status_plan_fact,data_details.item.status_fact) }}</td>
                                            </tr>
                                            <tr v-if="data_details.item.addition">
                                                <td class="table_td">简介：</td>
                                                <td colspan="3">{{ data_details.item.addition.desc }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">房屋id：</td>
                                                <td colspan="3">{{ data_details.item.id }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">创建时间：</td>
                                                <td colspan="3">{{ data_details.item.created_at }}</td>
                                            </tr>
                                            <tr>
                                                <td class="table_td">更新时间：</td>
                                                <td colspan="3">{{ data_details.item.updated_at }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="4">
                                                    <el-button type="primary" @click="modifyResidentialFunc">修改房屋信息</el-button>
                                                    <!-- <el-button v-if="item.curr_property" type="warning" plain @click="showPropertyFunc(item)">产权</el-button> -->
                                                    <el-button type="warning" @click="showPropertyFunc">产权信息</el-button>
                                                    <el-button type="success" @click="showNumbersFunc">随住人员</el-button>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- <div class="tip-title">房屋：{{ item.name }}</div>
                                                                <div class="tip-title">使用状态：{{ getOptVal(opts_all.obj.house_status_use,item.status_use) }}</div>
                                                                <div class="tip-title">安全状态：{{ getOptVal(opts_all.obj.house_status_safe,item.status_safe) }}</div>
                                                                <div class="tip-title">产权性质：{{ getOptVal(opts_all.obj.house_type_property,item.type_property) }}</div>
                                                                <div class="tip-title">户型：{{ getOptVal(opts_all.obj.house_type_model,item.type_model) }}</div> -->
                                    <div class="m-t-10 m-l-20" />
                                </template>
                            </el-drawer>
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
                        <!-- <el-col :md="24" :lg="12">
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
                        </el-col> -->
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
                                label="套内面积" prop="area_inside"
                                :error="from_error.msg&&from_error.msg.area_inside?from_error.msg.area_inside[0]:''"
                                label-width="140px"
                            >
                                <el-input
                                    v-model="from_examine.item.area_inside"
                                    placeholder=""
                                >
                                    <template #append>m²</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="分摊面积" prop="area_share"
                                :error="from_error.msg&&from_error.msg.area_share?from_error.msg.area_share[0]:''"
                                label-width="140px"
                            >
                                <el-input
                                    v-model="from_examine.item.area_share"
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
                                    <el-option v-for="(item) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
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
                                    <el-option v-for="(item) in opts_all.obj.house_type_property" :key="item.key" :label="item.val" :value="item.key" />
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
                                    <el-option v-for="(item) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
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
                                    <el-option v-for="(item) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
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
                                    <el-option v-for="(item) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
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
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
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
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
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
                        <el-col v-if="from_examine.item.addition" :md="24" :lg="24">
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
                    <span v-for="(item,i) in choseIDs.arr" :key="i" style="display: inline-block;margin-right: 10px;box-sizing: border-box;padding: 8px 16px; font-size: 14px;border-radius: 6px;border: 1px solid #dcdfe6;color: #a8b3cd;">{{ item.name }}</span>
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
                                    <el-option v-for="(item) in opts_all.obj.house_type_model" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="产权性质" prop="type_property"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_property?error_alldetails.msg.type_property[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.type_property" class="head-btn" placeholder="产权性质" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_property" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="楼栋性质" prop="type_building"
                                :error="error_alldetails.msg&&error_alldetails.msg.type_building?error_alldetails.msg.type_building[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.type_building" class="head-btn" placeholder="楼栋性质" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_type_building" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋使用状态" prop="status_use"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_use?error_alldetails.msg.status_use[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_use" class="head-btn" placeholder="房屋使用状态" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_use" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="房屋安全状态" prop="status_safe"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_safe?error_alldetails.msg.status_safe[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_safe" class="head-btn" placeholder="房屋安全状态" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_safe" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="规划用途" prop="status_plan"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_plan?error_alldetails.msg.status_plan[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_plan" class="head-btn" placeholder="实际用途" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="实际用途" prop="status_fact"
                                :error="error_alldetails.msg&&error_alldetails.msg.status_fact?error_alldetails.msg.status_fact[0]:''"
                            >
                                <el-select v-model="piliangxiugai.obj.status_fact" class="head-btn" placeholder="实际用途" clearable>
                                    <el-option v-for="(item) in opts_all.obj.house_status_plan_fact" :key="item.key" :label="item.val" :value="item.key" />
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
            <div style="display: flex; flex-wrap: wrap;">
                <el-button class="head-btn" @click="refreshFilesListFunc">刷新</el-button>
                <el-button class="head-btn" type="success" @click="openFileFunc">导入房屋</el-button>
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
                        <!-- <el-col :md="24" :lg="14">
                            <el-form-item
                                label="直属上级类型" prop="loc" label-width="120px"
                                :error="err_files.obj&&err_files.obj.loc?err_files.obj.loc[0]:''"
                            >
                                <el-select v-model="files_obj.obj.loc" style="width: 100%;" placeholder="直属上级类型" clearable @change="from_examine.item.houseable_id = ''">
                                    <el-option label="楼栋" value="buildings" />
                                    <el-option label="单元" value="units" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="files_obj.obj.loc" :md="24" :lg="14">
                            <el-form-item
                                label="直属楼栋/单元ID" prop="loc_id" label-width="120px"
                                :error="err_files.obj&&err_files.obj.loc_id?err_files.obj.loc_id[0]:''"
                            >
                                <div v-if="files_obj.obj.loc=='buildings'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchBuilding v-model:str="files_obj.obj.loc_id" />
                                </div>
                                <div v-else-if="files_obj.obj.loc=='units'" style="box-sizing: border-box;border-radius: 4px;border: 1px solid #dcdfe6;width: 100%;height: 100%;">
                                    <SearchUnit v-model:str="files_obj.obj.loc_id" />
                                </div>
                            </el-form-item>
                        </el-col> -->
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
        <!-- 产权 -->
        <el-dialog
            v-model="switch_property"
            :title="read_state?'产权详情':add_state?'变更产权':'修改产权'"
            width="70%"
        >
            <div class="m-b-20">
                <el-button :disabled="!(read_state||!add_state)" type="primary" @click="modifyPropertyFunc(true)">变更产权</el-button>
                <el-button :disabled="!(read_state||add_state)" type="primary" @click="modifyPropertyFunc(false)">修改产权</el-button>
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
                            <div v-for="(item,i) in property_form.obj.owners" :key="i" class="serve-box">
                                <el-row>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="姓名" :error="from_error_property.msg&&from_error_property.msg['owners.'+i+'.name']?from_error_property.msg['owners.'+i+'.name'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.name"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.name }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="证件类型" :error="from_error_property.msg&&from_error_property.msg['owners.'+i+'.type_id_card']?from_error_property.msg['owners.'+i+'.type_id_card'][0]:''">
                                            <el-select
                                                v-if="!read_state"
                                                v-model="item.type_id_card" class="head-btn" placeholder=""
                                                clearable
                                            >
                                                <el-option
                                                    v-for="(item) in opts_all.obj.type_id_card" :key="item.key"
                                                    :label="item.val" :value="item.key"
                                                />
                                            </el-select>
                                            <span v-else>{{ item.type_id_card }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="证件号" :error="from_error_property.msg&&from_error_property.msg['owners.'+i+'.id_card']?from_error_property.msg['owners.'+i+'.id_card'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.id_card"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.id_card }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="联系方式" :error="from_error_property.msg&&from_error_property.msg['owners.'+i+'.mobile']?from_error_property.msg['owners.'+i+'.mobile'][0]:''">
                                            <el-input
                                                v-if="!read_state"
                                                v-model="item.mobile"
                                                placeholder=""
                                            />
                                            <span v-else>{{ item.mobile }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="p-b-10">
                                        <el-form-item label-width="80px" label="面积" :error="from_error_property.msg&&from_error_property.msg['owners.'+i+'.area']?from_error_property.msg['owners.'+i+'.area'][0]:''">
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
        <el-dialog
            v-model="switch_numbers"
            title="房屋成员"
            width="70%"
        >
            <div>
                <el-button
                    class="m-b-20 " type="primary" :icon="Plus"
                    @click="addHouseNumberFunc"
                >
                    添加成员
                </el-button>
            </div>
            <div>
                <el-scollbar :height="houseNumbers_list.arr.length>= 8 ? '400': ''">
                    <el-table
                        v-loading="loading_tab"
                        :data="houseNumbers_list.arr"
                        :header-cell-style="{
                            background: '#fbfbfb',
                            color: '#999999',
                            'font-size': '12px',
                        }"
                        style="width: 100%;min-height: 300px;"
                        @select="handleSelectionChange"
                    >
                        <el-table-column
                            size="small"
                            type="selection"
                            align="center" width="55"
                        />
                        <el-table-column prop="name" label="成员姓名">
                            <template #default="scope">
                                <span>{{ scope.row.user?.name }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="身份证号码" width="250">
                            <template #default="scope">
                                <span>{{ scope.row.id_card }} </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="手机号" width="180">
                            <template #default="scope">
                                <span>{{ scope.row.user?.mobile }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="性别">
                            <template #default="scope">
                                <span>{{ getOptVal(opts_all.obj.gender,scope.row.user?.gender) }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scollbar>
            </div>
            <div>
                <el-popconfirm
                    title="确定要删除当前项么?"
                    cancel-button-type="info"
                    @confirm="deleteFunc_2"
                >
                    <template #reference>
                        <el-button type="danger"> 删除 </el-button>
                    </template>
                </el-popconfirm>
            </div>
        </el-dialog>
        <!-- 添加成员 -->
        <el-dialog
            v-model="switch_houseNumber"
            title="添加成员"
            width="50%"
        >
            <div>
                <el-form
                    ref="ruleFormRef"
                    :model="number.item"
                >
                    <el-row :gutter="10">
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="身份证号" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="number.item.id_card"
                                    placeholder=""
                                    @blur="blurIbCard"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="姓名" prop="name"
                                :error="from_error.msg&&from_error.msg.name?from_error.msg.name[0]:''"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="number.item.name"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="姓别" prop="gender"
                                label-width="80px"
                            >
                                <el-select v-model="number.item.gender" class="search_tb" placeholder="请选择" clearable>
                                    <el-option v-for="item in opts_all.obj.gender" :key="item.key" :label="item.val" :value="item.key" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="12">
                            <el-form-item
                                label="手机号" prop="mobile"
                                :error="from_error.msg&&from_error.msg.mobile?from_error.msg.mobile[0]:''"
                                label-width="80px"
                            >
                                <el-input
                                    v-model="number.item.mobile"
                                    placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="备注信息"
                            >
                                <el-input
                                    v-model="number.item.desc"
                                    :autosize="{ minRows: 4, maxRows: 6 }"
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
                    <el-button @click="switch_houseNumber=false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_1()">确定</el-button>
                </div>
            </template>
        </el-dialog>
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

const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
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
    APIgetPersonnelManageList,
    APIpostPersonnelManage,
    APIputPersonnelManage
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
    APIgetHouseimptpl } from '@/api/custom/custom.js'
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
// 同意拒绝提交
import {
    APIputHouseHouse,
    APIpostHouseHouse
} from '@/api/custom/custom.js'
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
const modifyResidentialFunc = () => {
    from_error.msg = {}
    str_title.value = '修改'
    APIgetHouseDetailsHouse(data_details.item.id).then(res => {
        from_examine.item = res
        switch_examine.value = true
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
const showPropertyFunc = () => {
    from_error_property.msg = {}
    property_obj.obj = JSON.parse(JSON.stringify(data_details.item))
    if (property_obj.obj.curr_property) {
        APIgetPropertyDetails(property_obj.obj.curr_property.id).then(res => {
            // if (property_obj.obj.curr_property) {
            property_form.obj = res
            copy_property.obj = JSON.parse(JSON.stringify(res))
            // } else {

            // }

        })
    } else {
        property_form.obj = { house_id: property_obj.obj.id }
        copy_property.obj = { house_id: property_obj.obj.id }
    }
    read_state.value = true
    switch_property.value = true
}
// 房屋成员
import {
    APIgetHouseNumbersSort,
    APIpostHouseNumbers,
    APIdeleteHouseNumbers
} from '@/api/custom/custom.js'
const houseNumbers_list = reactive({
    arr: []
})
const loading_tab = ref(true)
const switch_numbers = ref(false)
const switch_houseNumber = ref(false)
const number = reactive({
    item: {}
})
const house_id = ref('')
const showNumbersFunc = () => {
    house_id.value = data_details.item.id
    getHouseNumbersFunc()
}
const getHouseNumbersFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value,
        hid: house_id.value
    }
    loading_tab.value = true
    APIgetHouseNumbersSort(params).then(res => {
        houseNumbers_list.arr = res
        loading_tab.value = false
        switch_numbers.value = true
    })

}
const personnelsManage = reactive({
    item: {}
})
// 添加成员
const addHouseNumberFunc = () => {

    switch_houseNumber.value = true
    number.item = {}
}
const dialogExamineCloseFunc_1 = () => {
    if (flag.value == true) {
        APIputPersonnelManage(number.item.id, number.item).then(res => {
            getHouseNumbersFunc()
        })
    } else {
        APIpostPersonnelManage(number.item).then(res => {
            getHouseNumbersFunc()
        })
    }
    number.item.hid = house_id.value
    APIpostHouseNumbers(number.item).then(res => {
        ElMessage.success('添加成功')
        getHouseNumbersFunc()

    }).catch(err => {
        ElMessage.error('添加失败')
    })

    switch_houseNumber.value = false
}
const number_ids = reactive({
    arr: []
})
const flag = ref(false)
const handleSelectionChange = val => {
    let number_id = []
    val.forEach(function(value, index, array) {
        number_id.push(value.id)
        number_ids.arr = number_id
    })
}
const blurIbCard = () => {
    if (number.item.id_card) {
        let params = {
            page: 1,
            per_page: 500
        }
        if (number.item.id_card) {
            params.id_card = number.item.id_card
        } else {
            params = {}
        }
        APIgetPersonnelManageList(params).then(res => {
            if (res.length > 0) {
                flag.value = true
                number.item = res[0]
            // number.item=
            } else {
                flag.value = false
            }
        })
    }
}
// 删除成员
const deleteFunc_2 = () => {
    APIdeleteHouseNumbers({ data: { ids: number_ids.arr } }).then(res => {
        ElMessage.success('删除成功')
        getHouseNumbersFunc()
    })
}
// 删除 服务名称和联系方式
const deleteServiceFunc = index => {
    property_form.obj.owners.splice(index, 1)
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
    if (!property_form.obj.owners) {
        property_form.obj.owners = []
    }
    property_form.obj.owners.push(data)
}
const from_error_property = reactive({
    msg: {}
})
const read_state = ref(true)
const add_state = ref(false)
const modifyPropertyFunc = val => {
    if (val) {
        from_error_property.msg = {}
        property_form.obj = {
            owners: [],
            house_id: copy_property.obj.house_id,
            should_bind_house: 1
        }
        read_state.value = false
        add_state.value = true
    } else {
        from_error_property.msg = {}
        property_form.obj =  JSON.parse(JSON.stringify(copy_property.obj))
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
import { APIputProperty, APIpostProperty,
    APIdeleteHouseHouse } from '@/api/custom/custom.js'
const postPropertyFunc = () => {
    from_error_property.msg = {}
    if (!add_state.value) {
        APIputProperty(property_form.obj.id, property_form.obj).then(res => {
            refreshFunc()
            ElMessage.success('修改成功')
            switch_property.value = false
        }, err => {
            console.log(err)
        })
    } else {
        APIpostProperty(property_form.obj).then(res => {
            refreshFunc()
            ElMessage.success('添加成功')
            switch_property.value = false
        }).catch(err => {
            from_error_property.msg = err.data
        })
    }
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
const data_details = reactive({
    item: {}
})
const houseDetailsFunc = row => {
    data_details.item = row
    drawer.value = true
}
// 删除房屋
const deleteHouse = val => {
    APIdeleteHouseHouse(val.id).then(res => {
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
getOpts(['status_all', 'gender', 'type_id_card', 'houseable_type', 'house_has_house', 'house_has_property', 'house_type_model', 'house_type_property', 'house_type_building', 'house_status_use', 'house_status_safe', 'house_status_plan_fact']).then(res => {
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
            border: 1px solid #eee;
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
                background-color: #fff;
            }
        }
        .property-read-state {
            .el-form-item {
                margin: 0;
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
table tr td {
    padding: 10px;
}
.table_td {
    color: #72767b;
}
.table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #efefef;
    font-size: 14px;
}
:deep .el-drawer__header {
    margin-bottom: 0;
}
</style>
