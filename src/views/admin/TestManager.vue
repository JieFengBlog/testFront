<template>
    <div id="testManager">
        <div>

            <!--<el-dialog-->
                    <!--title="添加课程"-->
                    <!--:visible.sync="addCourseVisible"-->
                    <!--center-->
                    <!--width="30%">-->
                <!--<el-form :model="course" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">-->
                    <!--<el-form-item label="请输入课程名称" label-width="120px">-->
                        <!--<el-input  v-model.number="course.courseName" autocomplete="off"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
                <!--<span slot="footer" class="dialog-footer">-->
                        <!--<el-button @click="addCourseVisible = false">取 消</el-button>-->
                        <!--<el-button type="primary" @click="addCourse">确 定</el-button>-->
                    <!--</span>-->
            <!--</el-dialog>-->

            <!--&lt;!&ndash;弹出框&ndash;&gt;-->
            <!--<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center>-->
                <!--<el-form :model="TestInfo" ref="testInfo">-->
                    <!--<el-form-item label="课题标题" :label-width="formLabelWidth" prop="title">-->
                        <!--<el-input v-model="TestInfo.title" autocomplete="off"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="课题描述" :label-width="formLabelWidth" prop="testDesc">-->
                        <!--<el-input v-model="TestInfo.testDesc" autocomplete="off"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="提交入口状态" :label-width="formLabelWidth">-->
                        <!--<el-switch-->
                                <!--v-model="TestInfo.status"-->
                                <!--active-color="#13ce66"-->
                                <!--inactive-color="#ff4949">-->
                        <!--</el-switch>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="允许提交班级(可多选)" :label-width="formLabelWidth">-->
                        <!--<el-select v-model="permissionClassList" multiple placeholder="请选择能提交的班级">-->
                            <!--<el-option-->
                                    <!--v-for="item in classList"-->
                                    <!--:key="item.id"-->
                                    <!--:label="item.name"-->
                                    <!--:value="item.id">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
                <!--<div slot="footer" class="dialog-footer">-->
                    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                    <!--<el-button type="primary" @click="addOrEditTest">确 定</el-button>-->
                <!--</div>-->
            <!--</el-dialog>-->

            <el-table
                    v-loading="loading"
                    border
                    empty-text="还没有添加实验"
                    :data="TestList.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                    style="width: 100%">
                <el-table-column
                        label="实验标题"
                        prop="title"
                        align="center"
                        width="300">
                </el-table-column>
                <el-table-column
                        label="实验描述"
                        align="center"
                        prop="testDesc"
                        width="350">
                </el-table-column>
                <el-table-column
                        label="所属老师"
                        align="center"
                        prop="teacherId.name"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="允许提交班级"
                        align="center"
                        width="350">
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
                >
                    <template slot-scope="scope">
                        <el-switch
                                disabled
                                v-model="scope.row.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    style="float: right; margin-top: 20px; margin-right: 10px; margin-bottom: 20px"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="TestList.length">
            </el-pagination>

        </div>
    </div>

</template>

<script>
    export default {
        name: "CourseAdmin",
        data(){
            return{
                currentPage:1,
                currentSize:5,
                loading:false,
                classList: [],
                TestList: [],
            }
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //获取计算机系所有的班级
            getAllClass(){
                this.$axios.get("/api/class/getAllClass").then(response=>{
                        this.classList = response.data
                    }
                )
            },

            getAllTestAdmin(){
                this.loading = true;
                this.$axios({
                    method:'get',
                    url:'/api/test/getAllTestAdmin',
                }).then(response=>{
                    setTimeout(()=>{
                        this.TestList = response.data;
                        this.loading = false;
                    },1000)


                })
            },
        },
        created() {
            this.getAllTestAdmin();
            this.getAllClass();
        }
    }
</script>

<style>
    #testManager .el-pager li.active{
        color:#E6A23C
    }

    #testManager .el-pager li:hover{
        color:#E6A23C
    }
    #testManager .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #E6A23C;
        color: #fff;
    }
    #testManager .el-select-dropdown__item.selected{
        color: #E6A23C;
    }
</style>