<template>
  <div class="summernote-wrap">
    <div class="summernote-desc">
      <el-button type="primary" @click="chooseImg" size="small">从相册中选取图片</el-button>
    </div>
    <vue-summernote ref="editer"></vue-summernote>
    <div class="album" v-if="album.length>0">
      <div class="album-img" v-for="item in album">
        <img :src="item.img_id+'@!150w'">
        <div class="add" @click="insertImg(item.img_id)">插入</div>
        <div class="delete" @click="removeArrItem(album, item)">删除</div>
      </div>
    </div>
    <!-- 选择相册图片 -->
    <el-dialog title="从相册选择图片" :visible.sync="dialogImgs" custom-class='img-dialog' top="20%" :close-on-click-modal='false'>
        <div class="img-container">
            <div class="img-title">
                <p v-for="item in getAblumDetail" :key="" @click="changeAlbum(item)">{{item.album_name}}</p>
            </div>
            <div class="img-list" >
                <div class="img-item" v-for="item in imgArrays" @click="item.checked = !item.checked">
                    <img :src="item.img_id+'@!150w'" alt="">
                    <div class="mask" v-if="item.checked"></div>
                    <i class="icon-bg" v-if="item.checked"></i>
                    <i class="el-icon-circle-check" v-if="item.checked"></i>
                </div>
            </div>
        </div>
        <el-button type="primary" class='check-btn' @click="copyImgs()">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  const gssHost = window.config ? window.config.gssHost : '';
  import {getAlbumPic } from '@/api/addShopApi';
  import axios from 'axios';
  import qs from 'qs';
  import cookie from '@/util/cookie'
  export default {
    data() {
      return {
        currentValue: '',
        dialogImgs: false,
        imgArrays: [], 
        album: [],               //页面插入框的图片
        getAblumDetail: [],       //从接口获取的相册信息
      }
    },
    props: {
      value: [String, Number],
      validateEvent: {
        type: Boolean,
        default: true
      },
    },
    watch: {
      currentValue(newVal, oldVal){
        this.setCurrentValue(newVal)
      }
    },
    created (){
      this.getAlbum();
    },
    mounted () {
      const self = this
      const editer = self.$refs.editer
      self.editer = editer;
      this.setVal(this.value)
      editer.$on('onImageUpload', function (files, type) {
        self.updateimage(files, editer, type)
        // 这里做上传图片的操作，上传成功之后便可以用到下面这句将图片插入到编辑框中
        // editer.run('insertImage', 'http://ikz2ydxo.gic.bgp.cnbj01.cdsgss.com/rest/927381435927494656.jpg')
      })
      editer.$on('onChange', function (currentValues) {
        // 当富文本框内容发生变化时做什么事
        self.currentValue = currentValues
        self.$emit('input', currentValues)
        self.$emit('change', currentValues)
      })

      // editer.$on('onBlur', function (currentValues) {
      // 
      //   // 当富文本框内容发生变化时做什么事
      //   self.$emit('change', currentValues)
      // })
    },
  methods: {
    /*从相册中选择图片 */
    chooseImg(){
        this.dialogImgs = true;
    },
    changeAlbum(item){
        this.imgArrays = item.pics;
    },
    copyImgs() {
        let self = this;
        self.dialogImgs = false;
        self.imgArrays.forEach((v ,i) => {
            v.checked ? self.album.push(v) : '';
        })
    },
    insertImg(url) {
      let contentDiv = document.querySelectorAll('.panel-body');
      let imgElement = `<img src=${url}></img>`;
      contentDiv[0].innerHTML = `${contentDiv[0].innerHTML}${imgElement}`;
      this.currentValue = contentDiv[0].innerHTML;
    },
    /*获取相册图片*/
    getAlbum(){
        let self = this;
        getAlbumPic().then(res => {
          let getImg = [];

           if(res.data.data) {
            self.getAblumDetail = res.data.data.store_albums
            let keys = Object.keys(self.getAblumDetail);
            keys.forEach(v => {
                getImg.push(self.getAblumDetail[v])
            })
            self.getAblumDetail = getImg;
          }
          if(self.getAblumDetail.length > 0){
            self.getAblumDetail.forEach( v => {
            v.pics.forEach( img => {
                self.$set(img,'checked',false);
                })
            })
            self.imgArrays = self.getAblumDetail[0].pics;
          }
        })
    },
    updateimage(files, editer, type){
      let self = this
      let file = files[0]      
      let param = new FormData(); //创建form对象
      param.append('file', file, file.name);//通过append向form对象添加数据
      param.append('bizcode', 104)
      //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      delete axios.defaults.headers.common.Authorization
      axios.post(gssHost + '/oss/image/uploadsingleimage', param, config)
      .then(res=>{
        axios.defaults.headers.common['Authorization'] = `dmp ${cookie.getCookie('accessToken')}`;
        if(res.data.code == 0) {
          editer.run('insertImage', res.data.data)
        }else {
          self.$message({
            message: '图片上传失败，请重新尝试！',
            type: 'warning'
          });
        }
      })

    },
    // updateValue (value) {
    //   this.$emit('input', 'dadadadad')
    // },
    setVal (value) {
      // 设置初始值
      this.$refs.editer.run('code', value)
    },
    getVal () {
      // 获取初始值
      this.$refs.editer.run('code')
    },      
    setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
    },
    removeArrItem(arr, val){
      for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
  }

  }
