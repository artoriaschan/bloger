import React, { Component } from 'react'
import { Divider, Avatar } from 'antd'
import './style.scss'

export default class UserInfo extends Component {
  render() {
    return (
      <div className="user-info">
        <Avatar size={128} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div className="user-info_username">
          Artorias
        </div>
        <Divider style={{fontSize: "14px", color: "#b4b4b4"}}>个人介绍</Divider>
        <div className="user-info_description"> 
          加班到天明，学习到昏厥 ！！！ <br/> 微信公众号：【 BiaoChenXuYing 】 <br/> 分享 WEB 全栈开发等相关的技术文章，热点资源，全栈程序员的成长之路。
        </div>
      </div>
    )
  }
}
