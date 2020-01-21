import React from 'react';
import ClothesStyle from '../components/ClothesStyle';
import axios from 'axios';

class ClothesStylesPage extends React.Component {

    state = {
        clothesStyles: []
    }


    componentDidMount() {
this.getTextilesFromServer();
    }

    // getTextilesFromServer() {
    //     fetch("http://localhost:8181/clothesStyles")
    //     .then(res => res.json())
    //     .then(clothesStyles => {
    //         console.log(clothesStyles);
    //     this.setState({
    //         clothesStyles
    //     });
    // })
    // }


    getTextilesFromServer() {
        axios
        .get("http://localhost:8181/clothesStyles")
            .then(res => {
                const clothesStyles = res.data;
                this.setState({ clothesStyles });
              })
    };



    render() {
        const clothesStyles = this.state.clothesStyles;
    return (
        <div className="App">
            <ClothesStyle clothesStyles={clothesStyles}/>
            {/* {list} */}
        </div>
    );
}
}


export default ClothesStylesPage;