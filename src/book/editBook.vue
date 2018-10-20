<template>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :before-close="handleClose" :form-id="formId" align="left">
      <el-form :model="editForm" status-icon :rules="editRules" ref="editForm" label-width="100px" class="edit-ruleForm">
        <el-form-item label="书名" required prop="bookname">
          <el-input type="text" v-model="editForm.bookname" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="作者" required prop="author">
          <el-input type="text" v-model="editForm.author" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publishDate" align="left">
          <el-date-picker v-model="editForm.publishDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
         <el-form-item label="简介" required prop="desc">
          <el-input type="textarea" v-model="editForm.desc" :autosize="{ minRows: 8, maxRows: 10}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">提 交</el-button>
      </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'EditBook',
    props: {
        formId: '',
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        sureEdit(editForm){
        this.$refs.editForm.validate((valid) => {
            if (valid) {
                console.log(this.editForm)
                this.$emit('dialog-sure', this.editForm)
            } else {
                console.log('error submit!')
                return false;
            }
        })
        this.dialogVisible = false;
        },
    }
}
</script>
<style lang="scss" scoped>

</style>
