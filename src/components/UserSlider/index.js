import React, { Component } from 'react'
import { Divider } from 'antd'
import UserInfo from './UserInfo'
import TagGroup from './TagsGroup'
export default class UserSlider extends Component {
  render() {
    return (
      <div>
        <UserInfo></UserInfo>
        <Divider>云标签</Divider>
        <TagGroup></TagGroup>
      </div>
    )
  }
}
