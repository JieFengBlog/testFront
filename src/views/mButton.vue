<template>
    <div class="box" style="margin-top: 30px; cursor: pointer;">
        <div class="link link-miss">
            <span class="icon"></span>
            <a  class="button" data="My mission is clear">
                <span class="line line-top"></span>
                <span class="line line-right"></span>
                <span class="line line-bottom"></span>
                <span class="line line-left"></span>
                登 &nbsp;&nbsp;录
            </a>
        </div>
        <div class="tip">
            <em></em><span></span>
        </div>
    </div>
</template>

<script>



    export default {
        name: "mButton"
    }
</script>

<style scoped>
    .button {
        display:block; width:300px; height:40px; line-height: 40px; text-decoration: none; color:#2dcb70;
        font-family: Arial; font-weight: bolder; border:2px solid rgba(255,255,255,0.8);
        text-align: center;
        box-sizing:border-box;
        transition:0.4s ease;
        position: relative;
    }
    .button:hover {
        border:2px solid rgba(255,255,255,1);
        background-position: 140px center;
    }
    /*
    CSS3--Transition
      语法:transition:property duration timing-function delay;
      描述:
        transition-property:规定设置过渡效果的CSS属性的名称;
        transition-duration:规定完成过渡效果需要多少秒或毫秒;
        transition-timing-function:规定速度效果的速度曲线;
        transition-delay:定义过渡效果何时开始;
    CSS3--Transform
      transform属性向元素应用2D或3D转换;该属性允许我们对元素进行旋转/缩放/移动或倾斜;
    CSS3--box-sizing
      box-sizing属性允许以特定的方式定义匹配某个区域的特定元素;
      语法:box-sizing:content-box | border-box | inherit;
      描述:
        content-box:(默认值)宽度和高度分别应用到元素的内容框,在宽度和高度的基础上绘制元素的内边距和边框;
        border-box:为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制;
          通过已设定的宽度和高度分别减去边框和内边距才能得到内容的实际宽度和高度;
    */
    .button .line {
        position: absolute; background: none; transition:0.3s;
    }
    .button:hover .line {
        background: #fff;
    }

    .button .line-top {
        width:0px; height:2px; top:-2px; left:-110%;
    }
    .button:hover .line-top {
        width:180px; left:-2px;
    }

    .button .line-right {
        width:2px; height:0px; right:-2px; top:-110%;
    }
    .button:hover .line-right {
        height:40px; top:-2px;
    }

    .button .line-bottom {
        width:0px; height:2px; bottom:-2px; right:-110%;
    }
    .button:hover .line-bottom {
        width:180px; right:-2px;
    }

    .button .line-left {
        width:2px; height:0px; left:-2px; bottom:-110%;
    }
    .button:hover .line-left {
        height:40px; bottom:-2px;
    }
    .tip {
        position: absolute; padding: 0 14px; height:35px; line-height: 35px; background: #2dcb70;
        color:#fff; font-size: 18px; margin: 0 auto; border-radius: 3px; top:160px; opacity:0;
    }
    .tip em {
        font-style: normal; font-size: 18px; color:#fff;
    }
    .tip span {
        display: block; width:0; height:0; overflow: hidden; position: absolute; top:35px; left:50%;
        border:7px solid transparent; border-top-color:#2dcb70; margin-left: -3px;
    }
</style>