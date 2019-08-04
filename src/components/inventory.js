import React, { Component } from "react";
import AddFishForm from "./addFishForm";
import PropTypes from "prop-types";
import base, { firebaseApp } from "../base";
import firebase from "firebase";
class Inventory extends Component {
  state = {
    uid: null,
    owner: null
  };
  handleChange = (e, key) => {
    const fish = this.props.fishes[key];
    const updatedFish = { ...fish, [e.target.name]: e.target.value };

    this.props.updateFish(key, updatedFish);
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // 1 .Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging out!");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  // authenticate = provider => {
  //   base.AuthWithOAuthPopup(provider, this.autHandler);
  // };
  // autHandler = (err, authData) => {
  //   console.log(authData);
  // };
  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate("Github")}>
          Log In With Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate("Facebook")}
        >
          Log In With Facebook
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate("Twitter")}
        >
          Log In With Twitter
        </button>
      </nav>
    );
  };

  renderInventory = key => {
    const { fishes } = this.props;
    const fish = fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input
          name="name"
          type="text"
          placeholder="Fish Name"
          value={fish.name}
          onChange={e => this.handleChange(e, key)}
        />
        <input
          name="price"
          type="text"
          placeholder="Fish Price"
          value={fish.price}
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          value={fish.status}
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          name="image"
          type="text"
          placeholder="Fish Image"
          value={fish.image}
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
      </div>
    );
  };
  render() {
    const { fishes, addFish, loadSampleFish } = this.props;
    const logOut = <button onClick={this.logout}>Log Out!</button>;
    //check if logged in
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }
    //check owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store!!</p> {logOut}
        </div>
      );
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logOut}
        {Object.keys(fishes).map(this.renderInventory)}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFish}>Load Sample Fishes</button>
      </div>
    );
  }
}
Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSampleFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired
};
export default Inventory;
