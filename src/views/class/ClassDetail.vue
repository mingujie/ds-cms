<template>
    <div class="class-detail-page">
        <el-tabs type="border-card">
            <el-tab-pane label="课程信息">
                <class-info></class-info>
            </el-tab-pane>
            <el-tab-pane label="课件信息">
                <class-upload></class-upload>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ClassInfo from './components/Info'
import ClassUpload from './components/Upload' 
export default {
  data() {
    return {
		input:'',
        
    }
  },

  mounted() {  

  },
  computed: {
  },
  components: {
      ClassInfo,
      ClassUpload
  },
  methods: {
		submit() {
			
		}
  }
}
</script>

<style lang="scss">
    .class-detail-page{

    }



</style>
