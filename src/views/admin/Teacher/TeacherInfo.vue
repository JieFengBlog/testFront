<template>
    <div id="studentManager">

        <el-button type="warning" icon="el-icon-plus" @click="addBtn" style="margin: 10px 20px; float: right;" circle></el-button>
        <el-table
                ref="filterTable"
                :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                border
                style="width: 100%">
            <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="250">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="gender"
                    label="性别"
                    width="150">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.gender === 1 ? 'warning' : 'danger'"
                            disable-transitions>{{formatSex(scope.row)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="username"
                    label="登录名"
                    width="300">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="password"
                    label="密码">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="editBtn(scope.row)"  circle></el-button>
                </template>
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


        <el-dialog
                center
                :title="title"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form ref="form" :model="teacher" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="teacher.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="teacher.gender" :label="1">男</el-radio>
                    <el-radio v-model="teacher.gender" :label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="登录名">
                    <el-input v-model="teacher.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="teacher.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrEditUser">确 定</el-button>
            </span>
        </el-dialog>
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
                addOrEdit:true,
                dialogVisible:false,
                title:'',
                teacher:{
                    id:null,
                    name:'',
                    gender:1,
                    type:1,
                    username:null,
                    password:null
                },
            }
        },


        created(){
            this.getAllTeacher();
        },
        methods:{

            getAllTeacher(){
                this.$axios({
                    method:'get',
                    url:'/api/user/getUser/1'
                }).then(response=>{
                    this.tableData = response.data
                })
            },
            addBtn(){
                this.title = "添加教师";
                this.dialogVisible = true;
                this.addOrEdit = true;

                this.teacher.username = '';
                this.teacher.password = '';
                this.teacher.name = '';
                this.teacher.gender = 1;
            },

            editBtn(row){
                this.title = "编辑教师信息";
                this.dialogVisible = true;
                this.addOrEdit = false;

                this.teacher.id = row.id;
                this.teacher.username = row.username;
                this.teacher.password =  row.password;
                this.teacher.name = row.name;
                this.teacher.gender = row.gender;
            },
            addOrEditUser(){
                this.$axios({
                    method:"post",
                    url:'/api/user/addOrEditUser',
                    data:{
                        user:this.teacher,
                        addOrEdit:this.addOrEdit,
                    }
                }).then(response=>{
                    if(response.data){
                        this.getAllTeacher();
                        this.dialogVisible = false;
                        this.$message.success("操作成功");
                    }
                })
            },

            formatSex: function (row,) {
                return row.gender === 1 ? '男' : '女' ;
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
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