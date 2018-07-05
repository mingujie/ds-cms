<template>
  <div class="ds-moudle">
    <el-row :gutter="20" class="ds-moudle-hd">
      <el-col :span="24">
        <el-button @click="onAddCategoryHandle">{{cateBtnName}}</el-button> 
      </el-col> 
    </el-row>
     <el-table
      :data="tableData2"
      width="50%"
      border
      class="ds-table"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="cid"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="cateName"
        label="分类名称（中文）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="ename"
        label="分类名称（英文）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cateThumb"
        label="缩略图"
        width="120">
      </el-table-column>
      <el-table-column
        prop="scateCount"
        label="二级分类(个)"
        width="160">
      </el-table-column>
      <el-table-column
        prop="tcateCount"
        width="160"
        label="三级分类（个）">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="onEditorHandle(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteRow(scope.$index, tableData2)">删除</el-button>
          <el-button type="text" size="small" @click="onChangeCategory(scope.row.cid)">增(改)子分类</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ds-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="50%"
      class="ds-dialog"
      :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" style="padding-right: 10px;">
          <el-form-item label="中文名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入中文名称"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="ename">
            <el-input placeholder="请输入英文名称" v-model="ruleForm.ename"></el-input>
          </el-form-item>
          <el-form-item label="缩略图">
            <el-upload
              class="ds-avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.thumb" :src="ruleForm.thumb" class="ds-avatar">
              <i v-else class="el-icon-plus ds-avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述" prop="copyright">
            <el-input type="textarea" :rows="3" placeholder="请输入分类描述" v-model="ruleForm.desc"></el-input>
          </el-form-item>
        </el-form>      
        <span slot="footer" class="dialog-footer">
        <el-button  @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')" :loading="submitLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import { getCourseSectionPage, addCourseSection } from '@/api/'
  export default {

    data() {
      return {
        cateBtnName: '新增一级分类',
        dialog: {
          title: '新增分类',
          visible: false
        },
        submitLoading: false,
        isEditorStatus: false,
        curEditorRowIndex: 0,
        tableData2: [{
          cid: 122,
          cateName: '一级类目名称',
          scateCount: 8,
          tcateCount: 101,
          cateThumb: '缩略图',
          desc: '这是一个描述',
          ename: 'heelo'
        }],
      ruleForm: {
        ename: '',
        name: '',
        desc: '',
        thumb: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        ename: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ]

      }

      }
    },
    created(){
      this.renderCourseSectionPage()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      renderCourseSectionPage(){
        getCourseSectionPage({
            pageNum: 1,
            pageSize: 10
        }).then(function(res, b){

            if(res.code === 0) {
                
            }
            console.log(a,b)
        })

      },
      onEditorHandle(index, row){
        console.log('这是第几个', index)
        var ruleForm = this.ruleForm
        ruleForm.ename = row.ename
        ruleForm.name = row.cateName
        ruleForm.desc = row.cateDesc,
        ruleForm.thumb =  row.cateThumb
        this.dialog.title = "编辑分类"
        this.dialog.visible = true
        this.curEditorRowIndex = index
        this.isEditorStatus = true
      },
      onAddCategoryHandle(){
        this.dialog.visible = true
        this.dialog.title = "添加分类"
      },
      handleClose(done) {
        var _self = this
        console.log(typeof(done), '这是')
        _self.$confirm('确认关闭？')
          .then(_ => {
            if(typeof(done) === 'function') {
              done();
            }else {
              _self.dialog.visible = false
            }
            _self.$refs['ruleForm'].resetFields();
            
          })
          .catch(_ => {});

        _self.isEditorStatus = false
      },
      handleAvatarSuccess(){

      },
      beforeAvatarUpload(){

      },
      onDeleteRow(index, rows) {
        // var _self = this
        this.confirm({}, function(){
          rows.splice(index, 1);
        });
      },
      onChangeCategory(cid){
        console.log(cid)
        this.$router.push({name: 'secondList', params: { cid: cid } })
      },
      setCourseSection(){
        var _self = this 
        addCourseSection({
          "courseCategorLevel": 0,
          "courseCategorParentId": 0,
          "courseCategoryDescription": "这是一个描述",
          "courseCategoryEname": "lol",
          "courseCategoryId": 0,
          "courseCategoryName": "英雄联盟",
          "courseCategoryOrder": 0,
          "courseCategoryThumbnailUrl":"http://img.pifupai.cn/games/photos/20170405/xwmATNpnHn.jpg@!w308_h560",
          "id": 0,
          "idStr": "110"
        }).then(function(res, b){

            // if(res.code === 0) {
            //     _self.$router.push({path: '/home'})
            // }
            console.log(res)
        })

      },
      onSubmit(formName){
        var _self = this
        _self.onRuleForm(formName, function(){
          console.log(formName)
          // var newData = _self.formartData(_self.ruleForm)
          if(_self.isEditorStatus) {
            // console.log(newData,_self.curEditorRowIndex, _self.ruleForm)
            _self.formartData(_self.curEditorRowIndex, _self.ruleForm)
            
            // _self.$set(_self.tableData2, _self.curEditorRowIndex, _self.ruleForm)
          }else {
            //_self.tableData2.push(newData)
            var cateRow = _self.createCateRow(_self.ruleForm)

            _self.tableData2.push(cateRow)
          }
          
          _self.dialog.visible = false 
          _self.setCourseSection()
        })

        _self.submitLoading = false
      },
      createCateRow(form){
        var _self = this
        var obj = {
          cid: '',
          cateName: form.name || '',
          scateCount: '',
          tcateCount: '',
          cateThumb: form.thumb || '',
          desc: form.desc || '',
          ename: form.ename || ''
        }

        return obj
      },
      formartData(index, form){
        console.log(form)
        this.$set(this.tableData2[index], 'cateName', form.name)
        this.$set(this.tableData2[index], 'cateThumb', form.thumb)
        this.$set(this.tableData2[index], 'ename', form.ename)
        //this.tableData2[index]['name'] = form.name
        // var newObj = {
        //   cid: form.,
        //   name: form.name,
        //   ename: form.ename,
        //   thumb: form.thumb,
        //   desc: form.desc
        // }
        //return newObj
      },  
      onRuleForm(formName, callback){
        var _self = this
        _self.$refs[formName].validate((valid) => {
          if (valid) {
            _self.submitLoading = true
            callback()
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      confirm(options, callback) {
        this.$confirm('此操作将永久删除该分类及其子分类，你确定删除吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          callback()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      }
    }

  }
</script>

<style>
</style>