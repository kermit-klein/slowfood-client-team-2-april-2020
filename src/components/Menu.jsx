import React, { Component } from "react";
import axios from "axios";

export class Menu extends Component {
  state = {
    menuList: [],
  };

  async componentDidMount() {  
    try {
      const response = await axios.get("/menu_items")
      this.setState({
        menuList:response.data.menu_items
      })
  } catch(error){
    console.log('Something went wrong')
  }
} 

  render() {
    const menuList = this.state.menuList;
    let menu;
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

    return <div id="menu">{menu}</div>;
  }
}

export default Menu;
