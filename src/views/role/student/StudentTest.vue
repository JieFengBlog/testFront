<template>
    <el-row :gutter="50">
        <el-col :span="3" >
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    style="margin-top: 50px">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">提交实验</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20"  >
            <el-table
                    v-loading="loading2"
                    element-loading-text="数据加载中"
                    border
                    :data="tableData2.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                    style="width: 100%; margin-top: 50px"
            >
                <el-table-column
                        prop="course.courseName"
                        label="课程名称"
                        align="center"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="实验名称"
                        align="center"
                        width="400">
                </el-table-column>
                <el-table-column
                        prop="testDesc"
                        label="实验描述"
                        align="center"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="teacherId.name"
                        label="实验老师"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column label="课题说明"   align="center"    >
                    <template slot-scope="scope">
                        <el-button  @click="viewVideoBtn(scope.row)" type="primary" icon="el-icon-view" circle></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作"   align="center"    >
                    <template slot-scope="scope">
                        <el-button
                                type="success"
                                plain
                                size="mini"
                                @click="uploadDocumentBtn(scope.row)">
                                            <span>
                                                上传实验
                                            </span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    :total="tableData2.length"
                    :page-sizes="[7, 10]"
                    :page-size="currentSize"
                    :current-page="currentPage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    style="margin: 50px auto; float: right;"
                    layout="prev, pager, next">
            </el-pagination>


        </el-col>

        <el-dialog
                title="提示"
                @close="closeVideo"
                :visible.sync="videoViewDialog"
                width="60%"
                :before-close="handleClose">
            <video :src="videoUrl"  controls="controls" style="width: 100%; height: 100%;">

            </video>
        </el-dialog>


        <el-dialog
                title="提交实验"
                :visible.sync="dialogVisible"
                width="30%">
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    :data="extra"
                    name="tableImg"
                    action="/api/document/insertDocument"
                    :on-success="uploadSuccess"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "StudentTest",
        data(){
            return{
                videoViewDialog:false,
                tableData2: [],
                currentPage:1,
                currentSize:7,
                loading2: true,
                dialogVisible:false,
                extra:{
                    studentId:null,
                    testId:null
                }
            }
        },
        methods:{

            closeVideo(){
                this.playPause();
            },
            playPause(){
                let myVideo = document.getElementsByTagName('video')[0];
                myVideo.pause();
            },
            viewVideoBtn(row){
                this.videoUrl = "/api/image/" + row.videoUrl;
                this.videoViewDialog = true;
            },
            uploadSuccess(response){
              if(response.success)
              {
                  this.getAllTestAvailable();
                  this.$message.success("上传成功");
              }

            },

            submitUpload() {
                this.$refs.upload.submit();
            },

            uploadDocumentBtn(row){
                this.extra.studentId = sessionStorage.getItem("id");
                this.extra.testId = row.id;
                this.dialogVisible = true;
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },

            testUtil(data){
                let temp = new Array();
                const classId = Number(sessionStorage.getItem("classId"));
                console.log("classId : " + classId);

                for(let i = 0; i < data.length; i++){
                    if(data[i].classList.indexOf(classId) > -1){
                        temp.push(data[i]);
                    }
                }
                return temp;
            },
            getAllTestAvailable(){
                this.$axios.get("/api/test/getAllTestAvailable").then(response=>{
                    setTimeout(()=>{
                        console.log(response.data);
                        this.tableData2 = this.testUtil(response.data);

                        this.loading2 = false;
                    },500)

                })
            }
        },

        created() {
            this.getAllTestAvailable();
        }
    }
</script>

<style scoped>

</style>