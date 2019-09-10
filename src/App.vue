<template>
  <div id="app">
    <transition mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
</template>
<script>
/* window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize(); */
export default {
  data(){
      return{
        title:""
      }
  },watch:{
    }
}
  
</script>
<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
    .van-nav-bar{
      background: #ffffff !important;
    }
    .van-nav-bar__left, .van-nav-bar__right{
      font-size: 19px !important;
    }
    .van-nav-bar .van-icon{
      color: #000000 !important;
      
    }
  #app{
      margin-top: 40px; 
 /*   .v-enter{
     opacity: 0;
     transform: translateX(100%);
   }
      .v-leave-to{
     opacity: 0;
     transform: translateX(-100%);
     position: absolute;
   }
   .v-enter-active, 
   .v-leave-active{
     transition: all 0.5s ease;
   } */
    } 
</style>
