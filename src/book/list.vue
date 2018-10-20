<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">图书管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col> 

    <el-col :span="24" class="warp-main" v-loading="loading"  element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" ref="booknameInput" placeholder="请输入书名" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
          <el-table @row-click="handleCurrentChange" @selection-change="selsChange" ref="table" :data="pageData" :default-sort="{prop: 'createAt', order: 'descending'}" stripe style="width: 100%" align="center">
             <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="bookname" label="书名" sortable></el-table-column>
            <el-table-column prop="author" label="作者" sortable></el-table-column>
            <el-table-column prop="date" label="出版日期" sortable></el-table-column>
            <el-table-column prop="desc" label="简介" sortable></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, pageData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="danger" @click="removeBatch(sels)" :disabled="this.sels.length === 0 || this.disabled" style="float: left;">批量删除</el-button>
          <el-pagination layout="prev, pager, next" :page-size="10" :total="total" style="float: right;"></el-pagination>
      </el-col>
    </el-col>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :before-close="handleClose" :form-id="formId" align="left">
      <el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="100px" class="edit-ruleForm">
        <el-form-item label="书名" required prop="bookname">
          <el-input type="text" v-model="editForm.bookname" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="作者" required prop="author">
          <el-input type="text" v-model="editForm.author" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="date" align="left">
          <el-date-picker v-model="editForm.date" type="date" @change="getTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
         <el-form-item label="简介" required prop="desc">
          <el-input type="textarea" v-model="editForm.desc" :autosize="{ minRows: 8, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">提 交</el-button>
      </span>
    </el-dialog>
    <!-- <edit-book :formId="formId" :dialogVisible="dialogVisible" @dialog-sure="Edit"></edit-book> -->

    <el-dialog title="新增" :visible.sync="addDialogVisible" :before-close="handleClose" align="left">
      <el-form :model="AddForm" status-icon :rules="AddRules" ref="AddForm" label-width="100px" class="add-ruleForm">
        <el-form-item label="书名" required prop="bookname">
          <el-input type="text" v-model="AddForm.bookname" autocomplete="on" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者" required prop="author">
          <el-input type="text" v-model="AddForm.author" autocomplete="on" clearable></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publishDate" align="left">
          <el-date-picker v-model="AddForm.publishDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
         <el-form-item label="简介" required prop="desc">
          <el-input type="textarea" v-model="AddForm.desc" :autosize="{ minRows: 8, maxRows: 10}" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">提 交</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
// import EditBook from './editBook'
import axios from 'axios'
export default {
  name: 'BookList',
  // components: {
  //   EditBook
  // },
  data () {
    return {
      loading: false,
      filters: {
        name: ''
      },
      pageSize: 10,
      total: 1,
      page: 1,
      limit: 10,
      pageData: [],
      query: '',
      sort: 'createAt',
      order: 'descending',
      accept: '',
      ws: null,
      sels: [],
      disabled: true,
      dialogVisible: false,
      addDialogVisible: false,
      formId: '',
      AddForm:{
        bookname: '',
        author: '',
        publishDate: '',
        desc: ''
      },
      AddRules: {
        bookname: [
          {required: true, message: '请输入书名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在3-5个字符', trigger:'blur'}
        ],
        author: [
          {required: true, message: '请输入作者名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在3-5个字符', trigger:'blur'}
        ],
        desc:[
          {required: true, message: '请填写简介', trigger: 'blur'}
        ]
      },
      editForm:{
          bookname: '听你的',
          author: '张皓宸',
          date: '2018-09-18',
          desc: 'ffffffffgvgvfv'
      },
      editRules: {
          bookname: [
          {required: true, message: '请输入书名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在3-5个字符', trigger:'blur'}
          ],
          author: [
          {required: true, message: '请输入作者名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在3-5个字符', trigger:'blur'}
          ],
          desc:[
          {required: true, message: '请填写简介', trigger: 'blur'}
          ]
      },
    }
  },
  mounted () {
   this.showMS();
  },
  methods: {
    showMS () {
       this.pageData = [{
        rowNum: 1,
        bookname: '小王子',
        author: '扎克瑞',
        date: '2016-05-02',
        desc: '外国名著'
      },{
        rowNum: 2,
        bookname: '背影',
        author: '朱自清',
        date: '2014-05-02',
        desc: '中国散文'
      }]
    },
    getTime(val){
      console.log(val)
      // this.editForm.date = date;
    },
    handleSearch () {
      if (this.$refs.booknameInput.value === '') {
        this.showMS();
      } else {
          let result = []
            result = this.pageData.filter(item => {
              return item.bookname === this.$refs.booknameInput.value
            })
          this.pageData = result
      } 
    },
 
    // init () {
    //   axios.get('/api/tableData.json')
    //     .then(response => {
    //         console.log(111)
    //         response=response.data
    //         console.log(response.pageData)
    //         if(response.ret && response.pageData) {
    //           var data = response.pageData
    //           this.pageData = data
    //         }
    //   })
    // },
    handleEdit (index, row) {
      console.log(index, row) // 0 author: "扎克瑞" bookname: "小王子" date: "2016-05-02" desc: "外国名著"
      this.dialogVisible = true
      this.formId = row.rowNum
      this.editForm = Object.assign({},row)
    },
    handleDelete (index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    selsChange (sels) {
      this.sels = sels;
      this.disabled=false;
    },
    removeBatch(rows){
      // var ids = []
      // rows.forEach(element => {
      //   ids.push(element.id)
      // })
      
      this.$confirm('确认要删除选中的行吗？', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(rows)
      for (let i = 0; i < rows.length; i++) {
        let val= rows
        val.forEach((val, index) => {
          this.pageData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              this.pageData.splice(i, 1)
            }
          })
        })
      }
      this.$refs.table.clearSelection()
      rows.forEach(item => {
        console.log(item.id)
      })
        // this.pageData = [];
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    handleCurrentChange(row, event, column){
      this.$refs.table.toggleRowSelection(row)
    },
    handleClose(done){
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleAdd(){
      this.addDialogVisible = true
    },
    edit(editForm){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          console.log(this.editForm)
          Object.assign(this.pageData[this.formId-1], this.editForm);
        } else {
          console.log('error submit!')
          return false;
        }
      })
      this.dialogVisible = false;
    },
    add(AddForm){
      this.$refs.AddForm.validate((valid) => {
        if (valid) {
          let j = {};
          j.bookname = this.AddForm.bookname;
          j.author = this.AddForm.author;
          j.date = this.AddForm.publishDate;
          j.desc = this.AddForm.desc;
          console.log(j)
          this.pageData.push(j)
          console.log(this.pageData)
        } else {
          alert('必填项未填，提交失败!');
          return false;
        }
      })
      this.addDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
    
</style>
