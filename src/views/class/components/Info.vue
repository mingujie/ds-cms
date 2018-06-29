<template>
    <div class="class-detail-info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="课程标题" prop="name">
                <el-input v-model="ruleForm.name" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程简介" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程封面" prop="desc">
                <span>图片大小为800*600，最大不超过5M，只支持JPG,PNG,GIF,JPEG格式</span>
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="课程分类" prop="region">
                <el-select v-model="ruleForm.region" placeholder="一级分类">
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
            <el-form-item label="课程讲师" prop="name">
                <el-input v-model="ruleForm.name" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程等级" prop="name">
                <el-select v-model="ruleForm.region" placeholder="选择等级">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程价格" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="免费"></el-radio>
                    <el-radio label="付费"></el-radio>
                </el-radio-group>
                <div v-if="ruleForm.resource == '付费'">
                    <p>课程价格最多只能输入2位小数</p>
                    <el-input v-model="ruleForm.name" class="w50" placeholder="课程价格"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="标签" prop="name">
                <el-select v-model="value5" multiple placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="课程详情" prop="name">
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
export default {
  data() {
    return {
		ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '免费',
          desc: ''
        },
        imageUrl: '',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
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