</script>

<style lang="scss">
  .summernote-wrap {
    .album{
      padding: 0 20px 10px;
      border: 1px solid #a9a9a9;
      .album-img{
          width: 80px;
          height: 80px;
          position: relative;
          display: inline-block;              
          margin-right: 10px;
          margin-top: 10px;
          img{
              width: 100%;
              height: 100%;

          }
          div{
              position: absolute;
              font-size: 12px;
              bottom: 0;
              background: #000;
              color: #fff;
              display: inline-block;
              width: 33px;
              text-align: center;
              height: 21px;
              line-height: 21px;
              opacity: 0.7;
              cursor: pointer;
          }
          .add{
              left: 0;
          }
          .delete{
              right: 0;
          }
      }
    }
  }
  .summernote-desc {
    overflow: hidden;
    margin-bottom: 10px;
    h3 {
      margin: 0;
      font-size: 20px;
      line-height: 30px;
    }
    .el-button {
      float: right;
    }
  }
  /*选择图片弹窗*/
  .img-dialog{
      width: 700px;
      height: 415px;
      z-index: 2001;
      .img-container{
          display: flex;
          flex-direction: row;
          height: 270px;
          border: 1px solid #ddd;
          .img-title{
              border-right: 1px solid #ddd;
              overflow-y: auto;
              width: 135px;
              p{
                  text-align: center;
                  overflow: hidden;
                  cursor: pointer; 
                  height: 30px;
                  line-height: 30px;
                  
              }
          }
          .img-list{
              padding: 10px;
              width: 500px;
              margin-left: 25px;
              overflow-y: auto;
              .img-item{
                  width: 80px;
                  height: 80px;
                  display: inline-block;
                  position: relative;
                  vertical-align: top;
                  img{
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                  }
                  .mask{
                      position: absolute;
                      width: 80px;
                      height: 80px;
                      top: 0;
                      background: rgba(51,51,51,0.49);
                  }
                  i{
                      color: #45cdb6;
                      font-size: 16px;
                      position: absolute;
                      right: 5px;
                      top: 5px;
                  }
                  .icon-bg{
                      background: #fff;
                      width: 10px;
                      height: 10px;
                      top: 7px;
                      right: 9px
                  }
              }
              .img-item:nth-of-type(n+2){
                  margin-left: 10px;
              }
              .img-item:nth-of-type(n+6){
                  margin-top: 10px;
              }
              .img-item:nth-of-type(5n+1){
                  margin-left: 0px;
              }
          }
      }
      .check-btn{
          width: 90px;
          height:34px;
          color: #fff;
          font-size: 14px;
          margin-top: 7px;
          float: right;
      }
  }
</style>