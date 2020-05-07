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

  render() {
    const menuList = this.state.menuList;
    let menuMainDish;
    let menuDrinks;
    if (menuList.length > 0) {
      menu = menuList.map((item) => {
        return (
          <>
            <div id={"menu-item-" + item.id}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          </>
        );
      });
    }

    const panes = [
      {
        menuItem: "Main Dish",
        render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
      },
      { menuItem: "Drinks", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    ];

    return (
      <div id="menu">
        <Tab panes={panes} />
      </div>
    );
  }
}

export default Menu;
