const Footer = () => {
    return (
        <footer className="footer">
            {/* Upside Down Vines Animation */}
            <div className="footer-vines">
                <div className="vine vine-1"></div>
                <div className="vine vine-2"></div>
                <div className="vine vine-3"></div>
                <div className="vine vine-4"></div>
                <div className="vine vine-5"></div>
            </div>

            {/* Floating Particles */}
            <div className="footer-particles">
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
            </div>

            <div className="footer-main">
                {/* Logo Section */}
                <div className="footer-brand">
                    <div className="footer-logo-container">
                        <span className="footer-logo-text">STRANGER</span>
                        <span className="footer-logo-accent">TECH</span>
                    </div>
                    <p className="footer-tagline">The Upside Down Challenge 2026</p>
                    <p className="footer-quote">"Friends don't lie."</p>
                </div>

                {/* Navigation Links */}
                <div className="footer-nav">
                    <h4 className="footer-nav-title">NAVIGATE</h4>
                    <div className="footer-nav-links">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#rounds">Rounds</a>
                        <a href="#prizes">Prizes</a>
                        <a href="#faq">FAQ</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>

                {/* Info Links */}
                <div className="footer-info">
                    <h4 className="footer-nav-title">LEGAL</h4>
                    <div className="footer-nav-links">
                        <a href="/privacy-policy.html">Privacy Policy</a>
                        <a href="/terms-of-use.html">Terms of Use</a>
                        <a href="/faq.html">FAQ</a>
                        <a href="/contact.html">Contact</a>
                    </div>
                </div>

                {/* Social & Contact */}
                <div className="footer-connect">
                    <h4 className="footer-nav-title">CONNECT</h4>
                    <div className="footer-social">
                        <a href="https://x.com/sitnagpur?s=20" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter/X">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/symbiosis_sit_nagpur/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/SITNagpur24/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="https://in.linkedin.com/school/symbiosis-institute-of-technology-nagpur-maharashtra/" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/channel/UCCS1Ea8AQr-alNd_r4XFI8g" target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                    <p className="footer-contact">enthusia@sitnagpur.siu.edu.in</p>
                </div>
            </div>

            {/* Credits Section */}
            <div className="footer-credits">
                <div className="credits-content">
                    <p className="credits-title">STRANGER THINGS CREDITS</p>
                    <p className="credits-text">
                        Stranger Things is created by <strong>The Duffer Brothers</strong> (Matt Duffer & Ross Duffer).
                        All Stranger Things imagery, characters, and related content are property of
                        <strong>Netflix</strong>.
                        This is a fan-made event website and is not affiliated with Netflix or the official Stranger Things
                        production.
                    </p>
                    <p className="credits-netflix">A Netflix Original Series</p>
                </div>
            </div>

            {/* Christmas Lights Divider */}
            <div className="footer-lights">
                <span className="light red"></span>
                <span className="light green"></span>
                <span className="light blue"></span>
                <span className="light yellow"></span>
                <span className="light red"></span>
                <span className="light green"></span>
                <span className="light blue"></span>
                <span className="light yellow"></span>
                <span className="light red"></span>
                <span className="light green"></span>
                <span className="light blue"></span>
                <span className="light yellow"></span>
            </div>

            <div className="footer-bottom">
                <p>© 2026 CSI Student Chapter, SIT Nagpur. All rights reserved.</p>
                <p className="footer-disclaimer">This website is a fan project. Stranger Things™ is a trademark of Netflix.</p>
                <div className="footer-eleven">
                    <span className="eleven-number">011</span>
                    <div className="eleven-nosebleed"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
