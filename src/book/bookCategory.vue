<template>
    <div class="bookMangement"
        v-loading.body="dialogLoading"
        element-loading-text="拼命加载中">
        <bread-crumb :bread-crumb-list="breadCrumbList"></bread-crumb>
        <div class="con">
            <div class="nav">
                <div class="navBtn">
                    <el-button size="mini" type="info" @click="addOrgan" :disabled="dType === '3'">添加</el-button>
                    <el-button size="mini"  @click="editOrgan" :disabled="organformId === ''">修改</el-button>
                    <el-button size="mini" type="danger" @click="deleteOrgan" :disabled="organformId === ''">删除</el-button>
                </div>
                <search-input @treeClick="treeClickHandler" @searchSelect="searchSelectHandler" :operate-onff="operateOnoff"></search-input>
            </div>
            <div class="tableCon" ref="tableDataRef">
                <!-- 搜索 -->
                <div class="tableTop">
                    <el-form :inline="true" class="searchFormu searchCommon">
                        <el-form-item label="书名">
                            <el-input v-model="bookname" ref="booknameInput" placeholder="请输入书名" @keyup.enter.native="handleEnter" clearable @clear="handleClear"></el-input>
                        </el-form-item>

                        <el-form-item label="所属类别">
                            <el-select class="typeSelect" v-model="bookcategory" ref="bookcategoryInput" @change="selectChange" placeholder="请所属部门" style="width: 160px;" clearable>
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item style="margin-right:0;">
                            <el-button type="primary" icon="search" :loading="isQuery" @click="searchHandler">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="btnHandle">
                        <el-button type="info" size="small" @click="addBook">添加书籍</el-button>
                        <el-button type="danger" size="small" @click="deleteBook">批量删除数据</el-button>
                        <el-button type="info" size="small" style="margin-left: 40px;" @click="handleRole">权限分配</el-button>
                    </div>
                </div>
                <!-- 表格 -->
                <table-form
                  v-loading.body="isLoadingTableData"
                  :selectionIsChear="isChecked"
                  :colData="colData" 
                  :data="tableData" 
                  :colWidth="120" 
                  :row-key="rowKey" 
                  :max-height="height" 
                  :submiting="submiting" 
                  :isShowOper="isShowOper"
                  border 
                  sortable
                  @selection-change="handleSelectChange"     
                  @clear-selection="handleClearSelection"
                >
                <el-table-column
                    v-if="reserveSelection"
                    :reserve-selection="reserveSelection"
                    type="selection" 
                    width="55"
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
                        <div v-if="item.prop == 'status'">
                            {{scope.row[item.prop] === 'enable' ? '启用' : '禁用' }}
                        </div>
                        <div v-else-if="item.prop == 'type'">
                            {{ scope.row[item.prop] === '0' ? '超级管理员' : scope.row[item.prop] === '1' ? '普通管理员' :'普通用户' }}
                        </div>
                        <div v-else>
                            {{ scope.row[item.prop] }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column slot="fixedColumn" label="操作" fixed="right" width="260" align="center">
                    <template slot-scope="scope">
                        <el-button style="display:inline-block;margin-left:4px;"
                           size="mini"
                            plain
                            @click="handleEdit($event, scope.row)"
                        >
                        修改
                        </el-button>
                        <el-popover style="display:inline-block;margin-left:2px;"
                          ref="popover"
                          trigger="click"
                          placement="top"
                          width="160"
                          v-model="scope.row.visible"
                        >
                        <p style="font-size:14px;padding: 6px 0;">确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
                            <el-button type="primary" size="mini" :loading="submiting" @click="handleDelete(scope.row, scope.$index)">确定</el-button>
                        </div>

                         <div slot="reference">
                            <el-button
                              size="mini"
                              type="danger"
                              plain
                              :disabled="scope.row.type === '0'"
                              @click.stop.prevent="scope.row.visible = true">
                              删除
                            </el-button>
                        </div>
                        </el-popover>
                        <el-button 
                          type="info"
                          plain
                          style="display:inline-block;margin-left:8px;"
                          size="mini"
                          @click="handleRole($event, scope)"
                        >
                        权限管理
                        </el-button>
                    </template>
                </el-table-column>
                </table-form>
                <!-- 分页 -->
                <el-row type="flex" justify="end" class="tableBottom">
                    <el-pagination 
                      @size-change="handleSizeChange" 
                      @current-change="handleCurrentChange" 
                      :current-page="currentPage" 
                      :page-sizes="pageSizes" 
                      :page-size="pageSize" 
                      layout="total, sizes, prev, pager, next, jumper" 
                      :total="total">
                    </el-pagination>
                </el-row>
            </div>
        </div>
        <add-edit-organ 
          :organTitle="organTitle" 
          :organguid="organformId"
          :dialogFormVisible="addOrganOnoff"
          :row-organ-onoff="rowOrganOnoff"
          @cancelAddOrgan="cancelAddOrgan"
          @sureAddOrgan="sureAddOrgan"
          >
        </add-edit-organ>
        <add-edit-book 
          ref="AddBook"
          :AddBookTitle="AddBookTitle" 
          :addBookOnoff="addBookOnoff"
          @cancelAddBook="cancelAddBook"
          @submitAddBook="submitAddBook"
          >
        </add-edit-book>
        <!-- 权限分配 -->
        <el-dialog
        title="编辑权限树"
        :visible.sync="permissionTreeVisible"
        top="10%"
        width="400px">
        <role-assign :default-expand-all='defaultExpandAll'></role-assign>
        <span slot="footer" class="dialog-footer">
            <el-button @click="permissionTreeVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveTree">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 删除用户 -->
        <el-dialog title="信息" 
        :visible.sync="deleteOrganDialog" 
        top="10%" 
        width="400px">
        <span>是否删除所选中的机构</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteOrganDialog = false">取 消</el-button>
            <el-button type="primary" @click="sureOrganDelete">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 删除用户 -->
    </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import searchInput from '@/book/bookRuleManageMent/Navigation'
import TableForm from '@/components/common/Table'
import AddEditOrgan from '@/book/bookRuleManageMent/addeditOrganDialog'
import AddEditBook from '@/book/bookRuleManageMent/addeditBookDialog'
import RoleAssign from '@/book/bookRuleManageMent/roleAssign'
export default {
  name: 'BookCategory',
  components: {
      BreadCrumb,
      searchInput,
      TableForm,
      AddEditOrgan,
      AddEditBook,
      RoleAssign
  },
  data () {
    return {
        // 机构
        addOrganOnoff: false,
        rowOrganOnoff: false,
        organformId: '',
        operateOnoff: false,
        deleteOrganDialog: false,
        dType: '0',

        addUserOnoff: false,
        AddBookTitle: '添加书籍',
        addBookOnoff: false,


        dialogLoading: false,
        loading: true,
        breadCrumbList: [],
        bookname: '',
        bookcategory: '',
        typeOptions: [{
            value: '',
            label: '所有'
        },{
            value: '图像处理',
            label: '图像处理'
      }, {
            value: '自然语言处理',
            label: '自然语言处理'
      }],

      //列表
      isChecked: false,
      isLoadingTableData: false,
      isQuery: false,
      colData: [],
      tableData: [],
      rowKey: 'id',
      submiting: false,
      sortable: true,
      isShowOper: false,
      reserveSelection: true,
      selectionData: [],
      selectionDataId: '',
      show: true,
      height: '330',
      currentPage: 1,
      total: 20,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      organTitle: '添加图书类别',
      permissionTreeVisible: false, 
      defaultExpandAll: true
    }
  },
    mounted () {
        this.breadCrumbList = [
            {title: '首页'},
            {title: '图书管理'},
            {title: '图书分类'}
        ]
        this.colData = [
            {prop: 'bookname', label: '书籍名称', align: 'center'},
            {prop: 'bookcategory', label: '所属类别', align: 'center'},
            {prop: 'leibei', label: '所属科目', align: 'center'},
            {prop: 'room', label: '藏书室', align: 'center'},
            {prop: 'searchnumber', label: '检索书号', align: 'center'},
            {prop: 'csearchcategory', label: '中图分类号', width: 180, align: 'center'},
            {prop: 'number', label: '本馆编号', width: 124, align: 'center'},
            {prop: 'bookshelf', label: '书架', width: 88, align: 'center'},
            {prop: 'status', label: '状态', width: 88, align: 'center'}
        ]
        this.showMS()
    },
    methods: {
        showMS () {
            this.tableData =  [{
                bookname: '数字图像处理',
                bookcategory: '图像处理',
                leibei: '技术书籍',
                room: '一号馆',
                searchnumber: 'ISDD789',
                csearchcategory: 'T18',
                number: '435646',
                bookshelf: '3号书架',
                status: 'enable',
                }
            ]
        },
        addOrgan () {
            this.organTitle = '添加图书类别'
            this.addOrganOnoff = true
            this.rowOrganOnoff = false
        },
        editOrgan () {
           this.organTitle = '修改图书类别' 
           this.addOrganOnoff = true
           this.rowOrganOnoff = true
        },
        deleteOrgan () {
            this.deleteOrganDialog = true
        },
        sureAddOrgan (datas) {
            this.addOrganOnoff = false
            // this.$store.dispatch("setTreeData", datas)
            // console.log(datas)
            // console.log(datas[0].organguid)
            // console.log(datas)            
            // if (datas[0].organType) {

            // }
            // var formData = new FormData()
            // formData.append('organName', datas[0].bookCategory)
            // formData.append('organDesc', datas[0].categoryDesc)
            // formData.append('organNumber', datas[0].bookNumber)
            // formData.append('organType', datas[0].organType)

            // if(datas[1]) {
            //     formData.append('')
            // } else {

            // }
        },
        sureOrganDelete () {
            this.deleteOrganDialog = false
        },
        searchSelectHandler () {

        },
        searchHandler () {
            this.currentPage = 1
            if( this.$refs.booknameInput.value === '' && this.$refs.bookcategoryInput.value === '') {
                this.$message({
                    showClose: true,
                    message: '请输入搜索条件',
                    center: true,
                    type: 'warning'
                });
                this.showMS()
            } else {
                let result = []
                let j = 0
                for (let i in this.tableData) {
                    if (this.tableData[i].bookname == this.$refs.booknameInput.value && this.tableData[i].bookcategory == this.$refs.bookcategoryInput.value) {
                        result[j++] = this.tableData[i]
                    } else {
                        console.log('error or 未找到符合的数据')
                    }
                } 
                this.tableData = result
            }
        },
        handleClear () {
            this.showMS()
        },
        //导航树点击处理
        treeClickHandler (data) {
            console.log(data)
            console.log(data.organtype)
            console.log(data.organguid)
            this.selectData = data
            this.organguid = data.id
            this.organformId = data.organguid
            this.dType= data.organtype
            this.currentPage = 1
        },
        addBook () {
            console.log('添加书籍')
            this.currentPage = 1
            this.AddBookTitle = '添加书籍',
            this.addBookOnoff = true
        },
        deleteBook () {

        },
        submitAddBook (data) {
            console.log(111)
            console.log(data)
            this.addBookOnoff = false
            
            this.tableData.push(data)
        },
        handleRole (e, scope) {
            e.preventDefault()
            e.stopPropagation()
            this.permissionTreeVisible = true
        },
        saveTree () {
            this.permissionTreeVisible = false
        },
        handleEdit () {
        },
        selectChange (val) {
            this.bookcategory = val
        },
        handleSelectChange () {

        },
        handleClearSelection () {

        },
        handleSizeChange () {
            
        },
        handleCurrentChange () {

        },
        cancelAddOrgan () {
            this.addOrganOnoff = false
        },
        cancelAddBook () {
            this.addBookOnoff = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .bookMangement {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;

        .con {
            flex: 1;
            display: flex;
            flex-direction: row;
        }

        .nav {
            width: 230px;
            // height: 100%;
            background: #fafdfd;
            box-shadow: 1px 2px 8px rgba(32, 34, 42, .2);
            
            display: flex;
            flex-direction: column;
        }

        .navBtn {
            width: 100%;
            background: rgba(8, 139, 134, 0.1);
            box-shadow: 1px 2px 8px rgba(32, 34, 42, .2);
            text-align: center;
            padding: 10px 0;
        }
    }
    .tableCon {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }
    .tableTop {  
      padding: 20px 10px 0px;

      .searchFormu {
        float: left;
        padding: 0;
      }
      .btnHandle {
        float: right;
        padding: 0px 10px 10px;
      }
      
    }
    .tableBottom {
        padding: 15px 10px 15px;
        height: 51px; 
    }
    
</style>
