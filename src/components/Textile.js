import React from 'react';
import "../styles/Textile.css";

const Textile = (props) => {


  const handleClick = e => {

  }

console.log(props.textiles)
    const textiles = props.textiles.map(textile => (
        <ul className="textile-element" key={textile.id}>
            <li><h1>{textile.name}</h1></li>
            <li>Typ: {textile.textileType.name}</li>
            <li>Współczynnik ceny: {textile.priceRatio}</li>
            <img className="textile-image" src={`http://localhost:8181/images/download/textiles/${textile.id}`}  />
            <button onClick={() => localStorage.setItem("selectedTextileId", textile.id)}></button>
        </ul>
    ))
    console.log(props.textiles)
  return (
      <div>
    {textiles}
    </div>

  );
}

export default Textile;