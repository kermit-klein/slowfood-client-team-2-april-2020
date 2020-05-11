import React, { Component } from "react";
import {
  Menu,
  Button,
  Sidebar,
  Form,
  Label,
  Header,
  Divider,
} from "semantic-ui-react";

class MySidebar extends Component {
  state = {
    visible: this.props.visible,
  };

  componentDidUpdate() {
    if (this.state.visible !== this.props.visible)
      this.setState({ visible: this.props.visible });
  }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          // onHide={() => this.setState({visible: true})}
          vertical
          direction="right"
          visible={this.state.visible}
          width="wide"
          style={{ paddingTop: "95px", overflow: "hidden" }}
        >
          <Header inverted id="login-message">
            {this.props.message}
          </Header>
          <Menu.Item>
            <Header inverted>Login</Header>
            <Form id="login-form" onSubmit={this.props.submitFormHandler}>
              <Label style={{ marginBottom: "5px" }}>Email</Label>
              <input name="email" type="email" id="email"></input>
              <Label style={{ marginBottom: "5px", marginTop: "5px" }}>
                Password
              </Label>
              <input name="password" type="password" id="password"></input>
              <Button
                style={{ marginTop: "5px" }}
                inverted
                color="teal"
                id="submit"
              >
                Submit
              </Button>
            </Form>
          </Menu.Item>
          <Divider horizontal inverted>
            or
          </Divider>
          <Menu.Item>
            <Header inverted>Register</Header>
            <Form id="register-form" onSubmit={this.props.registerFormHandler}>
              <Label style={{ marginBottom: "5px" }}>Email</Label>
              <input name="email" type="email" id="email"></input>
              <Label style={{ marginBottom: "5px", marginTop: "5px" }}>
                Password
              </Label>
              <input name="password" type="password" id="password"></input>
              <Label style={{ marginBottom: "5px", marginTop: "5px" }}>
                Password Confirmation
              </Label>
              <input
                name="password_confirmation"
                type="password"
                id="password-confirmation"
              ></input>
              <Button
                style={{ marginTop: "5px" }}
                inverted
                color="teal"
                id="submit"
              >
                Submit
              </Button>
            </Form>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher
          dimmed={this.state.visible}
          onClick={() => this.setState({ visible: false })}
        >
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default MySidebar;
