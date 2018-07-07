<template>
    <div class="class-detail-info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="课程标题" prop="courseSubjectTitle">
                <el-input v-model="ruleForm.courseSubjectTitle" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程简介" prop="courseSubjectSummary">
                <el-input type="textarea" v-model="ruleForm.courseSubjectSummary" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程封面" prop="courseSubjectThumbnailUrl">
                <span>图片大小为800*600，最大不超过5M，只支持JPG,PNG,GIF,JPEG格式</span>
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="ruleForm.courseSubjectThumbnailUrl" :src="ruleForm.courseSubjectThumbnailUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="课程分类" prop="courseCategoryId">
                <el-select v-model="ruleForm.courseCategoryId" placeholder="一级分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="ruleForm.region" placeholder="二级分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="ruleForm.region" placeholder="三级分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程讲师" prop="courseSubjectTeacher">
                <el-input v-model="ruleForm.courseSubjectTeacher" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程等级" prop="courseSubjectLevel">
                <el-select v-model="ruleForm.courseSubjectLevel" placeholder="选择等级">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程价格" prop="courseSubjectPrice">
                <el-radio-group v-model="ruleForm.courseSubjectPrice">
                    <el-radio label="免费"></el-radio>
                    <el-radio label="付费"></el-radio>
                </el-radio-group>
                <div v-if="!ruleForm.courseSubjectPrice == ''">
                    <p>课程价格最多只能输入2位小数</p>
                    <el-input v-model="ruleForm.courseSubjectPrice" class="w50" placeholder="课程价格"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="标签" prop="tagCodes">
                <el-select v-model="ruleForm.tagCodes" multiple placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="课程详情" prop="detail">
                <div ref="editor" style="text-align:left"></div>
                <!-- <button @click="getContent">查看内容</button> -->
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交课程</el-button>
                <el-button @click="resetForm('ruleForm')">取消返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import E from 'wangeditor'
import { createCourseSubject } from '@/api/'
export default {
  data() {
    return {
		    ruleForm: {
          "cmsContentId": 0,
          "cmsContentText": "string",
          "courseCategoryId": 0,
          "courseSubjectId": 0,
          "courseSubjectLevel": 0,
          "courseSubjectPrice": 0,
          "courseSubjectSummary": "string",
          "courseSubjectTeacher": "string",
          "courseSubjectThumbnailUrl": "string",
          "courseSubjectTitle": "string",
          "id": 0,
          "idStr": "string",
          "tagCodes": [
            "string"
          ]
        },
        imageUrl: '',
        rules: {

        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value5: [],
    }
  },

  mounted() {  
    var editor = new E(this.$refs.editor)
    editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    editor.customConfig.onchange = (html) => {
        this.editorContent = html
    }
    editor.create()
  },
  computed: {
  },

  methods: {
  createCourseSubjectHandle (ruleForm){
    createCourseSubject({
      "cmsContentId": 0,
      "cmsContentText": ruleForm.cmsContentText,
      "courseCategoryId": ruleForm.courseCategoryId,
      "courseSubjectId": 0,
      "courseSubjectLevel": ruleForm.courseSubjectLevel,
      "courseSubjectPrice": ruleForm.courseSubjectPrice,
      "courseSubjectSummary": ruleForm.courseSubjectSummary,
      "courseSubjectTeacher": ruleForm.courseSubjectTeacher,
      "courseSubjectThumbnailUrl": ruleForm.courseSubjectThumbnailUrl,
      "courseSubjectTitle": ruleForm.courseSubjectTitle,
      "id": 0,
      "idStr": "string",
      "tagCodes": [
        "string"
      ]
    }).then(function(res){
      console.log('课程创建', res)
    })
  },
	submitForm(formName) {
    var _self = this
        _self.$refs[formName].validate((valid) => {
            if (valid) {
              _self.createCourseSubjectHandle(_self.ruleForm)
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
      },
      getContent: function () {
        alert(this.editorContent)
    }
  }
}
</script>

<style lang="scss">
    .class-detail-info{
        text-align: left;
        .w50{
            width: 50%;
        }

        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 130px;
            height: 130px;
            line-height: 130px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }



</style>
