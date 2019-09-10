<template>
<div class="box_hidden">
    <div class="text">
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
    </div>
        <div class="d1" @click="show = !show">
            <transition>
            <div v-show="!show">
            <router-link to="/">
                <p>首页</p>
            </router-link>
                </div>
            </transition>
            <div><img src="../../img/主页绿.png" alt=""></div>
        </div>
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
.box_hidden{
        overflow: hidden;
        top: 3.4rem;
        position: fixed;
        left: 4.5rem;
        width: 5.2rem;
        z-index: 1000;
    .text{
        width:5.4rem;;
        overflow-y: scroll;
        height: 11.5rem;
        .v-enter-active{
         /*   transition: opacity .5s; */
         transition: all .3s ease;
        }
        .v-leave-active {
         transition: all .3s ease;
           /* transition: opacity .5s; */
        }
        .v-enter, .v-leave-to{
         transform: translateY(300px);
          opacity: 0;
        }
        ul{
             white-space: nowrap;
            list-style: none;
            li{
            height: 1.9rem;
            display: flex;
            justify-content: space-between;
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
                margin-right:0.55rem;
            img{
                width: 1.3rem;
            }
            }
            }
        }
    }
    .d1{
        margin-bottom: 0.1rem;
        width:100%;
        height: 1.3rem;
        display: flex;
        /* justify-content: space-between; */
        position: fixed;
        top: 15rem;
        div{
            width: 45%;
            height:1.3rem;
        }
        div:nth-child(1){
                margin-left:0.1rem;
                border-radius: 5px;
                background: #FFFFFF;
                box-shadow:#B2B2B2 0 0 5px 1px;
                text-align: center;
                width: 3rem;
                p{
                    line-height: -15px;
                    margin-top:0.3rem;
                    font-size: 0.4rem;
                    font-weight: bold;
                }
        }
        div:nth-child(2){
                width: 1.3rem;
                box-shadow:#B2B2B2 0 0 5px 1px;
                border-radius: 50%;
                position: fixed;
                right: 0.75rem;
            img{
                width: 1.3rem;
            }
        }
    }
}
</style>