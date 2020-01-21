import React from "react";
import axios from "axios";
class AddCustomerPage extends React.Component {
  state = {
    message: "",
    firstname: "",
    lastname: "",
    email: "",
    reEmail: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
    userType: '',

    errors: {
      firstname: false,
      lastname: false,
      email: false,
      pass: false,
      userType: false,
    }
  };

  messages = {
    firstname_incorrect: 'Nazwa musi być dłuższa niż 3 znaki i nie może zawierać spacji',
    lastname_incorrect: 'Nazwa musi być dłuższa niż 3 znaki i nie może zawierać spacji',
    email_incorrect: 'Błędny e-mail',
    password_incorrect: 'Hasło musi mieć 3 znaki',
    accept_incorrect: 'Niepotwierdzona zgoda'
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      // const checked = e.target.checked;
      this.setState({
        [name]: value
      })
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const validation = this.formValidation()
    // console.log(validation)

    if (validation.correct) {
      this.sendCustomerToServer();
      this.setState({
        firstname: '',
        lastname: '',
        email: '',
        reEmail: '',
        password: '',
        rePassword: '',
        userType: '',
        message: 'Formularz został wysłany',

        errors: {
          firstname: false,
          lastname: false,
          email: false,
          pass: false,
          userType: false,
        }
      })
    } else {
      this.setState({
        errors: {
          firstname: !validation.firstname,
          lastname: !validation.lastname,
          email: !validation.email,
          pass: !validation.password,
          userType: !validation.userType
        }
      })
    }
  }

  formValidation() {
    // true - ok
    // false - zle
    let firstname = false;
    let lastname = false;
    let email = false;
    let password = false;
    let userType = true;
    let correct = false;

    if (this.state.firstname.length > 3 && this.state.firstname.indexOf(' ') === -1) {
      firstname = true;
    }

    if (this.state.lastname.length > 3 && this.state.lastname.indexOf(' ') === -1) {
      lastname = true;
    }

    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }

    if (this.state.password.length >= 3) {
      password = true;
    }

    // if (this.state.accept) {
    //   accept = true
    // }

    if (firstname && lastname && email && password && userType) {
      correct = true
    }

    return ({
      correct,
      firstname,
      lastname,
      email,
      password,
      userType
    })
  }

  componentDidUpdate() {
    console.log("update");
    if (this.state.message !== '') {
      setTimeout(() => this.setState({
        message: ''
      }), 3000)
    }
  }


  sendCustomerToServer = () => {
    const obj = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };

    console.log(JSON.stringify(obj));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    axios
      .post(
        `http://localhost:8181/customers`,
        JSON.stringify(obj), config
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            informationFromServer: "Dodano!"
          });
        } else {
          this.setState({
            informationFromServer: "Coś poszło nie tak!"
          });
        }
      });
  };

  handleClickAdd = e => {
    console.log("bylem tu");
    e.preventDefault();
    this.setState({
      information: "dodano;"
    });
    this.sendCustomerToServer();
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="firstname">
            Imię:
            <input
              type="text"
              id="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              name="firstname"
            />

{this.state.errors.firstname && <span>{this.messages.firstname_incorrect}</span>}
          </label>

          <label htmlFor="lastname">
            Nazwisko:
            <input
              type="text"
              id="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              name="lastname"
            />
            {this.state.errors.lastname && <span>{this.messages.lastname_incorrect}</span>}
          </label>

          <label htmlFor="email">
            e-mail:
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>

          <label htmlFor="reEmail">
            Powtórz e-mail:
            <input
              type="email"
              id="email"
              value={this.state.reEmail}
              onChange={this.handleChange}
              name="reEmail"
            />
            {this.state.errors.email && <span>{this.messages.email_incorrect}</span>}
          </label>

          <label htmlFor="password">
            Hasło:
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
          </label>

          <label htmlFor="rePassword">
            Powtórz Hasło:
            <input
              type="password"
              id="password"
              value={this.state.rePassword}
              onChange={this.handleChange}
              name="rePassword"
            />
            {this.state.errors.password && <span>{this.messages.password_incorrect}</span>}
          </label>

          <div onChange={this.handleUserType}>
            <input checked type="radio" value="customers" name="userType" />{" "}
            Klient
            <input type="radio" value="employees" name="userType" /> Pracownik
          </div>

          <label style={{ color: "red" }}>{this.state.information}</label>
          <button>Dodaj</button>
        </form>
        {this.state.message && <h3>{this.state.message}</h3>}
      </div>
    );
  }
}

export default AddCustomerPage;
