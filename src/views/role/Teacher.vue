<template>
    <el-row style="width: 100%;">
        <!--Container Start-->
        <el-col :span="22" :offset="1" >
            <!--Tab Container start-->
            <el-tabs type="border-card"   style="min-height:600px;">
                <!-- first pane-->
                <el-tab-pane >
                    <span slot="label"><i class="el-icon-date"></i> 实验管理</span>
                    <el-row >
                        <!--Navigation start-->
                        <el-col :span="3" >
                            <el-menu
                                    router
                                    :default-active="this.$route.path"
                                    class="el-menu-vertical-demo"
                                    style="margin-top: 60px">
                                <el-menu-item index="/teacher">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">实验管理</span>
                                </el-menu-item>
                                <el-menu-item index="/teacher/viewTest">
                                    <i class="el-icon-view"></i>
                                    <span slot="title">查看提交实验</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                        <!-- 我的实验内容-->
                        <el-col :span="21" style="position: relative; min-height: 600px;">
                           <router-view/>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    import CourseAdmin from "@/views/role/teacher/test/CourseAdmin";
    import ViewTest from "@/views/role/teacher/test/ViewTest";

    export default {
        name: "Student",
        components:{
            CourseAdmin,
            ViewTest
        },
        data(){
            return{
            }
        },
        method:{

        }
    }
</script>

<style scoped>

</style>
