import React, { Component } from "react";
import { formatPrice } from "./../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
class Order extends Component {
  renderOrder = key => {
    const { order, fishes } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === "available";
    const removeButton = (
      <button onClick={() => this.props.removeOrder(key)}>&times;</button>
    );
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the fish is loaded before we continue!
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available{" "}
            {removeButton}
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            {removeButton}
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const { order, fishes } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((acc, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return acc + (count * fish.price || 0);
      }
      return acc;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>

        <TransitionGroup className="order" component="ul">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeOrder: PropTypes.func.isRequired
};

export default Order;
