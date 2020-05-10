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
    const MainContent = () => {
      return (      
        <Switch>
          <Route exact path="/" component={About}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/menu" component={MyMenu}></Route>
          <Route exact path="/checkout" component={Checkout}></Route>
        </Switch>
      )
    }
    return (
      <Router>
        <div>
          <NavBar
            onFormChange={ this.onFormChange }
            authenticated={ this.state.authenticated }
          />
          <MySidebar
            visible={ this.state.form !== "none" }
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
