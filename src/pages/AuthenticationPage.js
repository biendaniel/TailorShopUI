import React from "react";
import "../styles/AddDimensionsPage.css";
import axios from "axios";
import { withRouter} from "react-router-dom";
// import { render } from '@testing-library/react';

class AuthenticationPage extends React.Component {
  state = {
    message: "czeekaj",
    email: "",
    password: ""
  };

  sendAuthanticationDataToServer = () => {
    const obj = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(JSON.stringify(obj));

    axios.post("http://localhost:8181/users/authenticate", obj).then(res => {
      console.log(res)
      if (res.status === 200) {
        this.setState({message: "zalogowano"})
        localStorage.setItem("token", `Bearer ${res.data.jwt}`);
        localStorage.setItem("email", res.data.userEmail);
        localStorage.setItem("userId", res.data.userId);
        res.data.customerId == null
          ? localStorage.setItem("employeeId", res.data.employeeId)
          : localStorage.setItem("customerId", res.data.customerId);
          window.location.reload();
      } else {
        console.log(res)
        this.setState({
          message: "Error!"
        });
      }
    }).catch(err => { if(err.response.status === 404) {
      this.setState({message: "Nieprawidłowy login lub hasło."})
    }
    else if(err.response.status >= 500) {
      this.setState({message: "Błąd serwera."})
    }
    else {
      this.setState({message: "Wystąpił błąd."})
    }
    }) }

  handleEmail = e => {
    this.setState({
      email: e.target.value
    })
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.sendAuthanticationDataToServer();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleEmail}
          value={this.state.email}
          type="text"
        />
        <input
          onChange={this.handlePassword}
          value={this.state.password}
          type="password"
        />
        <label>{this.state.message}</label>
        <button>Zaloguj</button>
      </form>
    );
  }
}
export default withRouter(AuthenticationPage);
