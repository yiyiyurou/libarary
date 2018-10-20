<template>
    <div class="addeditBookDialog">
        <el-dialog 
          class="addParts" 
          :visible.sync="addBookOnoff"
          :before-close="cancelAddBook"
          :top="top"
          :title="AddBookTitle"
          width="450px"
        >
            <el-form :model="addeidtForm" :rules="rules" ref="addeidtForm" :label-position="labelPosition" label-width="100px" :inline="true">
                <el-form-item label="书名" prop="bookName">
                    <el-input v-model="addeidtForm.bookName" clearable></el-input>
                </el-form-item>
                <el-form-item label="所属类别" prop="bookCategory">
                    <el-select v-model="addeidtForm.bookCategory" placeholder="请选择图书类别" clearable>
                         <el-option v-for="item in bookCategory" :key="item.value" :label="item.label" value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属科目" prop="bookSubject">
                    <el-input v-model="addeidtForm.bookSubject" clearable></el-input>
                </el-form-item>
                
                <el-form-item label="藏书室" prop="bookPlace">
                    <el-select v-model="addeidtForm.bookPlace" placeholder="请选择藏书室"  clearable>
                         <el-option v-for="item in bookPlaces" :key="item.value" :label="item.label" value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="检索书号" prop="bookSearhNum">
                    <el-input v-model="addeidtForm.bookSearhNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="中图分类号" prop="cSearhNum">
                    <el-input v-model="addeidtForm.cSearhNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="本馆编号" prop="bookNum">
                    <el-input v-model="addeidtForm.bookNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="所在书架" prop="bookShelf">
                    <el-input v-model="addeidtForm.bookShelf" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="bookStatus">
                    <el-select v-model="addeidtForm.status" placeholder="请选择图书状态" clearable>
                         <el-option v-for="item in bookStates" :key="item.value" :label="item.label" value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="所属管理部门">
                   <el-cascader
                    expand-trigger="hover"
                    :options="manageApartments"
                    v-model="addeidtForm.manage"
                    filterable
                    clearable
                    change-on-select
                    @change="handleChange">
                    </el-cascader>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAddBook">取 消</el-button>
                <el-button type="primary" @click="sureAddBook">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import bus from '../../assets/js/eventBus'
export default {
    name: 'AddeditBookDialog',
    props: {
         addBookOnoff: {
            type: Boolean,
            default: false
        },
        top: { 
            type: String,
            default: '4%'
        },
        AddBookTitle: {
            type: String,
            default: '添加书籍'
        }
    },
    data () {
        return {
            labelPosition: 'right',
            addeidtForm: {
                bookName: '',
                bookCategory: '',
                bookSubject: '',
                bookPlace: '',
                bookSearhNum: '',
                cSearhNum: '',
                bookNum: '',
                bookShelf: '',
                // manage: [],
                status: ''
            },
            bookCategory: [],
            bookPlaces: [],
            // manageApartments: [],
            bookStates: [],
            rules: {
                bookName: [
                    { required: true, message: '请输入书名', trigger: 'blur' }
                ],
                bookCategory: [
                    {required: true, message: '请选择图书类别', trigger: 'change'},
                ],
                bookShelf: [
                    { required: true, message: '请输入书架', trigger: 'blur' }
                ],
                manage: [
                    { required: true, message: '请选择部门', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
        this.bookCategory = [{
            value: 'T18',
            label: 'T18'
        },{
            value: 'T36',
            label: 'T36' 
        },{
            value: 'C45',
            label: 'C45'
        }]
        this.bookPlaces = [{
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
        // this.manageApartments = [{
        //         value: 'zhongwen',
        //         label: '中文',
        //         children: [{
        //             value: 'xiaoshuo',
        //             label: '小说',
        //             children: [{
        //                 value: 'lately',
        //                 label: '当代小说',
        //             },{
        //                 value: 'Ancient',
        //                 label: '古代小说',
        //             }]
        //         },{
        //             value: 'wenxue',
        //             label: '文学',
        //             children: [{
        //                 value: 'latelyLiterature',
        //                 label: '当代文学',
        //             },{
        //                 value: 'AncientLiterature',
        //                 label: '古代文学',
        //             }]
        //         },{
        //             value: 'keji',
        //             label: '科技',
        //         }]
        //       },{
        //         value: 'yingyu',
        //         label: '英语',
        //         children: [{
        //             value: 'xiaoshuo',
        //             label: 'times',
        //         },{
        //             value: 'wenxue',
        //             label: 'nature',
        //         },{
        //             value: 'keji',
        //             label: 'science',
        //         }]
        //     }],
        this.bookStates = [{
            value: 'unenable',
            label: '禁用'
        },{
            value: 'enable',
            label: '启用'
        }]
    },
    methods: {
        handleChange (value) {
            console.log(value);
        },
        sureAddBook (addeidtForm) {
            this.$refs.addeidtForm.validate((valid) => {
              if (valid) {
                  this.$emit('submitAddBook', addeidtForm) 
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        cancelAddBook () {
            this.$emit('cancelAddBook')
        }
    }
}
</script>
