// import React, {useState, createContext} from 'react'
// import { Link } from 'react-router-dom'

// const NavBar = () => {
//   return (
//     <div>
//         <div className="NavBar">
//         <Link to="/spy"><button>SPY</button></Link>
//         <Link to="/apple"><button>AAPL</button></Link>
//         <Link to="/facebook"><button>META</button></Link>
//         <Link to="/amazon"><button>AMZN</button></Link>
//         <Link to="/netflix"><button>NFLX</button></Link>
//         <Link to="/alphabet"><button>GOOGL</button></Link>
//         <Link to="/tesla"><button>TSLA</button></Link>

//       </div>

        

//     </div>
//   )
// }

// export default NavBar

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for NavBar styling

const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <div className="NavBar">
        <Link to="/spy" className="nav-link"><button className="nav-button">SPY</button></Link>
        <Link to="/apple" className="nav-link"><button className="nav-button">AAPL</button></Link>
        <Link to="/facebook" className="nav-link"><button className="nav-button">META</button></Link>
        <Link to="/amazon" className="nav-link"><button className="nav-button">AMZN</button></Link>
        <Link to="/netflix" className="nav-link"><button className="nav-button">NFLX</button></Link>
        <Link to="/alphabet" className="nav-link"><button className="nav-button">GOOGL</button></Link>
        <Link to="/tesla" className="nav-link"><button className="nav-button">TSLA</button></Link>
      </div>
    </div>
  );
};

export default NavBar;
