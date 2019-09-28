import React from "react";
import Drawer from '../../../components/Drawer'

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
    return (
      <Drawer
        title={this.state.title}
        onRefDrawer={this.onRefDrawer}
      >

      </Drawer>
    )
  }

}