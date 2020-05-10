import React, { Component } from 'react'
import { Menu, ButtonGroup, Button, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom"

class NavBar extends Component {
  render() {
    const logButton = () => {
      if ( !this.props.authenticated ) {
        return (
          <Button
            style={{ "height": "90px", "width": "90px"}}
            id="signup"
            onClick={() => this.props.onFormChange()}
          >
            Sign up
            <br />
            or
            <br />
            Login
          </Button>
        )
      } else {
        return (
          <Button id="logout-btn">Logout {JSON.parse(sessionStorage.getItem("credentials")).uid}</Button>
        )
        
      }
    }

    return (
      <div>
        <Menu
          as="menu"
          fixed="top"
          inverted
          color="black"
          style={{marginBottom:"95px"}}
        >
          <Header 
            inverted 
            style={{ fontFamily: "Allura", fontSize:"72px", paddingTop:"15px", marginBottom:"-15px"}}
          >
            InstaFood
          </Header>
          <Menu.Menu position="right">
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
              id="checkout"
              to="/checkout"
            >
              Checkout
            </Button>
            <Button.Group
              vertical
              secondary
            >
            {logButton()}
            </Button.Group>
            </ButtonGroup>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default NavBar;
