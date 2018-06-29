<template>
    <div class="class-upload-page">
        <el-row>
            <el-button type="primary">添加章</el-button>
            <el-button type="primary">添加课件</el-button>
        </el-row>

        <div class="block">
            <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                <el-button type="text">编辑 </el-button>
                <el-button type="text">删除</el-button>
                </span>
            </span>
            </el-tree>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
		input:'',
        data: [{
            id: 1,
            label: '一级 1',
            children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
                id: 9,
                label: '三级 1-1-1'
            }, {
                id: 10,
                label: '三级 1-1-2'
            }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            children: [{
            id: 5,
            label: '二级 2-1'
            }, {
            id: 6,
            label: '二级 2-2'
            }]
        }, {
            id: 3,
            label: '一级 3',
            children: [{
            id: 7,
            label: '二级 3-1'
            }, {
            id: 8,
            label: '二级 3-2'
            }]
      }]
    }
  },

  mounted() {  
        let all = document.querySelectorAll('.el-tree-node__content')
        all[all.length - 1].style.borderBottom = '1px solid #ddd' 
  },
  computed: {
  },
  components: {
  },
  methods: {
		submit() {
			
		}
  }
}
</script>

<style lang="scss">
    .class-upload-page{
        text-align: left;
        .block{
            padding-top: 20px;
            font-size: 18px;
            .el-tree-node__content{
                padding-top: 10px;
                padding-bottom: 10px;
                border: 1px solid #ddd;
                border-bottom: 0;
            }
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-right: 10px;
            }
            // .el-tree-node__content:nth-of-type(1) {
            //     border: none;
            // }
        }
    }

</style>
