import React from "react";
import "../styles/Textile.css";

const Dimensions = props => {

  console.log(props.dimensionsList);
  const dimensionsList = props.dimensionsList.map(dimensions => (
    <ul className="textile-element" key={dimensions.id}>
      <li>
        <h1>{dimensions.name}</h1>
      </li>
      <li>Rozmiar kołnierzyka: <b>{dimensions.collarSize} cm</b></li>
      <li>Szerokość klatki piersiowej: <b>{dimensions.chestSize}cm</b></li>
      <li>Długość rękawa: <b>{dimensions.sleeveLength}cm</b></li>
      <li>Szerokość pasa: <b>{dimensions.waistSize}cm</b></li>
      <li>Szerokość ramion: <b>{dimensions.shoulderWidth}cm</b></li>
      <li>Długość nogawki: <b>{dimensions.legLength}cm</b></li>
      <li>Szerokość nogawki: <b>{dimensions.legWidth}cm</b></li>
      <li><button>Edytuj</button></li>
      <li><button>Usuń</button></li>
    </ul>
  ));
  console.log(props.dimensionsList);
  return <div>{dimensionsList}</div>;
};

export default Dimensions;
