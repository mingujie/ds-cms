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
                <el-cascader
                  placeholder="试试搜索：指南"
                  :options="initRuleForm.categoryOptions"
                  v-model="initRuleForm.categoryValue"
                  @change="onCategoryOptionsHandle"
                  filterable
                ></el-cascader>
            </el-form-item>
            <el-form-item label="课程讲师" prop="courseSubjectTeacher">
                <el-input v-model="ruleForm.courseSubjectTeacher" class="w50"></el-input>
            </el-form-item>
            <el-form-item label="课程等级" prop="courseSubjectLevel">
                <el-select v-model="ruleForm.courseSubjectLevel" placeholder="选择等级">
                    <el-option label="初级" :value="1"></el-option>
                    <el-option label="中级" :value="2"></el-option>
                    <el-option label="高级" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课程价格" prop="courseSubjectPrice">
                <el-radio-group @change="priceChangeHandle" v-model="initRuleForm.priceType">
                    <el-radio label="free">免费</el-radio>
                    <el-radio label="pay">付费</el-radio>
                </el-radio-group>
                <div v-if="initRuleForm.priceType === 'pay'">
                    <p>课程价格最多只能输入2位小数</p>
                    <el-input v-model="ruleForm.courseSubjectPrice" class="w50" placeholder="课程价格"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="标签" prop="tagCodes">
                <el-select v-model="ruleForm.tagCodes" multiple placeholder="请选择">
                    <el-option
                    v-for="item in initRuleForm.tagsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="课程详情" prop="cmsContentText">
              <wang-editor  v-model="ruleForm.cmsContentText"></wang-editor>
                <!-- <div ref="editor" id="editorEle" style="text-align:left;position: relative;z-index: 1;" ></div> -->
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
// import E from 'wangeditor'
import WangEditor from './WangEditor'
import { createCourseSubject, 
        getCourseSubjectDetail, 
        putCourseSubject } from '@/api/'
