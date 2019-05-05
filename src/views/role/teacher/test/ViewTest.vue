<template>
    <div style="margin-left:  80px;">

        <el-dialog
                title="留言"
                :visible.sync="dialogVisible"
                width="30%">
            <el-input v-model="comment.content" type="textarea" placeholder="请输入消息内容"></el-input>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取消发送</el-button>
                 <el-button type="primary" @click="sendMessage">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
                title="查看实验"
                :visible.sync="centerDialogVisible"
                width="60%"
                center>
            <el-card>
                <img :src="imgUrl" style="height: 100%; width: 100%;"/>
            </el-card>
        </el-dialog>
        <el-table
                v-loading="loading"
                :data="StudentDocumentList"
                style="width: 100%;margin-top: 30px;">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="日期"
                    align="center"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="testId.course.courseName"
                    align="center"
                    :filters="courseList"
                    :filter-method="filterCourse"
                    label="课程名称">
            </el-table-column>
            <el-table-column
                    prop="testId.title"
                    align="center"
                    :filters="testUniqueList"
                    :filter-method="filterTest"
                    label="实验课题">
            </el-table-column>
            <el-table-column
                    prop="studentId.classId.name"
                    align="center"
                    width="180"
                    :filters="classList"
                    :filter-method="filterClass"
                    label="班级">
            </el-table-column>
            <el-table-column
                    prop="studentId.name"
                    label="姓名"
                    align="center"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="viewDocumentUrl(scope.row)">查看实验</el-button>
                    <el-button type="success" icon="el-icon-message" size="mini" @click="sendMessageBtn(scope.row)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "ViewTest",
        data(){
            return{
                dialogVisible:false,
                testUniqueList:null,
                classList:[],
                search:'',
                imgUrl:'' ,
                loading:false,
                courseList:[],
                comment:{
                    acceptId:null,
                    content:null,
                    testId:null,
                },
                StudentDocumentList:[],
                centerDialogVisible:false,
                classFilter:{
                    text:'',
                    value:null,
                }
            }
        },
        methods:{
            sendMessage(){
                this.$axios({
                    method:"post",
                    url:"/api/comment/insertComment",
                    data:{
                        comment:this.comment
                    }
                }).then(response=>{
                    if(response.data){
                        this.$message.success("发送成功");
                    }
                })
                this.dialogVisible = false;
            },

            sendMessageBtn(row){
                this.comment.acceptId = row.studentId.id;
                this.comment.testId = row.testId.id;
                this.dialogVisible = true;
            },

            //获取老师所有的课程信息
            getAllCourseByTeacherId(){
                this.$axios.get("/api/course/getAllCourseByTeacherId?teacherId=" + Number(sessionStorage.getItem("id")) ).then(response=>{
                        this.courseList = this.CourseFilterUtil(response.data)
                    }
                )
            },

            testFilterUtil(data){
                console.log(data)
                if(data == null){
                    return null
                }
                let temp = new Array();
                for(let i = 0; i < data.length; i++){
                    let object = {
                        text:data[i].title,
                        value:data[i].testId.id
                    }
                    temp.push(object);
                }
                return temp;
            },


            CourseFilterUtil(data){
                let temp = new Array();
                for(let i = 0; i < data.length; i++){
                    let object = {
                        text:data[i].courseName,
                        value:data[i].id
                    }
                    temp.push(object);
                }
                return temp;
            },

            filterClass(value, row){
                return row.studentId.classId.id == value;
            },
            filterCourse(value, row){
                return row.testId.course.id == value;
            },
            filterTest(value, row){
                return row.testId.id == value
            },
            ClassFilterUtil(data){
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
            //获取计算机系所有的班级
            getAllClass(){
                this.$axios.get("/api/class/getAllClass").then(response=>{
                        this.classList = this.ClassFilterUtil(response.data);
                    }
                )
            },
            getAllDocument(){
                this.loading = true;
                this.$axios.get("/api/document/getAllDocument").then(response=>{
                    console.log("getAllDocument")
                    console.log(response.data)
                    for(let i = 0 ; i < response.data.length; i++){
                        if(response.data[i].testId.teacherId.id == Number(sessionStorage.getItem("id"))){
                            this.StudentDocumentList.push(response.data[i]);
                        }else{
                            console.log("baiqian")
                        }
                    }
                    console.log("studentDocumentList: ")
                    console.log(this.StudentDocumentList)
                    this.testUniqueList = this.testFilterUtil(this.getUniqueDocumentList(this.StudentDocumentList));
                    this.loading = false;
                })
            },

            getUniqueDocumentList(data){
                console.log("getUniqueDocumentList")
                console.log(data)
                let _container = new Array();

                //防止第一次比较的时候_container空指针异常
                if(data != null && data.length != 0){
                    _container.push(data[0])
                }else{
                    return null;
                }
                //去重

                for(let i = 0;i < data.length; i++){
                    //初始化flag
                    let _flag = true;

                    for(let j = 0; j < _container.length; j++){
                        if(data[i].testId.id == _container[j].testId.id){
                            _flag = false;
                            break;
                        }
                    }
                    if(_flag)
                        _container.push(data[i]);
                }
                return _container;
            },


            viewDocumentUrl(row){
                this.imgUrl = '/api/image/' + row.url
                this.centerDialogVisible = true;
            },
        },
        created(){
            console.log("id" + sessionStorage.getItem("id"));
            this.getAllDocument();
            this.getAllClass();
            this.getAllCourseByTeacherId();
        }
    }
</script>

<style scoped>

</style>
