<template>
  <div class="ds-moudle">
    <el-row :gutter="20" class="ds-moudle-hd">
      <el-col :span="24">
        <el-button @click="onAddUserHandle">添加课程</el-button> 
      </el-col> 
    </el-row>
     <el-table
      :data="tableData2"
      width="50%"
      border
      class="ds-table"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="uid"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
        width="80">
      </el-table-column>
      <el-table-column
        prop="instructor"
        label="讲师"
        width="120">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="publicTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="onEditorHandle(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteRow(scope.$index, tableData2)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="50%"
      class="ds-dialog"
      :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" style="padding-right: 10px;">
          <el-form-item label="昵称" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="desc">
            <el-input placeholder="请输入真实姓名" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="desc">
            <el-input placeholder="请输入真实姓名" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="desc">
            <el-input placeholder="请输入你的手机号码" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="desc">
            <el-input placeholder="请输入你邮箱" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="ds-avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="ds-avatar">
              <i v-else class="el-icon-plus ds-avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="个人简介" prop="copyright">
            <el-input type="textarea" :rows="3" placeholder="请输入个人简介" v-model="ruleForm.copyright"></el-input>
          </el-form-item>
        </el-form>      
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
          title: '添加用户',
          visible: false
        },
        tableData2: [{
          uid: 1,
          publicTime: '2016-05-02',
          title: '王小虎',
          category: '一直大花豹',
          level: '初级',
          instructor: '刀疤',
          price: 9.98,

          address: '上海市普陀区金沙江路 1518 弄',
        }],
      ruleForm: {
        logoUrl: '',
        title: '',
        desc: '',
        keywords: '',
        copyright: '',
        countCode: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        this.$router.push({path: '/curriculum/create'})
        // this.dialog.visible = true
        // this.dialog.title = "编辑用户"
      },
      onAddUserHandle(){
        this.$router.push({path: '/curriculum/create'})
        // this.dialog.visible = true
        // this.dialog.title = "添加用户"
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
      confirm(options, callback) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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