import React from 'react'; // Import React
import '../assets/form.css'; // Import the CSS file

const Form = () => {
  return (
    <div className='form.home'>
      <p className="form_title">Welcome To Arcade Memory</p>
      <div className='form__container'>
        <div className="form"> 
          <p className="title__form">Register</p>
          <ul>
            <li className='imput__li'><input className='imput__form' type="pseudo__form" placeholder="Pseudo" /></li>
            <li className='imput__li'><input className='imput__form' type="email__form" placeholder="Email" /></li>
            <li style={{ marginBottom: "5px" }} className='imput__li'><input className='imput__form' type="password__form" placeholder="Password" /></li>
            <li className='button__form'><button >Create</button></li>
          </ul>
        </div>
        <p>Or</p>
        <div style={{ height: "20rem" }} className="form">
          <p className="title__form">Login</p>
          <ul>
          <li className='imput__li'><input className='imput__form' type="email__form" placeholder="Email" /></li>
          <li style={{ marginBottom: "5px" }} className='imput__li'><input className='imput__form' type="password__form" placeholder="Password" /></li>
            <li className='button__form'><button>Login</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Form;