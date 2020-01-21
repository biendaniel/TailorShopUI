import React from "react";
import "../styles/AddDimensionsPage.css";
import { Redirect } from "react-router-dom";
import axios from "axios";

class AddDimensionsPage extends React.Component {
  state = {
    information: "",
    dimensionsName: "",
    collarSize: 0,
    chestSize: 0,
    sleeveLength: 0,
    waistSize: 0,
    shoulderWidth: 0,
    legLength: 0,
    legWidth: 0
  };

  handleDimensionsName = e => {
    if (e.target.value.length < 3) {
      this.setState({
        information: "Nazwa powinna mieć przynajmniej 3 znaki"
      });
    } else {
      this.setState({
        information: ""
      });
    }
    this.setState({
      dimensionsName: e.target.value
    });
  };

  checkIfValueIsNegative = e => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
  };

  handleCollarSize = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      collarSize: e.target.value
    });
  };

  handleChestSize = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      chestSize: e.target.value
    });
  };

  handleSleeveLength = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      sleeveLength: e.target.value
    });
  };

  handleWaistSize = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      waistSize: e.target.value
    });
  };

  handleShoulderWidth = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      shoulderWidth: e.target.value
    });
  };

  handleLegLength = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      legLength: e.target.value
    });
  };

  handleLegWidth = e => {
    this.checkIfValueIsNegative(e);
    this.setState({
      legWidth: e.target.value
    });
  };

  sendDimensionsToServer = () => {
    const obj = {
      name: this.state.dimensionsName,
      collarSize: this.state.collarSize,
      chestSize: this.state.chestSize,
      sleeveLength: this.state.sleeveLength,
      waistSize: this.state.waistSize,
      shoulderWidth: this.state.shoulderWidth,
      legLength: this.state.legLength,
      legWidth: this.state.legWidth
    };

    console.log(JSON.stringify(obj));

    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    axios
      .post(
        `http://localhost:8181/customers/${localStorage.getItem(
          "customerId"
        )}/dimensions`,
        JSON.stringify(obj),
        config
      )
      .then(response => {
        if (response.status === 200) {
          console.log(obj);
          this.setState({
            information: "Dodano!"
          });
        } else {
          this.setState({
            information: "Coś poszło nie tak!"
          });
        }
      });
  };

  handleClickAdd = e => {
    console.log("bylem tu");
    e.preventDefault();
    if (this.state.dimensionsName.length < 3 && this.state.collarSize < 1) {
      this.setState({
        information: "Podaj prawidłowy rozmiar i nazwę."
      });
    } else {
      this.setState({
        information: "dodano;"
      });
      this.sendDimensionsToServer();
    }
  };

  render() {
    return (
      <div className="App">
        <form>
          <ul className="dimensions-form">
            <li>
              <label htmlFor="dimensionsName">
                Nazwa:
                <input
                  type="text"
                  id="dimensionsName"
                  value={this.state.dimensionsName}
                  onChange={this.handleDimensionsName}
                  name="dimensionsName"
                />
              </label>
            </li>
            <label htmlFor="collarSize">
              Rozmiar kołnierzyka:
              <input
                type="number"
                id="collarSize"
                value={this.state.collarSize}
                onChange={this.handleCollarSize}
                name="collarSize"
              />
            </label>
            <li>
              {" "}
              <label htmlFor="chestSize">
                Rozmiar klatki piersiowej:
                <input
                  type="number"
                  id="chestSize"
                  value={this.state.chestSize}
                  onChange={this.handleChestSize}
                  name="chestSize"
                />
              </label>
            </li>
            <li>
              {" "}
              <label htmlFor="sleeveLength">
                Długość rękawa:
                <input
                  type="number"
                  id="sleeveLength"
                  value={this.state.sleeveLength}
                  onChange={this.handleSleeveLength}
                  name="sleeveLength"
                />
              </label>
            </li>
            <li>
              {" "}
              <label htmlFor="waistSize">
                Rozmiar pasa:
                <input
                  type="number"
                  id="waistSize"
                  value={this.state.waistSize}
                  onChange={this.handleWaistSize}
                  name="waistSize"
                />
              </label>
            </li>
            <li>
              {" "}
              <label htmlFor="shoulderWidth">
                Szerokość ramion:
                <input
                  type="number"
                  id="shoulderWidth"
                  value={this.state.shoulderWidth}
                  onChange={this.handleShoulderWidth}
                  name="shoulderWidth"
                />
              </label>
            </li>
            <li>
              {" "}
              <label htmlFor="legLength">
                Długość nogawki:
                <input
                  type="number"
                  id="legLength"
                  value={this.state.legLength}
                  onChange={this.handleLegLength}
                  name="legLength"
                />
              </label>
            </li>
            <li>
              {" "}
              <label htmlFor="legWidth">
                Szerokość nogawki:
                <input
                  type="number"
                  id="legWidth"
                  value={this.state.legWidth}
                  onChange={this.handleLegWidth}
                  name="legWidth"
                />
              </label>
            </li>
            <li>
              <label style={{ color: "red" }}>{this.state.information}</label>
            </li>
            <li>
              <button onClick={this.handleClickAdd}>Dodaj</button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default AddDimensionsPage;
