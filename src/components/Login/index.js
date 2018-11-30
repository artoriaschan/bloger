import React, { Component } from 'react'
import { Modal, Button, Form, Input} from 'antd'
import { Notification } from '../../utils'

const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: {span: 20, offset: 2},
};
class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState(() => {
                    return {
                        loading: true
                    }
                })
                this.props.submit(values).then((val) => {
                    this.setState(() => {
                        return {
                            loading: false
                        }
                    })
                })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请填写正确的邮箱',
                        }, {
                            required: true, message: '请填写邮箱',
                        }],
                    })(
                        <Input size="large" placeholder="请输入邮箱"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码',}],
                    })(
                        <Input size="large" type="password" placeholder="请输入密码"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}} loading={this.state.loading}>登 录</Button>
                    <Button onClick={this.props.cancel}>取 消</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrapperdLoginForm = Form.create()(LoginForm);

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    handleCancel = () => {
        this.handleClose()
    }
    
    handleOK = (values) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
                this.handleClose()
                Notification.openNotificationWithIcon('success', '登陆成功', '恭喜登陆成功')
            },1000)
        })
    }

    handleClose = () => {
      this.props.changeVisible(false)
    }

    render() {
        return (
            <Modal
                title="登录"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
            >
                <WrapperdLoginForm submit={this.handleOK} cancel={this.handleCancel}/>
            </Modal>
        )
    }
}