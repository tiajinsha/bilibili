<template>
    <div>
          <div class="fenxiang" @click="showPopup()">
            <img src="../../img/分享 拷贝.png" alt="">
          </div>
        <van-popup v-model="show">
            <img style="width:50%;height:50%;" :src="img" alt="">
        </van-popup>
    </div>
</template>
<script>
export default {
    data(){
        return{
            show:false,
            img:"",
            id:""
        }
      },methods:{
           showPopup() {
               this.show = true;
       },
       list(){
           this.id=this.$store.state.msg
           var url="/getCode"
           var obj={url:"#/fenxiangNew",id:this.id}
           this.axios.get(url,{params:obj}).then(result=>{
            this.img=result.data
              console.log(result)
           })
       }
    },
    created(){
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
            bottom: 1.5rem;
            left: 0.1rem;
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