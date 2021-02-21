import "../styles/NavBar.css"
import React from "react";

const NavBar = () => (
    <header className='navbar'>
        <div className='navbar__title navbar__item'>DodgeBot</div>
        <div className='navbar__item' onClick={() => (console.log("aaaaaaaa"))}>Prediction</div>
        <div className='navbar__item'>Favorite champions</div>
        <div className='navbar__item'>Settings</div>
        <div className='navbar__item'>Help</div>
    </header>
);

export default NavBar;