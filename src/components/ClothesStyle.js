import React from 'react';
import "../styles/Textile.css";

const ClothesStyle = (props) => {
console.log(props.clothesStyles)
    const clothesStyles = props.clothesStyles.map(clothesStyle => (
        <ul className="textile-element" key={clothesStyle.id}>
            <li><h1>{clothesStyle.name}</h1></li>
            <li>Współczynnik ceny: {clothesStyle.priceRatio}</li>
            <img className="textile-image" src={`http://localhost:8181/images/download/clothesStyles/${clothesStyle.id}`}/>
            <button onClick={() => localStorage.setItem("selectedClothesStyleId", clothesStyle.id)}>Dodaj</button>
        </ul>
    ))
    console.log(props.clothesStyles)
  return (
      <div>
    {clothesStyles}
    </div>

  );
}

export default ClothesStyle;