import React, { Component } from "react";
import './navbar.css';

class Navbar extends Component {
    //render is needed BECAUSE it extends from Component
    // render inside the parenthesis you write javascript logic to decide what to show
    //This would be the navigation bar in which one can find the necessry functions and pages a user/guest wants to go to. The bolded lines are the direct links to the request item and carpool request listings. 
    render(){
        return(
            
            <nav className="navbar navbar-expand-sm navbar-dark bg-green">
                <div className="container">
                    <a className="navbar-brand" href="/"><b>UniMarket</b></a>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/signin">Sign In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/signup">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/signout">Sign Out</a>
                            </li>
                            <li>
                                <a className="nav-link" href="/landing">Landing</a>
                            </li>
                            <li>
                                <a className="nav-link" href="/request">Request Item</a>
                            </li>
                            <li>
                                <a className="nav-link" href="/carpoolrequest">Carpool                                           Request</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            
        );
    }
}

export default Navbar;