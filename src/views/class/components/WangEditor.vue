<template>
    <div class="ds-wang-editor">
      <div ref="editor" id="editorEle" style="text-align:left;position: relative;z-index: 1;" ></div>
    </div>
</template>

<script>
import Editor from 'wangeditor'
export default {
  components: {
  },
  data() {
    return {
      editor: null,
      editorContent: ''
    }
  },
  props: {
    value: [String],
    cid: [String]
  },
  mounted() {  
    console.log(this.value, 'fff')
    this.initEditor()
  },

  computed: {

  },

  methods: {
    initEditor(){
      var _self = this
      var editor = new Editor(_self.$refs.editor);

      editor.customConfig.uploadImgServer = '/upload'  // 
      //上传图片到服务器
      editor.customConfig.onchange = (html) => {
          _self.editorContent = html
          _self.$emit('input', html)
      }
      editor.create()     
      editor.txt.html(_self.value)
      
    }
  }
}
</script>

<style lang="scss">
  .ds-wang-editor {
    
  }
</style>
