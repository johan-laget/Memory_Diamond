import React from 'react'; // Import React
import '../assets/menu.css'; // Import the CSS file

const Menu = () => {
  return (
    <div className='home__menu'>
      <p className="title__home">Welcome To Memory</p>
      <div className='container'>
        <div className="menu"> 
          <p className="title__menu">Register</p>
          <ul>
            <li className='imput__home'><input type="text" placeholder="Pseudo" /></li>
            <li className='imput__home2'><input type="password" placeholder="Password" /></li>
            <li className='button__home'><button>Create</button></li>
          </ul>
        </div>
        <p className='title__center'>Or</p>
        <div className="menu">
          <p className="title__menu">Login</p>
          <ul>
            <li className='imput__home'><input type="text" placeholder="Pseudo" /></li>
            <li className='imput__home2'><input type="password" placeholder="Password" /></li>
            <li className='button__home'><button>Login</button></li>
          </ul>
        </div>
      </div>
      <div className="settings-button">
        <button></button>
      </div>
    </div>
  );
};

export default Menu;