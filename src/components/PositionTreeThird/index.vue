<template>
    <div class="main-box">
        <el-scrollbar max-height="100%">
            <el-tree
                ref="treeRef"
                class="el-tree-box"
                node-key="id"
                :props="tree_props"
                :load="loadNode"
                lazy
                show-checkbox
                :accordion="true"
                :check-on-click-node="true"
                :default-checked-keys="[tree_item.id]"
                @check="handleCheck"
            />
        </el-scrollbar>
    </div>
</template>

<script setup>
    // {id:500101,name:'总title',type:'region'}
    import {
        ref,
        toRefs,
        reactive,
        defineProps,
        defineEmits
    } from 'vue'
    const props = defineProps(['tree_item', 'type','id'])
    const type = ref(props.type)
    const emit = defineEmits(['checkFunc','arrSetRange'])
    const { tree_item } = toRefs(props)
    const treeDetail = reactive({
        arr: {}
    })
    const tree_props = {
        label: 'name',
        children: 'children',
        isLeaf: false
    }
    import {
        // china区域
        APIgetChinaRegion,
        // 小区列表
        APIgetResidentialListHouse,
        // 楼栋
        APIgetBuildListHouse,
        // 单元
        APIgetUnitsListHouse,
        // 房屋
        APIgetHouseListHouse
    } from '@/api/custom/custom.js'
    let nodeCopy = ''
    // node为当前点击的节点，resolve为数据加载完成的回调(必须调用)
    const loadNode = (node, resolve) => {
        if (node.level == 0) {
            nodeCopy = node
            resolve([tree_item.value])
            emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            return false
        }

        // if(node.data.name.includes("社区"||"村")){
        //             APIgetChinaRegion({ 'p_code': node.data.id }).then(res => {
        //             treeDetail.arr = res.data
        //             // console.log(res)
        //             let tree_arr = []
        //             if (res.status == 200) {
        //                 for (let i in res.data) {
        //                     tree_arr.push({ name: res.data[i].name, type: 'region', next_type: 'region', id: res.data[i].code,isLeaf:true})
        //                 }
        //             }
        //             resolve(tree_arr)
        //             emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
        //             return
        //         })
        //         }
        switch (node.data.next_type) {
            // case 'region':
            //     APIgetChinaRegion({ 'p_code': node.data.id }).then(res => {
            //         treeDetail.arr = res.data
            //         // console.log(res)
            //         let tree_arr = []
            //         if (res.status == 200) {
            //             for (let i in res.data) {
            //                 if (res.data[i].level < 5) {
            //                     tree_arr.push({ name: res.data[i].name, type: 'region', next_type: 'region', id: res.data[i].code })
            //                 } else {
            //                     tree_arr.push({ name: res.data[i].name, type: 'region', next_type: 'zone', id: res.data[i].code })
            //                 }
            //             }
            //         }
            //         resolve(tree_arr)
            //         emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
            //     })
            //     break
                // 小区
            case 'zone':
                    APIgetResidentialListHouse({ page: 1, per_page: 7, china_code: node.data.id }).then(res => {
                        // treeDetail.arr = res.data
                        // console.log(res)
                        let tree_arr = []
                            res.forEach((element,i) => {
                                tree_arr.push({ name: res[i].name, type: 'zone', next_type: 'buildings', id: res[i].id })
                            })
                        resolve(tree_arr)
                        emit('checkFunc', { 0: tree_item.value, 1: treeDetail.arr })
                        tree_arr = []
                    })
                break
                // 楼栋
            case 'buildings':
                APIgetBuildListHouse({ page: 1, per_page: 7, zone_id: node.data.id }).then(res => {
                    let tree_arr = []
                        res.forEach((element,i) => {
                            tree_arr.push({ name: res[i].name, type: 'buildings', next_type: 'units', id: res[i].id })
                        })
                    resolve(tree_arr)
                })
                break
                // 单元
            case 'units':
                APIgetUnitsListHouse({ page: 1, per_page: 7, building_id: node.data.id }).then(res => {
                    let tree_arr = []
                        res.forEach((element,i) => {
                            tree_arr.push({ name: res[i].name, id: res[i].id, type: 'units', next_type: 'houses' })
                        })
                    resolve(tree_arr)
                })
                break
                // 房屋
            case 'houses':
                APIgetHouseListHouse({ page: 1, per_page: 7, houseable_id: node.data.id }).then(res => {
                    let tree_arr = []
                        res.forEach((element,i) => {
                            tree_arr.push({ name: res[i].name, id: res[i].id, type: 'houses', })
                        })
                    resolve(tree_arr)
                })
                break
        }
    }
    const treeRef = ref(null)
    watch(tree_item, new_val => {
        if (nodeCopy) {
            nodeCopy.loaded = false
            nodeCopy.loadData()
        }
    }, { immediate: true, deep: true })
    let checkedFunc
    const handleCheck = (data, checked) => {
        if (checked.checkedKeys.length > 0) {
            // 控制同一级只能单选
            // treeRef.value.setCheckedNodes([data])
            // 传递已选的节点的数组
            checkedFunc = treeRef.value.getCheckedNodes()
            checkedArr(checkedFunc)
            // console.log('已选节点:',checkedFunc)
            // emit('checkedFunc', checkedFunc)
            // 传递点击的节点数据
            emit('checkFunc', data)
            return false
        }
        emit('checkFunc', '')
    }

    // 从房屋到区域的数组
    let arr1 =[]
    let arr2 =[]
    let arr3 =[]
    let arr4 =[]
    let arr5 =[]
    // 定义在外部会导致最后调用dealArr的输出结果相同
    // let setrange = {"sid":props.id,"can_type":1,"type":'',"tgt":[]}
    const checkedArr = checkedFunc => {
        // 清空数组
        arr1 =[]
        arr2 =[]
        arr3 =[]
        arr4 =[]
        arr5 =[]
        // 将相同区域类型的数据整合到同一数组
        checkedFunc.forEach(element => {
            // console.log(element.type)
            if(element.type === "region") {
                arr5.push(element)
            }else if(element.type === "zone") {
                arr4.push(element)
            }else if(element.type === "buildings") {
                arr3.push(element)
            }else if(element.type === "units") {
                arr2.push(element)
            }else if(element.type === "houses") {
                arr1.push(element)
            }
        })
        if(arr5.length != 0){
            dealArr(arr5,5)
        }
        if(arr4.length != 0){
            dealArr(arr4,4)
        }
        if(arr3.length != 0){
            dealArr(arr3,3)
        }
        if(arr2.length != 0){
            dealArr(arr2,2)
        }
        if(arr1.length != 0){
            dealArr(arr1,1)
        }
    }
    // 处理五种数组
    let ArrSetRange = []//将请求信息插入数组内
    const dealArr = (arr,types) =>{
        let setrange = {"sid":props.id,"can_type":1,"type":'',"tgt":[]}
        setrange.tgt = []
        setrange.type = types
        arr.forEach(element => {
            setrange.tgt.push(element.id)
        })
        ArrSetRange = []
        ArrSetRange.push(setrange)
        // console.log('111111',types,setrange,ArrSetRange)
        emit('arrSetRange', ArrSetRange)
    }
</script>
<style lang="scss">
    .main-box {
        height: 100%;
        // overflow: auto;
        .el-tree-box {
            // width: max-content;
            // min-width: 100%;
        }
    }
</style>
