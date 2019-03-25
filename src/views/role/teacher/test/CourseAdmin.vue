<template>
    <div>
        <span style="color: #909399; font-weight: bold;">当前课程:&nbsp;&nbsp;</span>
        <el-select v-model="currentCourse" placeholder="请选择课程" @change="courseChange">
            <el-option
                    v-for="item in courseList"
                    :key="item.id"
                    :label="item.courseName"
                    :value="item.id">
            </el-option>
        </el-select>


        <el-button type="text" style="margin-left: 10px" @click="addCourseBtn">添加课程</el-button>



        <div style="margin:60px 50px">

            <el-dialog
                    title="添加课程"
                    :visible.sync="addCourseVisible"
                    center
                    width="30%">
                <el-form :model="course" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="请输入课程名称" label-width="120px">
                        <el-input  v-model.number="course.courseName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="addCourseVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addCourse">确 定</el-button>
                    </span>
            </el-dialog>

            <!--弹出框-->
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center>
                <el-form :model="TestInfo" ref="testInfo">
                    <el-form-item label="课题标题" :label-width="formLabelWidth" prop="title">
                        <el-input v-model="TestInfo.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="课题描述" :label-width="formLabelWidth" prop="testDesc">
                        <el-input v-model="TestInfo.testDesc" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="提交入口状态" :label-width="formLabelWidth">
                        <el-switch
                                v-model="TestInfo.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="允许提交班级(可多选)" :label-width="formLabelWidth">
                        <el-select v-model="permissionClassList" multiple placeholder="请选择能提交的班级">
                            <el-option
                                    v-for="item in classList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addOrEditTest">确 定</el-button>
                </div>
            </el-dialog>

            <el-table
                    v-loading="loading"
                    border
                    empty-text="还没有添加实验"
                    :data="TestList"
                    style="width: 100%">
                <el-table-column
                        label="实验标题"
                        prop="title"
                        align="center"
                        width="400">
                </el-table-column>
                <el-table-column
                        label="实验描述"
                        align="center"
                        prop="testDesc"
                        width="350">
                </el-table-column>

                <el-table-column
                        label="允许提交班级"
                        align="center"
                        width="300">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.classList" multiple disabled>
                            <el-option
                                    v-for="item in classList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="提交入口状态"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <el-switch
                                disabled
                                v-model="scope.row.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <el-popover
                placement="left"
                width="50"
                trigger="hover"
                content="点击添加一个实验课题">
            <el-button  slot="reference" type="primary" @click="handleAdd" icon="el-icon-plus"  style="position: absolute; right: 50px; bottom: 50px;" circle ></el-button>
        </el-popover>
    </div>

</template>

<script>
    export default {
        name: "CourseAdmin",
        data(){
            return{
                addCourseVisible:false,
                dialogTitle:'',
                loading:false,
                currentCourse:null,
                value: '',
                dialogFormVisible:false,
                classList: [],
                courseList:[],
                value4:null,
                formLabelWidth:'180px',
                TestList: [],
                addOrEdit:true,
                teacherId:Number(sessionStorage.getItem("id")),
                permissionClassList:[],
                TestInfo:{
                    id:null,
                    title:'',
                    testDesc:'',
                    status:false,
                },
                course:{
                    courseName:''
                }
            }
        },
        methods:{

            addCourse(){
                this.$axios({
                    method:"post",
                    url:'/api/course/insertCourse',
                    data:{
                        course: this.course,
                        teacherId:this.teacherId
                    }
                }).then(response=>{
                    if(response.data){
                        this.getAllCourseByTeacherId();
                        this.$message.success("添加成功");
                        this.addCourseVisible = false;
                    }
                })
            },
            addCourseBtn(){
                this.addCourseVisible = true;
            },
            handleEdit(data){
                this.dialogTitle = '编辑实验信息',

                    this.TestInfo.id = data.id;
                this.TestInfo.title = data.title;
                this.TestInfo.testDesc = data.testDesc;
                this.TestInfo.status = data.status;
                this.permissionClassList = data.classList;
                this.dialogFormVisible = true;
                this.addOrEdit = false;
            },
            handleAdd(){
                if(this.currentCourse == null){
                    this.$message.error("添加一个实验之前请选择一个课程");
                    return;
                }
                this.dialogTitle = '添加实验',

                    this.TestInfo.title = '';
                this.TestInfo.testDesc = '';
                this.TestInfo.status = false;
                this.permissionClassList = [];

                this.dialogFormVisible = true;
                this.addOrEdit = true;
            },
            addOrEditTest(){
                this.$axios({
                    method:"post",
                    url:'/api/test/insertOrEditTest',
                    data:{
                        TestInfo:this.TestInfo,
                        teacherId:this.teacherId,
                        courseId:this.currentCourse,
                        addOrEdit:this.addOrEdit,
                        permissionClassList:this.permissionClassList
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.getAllTestByTeacherId(this.currentCourse);
                        this.$message.success("添加成功")
                        this.dialogFormVisible = false;
                    }

                })
            },
            courseChange(courseId){
                this.getAllTestByTeacherId(courseId);
            },
            //获取老师所有的课程信息
            getAllCourseByTeacherId(){
                this.$axios.get("/api/course/getAllCourseByTeacherId?teacherId=" + Number(sessionStorage.getItem("id")) ).then(response=>{
                        this.courseList = response.data
                    }
                )
            },
            //获取计算机系所有的班级
            getAllClass(){
                this.$axios.get("/api/class/getAllClass").then(response=>{
                        this.classList = response.data
                    }
                )
            },
            //获取老师对应课程的所有实验
            getAllTestByTeacherId(courseId){
                const teacherId = Number(sessionStorage.getItem("id"));
                this.$axios({
                    method:'get',
                    url:'/api/test/getAllTestByTeacherIdAndCourseId?teacherId=' + teacherId + '&courseId=' +courseId ,
                }).then(response=>{
                    if(response.data.success){
                            this.TestList = response.data.courseTestList;
                    }
                })
            },
        },
        created() {
            this.getAllCourseByTeacherId();
            this.getAllClass();
        }
    }
</script>

<style scoped>

</style>