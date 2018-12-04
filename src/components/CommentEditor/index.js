import React, { Component } from 'react'
import { Form, Button, Input } from 'antd'

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export default class CommentEditor extends Component {
    constructor(props){
        super(props)
        this.state = {
            value:'',
            submitting: false
        }
    }
    handleOnChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    handleOnSubmit = () => {
        if (!this.state.value) {
            return;
        }
    
        this.setState({
            submitting: true,
        });
    
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: ''
            });
        }, 1000);
    }
    render() {
        return (
        <div>
            <FormItem>
            <TextArea rows={4} onChange={this.handleOnChange} value={this.state.value} />
            </FormItem>
            <FormItem>
            <Button
                disabled={this.state.submitting}
                htmlType="submit"
                loading={this.state.submitting}
                onClick={this.handleOnSubmit}
                type="primary"
            >
                添加评论
            </Button>
            </FormItem>
        </div>
        )
    }
}
