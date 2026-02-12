import { useEffect, useRef } from 'react';

const MobileMenu = () => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const menuOverlay = overlayRef.current;
        const menuClose = document.getElementById('mobileMenuClose');
        const menuLinks = document.querySelectorAll('.mobile-nav-link');

        if (!menuBtn || !menuOverlay || !menuClose) return;

        const openMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        const handleOverlayClick = (e) => {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        };

        const handleLinkClick = (e) => {
            const href = e.currentTarget.getAttribute('href');
            closeMenu(e);
            
            // Use setTimeout to ensure menu closes before navigation
            setTimeout(() => {
                if (href === '#home') {
                    // Force scroll to top for HOME
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 100);
        };

        menuBtn.addEventListener('click', openMenu, false);
        menuClose.addEventListener('click', closeMenu, false);
        menuOverlay.addEventListener('click', handleOverlayClick, false);
        menuLinks.forEach(link => {
            link.addEventListener('click', handleLinkClick, false);
        });

        return () => {
            menuBtn.removeEventListener('click', openMenu);
            menuClose.removeEventListener('click', closeMenu);
            menuOverlay.removeEventListener('click', handleOverlayClick);
            menuLinks.forEach(link => {
                link.removeEventListener('click', handleLinkClick);
            });
        };
    }, []);

    return (
        <div className="mobile-menu-overlay" id="mobileMenuOverlay" ref={overlayRef}>
            <button className="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <nav className="mobile-menu-nav">
                <a href="#home" className="mobile-nav-link">HOME</a>
                <a href="#about" className="mobile-nav-link">ABOUT</a>
                <a href="#challenge1" className="mobile-nav-link">ROUNDS</a>
                <a href="#countdown" className="mobile-nav-link">COUNTDOWN</a>
                <a href="#gallery" className="mobile-nav-link">GALLERY</a>
                <a href="#requirements" className="mobile-nav-link">PRIZES</a>
                <a href="#team" className="mobile-nav-link">TEAM</a>
                <a href="#faq" className="mobile-nav-link">FAQ</a>
                <a href="#contact" className="mobile-nav-link">CONTACT</a>
            </nav>
        </div>
    );
};

export default MobileMenu;
