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
	  class="table-contain"	
	  header-cell-class-name="cell-con">
      <el-table-column prop="date" label="ID"></el-table-column>
      <el-table-column prop="date" label="标题"></el-table-column>
      <el-table-column prop="date" label="分类"></el-table-column>
      <el-table-column prop="date" label="发布时间"></el-table-column>
      <el-table-column prop="date" label="价格（元）"></el-table-column>
      <el-table-column prop="date" label="等级"></el-table-column>
      <el-table-column prop="name" label="教师"></el-table-column>
      <el-table-column prop="name" label="总时长"></el-table-column>
      <el-table-column prop="name" label="学习人数"></el-table-column>
    	<el-table-column
		fixed="right"
		label="操作"
		width="100">
		<template slot-scope="scope">
			<el-button type="text" @click="toDetail">编辑</el-button>
			<el-button type="text">删除</el-button>
			<el-button type="text">增加课件</el-button>
		</template>
	  </el-table-column>
    </el-table>

	<div class="block">
		<el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="currentPage4"
		:page-sizes="[100, 200, 300, 400]"
		:page-size="100"
		layout="total, sizes, prev, pager, next, jumper"
		:total="400">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
		input:'',
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },

  mounted() {  

  },
  computed: {
  },

  methods: {
		submit() {
			
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		toDetail() {
			this.$router.push('/class/detail')
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
