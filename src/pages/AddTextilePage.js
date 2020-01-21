import React from "react";
import "../styles/AddTextilePage.css";
import axios from "axios";

class AddTextilePage extends React.Component {
  state = {
    informationFromServer: "",
    textileTypes: [],
    selectedTypeId: null,
    selectedFile: null,
    newTextileName: "",
    priceRatio: 1,
    timeRatio: 1,
    jsonObject: null,
    imageId: null,
    color: ""
  };

  componentDidMount() {
    this.getTextileTypesFromServer();
    // this.getImageFromServer();
    this.getLastImageIdFromServer();
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  fileUploadHandler = () => {
    const formData = new FormData();

    formData.append(
      "uploadImage",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios.post("http://localhost:8181/images/textile_upload", formData).then(image =>
      this.setState({
        imageId: image.data
      })
    );
  };

  getLastImageIdFromServer() {
    fetch("http://localhost:8181/images/lastId")
      .then(res => res.json())
      .then(imageId =>
        this.setState({
          imageId
        })
      )
      .catch(function(error) {
        console.log("nie pobrano imageid");
      });
  }

  getTextileTypesFromServer() {
    axios
    .get("http://localhost:8181/textiles/types")
      .then(res => {
        const textileTypes = res.data;
        this.setState({
          textileTypes: [{value: '', name: 'Typ tkaniny:'}].concat(textileTypes)})
      });
  }



  sendTextileToServer = () => {

    const obj = {
      name: this.state.newTextileName,
      color: this.state.color,
      priceRatio: this.state.priceRatio,
      executionTimeRatio: this.state.timeRatio,
      mainImage: { id: this.state.imageId + 1 },
      textileType: { id: this.state.selectedTypeId }
    };

    console.log(JSON.stringify(obj));
    axios
    .post(
    "http://localhost:8181/textiles", JSON.stringify(obj), {
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
        this.setState(({
          informationFromServer: "Dodano!"}));
      }
      else {
        this.setState(({
          informationFromServer: "Coś poszło nie tak!"}));
      }
    });
  };


  getImageFromServer() {
    fetch("http://localhost:8181/images/download/textiles/21")
      .then(res => res.json())
      .then(imgUrl => {
        this.setState({
          imgUrl
        });
      });
  }

  handleTextileName = e => {
    this.setState({
      newTextileName: e.target.value
    });
  };

  handleColor = e => {
    this.setState({
      color: e.target.value
    });
  };

  handlePriceRatio = e => {
    this.setState({
      priceRatio: e.target.value
    });
  };

  handleTimeRatio = e => {
    this.setState({
      timeRatio: e.target.value
    });
  };

  handleAddTextile = () => {
    this.fileUploadHandler();
    this.sendTextileToServer();

  };

  render() {
    return (
      <div className="addMaterialsForm">
        <h2>Dodaj nowy materiał</h2>
        <ul>
          <li>
            <label>{this.state.informationFromServer}</label>
          </li>
          <li>
            <select
              onChange={e => this.setState({ selectedTypeId: e.target.value })}
            >
              {this.state.textileTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </li>
          <li>
            <input
              type="text"
              value={this.state.textileName}
              onChange={this.handleTextileName}
              placeholder="Nazwa"
            />
          </li>
          <li>
            <input
              type="text"
              value={this.state.color}
              onChange={this.handleColor}
              placeholder="Kolor"
            />
          </li>
          <li>
            <input
              type="number"
              value={this.state.priceRatio}
              onChange={this.handlePriceRatio}
              placeholder="Współczynnik ceny (0.5 - 1.5)"
            />
          </li>
          <li>
            <input
              type="number"
              value={this.state.timeRatio}
              onChange={this.handleTimeRatio}
              placeholder="Współczynnik czasu (0.9 - 1.1)"
            />
          </li>
          <input
            style={{ display: "none" }}
            type="file"
            name="uploadImage"
            onChange={this.fileSelectedHandler}
            ref={fileInput => (this.fileInput = fileInput)}
          />
          <li>
            <button onClick={() => this.fileInput.click()}>Wybierz plik</button>
          </li>
          <li>
            <button onClick={this.handleAddTextile}>Dodaj</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default AddTextilePage;
