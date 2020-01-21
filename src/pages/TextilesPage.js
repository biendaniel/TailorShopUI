import React from 'react';
import { Link } from 'react-router-dom';
import Textile from '../components/Textile';
import axios from 'axios';

class TextilesPage extends React.Component {

    state = {
        textiles: []
    }


//     componentDidMount() {
// this.getTextilesFromServer();
//     }

componentDidMount() {
    axios
      .get(`http://localhost:8181/textiles`, {
        headers: {
        'Authorization': localStorage.getItem('token')
        }
      })
      .then(res => {
        const textiles = res.data;
        this.setState({ textiles });
      })
      .catch(err => console.log(err));
  }





    render() {
        const textiles = this.state.textiles;
        const textileTypes = this.state.textileTypes;
    return (
        <div className="App">
            <Textile textiles={textiles}/>
            {/* {list} */}
        </div>
    );
}
}


export default TextilesPage;