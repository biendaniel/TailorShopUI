import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CreateClothesPage extends React.Component {
  state = {
    productTypes: [],
    selectedProductTypeId: localStorage.getItem("selectedProductTypeId"),
    selectedClothesStyleId: localStorage.getItem("selectedClothesStyleId"),
    selectedTextileId: localStorage.getItem("selectedTextileId"),
    message: ""
  };

  componentDidMount() {
    this.getProductTypesFromServer();
  }

  getProductTypesFromServer() {
    axios
      .get("http://localhost:8181/products/types")
      .then(res => {
        const productTypes = res.data;
        this.setState({
          productTypes: [{ value: "0", name: "Rodzaj produktu:" }].concat(
            productTypes
          )
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClickSendButton = e => {
    e.preventDefault();
    if (this.state.selectedTextileId == null) {
      this.setState({
        message: "Wybierz tkaninę."
      });
    }
    if (this.state.selectedClothesStyleId == null) {
      this.setState({
        message: "Wybierz fason."
      });
    }
    if (
      this.state.selectedProductTypeId == null ||
      this.state.selectedProductTypeId === "Rodzaj produktu:"
    ) {
      this.setState({
        message: "Wybierz rodzaj produktu."
      });
    } else {
      this.sendClothesToServer();
    }
  };

  sendClothesToServer = () => {
    const obj = {
      comments: "komentarz....",
      clothesStyle: { id: this.state.selectedClothesStyleId },
      textile: { id: this.state.selectedTextileId },
      productType: { id: this.state.selectedProductTypeId }
    };

    console.log(obj);
    axios
      .post("http://localhost:8181/products", JSON.stringify(obj), {
        headers: {
          Authorization: localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            message: "Dodano!"
          });
        } else {
          this.setState({
            message: "Error!"
          });
        }
      });
  };

  render() {
    return (
      <>
        <select
          onChange={e => {
            localStorage.setItem("selectedProductTypeId", e.target.value);
        }
          }
        >
          {this.state.productTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <button>
          <Link to="/textiles">
            {localStorage.getItem("selectedTextileId") == null
              ? "Wybierz tkaninę"
              : "Zmień tkaninę"}
          </Link>
        </button>
        <button>
          <Link to="/clothesStyles">
            {localStorage.getItem("selectedClothesStyleId") == null
              ? "Wybierz fason"
              : "Zmień fason"}
          </Link>
        </button>
        <textarea type="text" style={{height: '50px'}}/>
        <button onClick={this.handleClickSendButton}>Send</button>
        <label>{this.state.message}</label>
      </>
    );
  }
}

export default CreateClothesPage;
