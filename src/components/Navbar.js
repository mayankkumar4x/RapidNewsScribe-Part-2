import React, { useEffect } from 'react'
import { Link, useLocation,useNavigate } from "react-router-dom";

export default function Navbar() {
  //For logout button
  let history=useNavigate();
  const handleonclick=()=>{
    localStorage.removeItem('token');
    history('/login')
  }
  // current path location
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div className='sticky-top'>
      <nav className="navbar text-light navbar-expand-lg bg-black">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav text-light me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link mx-4 text-light ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">iNotebook</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link text-light ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link text-light ${location.pathname === "/About" ? "active" : ""}`} to="/About">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <Link className="btn btn-primary mx-2" to="/Login" role="button">Login</Link>
              <Link className="btn btn-primary" to="/Signup" role="button">SignUp</Link>
            </form>:<button className='btn btn-primary' onClick={handleonclick}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}
