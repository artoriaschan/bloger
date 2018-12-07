import React from 'react'
import Loadable from "react-loadable"

let config = [
    {
        name: '/',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('../views/Articles/index.js'),
            loading: () => <div />
        })
    },
    {
        name: '/hotter',
        path: '/hotter',
        exact: true,
        component: Loadable({
            loader: () => import('../views/HotterArticles/index.js'),
            loading: () => <div />
        })
    },
    // {
    //     name: '/timeline',
    //     path: '/timeline',
    //     exact: true,
    //     component: Loadable({
    //         loader: () => import('../views/MyTimeline/index.js'),
    //         loading: () => <div />
    //     })
    // },
    // {
    //     name: '/messages',
    //     path: '/messages',
    //     exact: true,
    //     component: Loadable({
    //         loader: () => import('../views/Messages/index.js'),
    //         loading: () => <div />
    //     })
    // },
    {
        name: '/about',
        path: '/about',
        exact: true,
        component: Loadable({
            loader: () => import('../views/AboutMe/index.js'),
            loading: () => <div />
        })
    },
    {
        name: '/article',
        path: '/article/:articleId',
        exact: true,
        component: Loadable({
            loader: () => import('../views/Article/index.js'),
            loading: () => <div />
        }) 
    }
]
export default config