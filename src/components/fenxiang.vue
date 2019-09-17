<template>
    <div v-show="showBar" style="z-index:1000;">
          <div style="z-index:1000;" class="fenxiang" @click="showPopup()">
            <img src="../assets/img/分享 拷贝.png" alt="">
          </div>
        <van-popup v-model="show">
            <img style="width:50%;height:50%;" :src="img" alt="">
            <span class="blod">长按二维码，保存图片分享好友一起查看</span>
        </van-popup>
    </div>
</template>
<script>
export default {
    props:["title"],
    data(){
        return{
            show:false,
            img:"",
            id:"",
            showBar:true
        }
      },methods:{
           showPopup() {
               this.show = true;
       },
       list(){
           var url="/getCode"
           var obj={url:this.title,id:this.id}
           this.axios.get(url,{params:obj}).then(result=>{
            this.img=result.data
           })
       }
    },
    created(){
       this.showBar=this.$store.state.show
        this.list()
    },watch:{

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
            bottom: 1.2rem;
            left: 0.3rem;
            width: 1.3rem;
            height:1.3rem;
            box-shadow:#B2B2B2 0 0 5px 1px;
            border-radius: 50%;
            z-index: 1000;
            img{
                width: 1.3rem;
                display: inline-block;
                justify-content: center;
                align-items: center

            }
          }
    .blod{
        font-size: 0.3rem;
        display: inline-block;
        position: fixed;
        top: 6.5rem;
        text-align: center;
    }
</style>