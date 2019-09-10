import Vue from "vue"
import axios from "axios"
/* axios.defaults.withCredentials=true */
axios.defaults.baseURL="http://js.vrccn.com/api/wap"
Vue.prototype.axios=axios 
