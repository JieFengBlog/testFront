<template>
    <el-row :gutter="20" style="margin-top: 50px;">
        <el-col :span="20" :offset="2">
            <el-table
                    border
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="testId.course.courseName"
                        label="课程名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="testId.title"
                        label="实验名称"
                        align="center"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="testId.teacherId.name"
                        align="center"
                        label="发送者"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="content"
                        align="center"
                        width="600"
                        label="发送内容">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        width="180"
                        label="发送时间">
                    <template slot-scope="scope">
                        {{new Date(scope.row.createTime).toLocaleString()}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteComment(scope.row.id)" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    :total="tableData.length"
                    :page-sizes="[7, 10]"
                    :page-size="currentSize"
                    :current-page="currentPage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    style="margin: 50px auto; float: right;"
                    layout="prev, pager, next">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "StudentInfo",
        data(){
            return{
                currentPage:1,
                currentSize:7,
                tableData: []
            }
        },
        methods:{
            deleteComment(id){
                this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$axios({
                        method:'get',
                        url:'/api/comment/deleteCommentByPrimaryId/' + id
                    }).then(response=>{
                        if(response.data){
                            this.getAllCommentByStudentId();
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
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getAllCommentByStudentId(){
                this.$axios({
                    method:'get',
                    url:"/api/comment/getAllCommentByStudentId/" + sessionStorage.getItem("id")
                }).then(response=>{
                    this.tableData = response.data;
                    console.log(this.tableData);
                })
            }

        },
        created() {
            this.getAllCommentByStudentId();
        }
    }
</script>

<style scoped>
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .bg-purple {
        background: #d3dce6;
    }
</style>
