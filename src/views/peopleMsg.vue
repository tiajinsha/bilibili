<template>
    <div class="peopleTitle">
    <van-nav-bar title="主要人员信息" left-text="wad" fixed >
    <van-icon name="cross" slot="left"  @click="location" />
    </van-nav-bar>
        <div v-for="(elem,i) of list" :key="i" class="item">
            <div  class="item1">
                <div>
                    <p>{{elem.name}}</p>
                    <p>{{elem.phone}}</p>
                    <p>{{elem.job}}</p>
                </div>
                <div :style="{backgroundImage:`url(http://js.vrccn.com/${elem.url})`}"></div>
            </div>
            <div class="item2">
                <img src="../assets/img/手机.png" alt="">
                <span>{{elem.phone}}</span>
            </div>
            <div class="item2">
                <img src="../assets/img/邮箱.png" alt="">
                <span>{{elem.email}}</span>
            </div>
            <div class="item2">
                <img src="../assets/img/公司名称.png" alt="">
                <span>{{elem.gs}}</span>
            </div>
            <div class="item2">
                <img src="../assets/img/地址.png" alt="">
                <span>{{elem.info}}</span>
            </div>
        </div>
        <!-- 引入子组件 -->
        <abc></abc>
    </div>
</template>
<script>
/* import touchBar from '../components/tuchBar' */
import fenxiang from '../components/fenxiang'
import abc from '../components/text'
export default {
    data(){
        return {
            list:[]
        }
        
    },
    created(){
        this.msg()
    },
    methods:{
         location(){
               this.$router.push("/")
        },
        msg(){
           var url="/getStaff"
           this.axios.post(url).then(result=>{
               this.list=result.data.data
           })
       }
    },
    components:{
     /*   touchBar, */
       fenxiang,
       abc 
    }
}
</script>
<style lang="scss" scoped>
.peopleTitle{
    .item:nth-child(2){
        margin-top:1.4rem;
    }
} 
    .item{
        width: 90%;
        height: 8.5rem;
        margin: 0 auto;
        box-shadow:#B2B2B2 0 0 5px 1px;
        margin-top:0.5rem;
        margin-bottom:0.5rem;
        border-radius: 5px;
        .item2:last-child{
            border-bottom: none;
        }
         .item2{
        width: 90%;
        height: 1.45rem;
        margin:  0  auto;
        border-bottom: 1px solid rgba(238,238,238,1);
            img{
                width: 0.5rem;
                height: 0.6rem;
                margin-top: 0.5rem;
            }
            span{
                font-size: 0.4rem;
                margin-left: 0.5rem;
                color: #333333;
            }
        }
    }
    .item:nth-child(1){
        margin-top:1.6rem;
    }
    .item1{
        display: flex;
        justify-content: space-between;
        div{
            margin-top: 0.5rem;
        }
        div:nth-child(1){
            p:nth-child(1){
                font-family: PingFang-SC-Bold;
                color:#333333;
                font-size: 0.5rem;
                font-weight: bold;
                margin-bottom: 0.2rem;
            }
            p:nth-child(2), p:nth-child(3),.item2{
                font-family: PingFang-SC-Regular;
                font-weight: Regular;
                color:#333333;
                font-size: 0.3rem;
            }
            width: 200px;
            height: 2rem;
            margin-left: 0.4rem;
        }
        div:nth-child(2){
            width:2rem;
            height: 2rem;
            background:rgba(237,237,237,1);
            border-radius:50%;
            margin-right:0.4rem;
            background-size: cover;

        }

    }
</style>