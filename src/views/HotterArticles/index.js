import React, { Component } from 'react'

import ArticleItem from '../../components/ArticleItem'
export default class HotterArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles:[1,2,3,4,5,6,7,8,9,10]
    }
  }
  render() {
    return (
      <div className="articles-list">
      {
        this.state.articles.map(element => (
          <ArticleItem key={element}></ArticleItem>
        ))
      }
      </div>
    )
  }
}
