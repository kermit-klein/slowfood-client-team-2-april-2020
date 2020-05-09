import React, { Component } from "react";
import axios from "axios";
import { Tab } from "semantic-ui-react";

export class Menu extends Component {
  state = {
    menuList: [],
    message: {},
    orderId: "",
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

  addToOrder = async (event) => {
    let id = event.target.parentElement.dataset.id;
    let result;
    if (this.state.orderId !== "") {
      result = await axios.put(`/orders/${this.state.orderId}`, {
        menu_item: id,
      });
    } else {
      result = await axios.post("/orders", { menu_item: id });
    }
    this.setState({
      message: {
        id: id,
        message: result.data.message,
      },
      orderId: result.data.order_id,
    });
  };

  toHtml(list) {
    let listed = list.map((item) => {
      return (
        <div key={item.id} id={"menu-item-" + item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <button onClick={this.addToOrder}>Add to order</button>
          <p className="message">{this.state.message.message}</p>
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
            {this.toHtml(menuList.filter((item) => item.category === "1"))}
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Drinks",
        render: () => (
          <Tab.Pane>
            {this.toHtml(menuList.filter((item) => item.category === "2"))}
          </Tab.Pane>
        ),
      },
    ];

    return (
      <>
        <div id="menu">
          <Tab panes={panes} />
        </div>
        {this.state.orderId !== "" && <button>View order</button>}
      </>
    );
  }
}

export default Menu;
