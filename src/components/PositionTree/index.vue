<template>
    <div class="diytree">
        <div class="tit">
            {{props.tit}}
        </div>
        <div class="tree-box">
            <el-tree
                highlight-current
                :data="props.data.data"
                :props="{ children: 'children', label: 'label' }"
                node-key="id"
                accordion
                :default-expanded-keys="props.data.default_expanded"
                @node-click="handleNodeClick" />
        </div>
    </div>
</template>

<script setup>
    import {reactive, defineProps, defineEmits} from 'vue'
    const props = defineProps(['data','tit']);
    const emit = defineEmits(['myClick','nullClick'])
    const handleNodeClick = (item,e) => {
        if(!item.children||item.children.length<=0){
            const breadCrumb = [];
            const getFName = (e)=>{
                if(e.level > 0){
                    breadCrumb.unshift(e.data.label)
                    getFName(e.parent)
                }
            }
            getFName(e)
            emit('myClick', {breadCrumb:breadCrumb,item:item})
        }else{
            emit('nullClick', '')
        }
    }
</script>
<style lang="scss">
    .diytree{
        height: 100%;
        overflow: auto;
        .tit{
            color: #999999;
            font-size: 13px;
            height: 60px;
            line-height: 60px;
            box-sizing: border-box;
            padding-left: 20px;
            border-right: 1px solid rgba(233, 233, 233, 1);
            border-bottom: 1px solid rgba(233, 233, 233, 1);
        }
        .tree-box{
            height: calc(100% - 60px);
            box-sizing: border-box;
            border-right: 1px solid rgba(233, 233, 233, 1);
            border-bottom: 1px solid rgba(233, 233, 233, 1);
            padding-bottom: 20px;
            .el-tree-node__label{
             font-size: 13px;
            }
        }
    }
</style>
