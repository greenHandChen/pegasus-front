import React from "react";
import Drawer from '../../../components/Drawer';
import {Form,Input,Row} from 'antd';

@Form.create({name: 'roleForm'})
export default class RoleDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRoleDrawer(this);
    this.state = {
      title: null
    };
  }

  onRefDrawer = drawer => {
    this.onRefDrawer = drawer;
  }

  handleOpenDrawer = options => {
    this.onRefDrawer.handleOpenDrawer();
    this.setState({
      ...this.state,
      ...options
    });
  }

  render() {
    const {
      form: {getFieldDecorator}
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
    };

    const content = (
      <Form {...formItemLayout}>
          <Form.Item label="菜单类型">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请选择菜单类型!',
                },
              ]
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="菜单类型">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请选择菜单类型!',
                },
              ]
            })(<Input/>)}
          </Form.Item>

      </Form>
    );

    return (
      <Drawer
        title={this.state.title}
        onRefDrawer={this.onRefDrawer}
        content={content}
      >

      </Drawer>
    )
  }

}