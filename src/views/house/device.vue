<template>
    <div class="articletparticletpl">
        <page-main class="hidden">
            <div class="m-b-20">
                <el-button type="primary" :icon="Plus" size="large" @click="addResidentialFunc">添加设备</el-button>
            </div>
            <!-- <div :class="{search3: isSearch3,search2: isSearch2}"> -->
            <div class="search">
                <el-row>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                设备名称：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-input
                                    v-model="data_search.obj.name" class="search_tb" placeholder="设备名称"
                                    clearable
                                />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                设备类型：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select v-model="data_search.obj.type" class="search_tb" placeholder="类型" clearable>
                                    <el-option
                                        v-for="(item) in opts_all.obj.device_type" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                状态：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select
                                    v-model="data_search.obj.status" class="search_tb" placeholder="状态"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item) in opts_all.obj.device_status" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="btnClick == true">
                    <el-col :xs="24" :md="12" :lg="8" class="m-b-20">
                        <el-row>
                            <el-col :sm="4" :xs="6" :md="6" class="search_th">
                                是否启用：
                            </el-col>
                            <el-col :sm="20" :xs="18" :md="18">
                                <el-select
                                    v-model="data_search.obj.show" class="search_tb" placeholder="是否显示"
                                    clearable
                                >
                                    <el-option
                                        v-for="(item, i) in opts_all.obj.device_show" :key="i" :label="item.val"
                                        :value="item.key"
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
                <el-row>
                    <div class="searchPlay" @click="btnClickFunc">
                        <!-- <el-icon :size="20"><ArrowUpBold /></el-icon> -->
                        <el-button v-if="btnClick == false" :icon="CaretBottom" class="searchDeal" size="small">
                            展开
                        </el-button>
                        <el-button v-if="btnClick == true" :icon="CaretTop" class="searchDeal" size="small">
                            收起
                        </el-button>
                    </div>
                </el-row>
            </div>
            <div>
                <el-table
                    :data="data_tab.arr"
                    :header-cell-style="{ background: '#fbfbfb', color: '#999999', 'font-size': '12px' }" class="tab_1"
                >
                    <el-table-column prop="id" label="设备名称" width="180">
                        <template #default="scope">
                            <span>{{ scope.row.name }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="设备编号">
                        <template #default="scope">
                            <span>{{ scope.row.sno }} </span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="id" label="所在位置">
                        <template #default="scope">
                            <span>{{ scope.row.zoneinfo.name }} {{ scope.row.buildinginfo.name }} {{ scope.row.unitinfo.name }} </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="cid" label="类型" width="90">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.device_type, scope.row.type) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="是否显示" width="90">
                        <template #default="scope">
                            <span>{{ getOptVal(opts_all.obj.device_show, scope.row.show) }} </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cid" label="状态" width="90">
                        <template #default="scope">
                            <el-tag v-show="scope.row.status == 1" class="btnNone" type="success" size="small">
                                正常
                            </el-tag>
                            <el-tag v-show="scope.row.status == 2" class="btnNone noDeal" type="danger" size="small">
                                故障
                            </el-tag>
                            <el-tag v-show="scope.row.status == 3" class="btnNone" type="warning" size="small">
                                维修
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="档案" width="90">
                        <template #default="scope">
                            <el-tag
                                class="btnNone" type="primary" size="small" effect="dark"
                                @click="deviceArchive(scope.row)"
                            >
                                档案
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="维保记录" width="120">
                        <template #default="scope">
                            <el-tag
                                class="btnNone" type="primary" size="small" effect="dark"
                                @click="deviceRepair(scope.row)"
                            >
                                维保记录
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="modifyResidentialFunc(scope.row)">
                                修改
                            </el-button>
                            <el-button size="small" @click="detailsFunc(scope.row)">
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
            <el-pagination
                v-model:current-page="page" style="float: right;" layout="prev,next,jumper," :total="50"
                :page-size="per_page" background prev-text="上一页" next-text="下一页" hide-on-single-page
            />
        </page-main>
        <!-- 修改添加 -->
        <el-dialog v-model="switch_examine" :title="str_title" width="50%">
            <div>
                <el-form ref="ruleFormRef" :model="from_examine.item">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="设备名称" label-width="90px"
                                :error="from_error.msg && from_error.msg.name ? from_error.msg.name[0] : ''"
                            >
                                <el-input v-model="from_examine.item.name" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="所属位置" label-width="90px"
                                :error="from_error.msg && from_error.msg.zone ? from_error.msg.zone[0] : ''"
                            >
                                <BerZone
                                    v-model:zid="from_examine.item.zone" v-model:bid="from_examine.item.building"
                                    v-model:uid="from_examine.item.unit" v-model:name="chinaName"
                                    :disabled="[0, 1, 2, 3, 4, 5]" :code="''"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="详细地址" label-width="90px"
                                :error="from_error.msg && from_error.msg.addr ? from_error.msg.addr[0] : ''"
                            >
                                <el-input v-model="from_examine.item.addr" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="编号" label-width="90px"
                                :error="from_error.msg && from_error.msg.sno ? from_error.msg.sno[0] : ''"
                            >
                                <el-input v-model="from_examine.item.sno" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="品牌" label-width="90px"
                                :error="from_error.msg && from_error.msg.brand ? from_error.msg.brand[0] : ''"
                            >
                                <el-input v-model="from_examine.item.brand" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="提醒信息" label-width="90px"
                                :error="from_error.msg && from_error.msg.warn ? from_error.msg.warn[0] : ''"
                            >
                                <el-input v-model="from_examine.item.warn" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="设备类型" label-width="90px"
                                :error="from_error.msg && from_error.msg.type ? from_error.msg.type[0] : ''"
                            >
                                <el-select v-model="from_examine.item.type" class="head-btn" placeholder="" clearable>
                                    <el-option
                                        v-for="(item, i) in opts_all.obj.device_type" :key="i" :label="i"
                                        :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="设备状态" label-width="90px"
                                :error="from_error.msg && from_error.msg.status ? from_error.msg.status[0] : ''"
                            >
                                <el-select v-model="from_examine.item.status" class="head-btn" placeholder="" clearable>
                                    <el-option
                                        v-for="(item, i) in opts_all.obj.device_status" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否显示" label-width="90px"
                                :error="from_error.msg && from_error.msg.show ? from_error.msg.show[0] : ''"
                            >
                                <el-switch
                                    v-model="from_examine.item.show" class="head-btn" inline-prompt
                                    :active-value="1" :inactive-value="0" active-text="是" inactive-text="否"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div class="m-b-10">
                                <el-button type="primary" plain @click="addServiceFunc">添加自定义字段</el-button>
                            </div>
                            <div v-for="(item, i) in from_examine.item.extra" :key="i" class="serve-box">
                                <el-row :gutter="10" class="p-t-20">
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item
                                            label="字段名"
                                            :error="from_error.msg && from_error.msg['extra.' + i + '.lab'] ? from_error.msg['extra.' + i + '.lab'][0] : ''"
                                        >
                                            <el-input v-model="item.lab" placeholder="" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12">
                                        <el-form-item
                                            label="字段内容"
                                            :error="from_error.msg && from_error.msg['extra.' + i + '.val'] ? from_error.msg['extra.' + i + '.val'][0] : ''"
                                        >
                                            <el-input v-model="item.val" placeholder="" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="delete-service" @click="deleteServiceFunc(i)">
                                    <el-icon :size="20" color="#F56C6C">
                                        <el-icon-circle-close />
                                    </el-icon>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="switch_examine = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog v-model="switch_details" title="详情" width="60%" @closed="closeDialog">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="设备信息" name="1">
                    <el-scrollbar height="452px">
                        <div class="details-box">
                            <div class="details-tit-sm">基础信息</div>
                            <div class="item">
                                <div class="left">设备名称</div>
                                <div class="right">{{ data_details.item.name }}</div>
                            </div>
                            <div class="item">
                                <div class="left">所属位置</div>
                                <div class="right">
                                    <span>{{ zoneName.name }}</span>
                                    <span
                                        v-if="data_details.item.building !== '' && data_details.item.buildinginfo !== null"
                                        style="margin-right: 15px; margin-left: 15px;"
                                    >{{ buildingName.name }}</span>
                                    <span v-if="data_details.item.unit !== '' && data_details.item.unitinfo !== null">{{
                                        unitName.name
                                    }}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="left">详细地址</div>
                                <div class="right">{{ data_details.item.addr }}</div>
                            </div>
                            <div class="item">
                                <div class="left">编号</div>
                                <div class="right">{{ data_details.item.sno }}</div>
                            </div>
                            <div class="item">
                                <div class="left">品牌</div>
                                <div class="right">{{ data_details.item.brand }}</div>
                            </div>
                            <div class="item">
                                <div class="left">提醒信息</div>
                                <div class="right">{{ data_details.item.warn }}</div>
                            </div>
                            <div class="item">
                                <div class="left">类型</div>
                                <div class="right">
                                    {{ getOptVal(opts_all.obj.device_type, data_details.item.type) }}
                                </div>
                            </div>
                            <div class="item">
                                <div class="left">状态</div>
                                <div class="right">
                                    <el-tag
                                        v-show="data_details.item.status == 1" class="btnNone" type="success"
                                        size="small"
                                    >
                                        正常
                                    </el-tag>
                                    <el-tag
                                        v-show="data_details.item.status == 2" class="btnNone noDeal" type="danger"
                                        size="small"
                                    >
                                        故障
                                    </el-tag>
                                    <el-tag
                                        v-show="data_details.item.status == 3" class="btnNone" type="warning"
                                        size="small"
                                    >
                                        维修
                                    </el-tag>
                                </div>
                            </div>
                            <div class="item">
                                <div class="left">是否显示</div>
                                <div class="right">
                                    {{ getOptVal(opts_all.obj.device_show, data_details.item.show) }}
                                </div>
                            </div>
                            <div
                                v-for="(item, i) in data_details.item.extra" v-if="data_details.item.extra" :key="i"
                                class="item"
                            >
                                <div class="left">{{ item.lab }}</div>
                                <div class="right">{{ item.val }}</div>
                            </div>
                            <div class="details-tit-sm">其他信息</div>
                            <div class="item">
                                <div class="left">设备id</div>
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
                        </div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="档案信息" name="2">
                    <el-button type="primary" class="m-b-20" :icon="Plus" @click="addArchiveFunc">添加档案</el-button>
                    <el-scrollbar height="400px">
                        <div>
                            <el-timeline style="padding: 1px;">
                                <el-timeline-item
                                    v-for="(item, index) in data_archive.arr" :key="index"
                                    :timestamp="item.created_at" placement="top" :type="index == 0 ? 'primary' : ''"
                                >
                                    <div class="put_del">
                                        <el-button type="primary" size="small" @click="modifyArchiveFunc(item)">
                                            修改
                                        </el-button>
                                        <el-popconfirm
                                            title="确定要删除当前项么?" cancel-button-type="info"
                                            @confirm="deleteArchiveFunc(item)"
                                        >
                                            <template #reference>
                                                <el-button type="danger" size="small">
                                                    删除
                                                </el-button>
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">档案名称</div>
                                                <div class="right">
                                                    <span>{{ item.title }}</span>
                                                    <el-tag
                                                        v-if="item.show == 1" type="primary" size="small"
                                                        class="m-l-10"
                                                    >
                                                        {{ getOptVal(opts_all.obj.device_show, item.show)
                                                        }}
                                                    </el-tag>
                                                    <el-tag
                                                        v-if="item.show == 0" type="info" size="small"
                                                        class="m-l-10"
                                                    >
                                                        {{ getOptVal(opts_all.obj.device_show, item.show)
                                                        }}
                                                    </el-tag>
                                                </div>
                                            </div>
                                            <div v-if="item.content && item.content.length >= 1" class="item">
                                                <div class="left">附件</div>
                                                <div class="right flx">
                                                    <div v-for="(val, i) in item.content" :key="i" class="inline-block">
                                                        <div v-for="(row, j) in val.key" v-if="val.type == 'file'" class="inline-block image m-r-10" style="text-align: center; background-color: #f0f9eb; vertical-align: center;">
                                                            <el-link type="success" class="link" :href="VITE_APP_FOLDER_SRC+row" target="_blank">{{ val.name }}</el-link>
                                                        </div>
                                                        <!-- <el-tag
                                                            v-if="val.type == 'file'" type="success" size="small"
                                                            class="m-r-10"
                                                        >
                                                            {{ val.name }}
                                                        </el-tag> -->
                                                        <el-image
                                                            v-for="(row, j) in val.key" v-if="val.type == 'image'"
                                                            :preview-src-list="val.keys"
                                                            class="image m-r-10 m-l-10" :src="VITE_APP_FOLDER_SRC + row"
                                                            fit="cover"
                                                        />
                                                        <vue3VideoPlay
                                                            v-for="(row, j) in val.key"
                                                            v-if="val.type == 'audio'" v-bind="optionsAll"
                                                            :src="VITE_APP_FOLDER_SRC + row" class="image m-r-10"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="data_archive.arr.length <= 0" class="size-lg">此设备无档案信息</div>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="维保记录" name="3">
                    <el-button type="primary" class="m-b-20" :icon="Plus" @click="addRepairFunc">添加维修</el-button>

                    <el-scrollbar height="400px">
                        <div>
                            <el-timeline style="padding: 1px;">
                                <el-timeline-item
                                    v-for="(item, index) in data_repair.arr" :key="index"
                                    :type="index == 0 ? 'primary' : ''" :timestamp="item.created_at" placement="top"
                                >
                                    <div class="put_del">
                                        <el-button type="primary" size="small" @click="modifyRepairFunc(item)">
                                            修改
                                        </el-button>
                                        <el-popconfirm
                                            title="确定要删除当前项么?" cancel-button-type="info"
                                            @confirm="deleteRepairFunc(item)"
                                        >
                                            <template #reference>
                                                <el-button type="danger" size="small">
                                                    删除
                                                </el-button>
                                            </template>
                                        </el-popconfirm>
                                    </div>
                                    <el-card>
                                        <div class="details-box">
                                            <div class="item">
                                                <div class="left">维保名称</div>
                                                <div class="right">
                                                    <span>{{ item.title }}</span>
                                                    <el-tag
                                                        v-if="item.type == 1" type="primary" size="small"
                                                        class="m-l-10"
                                                    >
                                                        {{ getOptVal(opts_all.obj.repair_type, item.type)
                                                        }}
                                                    </el-tag>
                                                    <el-tag
                                                        v-if="item.type == 0" type="primary" size="small"
                                                        class="m-l-10"
                                                    >
                                                        {{ getOptVal(opts_all.obj.repair_type, item.type)
                                                        }}
                                                    </el-tag>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="left">资金来源</div>
                                                <div class="right">
                                                    <span class="m-r-10">{{
                                                        getOptVal(opts_all.obj.device_repair_money_src, item.money_src)
                                                    }}</span>
                                                    <span class="m-r-10">{{ item.money }} 元</span>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="left">详细记录</div>
                                                <div class="right">{{ item.content }}</div>
                                            </div>
                                            <div v-if="item.affix && item.affix.length >= 1" class="item">
                                                <div class="left">
                                                    附件
                                                </div>

                                                <div class="right">
                                                    <!-- 两种模式任君选择 -->
                                                    <el-image
                                                        v-for="(j, i) in item.affix" :key="i"
                                                        :preview-src-list="item.affixs" class="wh_100p m-r-10"
                                                        :src="VITE_APP_FOLDER_SRC + j" fit="cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                        <div v-show="data_repair.arr.length <= 0" class="size-lg">此设备无维保记录</div>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="switch_details = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 档案修改添加 -->
        <el-dialog v-model="addArchive.switch" :title="str_title_2" width="50%" @closed="dialogClosed">
            <div>
                <el-form ref="ruleFormRef" :model="from_examine.item">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="档案名称" label-width="70px"
                                :error="from_error.msg && from_error.msg.title ? from_error.msg.title[0] : ''"
                            >
                                <el-input v-model="addArchive.item.title" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否显示" label-width="70px"
                                :error="from_error.msg && from_error.msg.show ? from_error.msg.show[0] : ''"
                            >
                                <el-switch
                                    v-model="addArchive.item.show" class="head-btn" inline-prompt
                                    :active-value="1" :inactive-value="0" active-text="是" inactive-text="否"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <div class="m-b-10">
                                <el-button type="primary" plain @click="addServiceFunc_1">添加档案内容</el-button>
                            </div>
                            <div>
                                <div v-for="(item, i) in addArchive.item.content" :key="i" class="serve-box">
                                    <el-row :gutter="10">
                                        <el-col :xs="24" :sm="24">
                                            <el-form-item
                                                label-width="70px" label="附件"
                                                :error="from_error.msg && from_error.msg['content.' + i + '.key'] ? from_error.msg['content.' + i + '.key'][0] : ''"
                                            >
                                                <el-upload
                                                    multiple action="***" :auto-upload="false"
                                                    :file-list="item.key" :on-change="(file, files) => {
                                                        item.key = files
                                                    }" :on-remove="(file, files) => {
                                                        item.key = files
                                                    }"
                                                >
                                                    <el-button type="primary">选择附件</el-button>
                                                </el-upload>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24">
                                            <el-form-item
                                                label-width="70px" label="文件类型"
                                                :error="from_error.msg && from_error.msg['content.' + i + '.type'] ? from_error.msg['content.' + i + '.type'][0] : ''"
                                            >
                                                <el-radio-group v-model="item.type" class="ml-4">
                                                    <el-radio label="image">图片</el-radio>
                                                    <el-radio label="file">文件</el-radio>
                                                    <el-radio label="audio">音频</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24">
                                            <el-form-item
                                                label-width="70px" label="文件名"
                                                :error="from_error.msg && from_error.msg['content.' + i + '.name'] ? from_error.msg['content.' + i + '.name'][0] : ''"
                                            >
                                                <el-input v-model="item.name" placeholder="" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <div class="delete-service" @click="deleteServiceFunc_1(i)">
                                        <el-icon :size="20" color="#F56C6C">
                                            <el-icon-circle-close />
                                        </el-icon>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="addArchive.switch = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_2(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 维保修改添加 -->
        <el-dialog v-model="addRepair.switch" :title="str_title_1" width="50%" @closed="dialogClosed">
            <div>
                <el-form ref="ruleFormRef" :model="addRepair.item">
                    <el-row :gutter="10">
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="维保名称" label-width="70px"
                                :error="from_error.msg && from_error.msg.title ? from_error.msg.title[0] : ''"
                            >
                                <el-input v-model="addRepair.item.title" class="head-btn" />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="类型" label-width="70px"
                                :error="from_error.msg && from_error.msg.type ? from_error.msg.type[0] : ''"
                            >
                                <el-select v-model="addRepair.item.type" class="head-btn" placeholder="" clearable>
                                    <el-option
                                        v-for="item in opts_all.obj.repair_type" :key="item.key"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="资金来源" label-width="70px"
                                :error="from_error.msg && from_error.msg.title ? from_error.msg.title[0] : ''"
                            >
                                <el-select v-model="addRepair.item.money_src" class="head-btn" placeholder="" clearable>
                                    <el-option
                                        v-for="(item, i) in opts_all.obj.device_repair_money_src" :key="i"
                                        :label="item.val" :value="item.key"
                                    />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="使用金额" label-width="70px"
                                :error="from_error.msg && from_error.msg.money ? from_error.msg.money[0] : ''"
                            >
                                <el-input v-model="addRepair.item.money" class="head-btn">
                                    <template #append>元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                            <el-form-item
                                label="是否显示" label-width="70px"
                                :error="from_error.msg && from_error.msg.show ? from_error.msg.show[0] : ''"
                            >
                                <el-switch
                                    v-model="addRepair.item.show" class="head-btn" inline-prompt
                                    :active-value="1" :inactive-value="0" active-text="是" inactive-text="否"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item
                                label-width="70px" label="附件"
                                :error="from_error.msg && from_error.msg.affix ? from_error.msg.affix[0] : ''"
                            >
                                <el-upload
                                    action="***" :auto-upload="false" :file-list="file_list" :on-change="(file, files) => {
                                        file_list = files
                                    }" :on-remove="(file, files) => {
                                        file_list = files
                                    }"
                                >
                                    <el-button type="primary">选择附件</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24">
                            <el-form-item
                                label="详细记录" label-width="70px"
                                :error="from_error.msg && from_error.msg.content ? from_error.msg.content[0] : ''"
                            >
                                <el-input
                                    v-model="addRepair.item.content" :autosize="{ minRows: 2, maxRows: 6 }"
                                    type="textarea" placeholder=""
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <template #footer>
                <div class="footer">
                    <el-button @click="addRepair.switch = false">取消</el-button>
                    <el-button type="primary" @click="dialogExamineCloseFunc_1(ruleFormRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import {
    APIgetDeviceList,
    APIgetDeviceDetails,
    APIdeleteDevice,
    APIputDevice,
    APIpostDevice
} from '@/api/custom/custom.js'
import {
    reactive,
    ref,
    watch
} from 'vue'
import {
    ElMessage
} from 'element-plus'

