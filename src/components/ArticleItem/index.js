import React, { Component } from 'react'
import {Icon, Divider} from 'antd'
import { Link } from 'react-router-dom'
import './style.scss'
export default class ArticleItem extends Component {
  render() {
    return (
        <div className="article">
            <dl className="article-item clearfix">
                <dt className="article-item_left">
                    <p className="article-item_left__title">
                        <Link to={`/article/${'53102b43bf1044ed8b0ba36b'}`}>
                            服务器小白的我,是如何将node+mongodb项目部署在服务器上并进行性能优化的
                        </Link>
                    </p>
                    <p className="article-item_left__content">
                        本文讲解的是：做为前端开发人员，对服务器的了解还是小白的我，是如何一步步将 node+mongodb 项目部署在阿里云 centos 7.3 的服务器上，并进行性能优化，达到页面 1 秒内看到 loading ，3 秒内看到首屏内容的。
                    </p>
                    <div className="article-status">
                        <span>
                            <Icon type="eye" style={{marginRight: '2px'}}/>
                            275
                        </span>
                        <span>
                            <Icon type="message" style={{marginRight: '2px'}} />
                            2
                        </span>
                        <span>
                            <Icon type="heart" style={{marginRight: '2px'}} />
                            6
                        </span>
                        <span>
                            2018-11-25 
                        </span>
                    </div>
                </dt>
                <dd className="article-item_right">
                    <Link to={`/article/${'53102b43bf1044ed8b0ba36b'}`}>
                        <img src="http://iph.href.lu/125x100?text=图片占位" alt="服务器小白的我,是如何将node+mongodb项目部署在服务器上并进行性能优化的"/>
                    </Link>
                </dd>
            </dl>
            <Divider></Divider>
        </div>
    )
  }
}
