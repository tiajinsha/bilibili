import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import peopleMsg from './views/peopleMsg'
import Construction from './views/Construction'
import Exhibition from './views/Exhibition'
import introduce from './views/introduce'
import fenxiang from './components/fenxiang'
import text from './components/text'
import scoll from './components/scoll'
import Equipment from './views/Equipment'
import eqMsg from './views/eqMsg'
import News from './views/News'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/peopleMsg',
      name: 'peopleMsg',
      component: peopleMsg
    },
    {
      path: '/Construction',
      name: 'Construction',
      component: Construction
    }
    ,
    {
      path: '/Exhibition',
      name: 'Exhibition',
      component: Exhibition
    }
    ,
    {
      path: '/introduce',
      name: 'introduce',
      component: introduce
    }
    ,
    {
      path: '/fenxiang',
      name: 'fenxiang',
      component: fenxiang
    },
    {
      path: '/text',
      name: 'text',
      component: text,
    },
    {
      path: '/scoll',
      name: 'scoll',
      component: scoll,
    },
    {
      path: '/Equipment',
      name: 'Equipment',
      component: Equipment
    },
    {
      path: '/eqMsg',
      name: 'eqMsg',
      component: eqMsg
    },
    {
      path: '/News',
      name: 'News',
      component: News
    }
  ],
  linkActiveClass: 'active',
})
