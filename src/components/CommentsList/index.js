import React, { Component } from 'react'
import { Comment, Avatar } from 'antd'

const CustomComment = ({ children }) => (
  <Comment
    actions={[<span>回复</span>]}
    author={<a href="###">Han Solo</a>}
    avatar={(
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    )}
    content={<p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>}
  >
    {children}
  </Comment>
);
export default class CommentsList extends Component {
  render() {
    return (
      <div>
        <CustomComment>
          <CustomComment />
          <CustomComment />
        </CustomComment>
      </div>
    )
  }
}
