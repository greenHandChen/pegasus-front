import React from "react";
import {Modal} from "antd";

export default class WrapperModal extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRefModal(this);
    this.state = {
      okText: '确定',
      cancelText: '取消',
      keyboard: true,// 支持ESC关闭
      destroyOnClose: true,// 关闭MODAL时销毁子元素
      maskClosable: false,// 点击蒙层不关闭MODAL
      visible: false
    }
  }

  onOk = () => {
    const {onOk} = this.props;

    if (typeof onOk === 'function') {
      onOk();
    }

    this.handleCloseModal();
  }

  handleOpenModal = () => {
    this.setState({
      ...this.state,
      visible: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      ...this.state,
      visible: false
    });
  }

  render() {
    const {
      title,
      width,
      zIndex,
      modalContent
    } = this.props;

    return (
      <Modal
        {...this.state}
        centered
        title={title}
        zIndex={zIndex}
        width={width}
        onCancel={this.handleCloseModal}
        onOk={this.onOk}
      >
        {modalContent}
      </Modal>
    )
  }
}