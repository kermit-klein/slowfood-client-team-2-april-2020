import React, { Component } from "react";
import axios from "axios";
import { Tab } from "semantic-ui-react";

export class Menu extends Component {
  state = {
    menuList: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/menu_items");
      this.setState({
        menuList: response.data.menu_items,
      });
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  toHtml(list) {
    let listed = list.map((item) => {
      return (
        <div id={"menu-item-" + item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      );
    });
    return listed;
  }

  render() {
    const menuList = this.state.menuList;
    const panes = [
      {
        menuItem: "Main Dish",
        render: () => (
          <Tab.Pane>
            {this.toHtml(menuList.filter((item) => item.category === "main_course"))}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Starters",
        render: () => (
          <Tab.Pane>
            {this.toHtml(menuList.filter((item) => item.category === "starter"))}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div id="menu" style={{"padding-top":"300px", "height":"100vh"}}>
        <Tab panes={panes} />
      </div>
    );
  }
}

export default Menu;
