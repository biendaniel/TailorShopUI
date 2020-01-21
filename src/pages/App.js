import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <header>
        <nav>
          <ul>
            {/* <li><a href="/">aaaa</a></li>
            <li><a href="/news">bbb</a></li>s
            <li><a href="/contact">ccc</a></li> */}
            <li><Link to="/">aaaa</Link></li>
            <li><Link to="/news">bbb</Link></li>s
            <li><Link to="/contact">ccc</Link></li>
          </ul>
        </nav>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
