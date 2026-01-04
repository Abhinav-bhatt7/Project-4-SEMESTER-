import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


function Navbar(){
    return(
        <>
        <nav className="nabar">
            <ul className="list">
                <li className="home"><Link>Home</Link></li>
                <li className="Backtest"><Link to="/Backtest">BackTest</Link></li>
                <li className="ai"><Link to="/Ai">Ai Hypothesis</Link></li>
                <li className="portfolio"><a href="#">Portfolio Management</a></li>

            </ul>

        </nav>
        
        
        </>
    );
}
export default Navbar