import { Loading, Search, Plus, CaretTop, CaretBottom } from '@element-plus/icons-vue'
/* ----------------------------------------------------------------------------------------------------------------------- */
// 数据
// 搜索
// 音频
const optionsAll = reactive({
    width: '500px', // 播放器高度
    height: '260px', // 播放器高度
    color: '#409eff', // 主题色
    control: false, // 是否显示控制器
    title: '', // 视频名称
    poster: ''
})
let switch_search = ref(false)
let data_search = reactive({ obj: {} })
// 详情
let switch_details = ref(false)
// 列表
let ruleFormRef = ref('')
// let loading_tab = ref(false)
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
const data_archive = reactive({
    arr: []
})
const data_repair = reactive({
    arr: []
})
const zoneName = ref('')
const buildingName = ref('')
const unitName = ref('')
// 分页
let total = ref(100)
let per_page = ref(15)
let page = ref(1)
// 添加，修改
let switch_examine = ref(false)
let from_examine = reactive({
    item: {
        extra: []
    }
})
const str_title = ref('添加')
const from_error = reactive({
    msg: {}
})
const activeName = ref('1')
// 配置项
import { getOpts, getOptVal } from '@/util/opts.js'
const opts_all = reactive({
    obj: {}
})
getOpts(['illegal_user', ' device_repair_money_src', 'illegal_type', 'device_status', 'device_type', 'device_show', 'kind', 'repair_type', 'device_show']).then(res => {
    console.log(res)
    opts_all.obj = res
})
import {
    APIgetTypeList
} from '@/api/custom/custom.js'
const options = reactive({ arr: [] })
APIgetTypeList('announce').then(res => {
    options.arr = res
})
/* ----------------------------------------------------------------------------------------------------------------------- */
// 方法
let btnClick = ref(false)
const isSearch3 = ref(false)
const isSearch2 = ref(true)
const btnClickFunc = () => {
    btnClick.value = !btnClick.value
    // isSearch3.value = !isSearch3.value
    // isSearch2.value = !isSearch2.value
}
// 获取列表api请求
const getTabListFunc = () => {
    let params = {
        page: page.value,
        per_page: per_page.value
    }
    for (let key in data_search.obj) {
        if (data_search.obj[key] || data_search.obj[key] === 0) {
            if (data_search.obj[key] instanceof Array && data_search.obj[key].length <= 0) {
                continue
            }
            params[key] = data_search.obj[key]
        }
    }
    if (params.time_deal) {
        let updated_str = ''
        for (let i in params.time_deal) {
            updated_str += ',' + params.time_deal[i]
        }
        params.time_deal = updated_str.substring(1)
    }
    if (params.created_at) {
        let updated_str = ''
        for (let i in params.created_at) {
            updated_str += ',' + params.created_at[i]
        }
        params.created_at = updated_str.substring(1)
    }
    if (params.updated_at) {
        let updated_str = ''
        for (let i in params.updated_at) {
            updated_str += ',' + params.updated_at[i]
        }
        params.updated_at = updated_str.substring(1)
    }
    // loading_tab.value = true
    APIgetDeviceList(params).then(res => {
        console.log(res)
        // loading_tab.value = false
        data_tab.arr = res
        total.value = res.length
        let btnNext = document.querySelector('.btn-next')
        if (res.length <= per_page.value) {
            flag.value = true
            btnNext.classList.add('not_allowed')
            btnNext.setAttribute('disabled', true)
            btnNext.setAttribute('aria-disabled', true)
        } else {
            flag.value = false
            btnNext.classList.remove('not_allowed')
            btnNext.removeAttribute('disabled')
            btnNext.setAttribute('aria-disabled', false)
        }
    })
}
const flag = ref(false)
// 搜索
const searchFunc = () => {
    page.value = 1
    switch_search.value = true
    getTabListFunc()
}
// 刷新
const refreshFunc = () => {
    page.value = 1
    switch_search.value = false
    data_search.obj = {}
    getTabListFunc()
}
const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_FOLDER_SRC)
// const VITE_APP_FOLDER_SRC = ref(import.meta.env.VITE_APP_UPLOAD )
// 详情
const getDetailsFunc = val => {
    data_dialog.obj = val
    APIgetDeviceDetails(val.id).then(res => {
        data_details.item = res
        switch_details.value = true
        console.log(data_details.item)
        zoneName.value = data_details.item.zoneinfo
        buildingName.value = data_details.item.buildinginfo
        unitName.value = data_details.item.unitinfo
    })
    let params = {
        page: page.value,
        per_page: per_page.value,
        did: val.id

    }
    APIgetDeviceArchiveList(params).then(res => {
        console.log(res)
        for (let x in res) {
            for (let y in res[x].content) {
                res[x].content[y].keys = []
                for (let z in res[x].content[y].key) {
                    res[x].content[y].keys.push(VITE_APP_FOLDER_SRC.value + res[x].content[y].key[z])
                }
            }
            data_archive.arr = res
            switch_details.value = true
        }
    })
    let params1 = {
        page: page.value,
        per_page: per_page.value,
        did: val.id
    }
    APIgetDeviceRepairList(params1).then(res => {
        for (let i in res) {
            res[i].affixs = []
            for (let j in res[i].affix) {
                res[i].affixs.push(VITE_APP_FOLDER_SRC.value + res[i].affix[j])
            }
        }
        for (let i in res) {
            if (res[i].money) {
                res[i].money = parseInt(res[i].money) / 100
            }
        }
        data_repair.arr = res
        console.log(res)
        switch_details.value = true
    })

}
const detailsFunc = val => {
    getDetailsFunc(val)
}
// 关闭详情对话框
const closeDialog = () => {
    activeName.value = '1'
}
import {
    APIgetDeviceArchiveList
} from '@/api/custom/custom.js'
// 档案信息
const deviceArchive = val => {
    activeName.value = '2'
    getDetailsFunc(val)
}
import {
    APIgetDeviceRepairList

} from '@/api/custom/custom.js'
// 维保记录
const deviceRepair = val => {
    activeName.value = '3'
    getDetailsFunc(val)
}
// 监听分页
watch(page, () => {
    refreshFunc()
}, { immediate: true, deep: true })
// 同意拒绝提交
const dialogExamineCloseFunc = formEl => {
    // console.log(formEl);
    from_error.msg = {}
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            if (str_title.value == '修改') {
                APIputDevice(from_examine.item.id, from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('修改成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('修改失败')
                })
            } else {
                APIpostDevice(from_examine.item).then(res => {
                    refreshFunc()
                    ElMessage.success('添加成功')
                    switch_examine.value = false
                }).catch(err => {
                    ElMessage.error('添加失败')
                })
            }
        } else {
            return false
        }
    })
}
// 删除
const deleteFunc = val => {
    APIdeleteDevice(val.id).then(res => {
        refreshFunc()
        ElMessage.success('删除成功')
    })
}
const chinaName = ref('')
// 添加模板
const addResidentialFunc = () => {
    chinaName.value = '请选择区域'
    from_error.msg = {}
    str_title.value = '添加'
    from_examine.item = {
        extra: []
    }
    console.log(typeof (from_examine.item.extra))
    switch_examine.value = true
}
// 修改
const modifyResidentialFunc = val => {
    chinaName.value = '请点击选择区域'
    from_error.msg = {}
    str_title.value = '修改'
    APIgetDeviceDetails(val.id).then(res => {
        if (res.unit == '') {
            delete res.unit
        }
        from_examine.item = res
        switch_examine.value = true
    })
}
// 删除
const deleteServiceFunc_1 = index => {
    addArchive.item.content.splice(index, 1)
}
const deleteServiceFunc = index => {
    from_examine.item.extra.splice(index, 1)
}
// 添加
const addServiceFunc = index => {
    let data = {
        'lab': '',
        'val': ''
    }
    console.log(typeof (from_examine.item.extra))
    from_examine.item.extra.push(data)
}
// 维保
// 添加
import {
    APIpostDeviceRepair,
    APIputDeviceRepair,
    APIgetDeviceRepairDetails,
    APIdeleteDeviceRepair
} from '@/api/custom/custom.js'
const file_list = ref([])
const addRepair = reactive({
    item: {},
    switch: false
})
const str_title_1 = ref('添加')
const addRepairFunc = () => {
    from_error.msg = {}
    str_title_1.value = '添加'
    addRepair.item = {
        extra: []
    }
    addRepair.item.did = data_details.item.id
    file_list.value = []
    addRepair.switch = true
}
const modifyRepairFunc = val => {
    from_error.msg = {}
    str_title_1.value = '修改'
    APIgetDeviceRepairDetails(val.id).then(res => {
        addRepair.item = res
        addRepair.item.money = parseInt(addRepair.item.money) / 100
        addRepair.item.did = data_details.item.id
        let arr = []
        for (let i in res.affix) {
            if (res.affix[i]) {
                arr.push({
                    name: res.affix[i]
                })
            }
        }
        console.log(arr)
        file_list.value = arr
        addRepair.switch = true
    })
}
import { getFilesKeys } from '@/util/files.js'
// 同意拒绝提交
const fromFnUpload = () => {
    addRepair.item.money = parseInt(addRepair.item.money) * 100
    if (str_title_1.value == '修改') {
        APIputDeviceRepair(addRepair.item.id, addRepair.item).then(res => {
            getDetailsFunc(data_details.item)
            ElMessage.success('修改成功')
            addRepair.switch = false
        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostDeviceRepair(addRepair.item).then(res => {
            getDetailsFunc(data_details.item)
            ElMessage.success('添加成功')
            addRepair.switch = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const dialogExamineCloseFunc_1 = () => {
    from_error.msg = {}
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
    addRepair.item.affix = file_key
    if (files.length > 0) {
        getFilesKeys(files, 'folder').then(arr => {
            addRepair.item.affix = file_key.concat(arr)
            fromFnUpload()
        })
        return false
    }
    fromFnUpload()
}
// 维保删除
const deleteRepairFunc = val => {
    APIdeleteDeviceRepair(val.id).then(res => {
        getDetailsFunc(data_details.item)
        ElMessage.success('删除成功')
    })
}

// 档案
// 添加
import {
    APIgetDeviceArchiveDetails,
    APIputDeviceArchive,
    APIpostDeviceArchive,
    APIdeleteDeviceArchive
} from '@/api/custom/custom.js'
const str_title_2 = ref('添加')
const addArchive = reactive({
    switch: false,
    form: {},
    item: {
        content: [{
            type: '',
            name: '',
            key: []
        }]
    }
})
const file_list_1 = ref([])
const addArchiveFunc = () => {
    from_error.msg = {}
    str_title_2.value = '添加'
    addArchive.item = {
        content: []
    }
    // file_list_1.value = []
    addArchive.item.did = data_details.item.id
    addArchive.switch = true
}
// 修改
const modifyArchiveFunc = val => {
    from_error.msg = {}
    str_title_2.value = '修改'
    APIgetDeviceArchiveDetails(val.id).then(res => {
        for (let i in res.content) {
            res.content[i].arr = []
            if (res.content[i]) {
                for (let j in res.content[i].key) {
                    res.content[i].arr.push({
                        name: res.content[i].key[j]
                    })
                }
                res.content[i].key = res.content[i].arr
                delete res.content[i].arr
            }
        }
        addArchive.item = res
        console.log(addArchive.item)
        addArchive.item.did = data_details.item.id
        addArchive.switch = true
    })
}
const addServiceFunc_1 = () => {
    let data = {
        'name': '',
        'type': '',
        'key': []
    }
    addArchive.item.content.push(data)
}
// 同意拒绝提交
const formFnUpload_1 = () => {
    console.log(addArchive.item)
    if (str_title_2.value == '修改') {
        APIputDeviceArchive(addArchive.item.id, addArchive.item).then(res => {
            getDetailsFunc(data_details.item)
            ElMessage.success('修改成功')
            addArchive.switch = false

        }).catch(err => {
            ElMessage.error('修改失败')
        })
    } else {
        APIpostDeviceArchive(addArchive.item).then(res => {
            getDetailsFunc(data_details.item)
            ElMessage.success('添加成功')
            addArchive.switch = false
        }).catch(err => {
            ElMessage.error('添加失败')
        })
    }
}
const dialogExamineCloseFunc_2 = () => {
    from_error.msg = {}
    let files = []
    let everyKeyLength = [] // 多文件上传处理
    let everyKeyLength_1 = [] // 多文件上传处理
    addArchive.item.content.forEach((item, index) => {
        everyKeyLength.push(item.key.length)
    })
    for (let x in addArchive.item.content) {
        addArchive.item.content[x].Array = []
        for (let y in addArchive.item.content[x].key) {
            if (!addArchive.item.content[x].key[y].raw) {
                addArchive.item.content[x].Array.push(addArchive.item.content[x].key[y].name)
            } else {
                files.push(addArchive.item.content[x].key[y].raw)
            }
        }

        addArchive.item.content[x].key = addArchive.item.content[x].Array
        delete addArchive.item.content[x].Array
    }
    addArchive.item.content.forEach((item, index) => {
        everyKeyLength_1.push(item.key.length)
    })
    if (files.length > 0) {
        getFilesKeys(files, 'archive').then(res => {
            let whereKey = 0
            if (str_title_2.value == '添加') {
                for (let x = 0; x < everyKeyLength.length; x++) { // 多文件上传处理
                    for (let y = 0; y < everyKeyLength[x]; y++) {
                        addArchive.item.content[x].key[y] = res[whereKey]
                        whereKey++
                    }
                }
            } else {
                everyKeyLength.forEach((item, index) => {
                    if (item != everyKeyLength_1[index]) {
                        let key = 0
                        key = everyKeyLength[index] - everyKeyLength_1[index]
                        for (let i = 0; i < key; i++) {
                            addArchive.item.content[index].key.push(res[i])
                        }
                    }
                })
            }
            formFnUpload_1()
        })
        return false
    }
    formFnUpload_1()
}
// 删除
const deleteArchiveFunc = val => {
    APIdeleteDeviceArchive(val.id).then(res => {
        getDetailsFunc(data_details.item)
        ElMessage.success('删除成功')
    })
}
/* ----------------------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------------------- */
</script>
<style lang="scss">
.articletparticletpl {
    .el-cascader {
        width: 100% !important;
        margin-bottom: 10px;
    }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/resources/variables.scss";
@include pageStyle;
.search-tips {
    color: #aaa;
    font-size: 14px;
    margin-bottom: 20px;
}
.archive {
    color: #00daff;
    font-weight: bold;
    cursor: pointer;
}
.put_del {
    position: absolute;
    top: 40px;
    right: 15px;
}
.owners {
    display: flex;
    margin-bottom: 10px;
    flex-wrap: wrap;
    div {
        width: 50%;
        margin-bottom: 5px;
        span {
            color: #000;
        }
    }
}
.d-player-wrap {
    width: 200px !important;
    height: 100px !important;
    margin-right: 10px;
}
.searchPlay .el-button {
    // --el-button-hover-border-color: #fafafa;
    // --el-button-active-text-color: #fafafa;
    // --el-button-active-border-color: #fafafa;
    --el-button-active-bg-color: #fafafa;
}
.searchPlay .el-button:hover {
    background-color: #fafafa;
}
.link {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>
