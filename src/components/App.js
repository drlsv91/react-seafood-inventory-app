import React, { Component } from "react";
import base from "../base";
import PropTypes from "prop-types";
import Header from "./header";
import Order from "./order";
import Inventory from "./inventory";
import Fish from "./fish";
import fishes from "../sample-fishes";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };
  componentWillMount() {
    const ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: `fishes`
    });
    const localStorageRef = localStorage.getItem(
      `order-${this.props.match.params.storeId}`
    );
    if (localStorageRef) {
      //update app component's order state
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentWillUpdate(nextProps, nextState) {
    //store object in local storage
    localStorage.setItem(
      `order-${this.props.match.params.storeId}`,
      JSON.stringify(nextState.order)
    );
    // console.log({ nextProps, nextState });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: fishes });
  };
  addToOrder = fish => {
    const order = { ...this.state.order };
    order[fish] = order[fish] + 1 || 1;
    this.setState({ order });
  };

  addFish = fish => {
    //get the fish copy
    const fishes = { ...this.state.fishes };
    const timeStamp = Date.now();
    fishes[`fish${timeStamp}`] = fish;
    //update the fish state
    this.setState({ fishes });
  };
  updateFish = (key, updatedfish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedfish;
    this.setState({ fishes });
  };
  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };
  removeOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Sea Food Market" />
          <ul className="list-of-fish">
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                details={this.state.fishes[fish]}
                index={fish}
                key={fish}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          params={this.props.match.params}
          fishes={this.state.fishes}
          order={this.state.order}
          removeOrder={this.removeOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFish={this.loadSampleFishes}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}
App.propTypes = {
  match: PropTypes.object.isRequired
};

export default App;
