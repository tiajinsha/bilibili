<template>
    <div>
          <div class="fenxiang" @click="showPopup()">
            <img src="../../img/分享 拷贝.png" alt="">
          </div>
        <van-popup v-model="show">
            <img style="width:50%;height:50%;" src="../../img/p46201558.jpg" alt="">
        </van-popup>
    </div>
</template>
<script>
export default {
    data(){
        return{
            show:false
        }
    },methods:{
           showPopup() {
               this.show = true;
       },
    }
}
</script>
<style lang="scss" scoped>
.van-popup{
    width: 90% !important;
    height:8rem !important;
    border-radius: 12px !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
    .fenxiang{
            position: fixed;
            top: 15rem;
            left: 0.5rem;
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
</style>