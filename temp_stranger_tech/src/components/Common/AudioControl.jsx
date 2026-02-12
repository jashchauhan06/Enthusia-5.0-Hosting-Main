import { useState, useRef, useEffect } from 'react';

const AudioControl = () => {
    const [isMuted, setIsMuted] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 1.0;
        }
    }, []);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isMuted) {
                // Play audio with promise handling for browser restrictions
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsMuted(false);
                        })
                        .catch((error) => {
                            console.log('Audio playback failed:', error);
                            // Try to play again after user interaction
                            setIsMuted(true);
                        });
                }
            } else {
                audioRef.current.pause();
                setIsMuted(true);
            }
        }
    };

    return (
        <>
            <div className={`audio-control ${!isMuted ? 'playing' : ''}`} id="audioControl" onClick={toggleAudio}>
                <div className="audio-icon-wrapper">
                    <div className="audio-bars">
                        <span className="bar bar-1"></span>
                        <span className="bar bar-2"></span>
                        <span className="bar bar-3"></span>
                        <span className="bar bar-4"></span>
                    </div>
                    <div className="audio-muted-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    </div>
                </div>
                <span className="audio-pulse"></span>
            </div>
            <audio id="bgMusic" ref={audioRef} loop preload="auto">
                <source src={`${import.meta.env.BASE_URL}audio.mpeg`} type="audio/mpeg" />
                <source src={`${import.meta.env.BASE_URL}audio..opus`} type="audio/opus" />
                Your browser does not support the audio element.
            </audio>
        </>
    );
};

export default AudioControl;

