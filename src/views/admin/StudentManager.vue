<template>
    <div id="studentManager">

        <el-button type="warning" icon="el-icon-plus" @click="addBtn" style="margin: 10px 20px; float: right;" circle></el-button>

        <el-table
                ref="filterTable"
                :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                border
                style="width: 100%">

            <el-table-column
                    prop="number"
                    label="学号"
                    align="center"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="gender"
                    label="性别"
                    width="100">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.gender === 1 ? 'warning' : 'danger'"
                            disable-transitions>{{formatSex(scope.row)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="classId.name"
                    label="班级"
                    width="180">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="username"
                    label="登录名"
                    width="180">
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
            <el-form ref="form" :model="student" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="student.number"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="student.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="student.gender" :label="1">男</el-radio>
                    <el-radio v-model="student.gender" :label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select v-model="classId" placeholder="请选择班级">
                        <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登录名">
                    <el-input v-model="student.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="student.password"></el-input>
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
                classList:[],
                dialogVisible:false,
                tableData: [],
                currentPage:1,
                currentSize:10,
                addOrEdit:true,
                title:'',
                student:{
                    id:null,
                    number:null,
                    name:'',
                    gender:1,
                    type:0,
                    username:null,
                    password:null
                },
                classId:null,
            }
        },
        created(){
            this.getAllStudentInfo();
            this.getAllClass();
        },
        methods:{
            getAllStudentInfo(){
                this.$axios({
                    method:'get',
                    url:'/api/user/getUser/0'
                }).then(response=>{
                    this.tableData = response.data
                })
            },
            getAllClass(){
                this.$axios({
                    method:'get',
                    url:'/api/class/getAllClass'
                }).then(response=>{
                    this.classList = response.data
                })
            },
            addBtn(){
              this.title = "添加学生";
              this.dialogVisible = true;
              this.addOrEdit = true;

              this.student.number = '';
              this.student.username = '';
              this.student.password = '';
              this.student.name = '';
              this.classId = null;
              this.student.gender = 1;
            },

            editBtn(row){
                this.title = "编辑学生信息";
                this.dialogVisible = true;
                this.addOrEdit = false;

                this.student.number = row.number;
                this.student.id = row.id;
                this.student.username = row.username;
                this.student.password =  row.password;
                this.student.name = row.name;
                this.student.gender = row.gender;
                this.classId = row.classId.id;
            },
            addOrEditUser(){
              this.$axios({
                  method:"post",
                  url:'/api/user/addOrEditUser',
                  data:{
                      user:this.student,
                      addOrEdit:this.addOrEdit,
                      classId:this.classId
                  }
              }).then(response=>{
                  if(response.data){
                      this.getAllStudentInfo();
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