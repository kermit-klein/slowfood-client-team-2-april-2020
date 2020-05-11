import React, { Component } from "react";
import MyMenu from "./components/MyMenu";
import { authenticate, register, logOut } from "./modules/auth";
import NavBar from "./components/NavBar";
import MySidebar from "./components/MySidebar";
import About from "./components/About";
import Checkout from "./components/Checkout";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    message: "",
    loginMessage: "",
    sidebar: false,
    orderDetails: {},
    showOrder: false,
    orderTotal: "",
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true, sidebar: false });
    } else {
      this.setState({ loginMessage: response.message });
    }
  };

  onRegister = async (e) => {
    e.preventDefault();
    const response = await register(
      e.target.email.value,
      e.target.password.value,
      e.target.password_confirmation.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true, sidebar: false });
    } else {
      this.setState({ loginMessage: response.message });
    }
  };

  onLogOut = async (e) => {
    console.log(e);
    const response = await logOut();
    if (!response.authenticated) {
      this.setState({ authenticated: false, sidebar: true });
    } else {
      this.setState({ loginMessage: response.message });
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormChange = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  render() {
    return (
      <Router>
        <div>
          <NavBar
            onFormChange={this.onFormChange}
            authenticated={this.state.authenticated}
            logOutHandler={this.onLogOut}
          />
          <MySidebar
            visible={this.state.sidebar}
            submitFormHandler={this.onLogin}
            registerFormHandler={this.onRegister}
            message={this.state.loginMessage}
            children={
              <Switch>
                <Route exact path="/" component={About}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/menu" component={MyMenu}></Route>
                <Route exact path="/checkout" component={Checkout}></Route>
              </Switch>
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;
