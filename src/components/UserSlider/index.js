import React, { Component } from 'react'
import { Divider,Layout } from 'antd'
import UserInfo from './UserInfo'
import TagGroup from './TagsGroup'

const { Sider } = Layout;

export default class UserSlider extends Component {
  render() {
    return (
      <Sider width="320" style={{backgroundColor: "#ffffff",paddingBottom: "30px"}}>
        <UserInfo></UserInfo>
        <Divider>云标签</Divider>
        <TagGroup></TagGroup>
      </Sider>
    )
  }
}
