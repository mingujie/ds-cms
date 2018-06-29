<template>
  <div class="ds-moudle">
    
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="ds-system-ruleForm">
          <el-form-item label="课程标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入课程标题"></el-input>
          </el-form-item>
          <el-form-item label="课程简介" prop="desc">
            <el-input type="textarea" placeholder="请输入课程简介" :rows="3" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="课程关键词" prop="keywords">
            <el-input v-model="ruleForm.keywords" placeholder="请输入课程关键词"></el-input>
          </el-form-item>

          <el-form-item label="课程封面">
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
          <el-form-item label="课程分类" prop="category">
              <el-cascader
                placeholder="试试搜索：指南"
                :options="cascaderOptions"
                style="width: 300px;"
                filterable
              ></el-cascader>
          </el-form-item>
          <el-form-item label="课程讲师" prop="instructor">
            <el-input v-model="ruleForm.instructor" placeholder="请输入课程标题"></el-input>
          </el-form-item>
          <el-form-item label="课程等级" prop="level">
            <el-select v-model="ruleForm.level" placeholder="请选择">
              <el-option
                v-for="item in curriculum.level"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-input v-model="ruleForm.tags" placeholder="请输入课程标题"></el-input>
          </el-form-item>
          <el-form-item label="课程详情" prop="detail">
            <vue-summernote ref="editer"></vue-summernote>
          </el-form-item>
          <el-form-item>
            <div class="ds-operational">
              <el-button @click="submitForm('ruleForm')">保存设置</el-button>
            </div>
           <!--  <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
  
</template>

<script>



export default {
  data() {
    return {
      curriculum: {
        level: [{
          value: 1,
          label: '初级'
        },{
          value: 2,
          label: '中级'
        },{
          value: 3,
          label: '高级'
        }]
      },
      cascaderOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }]
      }],
      ruleForm: {
        cover: '',
        tags: '',
        title: '',
        desc: '',
        level: '',
        keywords: '',
        instructor: '',
        copyright: '',
        countCode: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入课程标题', trigger: 'blur' }
        ],
        desc: [{
          required: true, message: '请输入课程简介', trigger: 'blur'
        }],
        cover: [{
          required: true, message: '请输入课程简介', trigger: 'blur'
        }],
      }
    }
  },

  mounted() {  

  },
  computed: {
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}

</script>
<style>
  .ds-operational {
    text-align: left;
  }
  .ds-system-ruleForm {
    background: #fff;
    padding: 20px;
  }

</style>