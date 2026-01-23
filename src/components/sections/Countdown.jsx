
import React, { forwardRef, useEffect, useState } from 'react';

const Countdown = forwardRef((props, ref) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Set target date to February 26, 2026 09:00:00 IST (when techfest starts)
        const targetDate = new Date("2026-02-26T09:00:00+05:30").getTime();

        const update = () => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    const f = (n) => n < 10 ? `0${n}` : n;

    return (
        <section className="countdown-section section" id="countdown" ref={ref}>
            <div className="countdown-container">
                <h2 className="countdown-title fade-in">Countdown to Enthusia 5.0</h2>

                <div className="countdown-timer fade-in">
                    <div className="countdown-item">
                        <span className="countdown-value">{f(timeLeft.days)}</span>
                        <span className="countdown-label">Days</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{f(timeLeft.hours)}</span>
                        <span className="countdown-label">Hours</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{f(timeLeft.minutes)}</span>
                        <span className="countdown-label">Minutes</span>
                    </div>
                    <div className="countdown-item">
                        <span className="countdown-value">{f(timeLeft.seconds)}</span>
                        <span className="countdown-label">Seconds</span>
                    </div>
                </div>

                <p className="countdown-date fade-in">
                    <span style={{ color: 'white' }}>February 26th – 28th, 2026</span> • SIT Nagpur Campus
                </p>


            </div>
        </section>
    );
});

export default Countdown;
