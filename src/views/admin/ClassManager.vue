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
                    type="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="班级名称"
                    width="300">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="editBtn(scope.row)" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteClass(scope.row.id)" circle></el-button>
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
                :title="title"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input v-model="Class.name" placeholder="请输入班级名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditMethod">确 定</el-button>
            </span>
        </el-dialog>

    </div>



</template>

<script>
    export default {
        name: "StudentManager",
        data(){
            return{
                dialogVisible: false,
                tableData: [],
                title:'',
                currentPage:1,
                currentSize:10,
                addOrEdit:true,
                Class:{
                    id:null,
                    name:'',
                }
            }
        },

        created(){
            this.getAllClass();
        },
        methods:{
            deleteClass(id){
              this.$axios({
                  method:'get',
                  url:'/api/class/deleteClassById/' +  id
              }).then(response=>{
                  if(response.data){
                      this.getAllClass();
                      this.$message.success("删除成功");
                  }
              })
            },
            addOrEditMethod(){
                this.$axios({
                    method:'post',
                    url:'/api/class/addOrEditClass',
                    data:{
                        Class:this.Class,
                        addOrEdit:this.addOrEdit
                    }
                }).then(response=>{
                    if(response.data){
                        this.getAllClass();
                        this.$message.success("操作成功");
                        this.dialogVisible = false;
                    }
                })
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getAllClass(){
                this.$axios({
                    method:'get',
                    url:'/api/class/getAllClass'
                }).then(response=>{
                    this.tableData = response.data
                })
            },
            addBtn(){
                this.title = "添加班级";
                this.addOrEdit = true;
                this.Class.id = null;
                this.Class.name = '';
                this.dialogVisible = true;
            },
            editBtn(row){
                this.title = "更新班级信息";
                this.addOrEdit = false;
                this.Class.id = row.id;
                this.Class.name = row.name;
                this.dialogVisible = true;
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