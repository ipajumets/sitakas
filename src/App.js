import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Routes from "./routes";

class App extends Component {

  render = () => {

    return(
      <Routes />
    );

  }

}

export default withRouter(
  connect(null, null)(App)
);