<template>
    <el-tree
    :data="assignData"
    show-checkbox
    node-key="nodeKey"
    :default-expanded-keys="defaultExpandedKeys"
    :current-node-key="currentNodeKey"
    :default-expand-all='defaultExpandAll'
    @check-change="handleCheckChange"
    @node-click="handleNodeClick"
    :props="defaultProps"
    ref="roleAssign">
    </el-tree>
</template>
<script>
export default {
    name: 'RoleAssign',
    props: {
      nodeKey: {
        type: String,
        default: 'id'
      },
      tab2Onoff: { 
        type: Boolean,
        default: false 
      },
      seditOnoff: { 
        type: Boolean,
        default: false  
      },
      defaultExpandedKeys: {
        type: Array,
        default: () => []
      },
      defaultCheckedKeys: { 
        type: Array,
        default: () => []
      },
      defaultExpandAll: {
        type: Boolean,
        default: false 
      }
    },
    data () {
        return {
            currentNodeKey: '',
            getCheckedKeys: [],
            assignData: [{
            id: 1,
            label: '借书',
            children: [{
                id: 4,
                label: '外借',
                children: [{
                    id: 9,
                    label: '一个月'
                }, {
                    id: 10,
                    label: '三个月'
                }]
            }]
            }, {
            id: 2,
            label: '还书',
            children: [{
                id: 5,
                label: '一个月'
            }, {
                id: 6,
                label: '一个月'
            }]
            }, {
            id: 3,
            label: '阅读',
            children: [{
                id: 7,
                label: '一个月'
            }, {
                id: 8,
                label: '一个月'
            }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label',
                isLeaf: 'leaf'
            }
        }
    },
     watch: {
         tab2Onoff (val) {
             if (val) {
                 this.$refs.roleAssign.setCheckedKeys(this.getCheckedKeys)
             }
         },
         editOnoff (val) {
              this.$refs.roleAssign.setCheckedKeys(this.default-checked-keys)
         }
     },
    methods: {
        handleCheckChange () {
            this.getCheckedKeys = this.$refs.roleAssign.getCheckedKeys()
            this.$emit('select-node', this.$refs.roleAssign.getCheckedKeys())
        },
        handleNodeClick () {
            
        }
    }
}
</script>

<style lang="scss">
  .multiselectTree { 
    width: 360px;
    max-height: 360px;
    overflow-y: auto;
    float: left;
    margin-top: 10px;
    }
</style>