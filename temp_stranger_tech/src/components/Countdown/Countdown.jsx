import { useEffect, useState } from 'react';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const targetDate = new Date('February 27, 2026 10:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0')
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="countdown-section" id="countdown">
            <div className="section-header">
                <span className="section-tag">SEC. 002.5</span>
                <h2 className="section-title">THE PORTAL OPENS</h2>
                <p className="section-subtitle">Time remaining until the Upside Down awakens</p>
            </div>

            <div className="countdown-content-wrapper">
                {/* Left Side: Countdown Timer */}
                <div className="countdown-left">
                    <div className="countdown-container">
                        <div className="time-box">
                            <span id="days">{timeLeft.days}</span>
                            <small>DAYS</small>
                        </div>
                        <div className="countdown-separator">:</div>
                        <div className="time-box">
                            <span id="hours">{timeLeft.hours}</span>
                            <small>HOURS</small>
                        </div>
                        <div className="countdown-separator">:</div>
                        <div className="time-box">
                            <span id="minutes">{timeLeft.minutes}</span>
                            <small>MINUTES</small>
                        </div>
                        <div className="countdown-separator">:</div>
                        <div className="time-box">
                            <span id="seconds">{timeLeft.seconds}</span>
                            <small>SECONDS</small>
                        </div>
                    </div>
                </div>

                {/* Right Side: Event Information */}
                <div className="countdown-right">
                    <div className="event-details">
                        <div className="event-card">
                            <div className="event-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="event-info">
                                <span className="event-label">EVENT DATE</span>
                                <span className="event-value">February 27, 2026</span>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12,6 12,12 16,14" />
                                </svg>
                            </div>
                            <div className="event-info">
                                <span className="event-label">TIME</span>
                                <span className="event-value">10:00 AM - 5:00 PM</span>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="event-info">
                                <span className="event-label">VENUE</span>
                                <span className="event-value">Symbiosis Institute of Technology, Nagpur</span>
                            </div>
                        </div>

                        <div className="event-card">
                            <div className="event-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <div className="event-info">
                                <span className="event-label">REGISTRATION FEE</span>
                                <span className="event-value">₹300.00/-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Countdown;
