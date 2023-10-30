import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

const Navbar = () => {
    const navigation = useNavigate();
    let location = useLocation();

    const context = useContext(NoteContext);
    const {clearNotes} = context;


    React.useEffect(() => {
        // Google Analytics
        // console.log(location)
    }, [location]);

    function logOut(){
        localStorage.removeItem("token");
        clearNotes();
        navigation("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" || location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem("token") ? <form className="d-flex" role="search">

                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/register" role="button">Register</Link>

                    </form> : <form className="d-flex" role="search">

                        <button className="btn btn-primary mx-1" onClick={logOut} role="button">Logout</button>
                        

                    </form>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
