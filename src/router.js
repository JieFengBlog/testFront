import Vue from 'vue'
import Router from 'vue-router'
import Student from "@/views/role/Student";
import Teacher from "@/views/role/Teacher";
import Home from "@/Home";
import Login from "@/Login";
import CourseAdmin from "@/views/role/teacher/test/CourseAdmin";
import ViewTest from "@/views/role/teacher/test/ViewTest";
import AdminHome from "@/AdminHome";
import StudentManager from "@/views/admin/StudentManager";
import TeacherManager from "@/views/admin/TeacherManager";
import TestManager from "@/views/admin/TestManager";
import CommentManager from "@/views/admin/CommentManager";
import ClassManager from "@/views/admin/ClassManager";
import TeacherInfo from "@/views/admin/Teacher/TeacherInfo";
import CourseManager from "@/views/admin/Teacher/CourseManager";
import AdminLogin from "@/AdminLogin";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      component:Login
    },

      {
          path:'/adminLogin',
          component:AdminLogin
      },
      //admin
    {
      path:'/adminHome',
      component:AdminHome,
      meta:{
        title:'首页',
        icon:'fas fa-home',
      },
      children:[
        {
          path:"",
          component:StudentManager,
          meta:
              {
                index:'1',
                title:'学生管理',
                icon:'fas fa-user-graduate'
              }
        },
        {
          path:"teacherManager",
          component:TeacherManager,
          meta:
              {
                index:'2',
                title:'教师管理',
                icon:'fas fa-chalkboard-teacher'
              },
            children:[
                {path:"/",component:TeacherInfo,meta:{title:'个人信息',icon:'fas fa-info-circle'}},
                {path:"courseManager",component:CourseManager,meta:{title:'课程总览',icon:'fas fa-feather'}}
            ]
        },
        {
          path:"TestManager",
          component:TestManager,
          meta:
              {
                index:'3',
                title:'实验总览',
                icon:'fas fa-envelope-open-text'
              }
        },
        {
          path:"CommentManager",
          component:CommentManager,
          meta:
              {
                index:'4',
                title:'留言管理',
                icon:'fas fa-comment'
              }
        },
        {
          path:"ClassManager",
          component:ClassManager,
          meta:
              {
                index:'5',
                title:'班级管理',
                icon:'fas fa-igloo'
              }
        },

      ]
    },


    {
      path:'/',
      component:Home,
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'student',
          component:Student,
        },
        {
          path:'teacher',
          component:Teacher,
          children:[
            {path:"/",component:CourseAdmin},
            {path:"/teacher/viewTest",component:ViewTest},
          ]
        }
      ]
    }
  ]
})
