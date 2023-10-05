import React, {useState, createContext} from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <div className="NavBar">
        <Link to="/apple"><button>AAPL</button></Link>
        <Link to="/facebook"><button>META</button></Link>
        <Link to="/amazon"><button>AMZN</button></Link>
        <Link to="/netflix"><button>NFLX</button></Link>
        <Link to="/alphabet"><button>GOOGL</button></Link>
        <Link to="/tesla"><button>TSLA</button></Link>

      </div>

        

    </div>
  )
}

export default NavBar