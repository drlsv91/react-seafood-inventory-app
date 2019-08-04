import React, { Component } from "react";
import { getFunName } from "../helpers";
import PropTypes from "prop-types";
class StorePicker extends Component {
  goToStore = e => {
    e.preventDefault();
    const storeId = this.storeInput.value;
    this.props.history.push(`/store/${storeId}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          ref={input => (this.storeInput = input)}
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store &#x2192;</button>
      </form>
    );
  }
}
StorePicker.propTypes = {
  history: PropTypes.object.isRequired
};
export default StorePicker;
