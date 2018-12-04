import React, { Component } from 'react'
import { Layout, Avatar, Menu, Dropdown, Icon, Button, Divider } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'

import Register from '../Register'
import Login from '../Login'
import UserSlider from '../UserSlider'

import "./style.scss";

const { Header, Footer, Content } = Layout;

const loginMenu = (
  <Menu>
    <Menu.Item>
      <a href="###">退出</a>
    </Menu.Item>
  </Menu>
)

class ViewLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLogin: false,
      username: "Artorias",
      registerVisible: false,
      loginVisible: false,
      current: "index"  // 当前选定的标签页
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
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });

  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div className="layout">
        <Layout>
          <Header className="layout-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="layout-header__content">
              <Avatar className="logo" shape="square" size={63} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
              <Menu
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className="menu"
                onClick={this.handleClick}
              >
                <Menu.Item key="index">
                  <NavLink to="/">
                    <Icon type="home" />首页
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="hotter">
                  <NavLink to="/hotter">
                    <Icon type="fire" />热门
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="timeline">
                  <NavLink to="/timeline">
                    <Icon type="star" />历程
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="messages">
                  <NavLink to="/messages">
                    <Icon type="message" />留言
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="about">
                  <NavLink to="/about">
                    <Icon type="robot" />关于
                  </NavLink>
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
          <Layout className="layout-content">
            <Content>
              {this.props.children}
            </Content>
            <Divider type="vertical" style={{height: "auto"}}/>
            {
              (/^\/article/.test(this.props.location.pathname)) ? ("") : (<UserSlider></UserSlider>)
            }
          </Layout>
          <Footer className="layout-footer">
            1bitcode ©{new Date().getFullYear()} Created by ArtoriasChan
          </Footer>
        </Layout>
      </div>
    )
  }
}

export default withRouter(ViewLayout)