<template>
    <div id="studentManager">

        <el-table
                ref="filterTable"
                :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                border
                style="width: 100%">
            <el-table-column
                    align="center"
                    type="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="teacher.name"
                    label="教师姓名"
                    :filters="TeacherList"
                    :filter-method="filterTeacher"
                    width="500"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="courseName"
                    label="课程名称"
                    >
            </el-table-column>

        </el-table>

        <el-pagination
                style="float: right; margin-top: 20px; margin-right: 10px; margin-bottom: 20px"
                small
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
                TeacherList:[],
                currentPage:1,
                currentSize:10,
            }
        },
        created(){

            this.$axios({
                method:'get',
                url:'/api/course/getAllCourse'
            }).then(response=>{
                this.tableData = response.data
            })

            this.getTeacher();
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getTeacher(){
                this.$axios({
                    method:'get',
                    url:'/api/user/getUser/1'
                }).then(response=>{
                    this.TeacherList = this.TeacherFilterUtil(response.data);
                })
            },
            filterTeacher(value, row){
                return row.teacher.id == value;
            },
            TeacherFilterUtil(data){
                let temp = new Array();
                for(let i = 0; i < data.length; i++){
                    let object = {
                        text:data[i].name,
                        value:data[i].id
                    }
                    temp.push(object);
                }
                return temp;
            },
        },
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