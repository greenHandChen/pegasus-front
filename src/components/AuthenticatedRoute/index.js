import {Route} from 'dva/router';
import React from "react";
import {getStorage} from "../../utils/util";

export default class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: !getStorage('token')
    }
  }

  render() {
    const {path} = this.props;
    return (
      <Route path={path} render={(props) => {
        if (this.state.isLogin) {
          return <this.props.component {...props}/>
        }
        return <div>未登录</div>
      }}/>
    )
  }
}