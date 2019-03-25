<template>
    <div id="studentManager">

        <el-table
                ref="filterTable"
                :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                border
                style="width: 100%">

            <el-table-column
                    prop="testId.teacherId.name"
                    label="发送者"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="acceptId.name"
                    label="接收者"
                    width="120">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="acceptId.number"
                    label="接收者学号"
                    width="150">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="testId.course.courseName"
                    label="课程名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="testId.title"
                    label="实验名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="content"
                    width="350"
                    label="留言内容">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteComment(scope.row.id)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                style="float: right; margin-top: 20px; margin-right: 10px; margin-bottom: 20px"
                :page-size="currentSize"
                :current-page="currentPage"
                layout="prev, pager, next"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="tableData.length">
        </el-pagination>
    </div>

</template>

<script>
    export default {
        name: "StudentManager",
        data(){
            return{
                tableData: [],
                currentPage:1,
                currentSize:10,
            }
        },

        created(){
            this.getAllComment();
        },
        methods:{
            getAllComment(){
                this.$axios({
                    method:'get',
                    url:'/api/comment/getAllComment'
                }).then(response=>{
                    this.tableData = response.data
                })
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            deleteComment(id){
                this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: 'get',
                        url:'/api/comment/deleteCommentByPrimaryId/' + id
                    }).then(response=>{
                        if(response.data){
                            this.getAllComment();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style>
    #studentManager .el-pager li.active{
        color:#E6A23C
    }

    #studentManager .el-pager li:hover{
        color:#E6A23C
    }
</style>