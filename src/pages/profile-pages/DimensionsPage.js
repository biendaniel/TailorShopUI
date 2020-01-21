import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Dimensions from "../../components/Dimensions";

class DimensionsPage extends React.Component {
  state = {
    dimensionsList: []
  };

  //     componentDidMount() {
  // this.getTextilesFromServer();
  //     }

  async componentDidMount() {
    axios
      .get(
        `http://localhost:8181/customers/${localStorage.getItem(
          "customerId"
        )}/dimensions`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(res => {
        console.log(res);
        const dimensionsList = res.data;
        this.setState({ dimensionsList });
      })
      .catch(err => console.log(err));
  }

  render() {
    const dimensionsList = this.state.dimensionsList;
    return (
      <div className="App">
          <button><Link to="/add-dimensions">Dodaj wymiary</Link></button>
    {this.state.dimensionsList.length > 0 ?  <Dimensions dimensionsList={dimensionsList} />  : <p>Brak rozmiarów</p> }
        {/* {list} */}
      </div>
    );
  }
}

export default DimensionsPage;
