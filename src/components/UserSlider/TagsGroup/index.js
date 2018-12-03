import React, { Component } from 'react'
import { Tag } from 'antd'
import './style.scss'

// 自定义标签无状态组件
function CustomTag(props){
  return (
    <Tag style={{margin: "2px"}} color={props.color}>{props.children}</Tag>
  )
}
export default class TagsGroup extends Component {
  render() {
    return (
      <div className="tags-group">
        <CustomTag color="#f50">浏览器</CustomTag>
        <CustomTag color="#2db7f5">浏览器内核</CustomTag>
        <CustomTag color="#87d068">React</CustomTag>
        <CustomTag color="#108ee9">Angular</CustomTag>
        <CustomTag color="#87d068">Deep Learning</CustomTag>
        <CustomTag color="#f50">MySQL</CustomTag>
        <CustomTag color="#2db7f5">MongoDB</CustomTag>
        <CustomTag color="#108ee9">Vue</CustomTag>
        <CustomTag color="#2db7f5">Golang</CustomTag>
        <CustomTag color="#f50">微服务</CustomTag>
        <CustomTag color="#87d068">Rust</CustomTag>
        <CustomTag color="#108ee9">Flutter</CustomTag>
      </div>
    )
  }
}
