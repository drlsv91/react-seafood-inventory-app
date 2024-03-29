import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends Component {
  render() {
    const { details, index, addToOrder } = this.props;
    const isAvailable = details.status === "available";
    const buttonText = isAvailable ? "Add To Order" : "Sold Out";
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => addToOrder(index)} disabled={!isAvailable}>
          {buttonText}
        </button>
      </li>
    );
  }
}
Fish.propTypes = {
  addToOrder: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired
};

export default Fish;
