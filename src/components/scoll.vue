<template>
    <div class="elem">
        <div class="d1"></div>
        <div class="box">
           <!--  // -->
           <router-link v-for="(elem,i) of data" :key="i" :to="elem.to">
            <div v-if="i==0 || i%2==0" class="img_left">
                <div class="title">
                           <img :src="elem.img"  alt="">
                           <span>{{elem.msg}}</span>
                </div>
                <img src="../assets/img/b75a3b592b4fe86522c32e31486d7f6.png" alt="">
                <i></i> 
            </div>
           <div v-else class="img_right">
                <i></i>
                <img class="img1" src="../assets/img/b75a3b592b4fe86522c32e31486d7f6.png" alt="">
                <div class="title">
                    <span>{{elem.msg}}</span>
                       <img :src="elem.img"  alt="">
                </div>
            </div> 
           </router-link>
           <!-- ======================================================== -->
           <!-- :to="{name:'News',params:{id:item.id}}" -->
            <router-link  v-for="(item,index) of list" :key="'travel'+index"  :to="`/News?id=${item.id}`">
           <div v-if="index==0 || index%2==0" class="img_left">
                <div class="title">
                          <img :src="'http://js.vrccn.com/'+ item.url" alt="">
                            <span>{{item.name}}</span>
                </div>
                <img src="../assets/img/b75a3b592b4fe86522c32e31486d7f6.png" alt="">
                <i></i> 
            </div>
            <div v-else class="img_right">
                <i></i>
                <img class="img1" src="../assets/img/b75a3b592b4fe86522c32e31486d7f6.png" alt="">
                <div class="title">
                    <span>{{item.name}}</span>
                       <img :src="'http://js.vrccn.com/'+ item.url"  alt="">
                </div>
            </div>    
           </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:[
                {img:require('../assets/img/团队建设.png'),msg:"项目总体介绍",to:'/Construction'},
                {img:require('../assets/img/建设.png'),msg:"建设内容",to:"/introduce"},
                {img:require('../assets/img/组织.png'),msg:"组织架构",to:"/Equipment"},
                {img:require('../assets/img/党.png'),msg:"党建引领",to:"/Exhibition"},
                {img:require('../assets/img/设备.png'),msg:"主要设备信息",to:"/eqMsg"},
                {img:require('../assets/img/团队建设.png'),msg:"主要人员信息",to:"/peopleMsg"}
            ],
            list:[]
    }
  },
  created(){
      this.msg()
  },
  methods:{
      msg(){
          var url="/getHome"
          this.axios.post(url).then(result=>{
             this.list=result.data.data
          })
      }
  }
}
</script>
<style lang="scss" scoped>
img{
    width:45%;
}
.d1{
    position: fixed;
    left:calc(50% - 1px);
    width: 2px;
    height:100vh;
    background: #01589F;
} 
.elem{
    width: 90%;
    margin:  0 auto;
    height:12rem;
    position: relative;
    top:4.6rem;
    overflow-y: hidden;
    //窗口高度
    .box{
        width: 100%;
        height: 12rem;
        position: absolute;
        top: 0px;
        overflow-y: auto;
        overflow-x: hidden;
        div:last-child{
            margin-bottom: 0.5rem;
        }
    }

}
/* 滑块 */
/* ===========左=========== */
.img_left{
 /*    width: 4.8rem; */
    height: 1rem;
    position: relative;
    margin-top: 1rem;
    i{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background: white;
        display: inline-block;
        margin-bottom: 0.3rem;
        margin-left: 0.35rem;
        border:2px solid #01589F;
    }
    .title{
        width: 80%;
        height: 1rem;
        position: absolute;
        display: flex;
        justify-content: space-between;
        img{
           width: 0.6rem;
            height: 0.6rem;
            margin-top: 0.2rem;
            margin-left: 0.2rem;
        }
        span{
            display: inline-block;
            width: 2.8rem;
            height:1rem;
            font-size: 0.4rem;
            text-align: center;
            color: white;
            line-height: 1rem;
            text-align: center;
            display: inline-block;
            margin-right: 3.7rem;
        }
    }
    img{
       width: 4rem;
         height: 1rem;
    }
}
/* =======================右======================== */
.img_right{
   /*  width:4.7rem; */
    height: 1rem;
    position: relative;
    left: 4.2rem;
  margin-top: 0.6rem;
    .img1{
        height:1rem;
        width: 3.8rem;
        transform:rotate(180deg) ;
        margin-left: 10px;
    }
    i{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background: white;
        display: inline-block;
        margin-bottom: 0.3rem;
        margin-left: 0.15rem;
        border:2px solid #01589F;
    }
    .title{
        width: 4.8rem;
        height: 1rem;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        img{
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0.4rem;
        }
        span{
            width: 3rem;
        margin-left: 1.1rem;
        font-size: 0.4rem;
        color: white;
        text-align: center;
        }
    }
 
}
</style>
