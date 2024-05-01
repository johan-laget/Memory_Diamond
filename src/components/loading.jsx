import React, { useState, useEffect } from 'react';
import '../assets/loading.css';

const Loading = () => {
  const [progress, setProgress] = useState(0); // State to track progress
  const [showButton, setShowButton] = useState(false); // State to track button visibility

  useEffect(() => {
    const totalTime = 10; // Total time in seconds
    const intervalTime = 1000; // Interval time in milliseconds
    const steps = totalTime * 1000 / intervalTime; // Number of steps needed to reach 100%

    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        const remainingProgress = 100 - prevProgress;
        const maxIncrement = remainingProgress / steps * 2; // Maximum increment based on remaining progress
        const randomIncrement = Math.floor(Math.random() * maxIncrement) + 1; // Random increment between 1 and maxIncrement
        const newProgress = prevProgress + randomIncrement;
        return newProgress <= 100 ? newProgress : 100; // Ensure progress does not exceed 100
      });
    }, intervalTime);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Set timeout to show button after 3 seconds
      const timeout = setTimeout(() => {
        setShowButton(true);
      }, 3000);

      // Clear timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div className='loading_menu'>
      <div className='loading__container'>
        <div className='container__video'>
          <div className='video'>
            <video src={`public/video/tuto1.mp4`} loop autoPlay muted className='video'></video>
          </div>
          <div className='title__commentaire'>Commentaire</div>
        </div>
        <div className='Progresse__barre'>
          <div className='progress-bar' style={{ width: `${progress}%` }}>{Math.round(progress)}%</div>
        </div>
        {showButton && <div id='BoutonMusic' className='bouton__play'>Continuer</div>}
      </div>
    </div>
  );
};

export default Loading;