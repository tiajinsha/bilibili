<template>
<div class="box_hidden">
    <div   class="text">
        <ul >
            <transition>
            <ul v-show="!show">
            <router-link to="/Construction">
            <li>
                <div>
                    <p>项目总体介绍</p>
                </div>
                <div>
                     <img src="../../img/项目 (1).png" alt="">
                </div>
            </li>
            </router-link>
            <router-link to="/introduce">
            <li>
                 <div>  <p>建设内容</p></div>
                <div><img src="../../img/建设.png" alt=""></div>
            </li>
            </router-link>
            <router-link to="/Equipment">
            <li>
                 <div><p>组织架构</p></div>
                <div><img src="../../img/组织.png" alt=""></div>
            </li>
            </router-link>
            <router-link to="/Exhibition">
            <li>
                 <div><p>党建引领</p></div>
                <div><img src="../../img/党.png" alt=""></div>
            </li>
            </router-link>
            <router-link to="/eqMsg">
            <li>
                 <div><p>主要设备信息</p></div>
                <div><img src="../../img/设备.png" alt=""></div>
            </li>
            </router-link>
            <router-link to="/peopleMsg">
            <li>
                 <div><p>主要人员信息</p></div>
                <div><img src="../../img/团队建设.png" alt=""></div>
            </li>
            </router-link>
            </ul>
            </transition>
            <li style="margin-top:3px;">
                <div class="yinchang"><p>首页</p></div>
                <div @click="show = !show"><img src="../../img/主页绿.png" alt=""></div>
            </li>
        </ul>
    </div>
       <!--  <div class="d1">
            <div @click="show = !show"><img src="../../img/主页绿.png" alt=""></div>
        </div>  -->
</div>
</template>
<script>
export default {
    data(){
        return{
            show:true
        }
    },
    methods:{
        
    },
    mounted(){
        this.show=true 
    }
}
</script>
<style lang="scss" scoped>
.v-enter{
     opacity: 0;
     transform: translateX(100%);
   }
      .v-leave-to{
     opacity: 0;
     transform: translateX(100%);
   }
   .v-enter-active, 
   .v-leave-active{
     transition: all 0.5s ease;
   }
.box_hidden{
        position: fixed;
        left: 4.9rem;
        width: 5rem;
        z-index: 1000;
        bottom: 1rem;
    .text{
        width:5rem;;
        overflow-y: scroll;
        ul{
             white-space: nowrap;
            list-style: none;
            :first-child li{
                margin-top: 5px;
            }
            li{
            height: 1.9rem;
            display: flex;
            justify-content: space-between;
            .yinchang{
               opacity: 0 !important;
            }
            div{
                width: 3rem;
                text-align: center;
                height:1.3rem;
            }
            div:nth-child(1){
                margin-left: 0.1rem;
                border-radius: 5px;
                background: #FFFFFF;
                box-shadow:#B2B2B2 0 0 5px 1px;
                p{
                    line-height:0.7rem;
                    margin-top:0.3rem;
                    font-size: 0.4rem;
                    font-weight: bold;
                }
            }
            div:nth-child(2){
                width: 1.3rem;
                box-shadow:#B2B2B2 0 0 5px 1px;
                border-radius: 50%;
                margin-right:0.1rem;
            img{
                width: 1.3rem;
            }
            }
            }
        }
    }
    .d1{
         position: fixed;
            bottom: 1rem;
            right: 0.2rem;
            width: 1.3rem;
            height:1.3rem;
            box-shadow:#B2B2B2 0 0 5px 1px;
            border-radius: 50%;
            img{
                width: 1.3rem;
                display: inline-block;
                justify-content: center;
                align-items: center

            }
    }
}
</style>