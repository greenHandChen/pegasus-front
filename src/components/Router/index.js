import React from "react";
import Switch from './Switch';
import Route from './Route';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      menu,
      activeKey
    } = this.props;

    return (
      <Switch
        tabKey={menu.path}
        activeKey
      >
        <Route path={menu.path} component={menu.component}/>
      </Switch>
    );
  }
}