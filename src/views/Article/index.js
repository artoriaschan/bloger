import React, { Component } from 'react'
import { Avatar, Icon, Divider, Button } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'

import './style.scss'
import CommentEditor from '../../components/CommentEditor'
import CommentList from '../../components/CommentsList'
import { getArticleDetail } from '../../apis/interfaces'
function CustomTag(props){
    return (
        <span>
            {props.children}
            <Divider type="vertical"/>
        </span>
    )
}
export default class Article extends Component {
    constructor(props){
        super(props)
        this.state = {
            article: {}
        }
    }
    getArticleId = () => {
        return this.props.match.params.articleId
    }
    handleGetDetailByArticleId = (articleId) => {
        getArticleDetail(articleId).then((res) => {
            const { code, data } = res.data
            if (code === 1) {
                this.setState({
                    article: data
                })
            }
        })
    }
    componentWillMount() {
		if (this.props.location.pathname === '/about') {

		} else {
			let articleId = this.getArticleId();
			this.handleGetDetailByArticleId(articleId);
		}
		// marked相关配置
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			},
		});
	}
    render() {
        const { article } = this.state
        return (
            <article className="article-detail">
                <div className="article-detail-title">
                    {article.title}
                </div>
                <div className="article-detail-meta clearfix">
                    <dl className="clearfix">
                        <dt className="article-detail-meta_avatar">
                            <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                        </dt>
                        <dd className="article-detail-meta_author clearfix">
                            <div className="author-article-info">
                                <p className="author-name">Artorias</p>
                                <p className="article-info">2018-11-25 17:59:39 字数 13567 阅读 303 评论 3 喜欢 6</p>
                            </div>
                            <div className="tags">
                                <Icon type="tags" />
                                <div className="tags-name">
                                    <CustomTag>Express</CustomTag>
                                    <CustomTag>Node</CustomTag>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div
                    id="content"
                    className="article-detail"
                    dangerouslySetInnerHTML={{
                        __html: article.content ? marked(article.content) : null,
                    }}
                >
                </div>
                <div className="like-btn">
                    <Button icon="heart" >喜欢</Button>
                </div>
                {/* <Divider>文章评论</Divider>
                <CommentEditor></CommentEditor>
                <div className="article-comments">
                    <Divider orientation="left">全部评论</Divider>
                    <CommentList></CommentList>
                </div> */}
            </article>
        )
    }
}
