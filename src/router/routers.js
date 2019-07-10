import Main from '@/components/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true, 
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/store',
    name: 'store',
    meta: {
      icon: 'ios-aperture-outline',
      title: '店铺管理'
    },
    component: Main,
    children: [
      {
        path: '/store/info',
        name: 'storeInfo',
        meta: {
          icon: 'md-person',
          title: '店铺信息'
        },
        component: () => import('@/view/single-page/store/store.vue')
      }
    ]
  },
  {
    path: '/recruit',
    name: 'recruit',
    meta: {
      icon: 'ios-person-add-outline',
      title: '招聘管理'
    },
    component: Main,
    children: [
      {
        path: '/recruit/list',
        name: 'recruitList',
        meta: {
          icon: 'ios-photos-outline',
          title: '招聘发布列表',
          notCache: true
        },
        component: () => import('@/view/single-page/recruit/list.vue')
      },
      {
        path: '/recruit/detail',
        name: 'recruitDetail',
        meta: {
          icon: 'ios-list-box-outline',
          notCache: true,
          hideInBread: false,
          hideInMenu: true,
          title: '招聘发布详情'
        },
        component: () => import('@/view/single-page/recruit/detail.vue')
      },
      {
        path: '/recruit/resume/list',
        name: 'resumeList',
        meta: {
          icon: 'ios-list-box-outline',
          notCache: true,
          hideInBread: false,
          hideInMenu: true,
          title: '已投递简历列表'
        },
        component: () => import('@/view/single-page/recruit/resume-list.vue')
      },
      {
        path: '/recruit/resume/detail',
        name: 'resumeDetail',
        meta: {
          icon: 'ios-list-box-outline',
          notCache: true,
          hideInBread: false,
          hideInMenu: true,
          title: '已投递简历详情'
        },
        component: () => import('@/view/single-page/recruit/resume.vue')
      },
      {
        path: '/recruit/add',
        name: 'recruitAdd',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '新增招聘'
        },
        component: () => import('@/view/single-page/recruit/add.vue')
      }
    ]
  },
  {
    path: '/sublet',
    name: 'sublet',
    meta: {
      icon: 'ios-ribbon-outline',
      title: '转店管理'
    },
    component: Main,
    children: [
      {
        path: '/sublet/list',
        name: 'subletList',
        meta: {
          icon: 'ios-paper-outline',
          title: '转店列表'
        },
        component: () => import('@/view/single-page/sublet/list.vue')
      },
      {
        path: '/sublet/detail',
        name: 'subletDetail',
        meta: {
          icon: 'ios-list-box-outline',
          notCache: true,
          hideInBread: false,
          hideInMenu: true,
          title: '转店详情'
        },
        component: () => import('@/view/single-page/sublet/detail.vue')
      },
      {
        path: '/sublet/add',
        name: 'subletAdd',
        meta: {
          icon: 'ios-add-circle-outline',
          title: '添加转店'
        },
        component: () => import('@/view/single-page/sublet/add.vue')
        // component: () => import('@/view/single-page/sublet/add-step.vue')
      }
    ]
  },
  {
    path: '/financial',
    name: 'financial',
    meta: {
      icon: 'ios-flower',
      title: '财务管理'
    },
    component: Main,
    children: [
      {
        path: '/financial/payment',
        name: 'paymentList',
        meta: {
          icon: 'ios-options-outline',
          title: '缴费记录'
        },
        component: () => import('@/view/single-page/financial/list.vue')
      }
    ]
  },
  {
    path: '/staff',
    name: 'staff',
    meta: {
      icon: 'ios-apps-outline',
      title: '排班管理'
    },
    component: Main,
    children: [
      {
        path: '/staff/staffList',
        name: 'staffList',
        meta: {
          icon: 'md-contact',
          title: '员工列表'
        },
        component: () => import('@/view/single-page/staff')
      },
      {
        path: '/staff/schedule',
        name: 'schedule',
        meta: {
          icon: 'ios-time-outline',
          title: '员工班次设置'
        },
        component: () => import('@/view/single-page/staff/schedule.vue')
      },
      {
        path: '/staff/settingSchedule',
        name: 'settingSchedule',
        meta: {
          icon: 'md-list-box',
          title: '排班管理'
        },
        component: () => import('@/view/single-page/staff/settingSchedule.vue')
      },
      {
        path: '/staff/setClock',
        name: 'setClock',
        meta: {
          icon: 'md-log-in',
          title: '打卡设置'
        },
        component: () => import('@/view/single-page/staff/setClock.vue')
      }
    ]
  },
  {
    path: '/coupon',
    name: 'coupon',
    meta: {
      icon: 'ios-pricetags-outline',
      title: '购物券管理'
    },
    component: Main,
    children: [
      {
        path: '/coupon/list',
        name: 'list',
        meta: {
          icon: 'ios-pricetag-outline',
          title: '购物券管理'
        },
        component: () => import('@/view/single-page/coupon/list')
      }
    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      icon: 'ios-pie-outline',
      title: '数据统计管理'
    },
    component: Main,
    children: [
      {
        path: '/statistics/index',
        name: 'statistics',
        meta: {
          icon: 'ios-pie-outline',
          title: '数据统计'
        },
        component: () => import('@/view/single-page/statistics')
      },
      {
        path: '/statistics/recruitment',
        name: 'recruitment',
        meta: {
          icon: 'ios-podium-outline',
          title: '招聘数据统计'
        },
        component: () => import('@/view/single-page/statistics/recruitment')
      },
      {
        path: '/statistics/transferShop',
        name: 'transferShop',
        meta: {
          icon: 'ios-podium-outline',
          title: '转店数据统计'
        },
        component: () => import('@/view/single-page/statistics/transferShop')
      },
    ]
  },
  {
    path: '/resource',
    name: 'resource',
    meta: {
      icon: 'ios-leaf-outline',
      title: '资源管理'
    },
    component: Main,
    children: [
      {
        path: '/resource/index',
        name: 'resourceIndex',
        meta: {
          icon: 'ios-leaf-outline',
          title: '资源管理'
        },
        component: () => import('@/view/single-page/resource/index')
      },
    ]
  },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
