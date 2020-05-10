import React, { Component } from 'react'
import { Menu, Segment, Sidebar, Form, Label, Header, Divider} from 'semantic-ui-react'
import NavBar from "./NavBar"

class MySidebar extends Component {
  state= {
    visible: this.props.visible
  }

  componentDidUpdate(){
    if (this.state.visible !== this.props.visible) 
    this.setState({ visible: this.props.visible })
  }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          // onHide={() => this.setState({visible: true})}
          vertical
          direction="right"
          visible={this.state.visible}
          width='wide'
          styling={{"padding-top": "140px"}}
        >
          <div styling={{"height": "440px"}}><br /><br /><br /><br /><br /></div>
          <Menu.Item as={Form}>

            <Header inverted>Login</Header>
            <Form id="login-form" onSubmit={this.props.submitFormHandler}>
              <Label>Email</Label>
              <input name="email" type="email" id="email"></input>
              <Label>Password</Label>
              <input name="password" type="password" id="password"></input>
              <button id="submit">Submit</button>
            </Form>
          </Menu.Item>
          <Divider horizontal inverted>or</Divider>
          <Menu.Item as={Form}>
          <Header inverted>Register</Header>
            <Form id="login-form" onSubmit={this.props.submitFormHandler}>
              <Label>Email</Label>
              <input name="email" type="email" id="email"></input>
              <Label>Password</Label>
              <input name="password" type="password" id="password"></input>
              <button id="submit">Submit</button>
            </Form>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.visible} >
        <div style={{"height":"100vh"}}></div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default MySidebar;