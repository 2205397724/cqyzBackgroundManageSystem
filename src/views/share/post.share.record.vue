<template>
    <div>
        <page-main class="hidden">
            <div class="m-b-20">
                发起共享
            </div>
            <div class="bg-color-grey p-10">共享信息</div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="m-10">申请人信息</div>
                        <el-form-item label-width="120px" label="姓名">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="身份证号">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="手机号码">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="m-10">身份证件</div>
                        <el-upload drag :show-file-list="false" :auto-upload="false"
                            action="Fake Action" :on-change="fileChangeFunc">
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="m-10">房屋信息</div>
                        <el-form-item label-width="120px" label="房屋坐落">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="不懂产权证号">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="不动产单元号">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <div class="m-10">不动产权证</div>
                        <el-upload drag :show-file-list="false" :auto-upload="false"
                            action="Fake Action" :on-change="fileChangeFunc">
                        </el-upload>
                    </el-col>
                </el-row>
            </div>
            <div class="bg-color-grey p-10">申办业务</div>
            <div class="m-10">
                <el-checkbox-group
                    v-model="checkedCities"
                    @change="handleCheckedCitiesChange"
                >
                    <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                    city
                    }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="bg-color-grey p-10">业务详情</div>
            <div class="m-10">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label-width="120px" label="业务受理单位">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="业务选项">
                            <el-input  v-model="from_examine.item.title" placeholder=""/>
                        </el-form-item>
                        <el-form-item label-width="120px" label="用户协议书">
                            <el-upload drag :show-file-list="false" :auto-upload="false"
                                action="Fake Action" :on-change="fileChangeFunc">
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </page-main>
    </div>
</template>

<script setup name="SharePostShareRecord">
const from_error = reactive({
    msg: {}
})
let from_examine = reactive({
    item: {}
})
const checkedCities = ref([])
const cities = ['水','电','气']
</script>

<style lang="scss" scoped>
// scss
</style>
