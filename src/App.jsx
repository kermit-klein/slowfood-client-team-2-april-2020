import React, { Component } from "react";
import MyMenu from "./components/MyMenu";
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
    return (
      <>
        <div>
          <NavBar
            onFormChange={ this.onFormChange }
            authenticated={ this.state.authenticated }
          />
          <MySidebar
            visible={ this.state.form !== "none" }
            children={(
              <MyMenu />
            )}
          />
        </div>
      </>
    );
  }
}

export default App;
