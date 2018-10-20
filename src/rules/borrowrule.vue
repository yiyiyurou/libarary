<template>
    <div class="borrowRules">
        <bread-crumb :bread-crumb-list="breadCrumbList"></bread-crumb>
        <div class="tableCon" ref="tableDataRef">
            <div class="tableTop" ref="tableTopRef">
                <el-button type="primary" size="small" @click="addRules">添加一行</el-button>
                <el-button type="danger" size="small" @click="deletePart">批量删除规则</el-button>
            </div>
            <table-form
                v-loading.body="isLoadingTableData"
                :selectionIsChear="isChecked"
                :colData="colData"
                :data="tableData"
                :row-key="rowkey"
                :max-height="height"
                :submiting="submiting"
                :isShowOper="isShowOper"
                border
                :stripe="true"
                :sortable="sortable"
                @selection-change="handleSelectChange"
                @clear-selection="handleClearSelection"
                :row-class-name="tableRowClassName"
            >
            <el-table-column
              v-if="reserveSelection"
              :reverse-selection="reserveSelection"
              type="selection"
              width="35"
            >
            </el-table-column>
            <el-table-column
             v-for="item in colData"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :sortable="item.sortable || sortable"
            >
            <template slot-scope="scope">
                <div v-if="item.prop === 'rulestatus'">
                    <el-button style="display: inline-block;margin-left: 4px;"
                        size="mini"
                        plain
                        @click="handleStart($event, scope.row)"
                    >
                    {{ scope.row.rulestatus === '01' ? '禁用': '启用'}}
                    </el-button>  
                </div>
                <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
            </el-table-column>
            <el-table-column slot="fixedColumn" label="操作" fixed="right" width="330" align="center">
                <template slot-scope="scope">
                    <el-button style="display:inline-block;margin-left:4px"
                    size="mini"
                    plain
                    @click="handleDetail($event, scope.row)">
                    查看
                    </el-button>
                    <el-button style="display:inline-block;margin-left:4px"
                      size="mini"
                      plain
                      @click="handleEdit($event, scope.row)"
                    >
                    修改
                    </el-button>
                    <el-button style="display:inline-block;margin-left:4px"
                      size="mini"
                      plain
                      @click="handleHistory($event, scope.row)"
                    >
                    修订记录
                    </el-button>
                    <el-popover style="display:inline-block;margin-left:4px;"
                        ref="popover"
                        trigger="click"
                        placement="top"
                        width="160"
                        v-model="scope.row.visible">
                        <p style="font-size:14px;padding: 6px 0;">确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
                            <el-button type="primary" size="mini" :loading="submiting" @click="handleDelete(scope, scope.$index)">确定</el-button>
                        </div>

                        <div slot="reference">
                            <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click.stop.prevent="scope.row.visible = true">
                            删除
                            </el-button>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            </table-form>
            <!-- 分页 -->
            <el-row type="flex" justify="end" class="tableBottom">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                >
                </el-pagination>
            </el-row>
        </div>

        <!-- 删除规则 -->
        <el-dialog title="信息"
          :visible.sync="deleteRuleDialog"
          top="10%"
          width="400px">
           <span>是否删除所选中的规则</span>
           <span slot="footer" class="dialog-footer">
                <el-button @click="deleteRuleDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureRuleDelete">确 定</el-button>
           </span>
        </el-dialog>

        <el-table :data="tableData1" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
            <el-table-column label="日期" width="100">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.date" placeholder="请输入日期" @change="handleEdit1(scope.$index, scope.row)"></el-input> 
                    <span>{{scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="100">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="请输入姓名" @change="handleEdit1(scope.$index, scope.row)"></el-input> 
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址"  width="300">
                <template scope="scope">
                    <el-input size="small" v-model="scope.row.address" placeholder="请输入地址" @change="handleEdit1(scope.$index, scope.row)"></el-input> 
                    <span>{{scope.row.address}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <AddRulesDialog
        v-if="addRulesOnoff"
        :dialog-form-visible="addRulesOnoff"
        :ruleTitle="title"
        :row-edit-onoff="rowOnoff"
        :is-click-on-modal="isClickOnModal"
        :formId="formId"
        :rule-form-data="ruleData"
        :is-read="isRead"
        :is-readonly="isReadonly"
        @dialog-sure="sureEdit"
        @dialog-cancel="closeHanlder">
        </AddRulesDialog>
    </div>

</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import TableForm from '@/components/common/Table'
import AddRulesDialog from './addRulesDialog'
export default {
    name: 'borrowRlue',
    components: {
        BreadCrumb,
        TableForm,
        AddRulesDialog
    },
    data () {
        return {
            height: '530',
            breadCrumbList:[],
            colData: [],
            tableData: [],
            selectionData: [],
            reserveSelection: true,
            sortable: true,
            rowkey: 'ruleid',
            submiting: false,
            isShowOper: false,
            visible: false,
            deleteRuleDialog: false,
            rowisible: false,
            total: 100,
            pageSize: 15,
            currentPage: 1,
            isChecked: false,
            checkAll: true,
            ruleid: '',
            isLoadingTableData: false,
            tableData1: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            addRulesOnoff: false,
            isClickOnModal: false,
            rowOnoff: false,
            ruleData: {},
        }
    },
    mounted () {
        this.breadCrumbList = [
            {title: '借阅规则'},
            {title: '图书监控'}
        ]
        this.colData = [
            { prop: 'rulename', label: '规则名称', width: '160', sortable: true,align: 'center' },
            { prop: 'ruleplace', label: '借阅地点', width: '140', sortable: true,align: 'center' },
            { prop: 'ruleConstraint', label: '借阅约束', width: '160', sortable: true,align: 'center' },
            { prop: 'ruleDescribe', label: '详细规则', width: '500', sortable: true,align: 'center' },
            { prop: 'notifyobject', label: '通知借方', width: '160', sortable: true,align: 'center' },
            { prop: 'rulestatus', label: '是否启用',  sortable: true,align: 'center' },
        ]
        this.showMS()
    },
    methods: {
        showMS () {
            this.tableData = [{
            id: '1',
            rulename: '规则1',
            ruleplace: '一号藏书馆',
            ruleConstraint: '不对外借出',
            ruleDescribe: '本馆书籍均为绝版藏书',
            notifyobject: '王涛',
            rulestatus: '01'
            },{
            id: '2',
            rulename: '规则2',
            ruleplace: '二号藏书馆',
            ruleConstraint: '只在本馆阅读',
            ruleDescribe: '本馆书籍为报纸类较易损坏的书籍',
            notifyobject: '陈默',
            rulestatus: '02'
            },{
            id: '3',
            rulename: '规则3',
            ruleplace: '三号藏书馆',
            ruleConstraint: '只能内部传阅',
            ruleDescribe: '本馆书籍均为绝版藏书',
            notifyobject: '王勇',
            rulestatus: '01'
            },{
            id: '4',
            rulename: '规则4',
            ruleplace: '四号藏书馆',
            ruleConstraint: '可在前台登记借出',
            ruleDescribe: '本馆书籍为报纸类较易损坏的书籍',
            notifyobject: '陈默',
            rulestatus: '02'
            },{
            id: '5',
            rulename: '规则5',
            ruleplace: '五号藏书馆',
            ruleConstraint: '可复印外借',
            ruleDescribe: '本馆书籍均为绝版藏书',
            notifyobject: '王多多',
            rulestatus: '01'
            },
            {
            id: '6',
            rulename: '规则6',
            ruleplace: '六号藏书馆',
            ruleConstraint: '可抄印后阅读',
            ruleDescribe: '本馆书籍只有最后一本',
            notifyobject: '陈启',
            rulestatus: '02'
            },{
            id: '7',
            rulename: '规则7',
            ruleplace: '七号藏书馆',
            ruleConstraint: '不对外借出',
            ruleDescribe: '本馆书籍均为绝版藏书',
            notifyobject: '文艺',
            rulestatus: '01'
            },
            {
            id: '8',
            rulename: '规则8',
            ruleplace: '八号藏书馆',
            ruleConstraint: '只在本馆阅读',
            ruleDescribe: '本馆书籍为报纸类较易损坏的书籍',
            notifyobject: '章三铎',
            rulestatus: '02'
            },{
            id: '9',
            rulename: '规则9',
            ruleplace: '九号藏书馆',
            ruleConstraint: '不对外借出',
            ruleDescribe: '本馆书籍均为绝版藏书',
            notifyobject: '文竹',
            rulestatus: '01'
            },
            {
            id: '10',
            rulename: '规则10',
            ruleplace: '十号藏书馆',
            ruleConstraint: '只在本馆阅读',
            ruleDescribe: '本馆书籍为报纸类较易损坏的书籍',
            notifyobject: '陈欧',
            rulestatus: '02'
            }]
        },
        handleCurrentChange () {
            console.log(row, event, column, event.currentTarget)
        },
        handleEdit1(index, row) {
            console.log(index, row)
        },
        handleDelete1(index, row) {
            console.log(index, row)
            this.tableData1.splice(index, 1)
        },
        tableRowClassName (row, index) {
            if (index === this.index) {
                return 'info-row'
            }
            return ''
        },
        addRules () {
            this.tableData.push({
                id: '11',
                rulename: '新规则',
                ruleplace: '',
                ruleConstraint: '',
                ruleDescribe: '',
                notifyobject: '',
                rulestatus: ''
            })
        },
        deletePart() {
            if (this.selectionData !== 0) {
                this.deleteRuleDialog = true
            } else {
                this.$message({
                    type: 'warning',
                    message: '请选项需要删除的规则'
                })
            }
        },
        // 确认批量删除
        sureRuleDelete () {
           this.deleteRuleDialog = false
           console.log(this.selectionData)
           for ( let i=this.tableData.length; i>=0; i--){
                this.selectionData.forEach( item => {
                console.log(typeof item.fieid)
                if (item.fieid == i+1) {
                    this.tableData.splice(i,1)
                }
            })
           }
        },
        handleHistory(e, rowData) {
            this.ruleid = rowData.index
            this.$router.push({
                name: 'list',
                params: {
                    ruleid: this.ruleid
                }
            })
        },
        handleSelectChange (selection) {
            if (selection.length !== 0) {
                this.isChecked = true
                this.selectionData = selection
            } else {
                this.isChecked = false
                this.selectionData = []
            }
        },
        handleClearSelection () {
            this.isChecked = false
            this.selectionData = []
        }, 
        //单个删除规则
        handleDelete (scope, index) {
            scope.visible = false
            this.tableData.splice(index, 1)
        },
        handleSizeChange(val) {
            this.pageSize = val
            if (this.tableData !== null) {
                this.getselectRuleByPageList(this.currentPage, this.pageSize)
            }
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            if (this.tableData !== null){
                this.getselectRuleByPageList(this.currentPage,this.pageSize)
            }
        },
        handleDetail (e, rowData) {
            
            this.addRulesOnoff = true
            this.title = '查看借阅规则'
            this.isClickOnModal = true
            this.rowEditOnoff = true
            this.rowOnoff = true
            this.formId = rowData.id
            console.log(this.formId)
            this.ruleData.rulename = rowData.rulename
            this.ruleData.ruleplace = rowData.ruleplace
            this.ruleData.ruleConstraint = rowData.ruleConstraint
            this.ruleData.ruleDescribe = rowData.ruleDescribe
            this.ruleData.notifyobject = rowData.notifyobject
            this.ruleData.rulestatus = rowData.rulestatus === '02' ? '是' : '否'
            console.log(this.ruleData)
            this.isRead = true
            this.isReadonly = true
            
        },
        getselectRuleByPageList(currentPage, pageSize) {

        },
        handleEdit (e, rowData) {
            this.addRulesOnoff = true
            this.title = '修改借阅规则'
            this.isClickOnModal = false
            // this.rowEditOnoff = true
            this.rowOnoff = true
            this.isRead = false
            this.isReadonly = false
            this.formId = rowData.id
            this.ruleData.rulename = rowData.rulename
            this.ruleData.ruleplace = rowData.ruleplace
            this.ruleData.ruleConstraint = rowData.ruleConstraint
            this.ruleData.ruleDescribe = rowData.ruleDescribe
            this.ruleData.notifyobject = rowData.notifyobject
            this.ruleData.rulestatus = rowData.rulestatus === '02' ? '是' : '否'

            // Object.assign()
        },
        closeHanlder () {
            this.addRulesOnoff = false
        },
        sureEdit (data) {
            this.addRulesOnoff = false
            this.dialogFormVisible = false
            // this.showMS()
            console.log(data.rulename)
            console.log(this.formId)
            // console.log(this.tableData[this.formId-1].rulename)
            this.tableData[this.formId-1].rulename = data.rulename
            // console.log(data.ruleplace)
            this.tableData[this.formId-1].ruleplace = data.ruleplace
            this.tableData[this.formId-1].ruleConstraint = data.ruleConstraint
            this.tableData[this.formId-1].ruleDescribe = data.ruleDescribe
            this.tableData[this.formId-1].notifyobject = data.notifyobject
            this.tableData[this.formId-1].rulestatus = data.ruleDescribe === '是' ? '02' : '01'
            // console.log( this.tableData[this.formId-1])
            // this.rowData = data
            this.$message({
                type: 'success',
                message: '修改规则成功'
            })
        },
        handleStart(e, rowData) {
            this.ruleData = rowData
            if(this.tableData[rowData.id-1].rulestatus === '01') {
                this.tableData[rowData.id-1].rulestatus = '02'
            } else if (this.tableData[rowData.id-1].rulestatus === '02'){
                this.tableData[rowData.id-1].rulestatus = '01'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .borrowRules {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .tableCon {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .tableTop{
            padding: 20px 10px;
            text-align: left;
            background: #fbfbfb;
        }
        .tableBottom {
            padding-top: 10px;
            height: 51px;
        }
    }
    
</style>
