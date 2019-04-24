<template>
    <el-container>
        <el-header style="padding: 0 0; background: #545c64;">
            <el-row style="width: 100%;">
                <el-col :span="24" >
                    <div style="height: 64px; line-height: 64px; color: #fff; margin-left: 30px; float: left;">
                        <i class="fas fa-leaf fa-2x" style="color: #99CCCC;"></i>
                        <span style="font-size: 20px; margin-left: 10px">长治学院计算机系实验室教学系统后台</span>
                    </div>

                    <el-menu
                            router
                            style="float: right;"
                            class="el-menu-demo"
                            mode="horizontal"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#E6A23C">
                        <el-submenu>
                            <template slot="title">安全中心</template>
                            <el-menu-item @click="changePassword"><i class="fas fa-key fa-1x" style="color:#fff; margin-right: 10px"></i>密码更改</el-menu-item>
                            <el-menu-item @click="safeExit"><i style="color:#fff; margin-right: 10px" class="fas fa-sign-out-alt"></i>安全退出</el-menu-item>
                        </el-submenu>
                    </el-menu>

                    <el-menu
                            router
                            style="float: right;"
                            :default-active="activeMenuIndex"
                            class="el-menu-demo"
                            mode="horizontal"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#E6A23C">
                        <el-menu-item  index="/adminHome">学生管理</el-menu-item>
                        <el-submenu index="/adminHome/TeacherManager">
                            <template slot="title">教师管理</template>
                            <el-menu-item index="/adminHome/TeacherManager">信息管理</el-menu-item>
                            <el-menu-item index="/adminHome/TeacherManager/courseManager">课程总览</el-menu-item>
                        </el-submenu>
                        <el-menu-item  index="/adminHome/TestManager">实验总览</el-menu-item>
                        <el-menu-item  index="/adminHome/CommentManager">评论管理</el-menu-item>
                        <el-menu-item  index="/adminHome/ClassManager">班级管理</el-menu-item>
                    </el-menu>



                </el-col>
            </el-row>

        </el-header>
        <el-main>
            <el-row style="margin-top: 20px;">
                <el-col :span="18" :offset="3">
                    <el-card>
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="(item) in levelList"><i :class="item.meta.icon" style="margin-right: 5px;"></i>{{item.meta.title}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-card>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
                <el-col :span="18" :offset="3">
                    <el-card>
                       <router-view/>
                    </el-card>
                </el-col>

            </el-row>
        </el-main>

        <el-dialog
                title="密码修改"
                :visible.sync="passwordDialogVisible"
                width="25%"
                :before-close="handleClose">
            <el-form>
                <el-form-item>
                    <el-input v-model="oldPassword" prefix-icon="fa fa-key fa-fw" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="newPassword" prefix-icon="fas fa-key" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                 <el-button @click="passwordDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitChangeAction">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import StudentManager from "@/views/admin/StudentManager";

    export default {
        name: "AdminHome",
        data(){
            return{
                passwordDialogVisible:false,
                levelList:[],
                oldPassword:null,
                newPassword:null,
            }
        },
        methods:{
            submitChangeAction(){
                if(this.oldPassword == null && this.oldPassword == "" && this.newPassword == null && this.newPassword == ""){
                    this.$message.error("输入项不能为空");
                }

                this.$axios({
                    method:'post',
                    url:'/api/user/changeAdminPassword',
                    data:{
                        oldPassword:this.oldPassword,
                        newPassword:this.newPassword,
                    }
                }).then(response=>{
                    if(response.data){
                        this.$message.success("密码更改成功,下次登录记得使用新密码");
                    }else{
                        this.$message.error("旧密码输入错误")
                    }
                })
              this.passwordDialogVisible = false;
            },
            changePassword(){
               this.passwordDialogVisible = true;
            },

            safeExit(){
                sessionStorage.removeItem("adminLoginStatus");
                this.$router.push("/adminLogin");
            },
            getBreadcrumb() {
                let matched = this.$route.matched;
                this.levelList = matched;
            },
        },
        components:{
            StudentManager
        },
        created(){
            if(sessionStorage.getItem("adminLoginStatus") == null){
                this.$router.push("/adminLogin");
            }
            this.getBreadcrumb();
        },
        computed:{
            activeMenuIndex(){
                console.log("dfj k      " + this.$route.path)
                return this.$route.path
            }
        },
        watch:{
            $route(){
                this.getBreadcrumb()
            }
        },
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>