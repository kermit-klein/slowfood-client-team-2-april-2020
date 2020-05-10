import React, { Component } from "react";
import MyMenu from "./components/MyMenu";
import { authenticate } from "./modules/auth";
import NavBar from "./components/NavBar"
import MySidebar from "./components/MySidebar";
import About from "./components/About"
import Checkout from "./components/Checkout"
import { Switch, Route, BrowserRouter as Router} from "react-router-dom"

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    message: "",
    loginMessage: "",
    sidebar: false
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

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormChange = () => {
      this.setState( {sidebar: !this.state.sidebar} )
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar
            onFormChange={ this.onFormChange }
            authenticated={ this.state.authenticated }
          />
          <MySidebar
            visible={ this.state.sidebar }
            submitFormHandler={this.onLogin }
            message={ this.state.loginMessage }
            children={(
            <Switch>
              <Route exact path="/" component={About}></Route>
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/menu" component={MyMenu}></Route>
              <Route exact path="/checkout" component={Checkout}></Route>
            </Switch>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
