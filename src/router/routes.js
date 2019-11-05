import React from 'react'
import { Icon } from 'antd'

export default [
  {
    path: '/',
    exact: true,
    redirect: '/page/space'
  },
  {
    path: '/page',
    component: () => import('../pages/Layout'),
    models: () => [
      import('../models/layout')
    ],
    routes: [
      {
        title: '空间管理',
        icon: <Icon type="user" />,
        path: '/space',
        routes: [
          {
            title: '空间页面',
            exact: true,
            path: '/list',
            component: () => import('../pages/Space'),
            models: () => [
              import('../models/space')
            ]
          },
          {
            title: '商品页面',
            exact: true,
            path: '/commodity',
            component: () => import('../pages/Commodity'),
            models: () => [
              import('../models/commodity')
            ]
          },
        ]
      },
      {
        title: '公寓管理',
        icon: <Icon type="bar-chart" />,
        path: '/apartment',
        routes: [
          {
            title: '公寓列表',
            exact: true,
            path: '/list',
            component: () => import('../pages/Apartment'),
            models: () => [
              import('../models/apartment')
            ]
          }
        ]
      }
    ]
  }
]