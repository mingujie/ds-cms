<template>
  <div class="ds-moudle">
    <el-row :gutter="20" class="ds-moudle-hd">
      <el-col :span="24">
        <el-button @click="onAddCategoryHandle">添加一级分类</el-button> 
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
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cateThumb"
        label="缩略图"
        width="120">
      </el-table-column>
      <el-table-column
        prop="SCateName"
        label="二级分类"
        width="160">
      </el-table-column>
      <el-table-column
        prop="TCateName"
        width="160"
        label="三级分类">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="onEditorHandle(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteRow(scope.$index, tableData2)">删除</el-button>
          <el-button type="text" size="small">增(改)子分类</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
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
  export default {

    data() {
      return {
        dialog: {
          title: '新增分类',
          visible: false
        },
        tableData2: [{
          cid: 122,
          cateName: '一级类目名称',
          SCateName: '二级类目名称',
          TCateName: '三级类目名称',
          cateThumb: '缩略图'
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
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      onEditorHandle(){
        this.dialog.visible = true
        this.dialog.title = "编辑分类"
      },
      onAddCategoryHandle(){
        this.dialog.visible = true
        this.dialog.title = "添加分类"
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
      onSubmit(formName){
        var _self = this
        _self.onRuleForm(formName, function(){
          console.log(formName)
          var newData = _self.formartData(_self.ruleForm)
          _self.tableData2.push(newData)
          _self.$refs[formName].resetFields();
          _self.dialog.visible = false
        })
      },
      formartData(form){
        var newObj = {
          cid: 1333,
          cateName: form.name,
          SCateName: '',
          TCateName: '',
          cateThumb: form.thumb
        }
        return newObj
      },  
      onRuleForm(formName, callback){
        var _self = this
        _self.$refs[formName].validate((valid) => {
          if (valid) {
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
  .ds-table th {
    text-align: center;
  }
  .ds-moudle {

  }
  .ds-moudle-hd {
    text-align: left;
    margin-bottom: 15px;
  }
  .ds-dialog {

  }
  .ds-dialog .el-dialog__header {
    text-align: left;
  }
</style>