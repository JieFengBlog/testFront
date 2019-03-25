<template>
    <div id="home">
        <div style="height: 100vh; background: #3366CC">
            <div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 64px; )">
                <el-row style="width: 100%">
                    <el-col :span="14" :offset="5" style=" height: 64px;  line-height: 64px">
                        <div style="float: left; font-size: 22px; color: #fff;">
                            长治学院计算机系实验教学平台
                        </div>
                        <div style="float: right; margin-top: 10px; color: #FFF;">
                            当前登录用户:&nbsp;&nbsp;
                            <el-dropdown style="line-height: 20px;" @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <strong>{{name}}&nbsp;</strong><i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  command="logout" >退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>

                    </el-col>
                </el-row>
            </div>

            <!--Container-->
            <div style="margin-top: 30px;padding-bottom: 70px;">
                <router-view/>
            </div>
            <div style=" position:fixed; bottom: 0px; width: 100%; min-height: 80px; ">
                <div class="m-footer">
                <span>版权所有:长治学院 地址：山西省长治市保宁门东街73号 邮编：046011<br/>
                院办电话：0355-2178421 　技术维护：网络信息中心 联系我们：czxywlzx@163.com   晋ICP备16006961号-1 晋公网安备14040202000083号</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Student from "@/views/role/Student";
    import Teacher from "@/views/role/Teacher";

    export default {
        name: "Home",
        components:{
          Student,
            Teacher
        },
        data(){
            return {
                name:'',
                input:'',
                activeName: 'second'
            }
        },
        methods: {
            logout(){
                this.$store.commit("SIGN_OUT");
                this.checkLoginStatus();
            },
            checkLoginStatus(){
                if(!this.$store.getters.isLogin)
                    this.$router.push("/login")
            },
            handleCommand(command) {
                this[command]()
            },
        },
        created() {
            this.checkLoginStatus();
            this.name = sessionStorage.getItem("name");
            console.log("isLogin: " + sessionStorage.getItem("isLogin"));
        }
    }
</script>

<style >
    #home{
        height: 100vh;
    }
    #home .m_login_btn{
        color: #fff;
        border: 1px solid #fff;
        background-color: transparent;
        transition: background-color  0.2s;
    }
    #home .m_login_btn:hover{
        color: #2c98e3;
        background-color: #fff;
        border-color: #fff;
    }

    .m-footer{
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 13px;
        color: #fff;
    }

    .m-footer span{
        display: inline-block;
        vertical-align: middle;
        line-height: 22px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #FFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
