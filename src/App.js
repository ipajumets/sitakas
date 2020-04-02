import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import firebase from "firebase";
import Routes from "./routes";

import { setUserBrowserID } from "./modules/user";
import { setSocket } from "./modules/socket";

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

    let socket = io("https://www.sitaratas.eu:5000/"),
      browserID = Cookies.get("browserID");

    return this.props.setSocket(socket)
      .then(_ => {
        if (browserID) {

          return this.props.setUserBrowserID(browserID);
    
        } else {
    
          let id = uuid();
    
          Cookies.set("browserID", id, { expires: 365 });  
    
          return this.props.setUserBrowserID(id);
    
        }
      });

  }

  render = () => {

    return(
      <Routes />
    );

  }

}

let mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators({ setSocket, setUserBrowserID }, dispatch)
  }
}

export default withRouter(
  connect(null, mapDispatchToProps)(App)
);