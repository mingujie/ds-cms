<template>
    <div class="class-upload-page">
        <el-row>
            <el-button type="primary" @click="addSection('create')">添加章</el-button>
            <el-button type="primary" @click="addClass()">添加课件</el-button>
        </el-row>

        <div class="block">
            <el-tree
            :data="courseChapterData"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">

                <span>{{ node.label }}</span>
                <span>
                <el-button type="text" v-if=
                "data.type == 'chapter'" class="" @click="addClass(data)">添加课件</el-button>
                <el-button type="text">编辑 </el-button>
                <el-button type="text">删除</el-button>
                </span>
            </span>
            </el-tree>
        </div>

        <!-- 添加章，编辑章 -->
        <el-dialog title="添加章" :visible.sync="dialog">
            <el-form :model="courseChapterForm" :rules="courseChapterRules" ref="courseChapterForm"> 
                <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="courseChapterForm.title" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit('courseChapterForm')">确 定</el-button>
                <el-button @click="dialog = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 添加课件 -->
        <el-dialog title="添加课件" :visible.sync="dialogUpload" width="700px">
            <div class="add-content">
                <div class="head">
                    <div class="head-child">
                        <p>1</p>
                        <div>选择课件类型</div>
                    </div>
                    <div class="head-child">
                        <p>2</p>
                        <div>设置课件内容</div>
                    </div>
                </div>
                <div class="middle" v-if="!next">
                    <img src="../../../assets/movie.png" alt="">
                    <p>视频</p>
                </div>
                <div class="middle-form" v-if="next">
                  
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="next = true">下一步</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    createCourseChapter, 
    putCourseChapter, 
    deleteCourseChapter, 
    getCourseChapterList} from '@/api/'
export default {
  data() {
    return {
		input:'',
        dialog:false,
        dialogUpload: false,
        sectionName: '',
        isEditorStatus: false,
        next:false,
        formLabelWidth: '120px',
        courseChapterForm: {
            title: ''
        },
        courseChapterData: [{
            id: 1,
            label: '一级 1',
            type: 'chapter',
            children: [{
                id: 4,
                label: '二级 1-1',
                type: 'node'
            // children: [{
            //     id: 9,
            //     label: '三级 1-1-1'
            // }, {
            //     id: 10,
            //     label: '三级 1-1-2'
            // }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            type: 'chapter',
            children: [{
                id: 5,
                label: '二级 2-1',
                type: 'node'
            }, {
                id: 6,
                label: '二级 2-2',
                type: 'node'
            }]
        }, {
            id: 3,
            label: '一级 3',
            type: 'chapter',
            children: [{
                id: 7,
                label: '二级 3-1',
                type: 'node'
            }, {
                id: 8,
                label: '二级 3-2',
                type: 'node'
            }]
      }],
      courseChapterRules:{

      }
    }
  },
  props: {
    cid: [String]
  },
  mounted() {  
    console.log('子组件', this.cid);
    this.getCourseChapterListHandle(this.cid)
        let all = document.querySelectorAll('.el-tree-node__content')
        all[all.length - 1].style.borderBottom = '1px solid #ddd' 
  },

  computed: {
  },
  components: {
  },
  methods: {
    getCourseChapterListHandle(cid){
        getCourseChapterList({
            courseSubjectId: cid
        }).then(function(res){
            if(res.data === 0) {
              
            }
        })
    },
    createCourseChapterHandle(cid, title){
        createCourseChapter({
            courseSubjectId: cid,
            courseChapterTitle: title
        }).then(function(res){
            if(res.data === 0) {
              
            }
        })
    },
	onSubmit(formName) {
        var _self = this
        console.log(this.courseChapterForm.title)
        _self.onRuleForm(formName, function(){
            if(_self.isEditorStatus) {

            }else {
                var data = _self.formartCourseChapter(_self.courseChapterForm.title)
                _self.courseChapterData.push(data) 
            }
            _self.dialog = false
        })
        // this.createCourseChapterHandle(this.cid, this.courseChapterForm.title)
	},
    formartCourseChapter(value){
        var index = this.courseChapterData.length + 1
        var obj = {
            label: value,
            index: index
        }
        return obj
    },
    addSection(value) {
        this.dialog = true
        if(value === 'create') {
            this.isEditorStatus = false
            // this.createCourseChapterHandle()
        }
    },
    addClass(data) {
        const newChild = { id: 111, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        //this.dialogUpload = true
    },
  onRuleForm(formName, callback){
    var _self = this
    _self.$refs[formName].validate((valid) => {
      if (valid) {
        //_self.submitLoading = true
        callback()
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  }
}
</script>

<style lang="scss">
    .class-upload-page{
        text-align: left;
        .block{
            padding-top: 20px;
            font-size: 18px;
            .el-tree-node__content{
                padding-top: 10px;
                padding-bottom: 10px;
                border: 1px solid #ddd;
                border-bottom: 0;
                display: flex;
                height: 45px;
            }
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-right: 10px;
            }
            .el-checkbox {
                margin-top: 8px;
            }
        }

        .add-content{
            .head{
                display: flex;
                align-items: center;
                .head-child{
                    display: flex;
                    align-items: center;
                    width: 45%;
                    justify-content: center;
                    p{
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 42px;
                        background: #409EFF;
                        color: #fff;
                        font-size: 28px;
                        border-radius: 50%;
                    }
                    div{
                        margin-left: 20px;
                        font-size: 16px;
                    }
                }
            }
            .middle{
                position: relative;
                background: #ddd;
                width: 140px;
                height: 140px;
                margin-left: 75px;
                margin-top: 20px;
                text-align: center;
                img{
                    width: 40px;
                    height: 40px;
                    margin-top: 40px;
                }
                span{
                    position: relative;
                }
            }
            .middle-form{

            }
        }
    }

</style>
