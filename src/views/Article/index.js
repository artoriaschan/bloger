import React, { Component } from 'react'

export default class Article extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.articleId}
      </div>
    )
  }
}
