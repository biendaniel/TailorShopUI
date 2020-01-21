import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Page from './Page'
import '../styles/App.css';

class App extends React.Component {

  state = {
    user: null
  }

  render() {
  return (
    <BrowserRouter>
    <div>
  <header>{<Header/>}</header>
      <main>
        {<Page/>}
      </main>
      <footer>{<Footer/>}</footer>
    </div>
    </BrowserRouter>
  );
}
}
export default App;
