<template>
  <div class="addRulesDialog"> 
    <el-dialog class="addParts" 
      :visible.sync="dialogFormVisible" 
      :before-close="cancelRegister" 
      top="1%" 
      :title="ruleTitle" 
      :close-on-click-modal="isClickOnModal" 
      width="1000px">
      <div class="rulesDialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true">
          <div class="ellabel"><i class="iconfont icon-1"></i>关联主机</div>
            <el-form-item class="rules" label="主机名称:" prop="hostname">
              <el-select v-model="ruleForm.hostname" placeholder="请选择" :disabled="isReadonly" @change="selectGet">
                <el-option v-for="item in ruleForm.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="false"><el-input v-model="ruleForm.hostid"> </el-input></el-form-item>
            <br>
          <div class="ellabel"><i class="iconfont icon-2"></i>设置报警规则</div>    
          <el-form-item label="规则名称:" prop="rulename">
            <el-input v-model="ruleForm.rulename" placeholder="请输入规则名称" :disabled="isReadonly"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="规则描述:">
            <el-form-item class="ruledes">
              <el-select class="el-select_box" v-model="ruleForm.alarmitem" placeholder="请选择" :disabled="isReadonly">
                <el-option v-for="item in ruleForm.options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="ruledes">
              <el-select class="el-select_box" v-model="ruleForm.monitortime" placeholder="请选择" :disabled="isReadonly">
                <el-option v-for="item in ruleForm.options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="ruledes">
              <el-select class="el-select_box" v-model="ruleForm.monitortype" placeholder="请选择" :disabled="isReadonly">
                <el-option v-for="item in ruleForm.options3" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="ruledes">
              <el-select class="el-select_box" v-model="ruleForm.comparetype" placeholder="请选择" :disabled="isReadonly">
                <el-option v-for="item in ruleForm.options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="ruledes">
              <el-input-number class="el-select_box" v-model="ruleForm.comparenum" controls-position="right" :disabled="isReadonly"></el-input-number>
              <label></label>
            </el-form-item>
            <!-- <el-button type="text"prop="comparenum" class="addrules" @click="addRules" :disabled="isReadonly"><i class="iconfont icon-iconjia"></i>添加报警规则</el-button>   -->
          </el-form-item>
          <el-form-item class="rules" label="通道沉默时间:" prop="silenttime">
            <el-select v-model="ruleForm.silenttime" placeholder="请选择" :disabled="isReadonly">
              <el-option v-for="item in ruleForm.options5" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="rules tongdao" label="连续几次超过阈值后报警:" prop="maxalarmtimes">
            <el-select v-model="ruleForm.maxalarmtimes" placeholder="请选择" :disabled="isReadonly">
              <el-option v-for="item in ruleForm.options6" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="timepicker" label="生效时间:">
            <el-col :span="11">
              <el-form-item class="ruledes">
                <el-time-select :disabled="isReadonly" placeholder="起始时间" v-model="ruleForm.validtimefrom" :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '24:00'
              }">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">至</el-col>
            <el-col :span="3">
              <el-form-item class="ruledes">
                <el-time-select :disabled="isReadonly" placeholder="结束时间" v-model="ruleForm.validtimeto" :picker-options="{
                start: '00:59',
                step: '01:00',
                end: '23:59',
                minTime: startTime
              }">
                </el-time-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <br>
          <div class="ellabel"><i class="iconfont icon-3"></i>通知方式</div>
          <br>
          <el-form-item class="rules" label="通知对象:" prop="notifyobject">
            <el-input v-model="ruleForm.notifyobject" placeholder="请输入联系人名称" :disabled="isReadonly" class="el-select_box"></el-input>
          </el-form-item>
          <el-form-item class="rules" label="邮箱:" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱" :disabled="isReadonly" class="el-select_box"></el-input>
          </el-form-item>
          <div class="moreRules">
            <div class="moreRulesIn" v-for="(item, index) in ruleForm.moreNotifyObject" :key="item.key">
              <el-form-item class="rules" label="通知对象:" :prop="'moreNotifyObject.' + index +'.notifyobject'" :rules="moreNotifyOjbectRules.moreNotifyOjbectName">
                <el-input v-model="item.notifyobject" placeholder="请输入联系人名称" :disabled="isReadonly" class="el-select_box"></el-input>
              </el-form-item>
              <el-form-item class="rules" label="邮箱:" :prop="'moreNotifyObject.'+ index +'.email'" :rules="moreNotifyOjbectRules.moreNotifyOjbectEmail">
                <el-input v-model="item.email" placeholder="请输入邮箱" :disabled="isReadonly" class="el-select_box"></el-input>
              </el-form-item>
              <el-button @click="deleteRules(item, index)" :disabled="isReadonly">删除</el-button>
            </div>
          </div>
          <el-form-item v-show="!isRead">
            <el-button type="text" class="addUser" @click="addUser" :disabled="isReadonly"><i class="iconfont icon-tianjialianxiren"></i>添加更多联系人</el-button>
          </el-form-item>
          <el-form-item label="通知方式:">
            <el-select class="el-select_box" v-model="ruleForm.notifytype" placeholder="请选择" :disabled="isReadonly">
              <el-option v-for="item in ruleForm.options7" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮件主题:">
            <el-input v-model="ruleForm.emailtheme" placeholder="请填写邮件主题" :disabled="isReadonly"></el-input>
          </el-form-item>
          <el-form-item label="邮件正文:">
            <el-input type="textarea" :rows="2" placeholder="请输入内容(非必填）" :disabled="isReadonly" v-model="ruleForm.emailbody">
            </el-input>
          </el-form-item>
          <br>
          <div class="ellabel"><i class="iconfont icon-4"></i>是否启用</div>
          <br>
          <el-form-item label="状态:">
            <el-radio class="status" v-model="ruleForm.rulestatus" label="01" :disabled="isReadonly">启用</el-radio>
            <el-radio class="status" v-model="ruleForm.rulestatus" label="02" :disabled="isReadonly">禁用</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <br>
      <div slot="footer" class="dialog-footer" v-show="!isRead">
        <el-button @click="cancelRegister">取 消</el-button>
        <el-button type="primary" @click="dialogSure('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Api from '@/api/index.js'

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
    ruleFormData: {
      type: Object,
      default: () => {}
    },
    top: {
      type: String,
      default: '4%'
    },
    ruleTitle: {
      type: String,
      default: '创建报警规则'
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
  data() {
    return {
      startTime: '',
      endTime: '',
      addRulesOnoff: 'false',
      ruleForm: {
      option: [],
      options1: [],
      options2: [{
          label: '1分钟',
          value: '1'
        },
        {
          label: '5分钟',
          value: '5'
        },
        {
          label: '15分钟',
          value: '15'
        },
        {
          label: '30分钟',
          value: '30'
        },
        {
          label: '60分钟',
          value: '60'
        }
      ],
      options3: [{
          label: '平均值',
          value: '01'
        },
        {
          label: '只要有一次',
          value: '02',
          disabled: true
        },
        {
          label: '总是',
          value: '03',
          disabled: true
        }
      ],
      options4: [{
          label: '>=',
          value: '01'
        },
        {
          label: '>',
          value: '02'
        },
        {
          label: '<=',
          value: '03'
        },
        {
          label: '<',
          value: '04'
        },
        {
          label: '=',
          value: '05'
        },
        {
          label: '!=',
          value: '06'
        }
      ],
      options5: [{
          label: '5分钟',
          value: '5m'
        },
        {
          label: '10分钟',
          value: '10m'
        },
        {
          label: '15分钟',
          value: '15m'
        },
        {
          label: '30分钟',
          value: '30m'
        },
        {
          label: '60分钟',
          value: '60m'
        },
        {
          label: '3小时',
          value: '3h'
        },
        {
          label: '6小时',
          value: '6h'
        },
        {
          label: '12小时',
          value: '12h'
        },
        {
          label: '24小时',
          value: '24h'
        }
      ],
      options6: [{
          label: 1,
          value: 1
        },
        {
          label: 3,
          value: 3
        },
        {
          label: 5,
          value: 5
        },
        {
          label: 10,
          value: 10
        },
        {
          label: 15,
          value: 15
        },
        {
          label: 30,
          value: 30
        }
      ],
      options7: [{
        label: '邮件',
        value: '01'
      }],
      hostname: '',
      hostid: '',
      rulename: '',
      alarmitem: '01',
      monitortime: '1',
      monitortype: '01',
      comparetype: '01',
      comparenum: 1,
      silenttime: '',
      maxalarmtimes: null,
      notifyobject: '',
      email: '',
      validtimefrom: '00:00',
      validtimeto: '23:59',
      notifytype: '01',
      tel: '',
      rulestatus: '01',
      emailtheme: '',
      emailbody: '',
      userArr: [],
      emailArr: [],
      moreNotifyObject: [{
        notifyobject: '',
        email: ''
      }]
      },
      ruleid: '',
      // 监听规则
      rules: {
        hostname: [
          { required: true, message: '请选择主机', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length === 0) {
                callback(new Error('请选择主机'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        rulename: [
          { required: true, message: '请输入规则名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 15 || value.length < 3) {
                callback(new Error('长度必须为3~15个字符'))
              } else {
                var reg = new RegExp("[`@#$^&*()=|{}':;',\\[\\].《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                if (reg.test(value)) {
                  callback(new Error('不能含有特殊字符'))
                } else {
                  callback()
                }
              }
            },
            trigger: 'change'
          }
        ],
        silenttime: [
          { required: true, message: '请选择通道沉默时间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length === 0) {
                callback(new Error('请选择通道沉默时间'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        maxalarmtimes: [
          { required: true, message: '请选择超过阈值频率', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === 0) {
                callback(new Error('请选择超过阈值频率'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        notifyobject: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 15 || value.length < 2) {
                callback(new Error('长度必须为2~8个字符'))
              } else {
                var reg = new RegExp("[`~!@#$^&*()=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                if (reg.test(value)) {
                  callback(new Error('不能含有特殊字符'))
                } else {
                  callback()
                }
              }
            },
            trigger: 'change'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        textarea: [{
          validator: (rule, value, callback) => {
            if (value.length > 500) {
              callback(new Error('邮件内容不能超过500个字符'))
            }
          },
          trigger: 'change'
        }]
      },
      moreNotifyOjbectRules: {
        moreNotifyOjbectName: [{ required: true, message: '请输入联系人名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 15 || value.length < 2) {
                callback(new Error('长度必须为2~8个字符'))
              } else {
                var reg = new RegExp("[`~!@#$^&*()=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
                if (reg.test(value)) {
                  callback(new Error('不能含有特殊字符'))
                } else {
                  callback()
                }
              }
            },
            trigger: 'change'
          }
        ],
        moreNotifyOjbectEmail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.initData() 
  },
  methods: {
    // 初始化数据
    initData() {
      if (this.rowEditOnoff) { // 修改规则   
        // this.selectGet()
        this.getRuleByID() // 调用显示规则函数        
      } else { // 添加规则     
        this.ruleForm.hostname = ''
        this.ruleForm.hostid = ''
        this.ruleForm.rulename = ''
        this.ruleForm.alarmitem = '01'
        this.ruleForm.monitortime = '1'
        this.ruleForm.monitortype = '01'
        this.ruleForm.comparetype = '01'
        this.ruleForm.comparenum = 1
        this.ruleForm.silenttime = null
        this.ruleForm.maxalarmtimes = ''
        this.ruleForm.validtimefrom = '00:00'
        this.ruleForm.validtimeto = '23:59'
        this.ruleForm.notifyobject = ''
        this.ruleForm.email = ''
        this.ruleForm.notifytype = '01'
        this.ruleForm.emailtheme = ''
        this.ruleForm.emailbody = ''
        this.ruleForm.rulestatus = '01'
        this.ruleForm.moreNotifyObject = []
      }
      this.getServersItem()
      this.getAlarmItem()
    }, 
    // 展示数据
    getRuleByID() {
      this.ruleid = this.ruleFormData.id
      Api.getRuleByID(this.ruleid)
        .then(data => {
          let datas = data.data
          if (data.status === 0) {
            this.ruleForm.ruleid = datas.id
            this.ruleForm.hostid = datas.hostid
            this.ruleForm.hostname = datas.hostname
            this.ruleForm.rulename = datas.rulename
            this.ruleForm.alarmitem = datas.alarmitem
            var numtoString = datas.monitortime.toString()
            this.ruleForm.monitortime = numtoString
            this.ruleForm.monitortype = datas.monitortype
            this.ruleForm.comparetype = datas.comparetype
            this.ruleForm.comparenum = datas.comparenum
            this.ruleForm.silenttime = datas.silenttime
            this.ruleForm.maxalarmtimes = datas.maxalarmtimes
            this.ruleForm.validtimefrom = datas.validtimefrom
            this.ruleForm.validtimeto = datas.validtimeto
            this.ruleForm.notifytype = datas.notifytype
            this.ruleForm.emailtheme = datas.emailtheme
            this.ruleForm.emailbody = datas.emailbody
            this.ruleForm.rulestatus = datas.rulestatus
            this.ruleForm.moreNotifyObject = []
            var useArr = datas.notifyobject.split(';')
            var eArr = datas.email.split(';')
            if (useArr.length !== 0) {
              for (var i = 1; i < useArr.length; i++) {
                this.ruleForm.moreNotifyObject.push({ notifyobject: useArr[i], email: eArr[i] })
              }
            }
            this.ruleForm.notifyobject = useArr[0]
            this.ruleForm.email = eArr[0]
          }
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        })
    },
    // 获取规则描述的alarmitem
    getAlarmItem() {
      Api.getAlarmItem()
        .then(data => {
          let datas = data.data
          if (data.status === 0) {
            this.ruleForm.options1 = data.data
          } else {
            this.$message({
              type: 'warning',
              message: '获取数据失败！'
            })
          }
        }).catch(res => {
          this.isLoadingCatalogLineChart = false
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        })
    },
      // 获取主机名称
    getServersItem() {
      Api.getServersItem()
        .then(data => {
          let datas = data.data
          if (data.status === 0) {
            this.ruleForm.options = data.data
          } else {
            this.$message({
              type: 'warning',
              message: '获取数据失败！'
            })
          }
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        })
    },
    // 下拉框选中事件
    selectGet(value) { // value值
      for (var k = 0; k < this.ruleForm.options.length; k++) {
        if (this.ruleForm.options[k].value === value) {
          this.ruleForm.hostname = this.ruleForm.options[k].label 
          this.ruleForm.hostid = this.ruleForm.options[k].value       
        }
      }
    },
    // 添加更多联系人
    addUser() {
      this.ruleForm.moreNotifyObject.push({
        notifyobject: '',
        email: ''
      })
    },
    // 删除更多联系人
    deleteRules(item, index) {
      this.index = this.ruleForm.moreNotifyObject.indexOf(item)
      if (index !== -1) {
        this.ruleForm.moreNotifyObject.splice(index, 1)
      }
    },
    // 确定
    dialogSure(ruleForm) {
      if (!this.isReadonly) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            if (this.ruleForm.moreNotifyObject.length !== 0) { // 将联系人信息拼接起来
              this.userArr = []
              this.emailArr = []
              for (var i = 0; i < this.ruleForm.moreNotifyObject.length; i++) {
                this.userArr.push(this.ruleForm.moreNotifyObject[i].notifyobject)
                this.emailArr.push(this.ruleForm.moreNotifyObject[i].email)
              }
              this.ruleForm.notifyobject = this.ruleForm.notifyobject + ';' + this.userArr.join(';')
              this.ruleForm.email = this.ruleForm.email + ';' + this.emailArr.join(';')
            }
            if (this.rowEditOnoff) { // 修改
              this.$emit('dialog-sure', [this.ruleForm, true])
            } else { // 新添
              this.$emit('dialog-sure', [this.ruleForm, false])
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        this.$emit('dialog-sure', [this.ruleForm, false])
      }
    },
    // 取消添加规则
    cancelRegister() {
      this.addRulesOnoff = false
      this.$emit('dialog-cancel')
    }
  }
}

</script>
<style lang="scss">
.addRulesDialog {
  .el-dialog--small {
    width: 40%;
  }
  .el-dialog__header {
    padding: 20px 20px 0 20px;
    text-align: center;
    .el-dialog__title {
      color: #666;
    }
  }
  .el-dialog__body {
    padding: 20px 15px 10px 40px;
  }
  .el-form-item__label {
    width: 130px;
    float: left !important;
  }
  .el-form-item__content {
    float: left;
    width: 705px;
  }
  .el-form-item {
    margin-bottom: 18px;
  }
  .el-input-group__append {
    cursor: pointer;
  }
  .ellabel {
    color: blue;
    font-size: 18px;
  }
  .addrules {
    margin-left: 50px;
  }
  .addUser {
    margin-left: 80px;
  }
  .iconfont {
    margin-right: 8px;
  }
  .rules {
    .el-form-item__content {
      float: left;
      width: 200px;
    }
  }
  .tongdao {
    .el-form-item__label {
      width: 200px;
      float: left !important;
    }
  }
  .ruledes {
    .el-form-item__content {
      float: left;
      width: 120px;
    }
    .el-select_box {
      width: 130px;
    }
  }
  .timepicker {
    .el-form-item__content {
      float: left;
      width: 490px;
    }
  }
}

</style>
