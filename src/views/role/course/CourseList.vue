<template>
    <div class="container">
        <div class="course" v-for="(item,index) in courseList" :key="index">
            <div  style="float: left;">
                《{{item.name}}》
            </div>
            <div style="float: right;">
                {{item.teacher}}
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "CourseList",
        data(){
            return{
                courseList:[
                    {name:"计算机组成原理",teacher:"任艳"},
                    {name:"TCP/IP",teacher:"侯慧玲"},
                    {name:"数据结构",teacher:"梅艳芳"},
                    {name:"操作系统",teacher:"李艳玲"}
                ]
            }
        }
    }
</script>

<style scoped>
    .course{
        cursor:pointer;
        text-align: center;
        font-size: 15px;
        border-bottom: 1px solid #eee;
        padding: 20px;
        margin-top: 20px;
    }
    .course:hover{
        font-size: 16px;
        color: #409EFF;
    }
</style>
