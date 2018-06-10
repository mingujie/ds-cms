<template>
  <div class="app-header app-navbar" id="appHeader">
      <router-link to="/home">
        <div class="logo logo-width"><strong class="txt">{{sysName}}</strong></div>
      </router-link>
  </div>
</template>
<script>
export default {
  name: 'app-header',
  data(){
    return {
      total: null,
      ueseName:'',
      message:true,
      elXuanzhuan1:false,
      elXuanzhuan2:false,
      login:false
    }
  },
  created(){

    
  },
  props: {
    sysName: {
      type: String,
      default: '蛋耍网'
    },
    sysUserName: {
      type: String,
      default: ''
    }
  },
  components: {

  },
  computed: {

  },
  mounted(){
  },
  methods: {

  }
}
</script>
<style lang="scss">
  // @import '~scss_vars';
  ul{
    margin:0;
    padding:0;
  }
  .app-navbar {
      position: relative;
  }
  .breadcrumb-container{
    float:left;
    height:60px;
    padding-bottom:0px;
    padding-left:40px;
    .breadcrumb-router{
      padding:0;
      height:60px;
      line-height:60px;
    }
  }
    .app-header {
      height: 60px;
      line-height: 60px;
      background: #FFF;
      color:#333;
      flex-direction: row;
      .userinfo {
        text-align: right;
        padding-right: 50px;
        float: right;
        color: #666;
        a{text-decoration:none;vertical-align:baseline;zoom:1;}
        .pipe {
          display: inline-block;
          height:24px;
          width: 1px;
          background-color: #eee;
          vertical-align: middle;
        }
        .user-item {
          display: inline-block;
          padding: 0px 5px; 
          cursor:pointer;
          a{
            color: #666;
          }
          &>i{
              font-style: normal;
              display: inline-block;
              color: #f00;
              margin-left: 3px;
            }
        }
        i.icon-shouji{
          color:#41cac0 !important;
          font-size:20px;
          vertical-align: middle;
          padding:0 8px 0 30px;
        }
        .userinfo-inner {
          cursor: pointer;
          color:#666;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:200px;
        height:60px;
        font-size:24px;
        background-color: #20222A !important;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
        // color:#ffffff;
        text-align: center;
        //background-color: $color-primary;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:200px;
        float:left;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
  .user-nav {
    flex-direction: row;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      height: 30px;
      line-height: 60px;
      +li{
        border-left: 1px solid #eee;
      }
    }
  }

  .el-dropdown-menu{
    background:#ffffff;
    border:1px solid #dddddd;
    box-shadow:0 1px 13px 0 rgba(204,204,204,0.47);
    min-width:100px;
    padding:0;
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: #41cac0 !important;
      color: #fff !important;
    }
    li{
      padding:0 26px;
    }  
  }

  .el-xuanzhuan1{ 
    transform:rotate(-180deg);
    -ms-transform:rotate(-180deg);   /* IE 9 */
    -moz-transform:rotate(-180deg);  /* Firefox */
    -webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
    -o-transform:rotate(-180deg);  /* Opera */
  }
  .el-xuanzhuan2{ 
    transform:rotate(-360deg);
    -ms-transform:rotate(-360deg);   /* IE 9 */
    -moz-transform:rotate(-360deg);  /* Firefox */
    -webkit-transform:rotate(-360deg); /* Safari 和 Chrome */
    -o-transform:rotate(-360deg);  /* Opera */
  }

  .icon-xiala2{
    display:inline-block;
    transform-origin:center;/*定义动画的旋转中心点*/
    -webkit-transform-origin:center;  /* Safari 和 Chrome */
    -moz-transition-origin:center;
    -o-transition-origin:center;
    
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }

  

</style>