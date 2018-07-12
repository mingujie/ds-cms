<template>
  <div class="class-list-page">
	<el-row>
		<el-col :span="8">
			<el-input v-model="input" placeholder="请输入内容"></el-input>
		</el-col>
		<el-col :span="16">
			<el-button type="primary">搜索</el-button>
			<el-button type="success">新增课程</el-button>
		</el-col>
	</el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="tableLoading"
	  class="table-contain ds-table"	
	  header-cell-class-name="cell-con">
      <!-- <el-table-column prop="date" label="ID"></el-table-column> -->
      <el-table-column  prop="courseSubjectTitle" label="标题"></el-table-column>
<!--       <el-table-column prop="date" label="分类"></el-table-column>
      <el-table-column prop="date" label="发布时间"></el-table-column> -->
      <el-table-column width="100" prop="courseSubjectPrice" label="价格（元）"></el-table-column>
      <el-table-column width="120" prop="courseSubjectLevel" label="等级"></el-table-column>
      <el-table-column width="160" prop="courseSubjectTeacher" label="讲师"></el-table-column>
<!--       <el-table-column prop="name" label="总时长"></el-table-column>
      <el-table-column prop="name" label="学习人数"></el-table-column> -->
    	<el-table-column
		fixed="right"
		label="操作"
		width="180">
		<template slot-scope="scope">
			<el-button type="text" size="small" @click="toDetail(scope.row.courseSubjectId)">编辑</el-button>
			<el-button type="text" size="small" @click="onDeleteRow(scope.$index, scope.row)">删除</el-button>
			<el-button type="text" size="small" @click="routerCourseChapter(scope.row.courseSubjectId)">增（修）课件</el-button>
		</template>
	  </el-table-column>
    </el-table>

    <div class="ds-pagination" v-if="pagination.total > 1">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onChangePagination"
        v-if="pagination.total > pagination.pageSize"
        :total="pagination.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCourseSubjectPage, deleteCourseSubject  } from '@/api/'
export default {
  data() {
    return {
		input:'',
		isEditorStatus: false, //是否编辑模式
		pagination: {
			total: 1,
			pageNum: 1,
			pageSize: 10
		},
		tableLoading: true,
        tableData: []
    }
  },
  mounted() {  

  },
  computed: {
  },
    created(res){
     	var _self = this
    	_self.getCourseSubjectHandle(_self.pagination.pageNum, _self.pagination.pageSize)
    },

	methods: {
		submit() {
			
		},

		getCourseSubjectHandle(pageNum, pageSize){
			var _self = this
			getCourseSubjectPage({
	            pageNum: pageNum,
	            pageSize: pageSize
        	}).then(function(res){
				if(res.code === 0) {
					if(res.data.list.length) {
                		_self.tableData = res.data.list
                		_self.pagination.total = parseInt(res.data.total)

					}else {
						_self.tableData = []
					}
				}
				_self.tableLoading = false
			})
		},
		onEditorHandle(index, row){
			this.isEditorStatus = true
		},
	      onChangePagination(pageNum){
	        var _self = this
	        _self.getCourseSubjectHandle(pageNum, _self.pagination.pageSize, _self.ruleForm.courseCategoryParentId)
	      },
		toDetail(cid) {
			this.$router.push({name: '编辑课程', params: { cid: cid } })
		},
		deleteCourseSubjectHandle(courseSubjectId){
	        var _self = this
	        return deleteCourseSubject({
	          "id": courseSubjectId
	        }).then(function(res){
	          var status = false 
	          if(res.code === 0) {
	            status =  true 
	          }else {
	            _self.$message({
	              message: res.message,
	              type: 'warning'
	            });
	          }
	          return status
	        })
		},

      onDeleteRow(index, row) {
        var _self = this
        _self.confirm({}, function(){
        _self.deleteCourseSubjectHandle(row.courseSubjectId)
        .then(function(status){
            if(status){
              // rows.splice(index, 1);
              _self.getCourseSubjectHandle(_self.pagination.pageNum, _self.pagination.pageSize)
            }            
          })
        });
      },
      routerCourseChapter(cid){
		this.$router.push({name: '创建课件', params: { cid: cid } })
      },
      confirm(options, callback) {
        this.$confirm('此操作将永久删除该分类及其子分类，你确定删除吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          callback()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      }
  }
}
</script>

<style lang="scss">
    .class-list-page{
       .el-col-16{
		   	text-align: left;
			padding-left: 20px;
	   }
	   .table-contain{
		   	margin-top: 20px;
		   	.cell-con{
				text-align: center;
			}
	   }
	   .block{
		   margin-top: 20px;
		   text-align: right;
	   }
    }



</style>
