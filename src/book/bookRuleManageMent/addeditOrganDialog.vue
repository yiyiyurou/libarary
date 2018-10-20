<template>
    <div class="addeditUserDialog">
        <el-dialog 
          class="addParts" 
          :visible.sync="dialogFormVisible"
          :before-close="cancelAddOrgan"
          :top="top"
          :title="organTitle"
          width="450px"
        >
            <el-form :model="addeidtForm" :rules="rules" ref="addeidtForm" :label-position="labelPosition" label-width="80px" :inline="true">
                <el-form-item label="类别名称" prop="organName">
                    <el-input v-model="addeidtForm.organName"></el-input>
                </el-form-item>
                <el-form-item label="类别描述" prop="organDesc">
                    <el-input v-model="addeidtForm.organDesc"></el-input>
                </el-form-item>
                <el-form-item label="类别编号" prop="organNumber">
                    <el-input v-model="addeidtForm.organNumber"></el-input>
                </el-form-item>
                <el-form-item label="所属类型" prop="organType">
                    <el-select v-model="addeidtForm.organType" placeholder="请选择所属类型">
                         <el-option v-for="item in organTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddOrgan">取 消</el-button>
                <el-button type="primary" @click="sureAddOrgan">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'AddEditOrgan',
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        rowOrganOnoff: {
            type: Boolean,
            default: false
        },
        organformId: '',
        top: {
            type: String,
            default: '2%'
        },
        organTitle: {
            type:String,
            default: '添加机构'
        }
    },
    data () {
        return {
            labelPosition: 'right',
            addeidtForm: {
                organName: '',
                organDesc: '',
                organNumber: '',
                organType: '子类'
            },
            organTypes: [{
                value: '',
                label: ''
            }],
            rules: {
                organName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { max: 10, message: '长度在 10个字符之内', trigger: 'blur' }
                ],
                organType: [
                    { required: true, message: '请选择所属类型', trigger: 'change' },
                ]
            }
        }
    },
    mounted () {
        this.organTypes = [{
            value: '1',
            label: '总类'
        },{
            value: '2',
            label: '子类'
        },{
            value: '3',
            label: '孙子类'
        }]
    },
    methods: {
        initData () {
            if (this.rowOrganOnoff) {  // 修改
                this.showUserData()
            } else {
                this.addeidtForm.organName = ''
                this.addeidtForm.organDesc = ''
                this.addeidtForm.organNumber = ''
                this.addeidtForm.organType = '子类'
            }
        },
        showUserData () {
             this.addeidtForm.organName = ''
            this.addeidtForm.organDesc = ''
            this.addeidtForm.organNumber = ''
            this.addeidtForm.organType = '子类'
        },
        cancelAddOrgan () {
            this.$emit('cancelAddOrgan')
        },
        sureAddOrgan (addeidtForm) {
            this.$refs.addeidtForm.validate((valid) => {
                if (valid) {
                    if (this.rowOrganOnoff) {
                        this.$emit('sureAddOrgan', [this.addeidtForm, true])
                    } else {
                        this.$emit('sureAddOrgan', [this.addeidtForm, false])
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
  .addParts {
      text-align: left;
      .el-dialog-small {
          width: 40%;
      }
      .el-dialog__header {
          padding: 20px 20px 0 20px;
          text-align: center;
          .el-dialog__title { 
            color: #666;
        }
      }
      .el-dialog__body{ 
        padding: 20px 15px 10px 40px;
      }
      .el-form-item__label{ 
        width: 80px;
        float: left !important;
    }
    .el-form-item__content{ 
        float: left;
        width: 350px;
    }
    .el-form-item{ 
        margin-bottom: 18px;
    }
  }
</style>
