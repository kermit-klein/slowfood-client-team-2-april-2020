import React, { Component } from 'react'
import { Menu, ButtonGroup, Button, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom"

class NavBar extends Component {
  render() {
    return (
      <div>
        <Menu
          as="menu"
          fixed="top"
          inverted
          color="black"
          style={{"margin-bottom":"95px"}}
        >
          <Header 
            inverted 
            style={{ "font-family": "Allura", "font-size":"72px", "padding-top":"15px", "margin-bottom":"-15px"}}
          >
            InstaFood
          </Header>
          <Menu.Menu position="right" stackable>
            <ButtonGroup color="black">
            <Button
              as={Link}
              to="/about"
              id="about"
              size="big"
            >
              About us
            </Button>
            <Button
              as={Link}
              id="menu"
              to="/menu"
              size="big"
            >
              Menu
            </Button>
            <Button
              as={Link}
              size="big"
              id="Checkout"
              to="/checkout"
            >
              Checkout
            </Button>
            <Button.Group
              vertical
              secondary
            >
            <Button
              style={{ "height": "90px", "width": "90px"}}
              id="signup"
              onClick={() => this.props.onFormChange("signup")}
            >
              Sign up
              <br />
              {"or"}
              <br />
              Login
            </Button>
            </Button.Group>
            </ButtonGroup>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBar;
