import { useState, useEffect } from 'react';
import '../assets/menu.css'; // Import the CSS file
import backgroundMusic from '../../public/songs/acarde_song.mp3'; // Import the background music file


const Menu = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const storedIsMuted = localStorage.getItem('isMuted');
    return storedIsMuted ? JSON.parse(storedIsMuted) : false;
  });

  const toggleSound = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    localStorage.setItem('isMuted', JSON.stringify(newIsMuted));
  };

  useEffect(() => {
    const audioElement = document.getElementById('backgroundMusic');
    if (audioElement) {
      audioElement.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className='home__menu'>
      <audio id="backgroundMusic" src={backgroundMusic} autoPlay loop muted={isMuted} />
      <p className="title__home" style={{ userSelect: 'none' }}>Welcome To Memory</p>
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
        <button onClick={toggleSound}>{isMuted ? 'Song true' : 'Song false'}</button>
      </div>
    </div>
  );
};
