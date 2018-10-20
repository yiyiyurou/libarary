<template>
    <div class="navigation">
        <div class="filterArea">
            <el-input 
              placeholder="输入关键字进行过滤"
              @keyup.enter.native="handleEnter"
              v-model="filterText"
              clearable
              class="filter-input">
              <template slot="prepend"><i class="el-icon-search"></i></template>
            </el-input>
        </div>
        <div class="tree radioTree">
            <el-tree 
              class="filter-tree"
              :data="treeData"
              :props="defaultProps"
              default-expand-all
              node-key="organguid"
              :filter-node-method="filterNode"
              highlight-current
              accordion
              expand-on-click-node
              @node-click="handleNodeClick"
              @current-change="handleNodeLocationClick"
              ref="tree2">
            </el-tree>
        </div>
    </div>
</template>
<script>
// import store from '@/store/store';
// import { mapState, mapMutations } from 'vuex'
export default {
    name: 'searchTree',
    props: {
        operateOnoff: {
            type: Boolean,
            default: false
        }
    },
    data (){
      return {
        filterText: '',
        treeData: [{
          id: '0',
          organguid: '',
          parentguid: '',
          organname: '图书分类',
          organtype: '0',
          organDesc: '',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'organname'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
  mounted () {
    this.getOrganTree()
  },
  // computed: {
  //   ...mapState({
  //     treeData: treeData
  //   }),
  // },
    methods: {
        getOrganTree () {
          this.treeData[0].children = [{
            organguid: '1',
            parentguid: '0',
            organtype: '1',
            organDesc: '',
            organname: '中国文学',
            children: [{
              organguid: '4',
              parentguid: '1',
              organtype: '2',
              organDesc: '',
              organname: '近代文学'
            }, {
              organguid: '5',
              parentguid: '1',
              organtype: '2',
              organDesc: '',
              organname: '古典文学'
            }]
          },
          {
            organguid: '2',
            parentguid: '0',
            organtype: '1',
            organDesc: '',
            organname: '小说',
            children: [{
              organguid: '6',
              parentguid: '2',
              organtype: '2',
              organDesc: '',
              organname: '经典小说'
            }, {
              organguid: '7',
              parentguid: '2',
              organtype: '2',
              organDesc: '',
              organname: '古侠小说'
            }]
          }, {
            organguid: '3',
            parentguid: '0',
            organtype: '1',
            organDesc: '',
            organname: '辅导资料',
            children: [{
              organguid: '8',
              parentguid: '3',
              organtype: '2',
              organDesc: '',
              organname: '高考'
            }, {
              organguid: '9',
              parentguid: '3',
              organtype: '2',
              organDesc: '',
              organname: '出国考试',
              children: [{
                organguid: '10',
                parentguid: '9',
                organtype: '3',
                organDesc: '',
                organname: '雅思'
              }, {
                organguid: '11',
                parentguid: '9',
                organtype: '3',
                organDesc: '',
                organname: '托福'
              }, {
                organguid: '12',
                parentguid: '9',
                organtype: '3',
                organDesc: '',
                organname: 'GRE'
              }]
            }]
          }]
          this.$nextTick(() => {
            this.$refs.tree2.setCurrentKey(this.treeData[0].organguid)
            this.$emit('treeClick', this.treeData[0])
          })
        },
        filterNode (value, data) {
            if (!value) return true
            return data.organname.indexOf(value) !== -1
        },
        handleNodeLocationClick (data, node, self) {
            this.$emit('treeClick', data)
        },
        handleNodeClick () {

        }
    }
}
</script>
<style lang="scss" scoped>
    .navigation {
        width: 230px;
        padding: 12px 0;
        height: 785px;
        margin-right: 0;
        // display: flex;
        // flex-direction: column;
        // flex: auto;
        // overflow: auto;

        .filterArea {
          padding: 0 4px 10px;
        }

        .tree {
          // flex: 1;
          height: 100%;
        }
    }
</style>
<style lang="scss">
  .el-input__inner {
    padding-right: 5px !important;
  }
</style>


