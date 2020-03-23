import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Routes from "./routes";
import { bindActionCreators } from "redux";

import { setUserBrowserID } from "./modules/user";

// Cookies and browserID
import Cookies from "js-cookie";
import { uuid } from "uuidv4";

class App extends Component {

  componentDidMount = () => {

    let browserID = Cookies.get("browserID");

    if (browserID) {

      return this.props.setUserBrowserID(browserID);

    } else {

      let id = uuid();
      Cookies.set("browserID", id);

      return this.props.setUserBrowserID(id);

    }

  }

  render = () => {

    return(
      <Routes />
    );

  }

}

let mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators({ setUserBrowserID }, dispatch)
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(App)
);