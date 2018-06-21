<template>
  <div class="app-container">
    <app-header :sysUserName="sysUserName"></app-header>
    <div class='shadows'></div>
    <div class="ds-sidebar">
      <el-menu :default-active="$route.path" class="ds-sidebar-menu" unique-opened router :collapse="isCollapse">
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
            <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>       
    </div>
    <div class="ds-content">
      <div class="ds-content-bd">
        <div class="ds-fluid">
          <router-view></router-view>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import AppHeader from './Header'
  export default {
    components: { AppHeader },
    data() {
      return {
        sysName:'蛋耍网',
        sysUserName: '',
        sysUserAvatar: '',
        isCollapse: false
      }
    },
    created(){

    },
    computed: {
        key() {
            return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
        }
    },
    watch: {
     '$route' (to, from) {
     }
   },
    methods: {
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {

      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }
    }
  }

</script>

<style lang="scss">


.ds-fluid {
  padding: 15px;
}

.ds-fluid {
  position: relative;
  margin: 0 auto;
}
  // @import '~scss_vars';
  .ds-sidebar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 200px;
    z-index: 109;
    top: 60px;
    background-color: #333744;
  }
  //hover 4a5064
  .ds-sidebar-menu {
    text-align: left;
    height: 100%;
    background-color: #333744;
    
    .el-submenu__title {
      color: #FFF;
    }
    .el-submenu__title:hover {
      background-color: #4a5064;
    }
  }
  .pro-sidebar{
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
  }
  .shadows{
    position:absolute;
    width:calc(100% - 200px);
    left:200px; 
    top:56px;
    height:4px;
    z-index:999;
    box-shadow: 0 2px 5px 0 rgba(204, 204, 204, 0.5);

  }
  .el-menu--collapse {
    width: 64px;
  }
  .ds-content{
    position: absolute;
    left: 200px;
    top: 60px;
    bottom: 0;
    background-color: #000;
    z-index: 100;
    right: 0;
  }
  .ds-content-bd {
    width: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    left: 0;
    overflow-y: auto;
    background-color: #eaedf1;
  }
  .breadcrumb-router {
    position: relative;
    padding-bottom: 20px;
    border-radius: 0
  }
  .app-container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .main {
      width: 100%;
      display: flex;
      // background: #324057;
      bottom: 0px;
      overflow: hidden;
      position:absolute;
      top:60px;
      aside {
        flex:0 0 200px;
        width: 200px;
        .el-menu{
          height: 100%;
       

        }
        .isCollapse{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }

      .content-container {
        position: relative;
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 200px;
        overflow-y: scroll;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
          padding: 40px;
        }
        .breadcrumb-router{
          border:none;
          padding-left:40px;
        }
      }
    }
  }
</style>