export default {
  components: {WangEditor},
  data() {
    return {
        categoryOptions: [],
		    ruleForm: {
          "cmsContentId": "",
          "cmsContentText": "",
          "courseCategoryId": "",
          "courseSubjectId": "",
          "courseSubjectLevel": "",
          "courseSubjectPrice": "",
          "courseSubjectSummary": "",
          "courseSubjectTeacher": "",
          "courseSubjectThumbnailUrl": "",
          "courseSubjectTitle": "",
          "tagCodes": []
        },
        initRuleForm: {
          categoryOptions: [],
          categoryValue: [],
          priceType: '', //free or Pay
          tagsOptions: [{
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
        },
        imageUrl: '',
        rules: {

        },
        value5: [],
    }
  },

  mounted() {  

  },

    watch: {
        '$route'(to, from){
          console.log('路由', to)
          this.routeChangeHandle(to)
        },
        'initRuleForm.categoryValue': function(new1, old){
            console.log(new1, '121')
          },
          deep: true    
        },
    created(res){
      var _self = this
      
      _self.routeChangeHandle(_self.$route)

    },

  methods: {

    initRuleFormHandle(data){
      var _self = this,
          ruleForm = this.ruleForm , 
          initRuleForm = this.initRuleForm;
      initRuleForm.priceType = this.getPriceTypeHandle(ruleForm, initRuleForm)
      initRuleForm.categoryOptions = _self.formarCateGoryOptions(data.allCategories)
      initRuleForm.categoryValue = _self.formartCategoryValue(data)
      ruleForm.courseCategoryId = initRuleForm.categoryValue[2] || ''
    },
    formartCategoryValue(data){
      var arr = []
      if(data.courseCategoryL1) {
        arr[0] = data.courseCategoryL1.courseCategoryId
      }else {
        return arr;
      }
      if(data.courseCategoryL2) {
        arr[1] = data.courseCategoryL2.courseCategoryId
      }else {
        return arr;
      }
      if(data.courseCategoryL3) {
        arr[2] = data.courseCategoryL3.courseCategoryId
      }else {
        return arr;
      }
      return arr
    },
    /**
     * formarCateGoryOptions 格式化分类选项（递归方式）
     * @param  {[type]} options [description]
     * @return { Array }        格式化后的数组，对应级联菜单数据
     */
    formarCateGoryOptions(options){
      var _self = this, arr = []
      function formartFn(ops, arr){
        ops.forEach(function(obj, index, array){
           arr.push({
              value: obj.courseCategoryId,
              label: obj.courseCategoryName
           })
           if(obj.children && obj.children.length) {
            arr[index].children = []
            formartFn(obj.children, arr[index].children)
           }
        })        
      }
      formartFn(options, arr)
      return arr
    },

    getPriceTypeHandle(ruleForm, initRuleForm){
      var value = 'free'
      if(ruleForm.courseSubjectPrice) {
        value = 'pay'
      }
      return value
    },
    routeChangeHandle(router){
      var _self = this
      console.log('路由',router)
      if(router.name == '编辑课程' && router.params.cid){
        _self.isEditorStatus = true
        _self.getCourseSubjectDetailHandle(router.params.cid)
        return
      }
      _self.getCourseSubjectDetailHandle()
    },
    getCourseSubjectDetailHandle(courseSubjectId){
      var _self = this
      getCourseSubjectDetail({
        courseSubjectId: courseSubjectId || ''
      }).then(function(res){
        if(res.code === 0) {
          _self.initForm(res.data)
          _self.initRuleFormHandle(res.data)

          console.log('获取详情', res)
        }
      })
    },
    initForm( data ){
      var _self = this, 
          ruleForm = _self.ruleForm;
      ruleForm.courseSubjectTitle = data.courseSubjectTitle
      ruleForm.courseSubjectTeacher = data.courseSubjectTeacher
      ruleForm.courseSubjectSummary = data.courseSubjectSummary
      ruleForm.courseSubjectThumbnailUrl = data.courseSubjectThumbnailUrl
      ruleForm.cmsContentText = data.content.cmsContentText
      ruleForm.cmsContentId = data.content.cmsContentId
      ruleForm.courseSubjectId = data.courseSubjectId
      //_self.editor.txt.html(_self.ruleForm.cmsContentText)
    },
  createCourseSubjectHandle (ruleForm){
    var _self = this
    console.log(_self.ruleForm.tagCodes)
    console.log('课程提交信息',_self.formartData(ruleForm));
    // createCourseSubject(_self.formartData(ruleForm))
    // .then(function(res){
    //   console.log('课程创建', res)
    // })
  },
  putCourseSubjectHandle(){
    var data = this.formartData(this.ruleForm)
  },
  formartData(ruleForm){
    var _self = this, 
    ruleForm = _self.ruleForm,
    data = {
      "cmsContentId": "",
      "cmsContentText": ruleForm.cmsContentText,
      "courseCategoryId": ruleForm.courseCategoryId || "2",
      "courseSubjectId": ruleForm.courseSubjectId,
      "courseSubjectLevel": ruleForm.courseSubjectLevel,
      "courseSubjectPrice": ruleForm.courseSubjectPrice || 0,
      "courseSubjectSummary": ruleForm.courseSubjectSummary,
      "courseSubjectTeacher": ruleForm.courseSubjectTeacher,
      "courseSubjectThumbnailUrl": ruleForm.courseSubjectThumbnailUrl,
      "courseSubjectTitle": ruleForm.courseSubjectTitle,
      "tagCodes": ruleForm.tagCodes  
    };
    return data
  },
  onCategoryOptionsHandle(value){
    var _self = this
    if(value && value.length) {
      _self.ruleForm.courseCategoryId = value[value.length-1]
    }

    console.log('我被改变了', _self.ruleForm.courseCategoryId)
  },  
	submitForm(formName) {
    var _self = this
      //console.log(_self.ruleForm)
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
    priceChangeHandle(value){
      console.log(value)
      if(value === 'free') {
        this.ruleForm.courseSubjectPrice = 0
      }
      console.log(value)
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
