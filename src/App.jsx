import React, { Component } from "react";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import NavBar from "./components/NavBar"
import MySidebar from "./components/MySidebar";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    message: "",
    form: "none"
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormChange = (form) => {
    if (this.state.form == form) {
      this.setState( {form: "none"} )
    } else {
      this.setState({ form })
    }
  }

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() =>
                this.setState({ renderLoginForm: !this.state.renderLoginForm })
              }
            >
              Login
            </button>
            <p id="message">{message}</p>
            <LoginForm
              submitFormHandler={this.onLogin}
              sidebarP={this.state.renderLoginForm}
            />
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
    }

    return (
      <>
        <div>
          <NavBar
            onFormChange={ this.onFormChange }
            authenticated={ this.state.authenticated}
          />
          <MySidebar
            visible={ this.state.form !== "none" }
            style={{ "float":"right"}}
          />
          <div style={{"padding-top":"300px"}}></div>
          <div id="menu" style={{"margin-left":"40px"}}>
            <Menu />
          </div>
        </div>
        {this.state.form}
      </>
    );
  }
}

export default App;
