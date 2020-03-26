import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Routes from "./routes";
import { bindActionCreators } from "redux";
import firebase from "firebase";

import { setUserBrowserID } from "./modules/user";

// Cookies and browserID
import Cookies from "js-cookie";
import { uuid } from "uuidv4";

let firebaseConfig = {
  apiKey: "AIzaSyCm3Mc9Dh0zEeUkSZ-qXrOCaPmfszSDqm0",
  authDomain: "sitaratas-47089.firebaseapp.com",
  databaseURL: "https://sitaratas-47089.firebaseio.com",
  projectId: "sitaratas-47089",
  storageBucket: "sitaratas-47089.appspot.com",
  messagingSenderId: "123382092310",
  appId: "1:123382092310:web:97a7b71d7f1f4f16075b37",
  measurementId: "G-DVD436K83Z",
};

class App extends Component {

  componentDidMount = () => {

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

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