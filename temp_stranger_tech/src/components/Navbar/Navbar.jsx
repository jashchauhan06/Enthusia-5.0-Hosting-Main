import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
    const navbarRef = useRef(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        const handleNavbarScroll = () => {
            const currentScroll = window.scrollY;

            // Add scrolled class for background
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }

            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleNavbarScroll, { passive: true });

        // Initialize magnetic effect
        const magneticElements = navbar.querySelectorAll('.magnetic');
        magneticElements.forEach(elem => {
            const strength = parseFloat(elem.dataset.strength) || 0.3;

            const handleMouseMove = (e) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(elem, {
                    x: x * strength,
                    y: y * strength,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(elem, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            };

            elem.addEventListener('mousemove', handleMouseMove);
            elem.addEventListener('mouseleave', handleMouseLeave);
        });

        // Handle smooth scroll navigation
        const navLinks = navbar.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Close mobile menu if open
                        const mobileMenu = document.getElementById('mobileMenuOverlay');
                        if (mobileMenu && mobileMenu.classList.contains('active')) {
                            mobileMenu.classList.remove('active');
                            document.getElementById('mobileMenuBtn').classList.remove('active');
                        }

                        // Update active state
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');

                        // Smooth scroll to target
                        const targetRect = targetElement.getBoundingClientRect();
                        const absoluteTop = targetRect.top + window.pageYOffset;
                        const navbarHeight = navbar.offsetHeight;

                        gsap.to(window, {
                            duration: 1,
                            scrollTo: {
                                y: absoluteTop - navbarHeight - 20,
                                autoKill: false
                            },
                            ease: 'power2.inOut'
                        });
                    }
                }
            });
        });

        return () => {
            window.removeEventListener('scroll', handleNavbarScroll);
        };
    }, []);

    return (
        <nav className="navbar" id="navbar" ref={navbarRef}>
            {/* Logo removed as per request */}

            {/* Mobile Menu Toggle Button */}
            <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
            </button>

            <ul className="nav-links" id="navLinks">
                <li><a href="#home" className="active magnetic" data-strength="0.2">HOME</a></li>
                <li><a href="#about" className="magnetic" data-strength="0.2">ABOUT</a></li>
                <li><a href="#rounds" className="magnetic" data-strength="0.2">ROUNDS</a></li>
                <li><a href="#countdown" className="magnetic" data-strength="0.2">COUNTDOWN</a></li>
                <li><a href="#gallery" className="magnetic" data-strength="0.2">GALLERY</a></li>
                <li><a href="#prizes" className="magnetic" data-strength="0.2">PRIZES</a></li>
                <li><a href="#team" className="magnetic" data-strength="0.2">TEAM</a></li>
                <li><a href="#faq" className="magnetic" data-strength="0.2">FAQ</a></li>
                <li><a href="#contact" className="magnetic" data-strength="0.2">CONTACT</a></li>
            </ul>

            <div className="nav-logos">
                <a href="https://sitnagpur.edu.in/" target="_blank" rel="noopener noreferrer" className="nav-logo-link magnetic" data-strength="0.3">
                    <img src={`${import.meta.env.BASE_URL}Sit logo.webp`} alt="SIT Logo" className="nav-sit-logo" />
                </a>
                <a href="https://iic.mic.gov.in/institute/my-council" target="_blank" rel="noopener noreferrer" className="nav-logo-link magnetic" data-strength="0.3">
                    <img src={`${import.meta.env.BASE_URL}iic-logo.webp`} alt="IIC Logo" className="nav-iic-logo" />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
