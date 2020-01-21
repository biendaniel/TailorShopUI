import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
const Header = () => {

  return (
      <ul className="header-elements-frame">
          <li><Link className="header-element" to="/">Start</Link></li>
          {/* <li><Link className="header-element" to="/textiles">Materiały</Link></li> */}
          {/* <li><Link className="header-element" to="/clothesStyles">Fasony</Link></li> */}
          <li><Link className="header-element" to="/addTextile">Dodaj materiał</Link></li>
          <li><Link className="header-element" to="/addClothesStyle">Dodaj fason</Link></li>
          {localStorage.getItem("token") === null ? "" : <li><Link className="header-element" to="/profile">Twoje Konto</Link></li>}
          {localStorage.getItem("token") === null ? "" : <li><Link className="header-element" to="/createClothes">Komponuj ubranie</Link></li>}
          {localStorage.getItem("token") === null ? <li><Link className="header-element" to="/registration">Rejestracja</Link></li> : ""}
          {localStorage.getItem("token") === null ? <li><Link className="header-element" to="/auth">Zaloguj</Link></li>
          : <li> <Link onClick={() => {localStorage.clear(); window.location.reload();}} className="header-element" >Wyloguj</Link></li>}
      </ul>
  )
}
export default Header;