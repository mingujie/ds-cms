<template>
  <div class="login-page">
    <p>蛋耍网系统登录</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
        <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="passward">
            <el-input v-model="ruleForm.passward" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="ds-btn ds-btn-login" :loading="login.loading" @click="submit('ruleForm')">立即登录</el-button>
        </el-form-item>
    </el-form>
<!--     <ul class="ta-bubbles">
        <li v-for="(i, j) in Array(10)" :key="i"></li>
    </ul>
 -->  </div>
</template>

<script>
import { getUserLoginInfo } from '@/api/'
export default {
  data() {
    return {
        login: {
            loading: false
        },
        ruleForm:{
            name: '',
            passward: ''
        },
        rules: {
            name: [
                { required: true, message: '账号不可为空', trigger: 'blur' },
            ],
            passward: [
                { required: true, message: '密码不可为空', trigger: 'blur' }
            ]
        }
    }
  },

  mounted() {  

  },
  computed: {
  },

  methods: {
      submit(formName) {
        var _self = this
        _self.validateForm(formName, function(){
            alert('submit');
            _self.validateUserInfo()
        })
      },
      validateForm(formName, callback){
        this.$refs[formName].validate((valid) => {
          if (valid){ 
            callback()
          } else {
            console.log('error submit!!');
            return false;
          }
        });        
      },
      validateUserInfo(){
        var _self = this
        getUserLoginInfo({
            username: 'danshua',
            password: 'p@ssword'
        }).then(function(res, b){

            if(res.code === 0) {
                _self.$router.push({path: '/home'})
            }
            console.log(a,b)
        })
      }
  }
}
</script>

<style lang="scss">
    .login-page{
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to bottom right,#328bd5,#2d3a4b);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
            color: #fff;
            margin-bottom: 30px;
            font-size: 37px;
            position: relative;
            bottom: 25px;
        }
        .rule-form{
            width: 370px;
            position: relative;
            bottom: 20px;
            .el-form-item__content {
                margin-left: 0 !important;
            }
            .btn{
                width: 100%;
                height: 100%;
                background: #fff;
                border-radius: 3px;
                color: #409efe;
                cursor: pointer;
            }
        }
        .ta-bubbles {
            position: absolute;
            left: 0;
            top: 0;

            width: 100%;
            height: 100%;
            z-index: -10;

            li {
                position: absolute;
                bottom: -160px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, .15);
                list-style: none;
                animation: square 15s infinite linear;

            &:nth-of-type(1) {
                left: 10%;
            }

            &:nth-of-type(2) {
                left: 20%;
                width: 90px;
                height: 90px;
                animation-delay: 2s;
                animation-duration: 7s;
            }

            &:nth-of-type(3) {
                left: 30%;
                animation-delay: 4s;
            }

            &:nth-of-type(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                animation-duration: 8s;
                background: rgba(255, 255, 255, .3)
            }

            &:nth-of-type(5) {
                left: 70%;
            }

            &:nth-of-type(6) {
                left: 80%;
                width: 120px;
                height: 120px;
                animation-delay: 3s;
                background: rgba(255, 255, 255, .2);
            }


            &:nth-of-type(7) {
                left: 32%;
                width: 160px;
                height: 160px;
                animation-delay: 2s;
            }

            &:nth-of-type(8) {
                left: 55%;
                width: 20px;
                height: 20px;
                animation-delay: 4s;
                animation-duration: 15s;
            }

            &:nth-of-type(9) {
                left: 25%;
                width: 10px;
                height: 10px;
                animation-delay: 2s;
                animation-duration: 12s;
                background: rgba(255, 255, 255, .3);
            }

            &:nth-of-type(10) {
                left: 85%;
                width: 60px;
                height: 60px;
                animation-delay: 5s;
                }
            }


            @keyframes square {
                0% {
                opacity: .5;
                transform: translateY(0) rotate(45deg);
                }

                25% {
                opacity: .75;
                transform: translateY(-400px) rotate(90deg);
                }

                50% {
                opacity: 1;
                transform: translateY(-600px) rotate(135deg);
                }

                100% {
                opacity: 0;
                transform: translateY(-1000px) rotate(180deg);
                }
            }
        }
    }



</style>
