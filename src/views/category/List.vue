<template>
  <div class="ds-moudle">
    <el-row :gutter="20" class="ds-moudle-hd">
      <el-col :span="24">
        <el-button @click="onAddCategoryHandle">{{cateBtnName}}</el-button> 
      </el-col> 
    </el-row>
     <el-table
      :data="tableData2"
      v-loading="tableLoading"
      width="50%"
      border
      class="ds-table"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="courseCategoryId"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="courseCategoryName"
        label="分类名称（中文）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseCategoryEname"
        label="分类名称（英文）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseCategoryThumbnailUrl"
        label="缩略图"
        width="120">321133123
          <template slot-scope="scope">
            <div class="table-pic">
              <img v-if="scope.row.courseCategoryThumbnailUrl" :src="scope.row.courseCategoryThumbnailUrl" />
            </div>
          </template>
      </el-table-column>
      <el-table-column
        prop="childCount"
        label="子分类(个)"
        width="160">
      </el-table-column>
<!--       <el-table-column
        prop="tcateCount"
        width="160"
        label="三级分类（个）">
      </el-table-column> -->
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="onEditorHandle(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteRow(scope.$index, scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="onChangeCategory(scope.row.cid)">增(改)子分类</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ds-pagination" v-if="pagination.total > 1">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onChangePagination"
        :total="pagination.total">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="50%"
      class="ds-dialog"
      @close="closeDialogHandle"
      :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" style="padding-right: 10px;">
          <el-form-item label="中文名称" prop="courseCategoryName">
            <el-input v-model="ruleForm.courseCategoryName" placeholder="请输入中文名称"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="courseCategoryEname">
            <el-input placeholder="请输入英文名称" v-model="ruleForm.courseCategoryEname"></el-input>
          </el-form-item>
          <el-form-item label="缩略图">
            <el-upload
              class="ds-avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.courseCategoryThumbnailUrl" :src="ruleForm.courseCategoryThumbnailUrl" class="ds-avatar">
              <i v-else class="el-icon-plus ds-avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述" prop="courseCategoryDescription">
            <el-input type="textarea" :rows="3" placeholder="请输入分类描述" v-model="ruleForm.courseCategoryDescription"></el-input>
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
  import { 
    getCourseSectionPage, 
    addCourseSection,
    deleteCourseSection,
    putCourseSection } from '@/api/'
  export default {

    data() {
      return {
        cateBtnName: '新增一级分类',
        dialog: {
          title: '新增分类',
          visible: false
        },
        tableLoading: true,
        submitLoading: false,
        isEditorStatus: false,
        curEditorRowIndex: 0,
        tableData2: [],
      ruleForm: {},
      pagination: {
        total: 1,
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        courseCategoryName: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        courseCategoryEname: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ]

      }

      }
    },
    created(){
      var _self = this
      _self._getCourseSectionPage(_self.pagination.pageNum, _self.pagination.pageSize)
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
      closeDialogHandle(){
        var _self = this
        _self.$refs['ruleForm'].resetFields();
      },
      _getCourseSectionPage(pageNum, pageSize){
        var _self = this
        getCourseSectionPage({
            pageNum: pageNum,
            pageSize: pageSize
        }).then(function({ data }, b){
            if(data.code === 0 && data.data.list.length) {
              _self.tableData2 = data.data.list
              _self.tableLoading = false
              _self.pagination.total = parseInt(data.data.total)
            }
        })

      },
      onChangePagination(pageNum){
        var _self = this
        _self._getCourseSectionPage(pageNum, _self.pagination.pageSize)
      },
      onEditorHandle(index, row){
        var ruleForm = this.ruleForm
        ruleForm.courseCategoryId = row.courseCategoryId
        ruleForm.courseCategoryEname = row.courseCategoryEname
        ruleForm.courseCategoryName = row.courseCategoryName
        ruleForm.courseCategoryDescription = row.courseCategoryDescription
        ruleForm.courseCategoryThumbnailUrl =  row.courseCategoryThumbnailUrl
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
        _self.$confirm('确认关闭？')
          .then(_ => {
            if(typeof(done) === 'function') {
              done();
            }else {
              _self.dialog.visible = false
            }
            //_self.$refs['ruleForm'].resetFields();
            
          })
          .catch(_ => {});

        _self.isEditorStatus = false
      },
      handleAvatarSuccess(){

      },
      beforeAvatarUpload(){

      },
      onDeleteRow(index, row) {
        var _self = this
        _self.confirm({}, function(){
        _self._deleteCourseSectionHandle(row.courseCategoryId)
        .then(function(status){
            if(status){
              // rows.splice(index, 1);
              _self._getCourseSectionPage(1, _self.pagination.pageSize)
            }            
          })
        });
      },
      onChangeCategory(cid){
        this.$router.push({name: 'secondList', params: { cid: cid } })
      },
      _putCourseSectionHandle(ruleForm){
        var _self = this
        
        return putCourseSection({
          "courseCategorLevel": '',
          "courseCategorParentId": '',
          "courseCategoryDescription": ruleForm.courseCategoryDescription,
          "courseCategoryEname": ruleForm.courseCategoryEname,
          "courseCategoryId": ruleForm.courseCategoryId,
          "courseCategoryName": ruleForm.courseCategoryName,
          "courseCategoryOrder": '',
          "courseCategoryThumbnailUrl": ruleForm.courseCategoryThumbnailUrl,
          "id": '',
          "idStr": ''
        }).then(function(res){
          var status = false 
          if(res.code === 0) {
            status =  true 
          }else {
            _self.$message({
              message: res.message,
              type: 'warning'
            });
          }
          return status
        })
      },
      _deleteCourseSectionHandle(courseCategoryId){
        var _self = this
        return deleteCourseSection({
          "id": courseCategoryId
        }).then(function(res){
          var status = false 
          if(res.code === 0) {
            status =  true 
          }else {
            _self.$message({
              message: res.message,
              type: 'warning'
            });
          }
          return status
        })
      },
      _addCourseSectionHandle(ruleForm){
        var _self = this 

        return addCourseSection({
          "courseCategorLevel": '',
          "courseCategorParentId": '',
          "courseCategoryDescription": ruleForm.desc,
          "courseCategoryEname": ruleForm.ename,
          "courseCategoryId": '',
          "courseCategoryName": ruleForm.name,
          "courseCategoryOrder": '',
          "courseCategoryThumbnailUrl": ruleForm.thumb,
          "id": '',
          "idStr": ''
        }).then(function(res){
          var status = false 
          if(res.code === 0) {
            status =  true 
          }else {
            _self.$message({
              message: res.message,
              type: 'warning'
            });
          }
          return status
        })
      },
      onSubmit(formName){
        var _self = this
        _self.onRuleForm(formName, function(){

          if(_self.isEditorStatus) {
            _self._putCourseSectionHandle(_self.ruleForm)
            .then(function(status){
              if(status) {
                _self._getCourseSectionPage(1, _self.pagination.pageSize)
                _self.submitLoading = false
                _self.dialog.visible = false

              }
            })
            console.log('我在编辑呢')

          }else {
            _self._addCourseSectionHandle(_self.ruleForm)
            .then(function(status){
              if(status) {
                _self.submitLoading = false
                _self.dialog.visible = false
                _self._getCourseSectionPage(_self.pagination.pageNum, _self.pagination.pageSize)
              }
            })
          }
                    
        })

        //_self.submitLoading = false
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