import React, { Component } from "react";
import Menu from "./components/Menu";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    message: "",
    sidebar: false,
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
          <Menu />
        </div>
        {renderLogin}
      </>
    );
  }
}

export default App;
