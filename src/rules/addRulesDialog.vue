<template>
  <div class="addRulesDialog"> 
      <el-dialog class="addParts" 
      :visible.sync="dialogFormVisible" 
      :before-close="cancelRegister" 
      top="1%" 
      :title="ruleTitle" 
      :close-on-click-modal="isClickOnModal"
      width="600px">
        <div class="rulesDialog">
            <el-form :model="ruleForm" :label-position="labelPosition" label-width="80px" :inline="true">
                <el-form-item label="规则名称:">
                    <el-input v-model="ruleForm.rulename" :disabled="isReadonly"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="借阅地点" prop="ruleplace" style="text-align: left">
                    <el-select v-model="ruleForm.ruleplace" @change ="$set(ruleForm, ruleForm.ruleplace, $event)" placeholder="请选择藏书室" :disabled="isReadonly" clearable>
                        <el-option v-for="item in bookPlaces" :key="item.value" :label="item.label" :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="借阅约束" prop="ruleConstraint">
                     <el-input v-model="ruleForm.ruleConstraint" :disabled="isReadonly"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="详细规则" prop="ruleDescribe">
                     <el-input type="textarea" v-model="ruleForm.ruleDescribe" :disabled="isReadonly"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="通知借方:" prop="notifyobject">
                     <el-input v-model="ruleForm.notifyobject" placeholder="请输入联系人名称" :disabled="isReadonly"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="是否启用" prop="rulestatus" style="text-align: left">
                    <el-radio v-model="ruleForm.rulestatus" label="是"  @change ="$set(ruleForm, ruleForm.rulestatus, $event)" :disabled="isReadonly">是</el-radio>
                    <el-radio v-model="ruleForm.rulestatus" label="否"  @change ="$set(ruleForm, ruleForm.rulestatus, $event)" :disabled="isReadonly">否</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" v-show="!isRead">
                <el-button @click="cancelRegister" size="medium">取 消</el-button>
                <el-button type="primary" @click="dialogSure" size="medium">确 定</el-button>
            </div>
        </div>
      </el-dialog>
      </div>
</template>

<script>

export default {
    name: 'AddRulesDialog',
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false
        },
        rowEditOnoff: {
            type: Boolean,
            default: false
        },
        formId: '',
        ruleFormData: {
            type: Object,
            default: () => {}
        },
        ruleTitle: {
            type: String,
            default: '借阅规则'
        },
        isReadonly: {
            type: Boolean,
            default: false
        },
        isClickOnModal: {
            type: Boolean,
            default: false
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            labelPosition: 'right',
            ruleForm: {
                rulename: '',
                ruleplace: '',
                ruleConstraint: '',
                ruleDescribe: '',
                notifyobject: '',
                rulestatus: '是',
                notifyobject: '',
                moreNotifyObject: [{
                    notifyobject: '',
                    email: ''
                }]
            },
            bookPlaces: [{
                value: '1',
                label: '1号馆'
            },{
                value: '2',
                label: '2号馆'
            },{
                value: '3',
                label: '3号馆'
            },{
                value: '4',
                label: '4号馆'
            },{
                value: '5',
                label: '5号馆'
            }]
        }
    },
    mounted () {
        this.showMS()
    },
    methods: {
        showMS (ruleFormData){
           console.log(this.ruleFormData)
           this.ruleForm = this.ruleFormData
        },
        cancelRegister () {
            this.$emit('dialog-cancel')
        },
        addUser () {
            this.moreNotifyObject.push({
                notifyobject: '',
                email: ''
            })
        },
        deleteRules () {

        },
        dialogSure (ruleForm) {
            console.log(this.isReadonly, this.rowEditOnoff)
            if (!this.isReadonly) {
                if (this.rowEditOnoff) {
                    this.$emit('dialog-sure', this.ruleForm)
                }
            }
        }

    }
}
</script>
<style lang="scss">
    .el-form-item__content {
        width: 300px;
    }
    .el-select {
        width: 300px;
    }
    .el-button+.el-button {
        margin-left: 25px;
    }
</style>




