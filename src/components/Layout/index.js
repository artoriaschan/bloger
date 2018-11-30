import React, { Component } from 'react'
import { Layout, Avatar, Menu, Dropdown, Icon, Button } from 'antd';
import Register from '../Register'
import Login from '../Login'
import "./style.scss";

const { Header, Footer, Content } = Layout;

const loginMenu = (
  <Menu>
    <Menu.Item>
      <a href="###">退出</a>
    </Menu.Item>
  </Menu>
)

export default class ViewLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: false,
      username: "Artorias",
      registerVisible: false,
      loginVisible: false
    }
  }
  handleLogin = () => {
    this.setState(() => {
      return {
        loginVisible: true
      }
    })
  }
  handleRegister = () => {
    this.setState(() => {
      return {
        registerVisible: true
      }
    })
  }
  
  render() {
    return (
      <div className="layout">
        <Layout>
          <Header className="layout-header">
            <div className="layout-header__content">
              <Avatar className="logo" shape="square" size={63} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
              <Menu
                mode="horizontal"
                className="menu"
              >
                <Menu.Item key="index">
                  <Icon type="home" />首页
                </Menu.Item>
                <Menu.Item key="hotter">
                  <Icon type="fire" />热门
                </Menu.Item>
                <Menu.Item key="timeline">
                  <Icon type="star" />历程
                </Menu.Item>
                <Menu.Item key="commonts">
                  <Icon type="message" />留言
                </Menu.Item>
                <Menu.Item key="about">
                  <Icon type="robot" />关于
                </Menu.Item>
              </Menu>
              <div className="right">
                {this.state.isLogin ? (
                <Dropdown overlay={loginMenu}>
                  <div className="login-info">
                    <Avatar className="logo" shape="square" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                    <span style={{marginLeft:'5px'}}>{this.state.username}</span>
                  </div>
                </Dropdown>
                ) : (
                  <div className="login-btns">
                    <Button type="primary" onClick={this.handleLogin} style={{marginRight: '10px'}}>登录</Button>
                    <Button onClick={this.handleRegister}>注册</Button>
                    <Register visible={this.state.registerVisible} changeVisible={(val) => {
                      this.setState(() => {
                        return {
                          registerVisible: val
                        }
                      })
                    }}/>
                    <Login visible={this.state.loginVisible} changeVisible={(val) => {
                      this.setState(() => {
                        return {
                          loginVisible: val
                        }
                      })
                    }}/>
                  </div>
                )}
              </div>
            </div>
          </Header>
          <Content className="layout-content">
            Content
          </Content>
          <Footer className="layout-footer">
            1bitcode ©{new Date().getFullYear()} Created by ArtoriasChan
          </Footer>
        </Layout>
      </div>
    )
  }
}
