import React, { Component } from "react";
import {
  Menu,
  Segment,
  Sidebar,
  Form,
  Label,
  Header,
  Divider,
} from "semantic-ui-react";

class LoginForm extends Component {
  state = {
    visible: true,
  };
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          direction="right"
          visible={this.props.sidebar}
          width="wide"
        >
          <Menu.Item as="a">
            <Header inverted>Login</Header>
            <Form id="login-form" onSubmit={this.props.submitFormHandler}>
              <Label inverted>Email</Label>
              <input name="email" type="email" id="login-email"></input>
              <Label inverted>Password</Label>
              <input
                name="password"
                type="password"
                id="login-password"
              ></input>
              <button id="login-submit">Submit</button>
            </Form>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <div style={{ height: "90vh" }}></div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default LoginForm;
