import React, { useState, useEffect } from 'react';
import './index.css';
import './mobile.css';
import Background from './components/Background';
import ScrollController from './components/ScrollController';
import GlobalUI from './components/GlobalUI';

// CursorEffect removed - using custom NEURODANCE cursor instead

function App() {
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(100); // Start at 100%
  const [isLoaded, setIsLoaded] = useState(true); // Start as loaded
  const [audioInstance, setAudioInstance] = useState(null);

  useEffect(() => {
    // Set document title for Enthusia page
    document.title = 'ENTHUSIA 5.0 | The Ultimate Tech & Cultural Fest - SIT NAGPUR';

    // Load assets in background without blocking UI
    const audio = new Audio('/bg.opus');
    audio.loop = true;
    audio.volume = 0.5;
    setAudioInstance(audio);

    // Load images progressively - using every 5th frame for smoother animation
    const frameStep = 5; // Every 5th frame instead of 15th = ~96 images (still much less than 481)
    const frameCount = Math.ceil(481 / frameStep);
    const loadList = new Array(frameCount);

    let count = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNumber = (i * frameStep) + 1;
      img.src = `/backimages/img_${frameNumber.toString().padStart(3, '0')}.webp`;
      img.onload = () => {
        count++;
        if (count === frameCount) {
          setImages(loadList);
        }
      };
      loadList[i] = img;
    }

    // Cleanup: stop audio when component unmounts (navigating away)
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      {/* Custom NEURODANCE-style purple cursor applied via CSS */}

      {/* SACRED Static Background (DO NOT MODIFY) */}
      <div className="static-background"></div>

      {/* Video Canvas Background */}
      <Background images={images} isLoaded={isLoaded} />

      {/* Film Grain Overlay */}
      <div className="film-grain"></div>

      {/* Vignette Overlay */}
      <div className="vignette"></div>

      {/* Scanlines */}
      <div className="scanlines"></div>

      {/* Loader */}
      <div className="loader" id="loader" style={{ opacity: isLoaded ? 0 : 1, visibility: isLoaded ? 'hidden' : 'visible' }}>
        <div className="loader-content">
          <div className="loader-title">ENTHUSIA 5.0</div>
          <div className="loader-subtitle">INITIALIZING REALITY...</div>
          <div className="loader-bar">
            <div className="loader-progress" id="loaderProgress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loader-percent">{progress}%</div>
        </div>
      </div>

      {isLoaded && (
        <>
          {/* Main Content */}
          <div className="main-content">
            <ScrollController />
          </div>
          <GlobalUI audioInstance={audioInstance} />
        </>
      )}
    </>
  );
}

export default App;
