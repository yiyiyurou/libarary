<template>
  <div class="manaTable">
    <el-table
      ref="elTable"
      :data="data"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      @row-click="rowClickHandler"
      @row-dblclick="rowDblclickHandler"
      @sort-change="sortChangeHandler"
      @current-change="currentChangeHandler"
      @selection-change="handleSelectionChange"
    >
      <slot>
        <el-table-column
          v-for="item in colData"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :align="item.align"
          :sortable="typeof item.sortable === 'boolean' ? item.sortable && sortable : sortable"
          :fixed="fixed"
        >
        </el-table-column>
      </slot>

      <slot name="fixedColumn">
        <el-table-column v-if="isShowOper" label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button style="display:inline-block;margin-left:4px;"
              size="mini"
              @click="handleEdit($event, scope.row)">
              修改
            </el-button>
            <el-popover style="display:inline-block;margin-left:4px;"
              ref="popover"
              trigger="click"
              placement="top"
              width="160"
              v-model="scope.row.visible">
              <p style="font-size:14px;padding: 6px 0;">确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button type="text" size="mini" @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" :loading="submiting" @click="deleteHandler($event, scope.$index, scope.row)">确定</el-button>
              </div>

              <div slot="reference">
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="scope.row.visible = true">
                  删除
                </el-button>
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    height: [Number, String],
    maxHeight: [Number, String],
    currentRowKey: [String, Number],
    rowClassName: [Function, String],
    rowStyle: [Function, Object],
    rowKey: [Function, String],
    reserveSelection: Boolean,
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    defaultSort: Object,
    tooltipEffect: String,
    // 列的props
    colData: Array,
    fixed: [Boolean, String],
    sortable: {
      type: Boolean,
      default: false
    },
    isShowOper: {
      type: Boolean,
      default: true
    },
    selectionIsChear: Boolean,
    submiting: Boolean
  },
  watch: {
    data (newVal) {
      newVal.forEach((item, idx) => {
        this.$set(item, 'fieid', idx + 1)
        this.$set(item, 'visible', false)
      })
    },
    selectionIsChear (newVal) {
      if (!newVal) {
        this.clearSelectionHandler()
      }
    }
  },
  /* mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.elTable.maxHeight)
      // this.height = this.$refs.elTable.$el.clientHeight - 20
    })
  }, */
  methods: {
    rowClickHandler (row, event, column) {
      this.$refs.elTable.toggleRowSelection(row)    // 切换复选框
      this.$emit('row-click', row, event, column)
    },
    rowDblclickHandler (row, event) {
      this.$emit('row-dblclick', row, event)
    },
    sortChangeHandler ({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    currentChangeHandler (currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    handleSelectionChange (selection) { 
      this.$emit('selection-change', selection)
    },
    clearSelectionHandler () {
      this.$refs.elTable.clearSelection()
    },
    deleteHandler (e, idx, row) {
      e.preventDefault()
      e.stopPropagation()
      // console.log('deleteHandler', idx, row)
      this.$emit('gp-delete', row, idx)
      // this.data.splice(idx, 1);
    },
    handleCheck (e, row) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('gp-check', row)
    },
     handleDetail (e, row) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('gp-edit', row)
    },
    handleEdit (e, row) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('gp-edit', row)
    },
    handleLocation (e, row) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('gp-location', row)
    }
  }
}
</script>

<style lang="scss">
  .manaTable { 
    padding: 0  10px;
  }
</style>
