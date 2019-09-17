<template>
    <div class="introduce">
          <van-nav-bar title="建设内容" left-text="wad" fixed >
    <van-icon name="arrow-left
" slot="left"  @click="location" />
    </van-nav-bar>
        <div class="box1">
            <img :src="'http://js.vrccn.com/' + list.url" alt="">
            <div class="imgages position">
                <img src="../assets/img/u490 拷贝 4.png" alt="">
                <div class="texts position"><p>大大区间</p></div>
            </div>
            <div class="imgages1 position">
                <img src="../assets/img/u490 拷贝 4.png" alt="">
                <div class="texts1 position"><p>大学城南站</p></div>
            </div>
            <div class="imgages2 position">
                <img src="../assets/img/u490 拷贝 4.png" alt="">
                <div class="texts2 position"><p>出入场线</p></div>
            </div>
            <div class="imgages3 position">
                <img src="../assets/img/u490 拷贝 4.png" alt="">
                <div class="texts3 position"><p>大学城南停车场</p></div>
            </div>
        </div>
        <div class="introduce_next">
            <span style="font-wight:Bold">建设内容</span>
            <div v-html="list.info"></div>
            <img src="../assets/img/03258picfm4pv1nbpja23_pic2018-2.png" alt="">
        </div>
         <fenxiang title="#/introduce"></fenxiang>
             <abc></abc>
    </div>
</template>
<script>
/* import touchBar from '../components/tuchBar' */
import fenxiang from '../components/fenxiang'
import abc from '../components/text'
export default {
    data(){
        return{
            list:[]
        }

    },
    created(){
        this.msg()
    },
    methods:{
         location(){
               this.$router.go(-1)
        },
        msg(){
            var url="/getContent"
            this.axios.post(url).then(result=>{
                this.list=result.data.data
                })
            }
    },
    components:{
/*        touchBar, */
       fenxiang,
       abc 
    }  
}
</script>
<style lang="scss" scoped>
    .introduce{
        .box1{
            position: relative;
            img{
                width: 100%;
            }
            .position{
                position: absolute;
                color: #FFFFFF;
                font-weight: Bold;
                font-family: PingFang-SC-Bold;
                line-height: 0.5rem;
                width: 40%;
                text-align: center;
            }
            p{
                width:3rem; 
            }
            //1
          .imgages{
              top: 1rem;
              left: 1rem;
          .texts{
              top: 0.1rem;
              left: 0.5rem;
            }
          }
          //2
          .imgages1{
              top:3rem;
              left: 2.9rem;
              .texts1{
                  top: 0.1rem;
                  left: 0.5rem;
              }
          }//3
          .imgages2{
              top:5.5rem;
              left:4rem;
              .texts2{
                  top: 0.1rem;
                  left: 0.3rem;
            }
            }
             .imgages3{
              top:7.5rem;
              left:1rem;
              .texts3{
                  top: 0.1rem;
                  left: 0.5rem;
            }
            }
          
        }
        .introduce_next{
            width: 90%;
            margin: 0 auto;
            font-family: PingFang-SC-Bold;
            color: #333333;
            margin-top: 0.4rem;
            text-align: center;
            img{
                width: 100%;
            }
            span{
                font-size: 0.4rem;
                font-weight: bold;
                margin-bottom: 0.4rem;
            }
            div{
                color: #333333;
                margin-top: 0.4rem;
                text-align: left;
                text-indent:0.5rem;
                letter-spacing: 4px;
                line-height: 19px;
                font-size: 0.4rem;
                margin-bottom:0.5rem;
            }
        }
    }
</style>