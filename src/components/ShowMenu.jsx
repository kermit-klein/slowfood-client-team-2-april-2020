import React, { Component } from "react";
import axios from "axios";

export class ShowMenu extends Component {
  state = {
    menuList: [],
  };

  componentDidMount() {
    axios.get("/menu_data").then((response) => {
      this.setState({
        menuList: response.data.products,
      });
    });
  }

  render() {
    const menuList = this.state.menuList;
    let menu;
    if (menuList.length > 0) {
      menu = menuList.map((k) => {
        return (
          <>
            <div id={"menuitem-" + k.id}>
              <p>{k.name}</p>
              <p>{k.description}</p>
              <p>{k.price}</p>
            </div>
          </>
        );
      });
    }

    return <div id="menu">{menu}</div>;
  }
}

export default ShowMenu;
