import React, { Component } from 'react'
import { Modal, Button, Form, Input} from 'antd';
import { Rule, Notification } from '../../utils'
import { register } from '../../apis/interfaces'
const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: {span: 20, offset: 2},
};
// 注册表单
class RegistrationForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致');
        } else {
            callback();
        }
    }
    checkMobileNumber = (rule, value, callback) => {
        if(value !== undefined && !Rule.isMobilePhone(value)) {
            callback('请输入正确的手机号');
        }else{
            callback();
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
                    console.log(val)
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
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名',}],
                    })(
                        <Input size="large" placeholder="请输入用户名"/>
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
                    {getFieldDecorator('repassword', {
                        rules: [{
                            required: true, message: '请再次输入密码',
                        },{
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input size="large" type="password" placeholder="请再次输入密码"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    {getFieldDecorator('mobile', {
                        rules: [{validator: this.checkMobileNumber}],
                    })(
                        <Input size="large" placeholder="请输入手机号(可选填)"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}} loading={this.state.loading}>注 册</Button>
                    <Button onClick={this.props.cancel}>取 消</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleCancel = () => {
        this.handleClose()
    }
    handleOk = (values) => {
        return new Promise((resolve, reject) => {
            register(values).then((res) => {
                resolve(res.data)
                this.handleClose()
                let code = res.data.code
                let message = res.data.message
                Notification.openNotificationWithIcon(code === 1 ? 'success' : 'error', message , message)
            })
        })
    }
    handleClose = () => {
        this.props.changeVisible(false)
    }
    render() {
        return (
            <Modal
                title="注册"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
            >
                <WrappedRegistrationForm submit={this.handleOk} cancel={this.handleCancel}/>
            </Modal>
        )
    }
}
