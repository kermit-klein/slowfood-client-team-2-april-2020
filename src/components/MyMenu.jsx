import React, { Component, createRef } from "react";
import axios from "axios";
import { Tab, Segment, Header, Image, Ref, Button } from "semantic-ui-react";
import yemek from "../images/yemek.png";

export class MyMenu extends Component {
  state = {
    menuList: [],
    message: {},
    orderDetails: {},
    showOrder: false,
    orderTotal: "",
  };

  contextRef = createRef();

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
    let id = event.target.dataset.id;
    let result;
    if (
      this.state.orderDetails.hasOwnProperty("id") &&
      this.state.orderDetails.finalized === false
    ) {
      result = await axios.put(`/orders/${this.state.orderDetails.id}`, {
        menu_item: id, // user: JSON.parse(sessionStorage.getItem("credentials")).uid || {},
      });
    } else {
      result = await axios.post("/orders", {
        menu_item: id, // user: JSON.parse(sessionStorage.getItem("credentials")).uid || {},
      });
    }
    this.setState({
      message: {
        id: id,
        message: result.data.message,
      },
      orderDetails: result.data.order,
    });
  };

  toHtml(list) {
    let listed = list.map((item) => {
      return (
        <div
          key={item.id}
          style={{ width: "100%" }}
          id={"menu-item-" + item.id}
          style={{ borderBottom: "grey solid 1px" }}
        >
          <div
            style={{ width: "80%", display: "inline-block", marginTop: "10px" }}
          >
            <Header>{item.name}</Header>
            <p>{item.description}</p>
          </div>
          <div
            style={{
              width: "20%",
              verticalAlign: "center",
              display: "inline-block",
            }}
          >
            <h4 style={{ display: "inline", marginTop: "", fontSize: "20px" }}>
              {item.price}:-
            </h4>
            <Button
              color="blue"
              size="tiny"
              data-id={item.id}
              onClick={this.addToOrder}
            >
              Add to order
            </Button>
          </div>
        </div>
      );
    });
    return listed;
  }

  finalizeOrder = async () => {
    let orderTotal = this.state.orderDetails.order_total;
    let result = await axios.put(`orders/${this.state.orderDetails.id}`, {
      activity: "finalize",
    });
    debugger;
    this.setState({
      message: { id: 0, message: result.data.message },
      orderTotal: orderTotal,
      orderDetails: {},
    });
  };

  render() {
    const menuList = this.state.menuList;
    let orderDetailsDisplay;
    let categories = [
      "Starters",
      "Main Courses",
      "Desserts",
      "Drinks",
      "Extras",
    ];
    let categoriesSnake = [
      "starter",
      "main_course",
      "desserts",
      "drinks",
      "extras",
    ];
    const panes = [];
    categories.forEach((category, index) => {
      panes.push({
        menuItem: category,
        render: () => (
          <Tab.Pane>
            {this.toHtml(
              menuList.filter(
                (item) => item.category === categoriesSnake[index]
              )
            )}
          </Tab.Pane>
        ),
      });
    });

    if (this.state.orderDetails.hasOwnProperty("menu_items")) {
      orderDetailsDisplay = this.state.orderDetails.menu_items.map((item) => {
        return (
          <p
            key={item.name}
            style={{ fontSize: "18px" }}
          >{`${item.amount} x ${item.name}`}</p>
        );
      });
    } else {
      orderDetailsDisplay = "Nothing to see";
    }

    return (
      <>
        <Image src={yemek} style={{ paddingTop: "98px" }} centered />
        <Segment
          name="menu-segment"
          style={{
            width: "88vw",
            marginTop: "50px",
            marginLeft: "6vw",
            backgroundColor: "lightblue",
          }}
        >
          {this.state.showOrder && (
            <>
              <ul id="order-details" style={{ textAlign: "center" }}>
                {orderDetailsDisplay}
              </ul>

              <strong>
                <p
                  id="total-amount"
                  style={{ fontSize: "22px", textAlign: "center" }}
                >
                  {" "}
                  To pay:{" "}
                  {this.state.orderDetails.order_total ||
                    this.state.orderTotal}{" "}
                  kr
                </p>
              </strong>
              <Button color="green" onClick={this.finalizeOrder}>
                Confirm!
              </Button>
            </>
          )}
          {this.state.orderDetails.hasOwnProperty("menu_items") && (
            <>
              <Button
                onClick={() =>
                  this.setState({ showOrder: !this.state.showOrder })
                }
              >
                View order
              </Button>
              <p className="message">{this.state.message.message}</p>
            </>
          )}
          {this.state.message.id === 0 && (
            <h2 className="message">{this.state.message.message}</h2>
          )}
          <Ref innerRef={this.contextRef}>
            <>
              <div id="menu" style={{ minHeight: "95vh", width: "100%" }}>
                <Tab panes={panes} />
              </div>
            </>
          </Ref>
        </Segment>
      </>
    );
  }
}

export default MyMenu;
