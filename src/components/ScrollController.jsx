
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import TechFestIntro from './sections/TechFestIntro';
import TechFestEvents from './sections/TechFestEvents';
import CulturalFest from './sections/CulturalFest';
import CulturalEvents from './sections/CulturalEvents';
// import Sponsors from './sections/Sponsors'; // Commented out for now
import History from './sections/History';
import Team from './sections/Team';
import Countdown from './sections/Countdown';
import Contact from './sections/Contact';

const ScrollController = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const sectionsConfig = [
        { id: 'hero', Comp: Hero },
        { id: 'about', Comp: About },
        { id: 'techfest', Comp: TechFestIntro },
        { id: 'techfest-events', Comp: TechFestEvents },
        { id: 'cultural', Comp: CulturalFest },
        { id: 'cultural-events', Comp: CulturalEvents },
        // { id: 'sponsors', Comp: Sponsors }, // Commented out for now
        { id: 'history', Comp: History },
        { id: 'team', Comp: Team },
        { id: 'countdown', Comp: Countdown },
        { id: 'contact', Comp: Contact }
    ];

    const sectionRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    // Use ref to track activeIndex for event handlers (avoids stale closures)
    const activeIndexRef = useRef(0);
    const isTransitioning = useRef(false);
    const lastTransitionTime = useRef(0);
    const isInitialized = useRef(false);
    const transitionTimerRef = useRef(null); // Track pending transition timeout
    const internalScrollActiveRef = useRef(false); // Track if section is handling internal scroll
    const TRANSITION_COOLDOWN = 550; // Match CSS transition duration (500ms) + buffer

    // Scroll Accumulator refs to persist across renders
    const scrollAccumulatorRef = useRef(0);
    const lastScrollDirectionRef = useRef(0); // Track last scroll direction
    const scrollThreshold = 100; // Increased to prevent accidental triggers
    const scrollDebounceTimerRef = useRef(null);

    // Keep activeIndexRef in sync with activeIndex state
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    const getRef = (i) => sectionRefs.current[i];
    const getNode = (i) => {
        const r = getRef(i);
        return r?.el || r;
    };

    // Function to set initial classes - can be retried if refs not ready
    const setInitialClasses = useCallback((initialIndex) => {
        let allNodesFound = true;

        sectionsConfig.forEach((_, i) => {
            const node = getNode(i);
            if (!node) {
                allNodesFound = false;
                return;
            }
            node.classList.remove('dolly-active', 'dolly-ahead', 'dolly-behind', 'dolly-transitioning-in', 'dolly-transitioning-out');

            if (i < initialIndex) {
                node.classList.add('dolly-behind');
            } else if (i === initialIndex) {
                node.classList.add('dolly-active');
            } else {
                node.classList.add('dolly-ahead');
            }
        });

        return allNodesFound;
    }, [sectionsConfig]);

    // Initialize Initial Classes & Handle Hash
    useEffect(() => {
        if (isInitialized.current) return;

        // 1. Determine Initial Index from Hash
        let initialIndex = 0;
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const foundIndex = sectionsConfig.findIndex(s => s.id === hash);
            if (foundIndex !== -1) {
                initialIndex = foundIndex;
                setActiveIndex(foundIndex);
                activeIndexRef.current = foundIndex;
            }
        }

        // 2. Set Initial Classes - retry if refs not ready
        const trySetClasses = (attempts = 0) => {
            const success = setInitialClasses(initialIndex);
            if (!success && attempts < 10) {
                // Retry after a short delay if refs aren't mounted yet
                setTimeout(() => trySetClasses(attempts + 1), 50);
            } else if (success) {
                isInitialized.current = true;
                // Trigger fade-in for initial section immediately
                const initialSection = getNode(initialIndex);
                if (initialSection) {
                    const fadeElements = initialSection.querySelectorAll('.fade-in');
                    setTimeout(() => {
                        fadeElements.forEach(el => el.classList.add('visible'));
                    }, 100);
                }
            }
        };

        // Initial attempt with a small delay to let refs mount
        setTimeout(() => trySetClasses(0), 10);

        // 3. Update Header/Nav visibility if starting on non-hero
        if (initialIndex !== 0) {
            const globalHeader = document.getElementById('global-header-container');
            const headerNav = document.querySelector('.header-nav');
            if (globalHeader) globalHeader.classList.remove('hidden-on-hero');
            if (headerNav) {
                headerNav.classList.add('hidden');
                headerNav.style.opacity = '0';
                headerNav.style.pointerEvents = 'none';
            }
        }
    }, [setInitialClasses]);

    const dollyZoomToSection = useCallback((targetIndex, forceDirect = false) => {
        const currentIndex = activeIndexRef.current;
        const currentRef = getRef(currentIndex);

        // INTERCEPTION LOGIC - Skip if forceDirect is true (menu clicks)
        // Check if current section has internal scroll logic it wants to handle
        if (!forceDirect && currentRef && (currentRef.next || currentRef.prev)) {
            // Logic check
            if (targetIndex > currentIndex) { // Scrolling Next/Down
                if (currentRef.isFinished && !currentRef.isFinished()) {
                    // Section is not finished, let it handle the scroll
                    internalScrollActiveRef.current = true;
                    const consumed = currentRef.next();
                    if (consumed) {
                        lastTransitionTime.current = Date.now();
                        // Reset internal scroll flag after a delay
                        setTimeout(() => { internalScrollActiveRef.current = false; }, 200);
                        return; // Consumed - don't proceed to section transition
                    }
                    internalScrollActiveRef.current = false;
                }
                // If not consumed or section is finished, proceed to next section below
            } else if (targetIndex < currentIndex) { // Scrolling Prev/Up
                if (currentRef.isAtStart && !currentRef.isAtStart()) {
                    // Section is not at start, let it handle the scroll
                    internalScrollActiveRef.current = true;
                    const consumed = currentRef.prev();
                    if (consumed) {
                        lastTransitionTime.current = Date.now();
                        // Reset internal scroll flag after a delay
                        setTimeout(() => { internalScrollActiveRef.current = false; }, 200);
                        return; // Consumed - don't proceed to section transition
                    }
                    internalScrollActiveRef.current = false;
                }
                // If not consumed or section is at start, proceed to prev section below
            }
        }

        // For menu clicks (forceDirect), use instant navigation
        if (forceDirect) {
            _performInstantNavigation(targetIndex);
        } else {
            _performDollyZoom(targetIndex);
        }
    }, []);

    // Instant navigation - no animation, direct jump
    const _performInstantNavigation = useCallback((targetIndex) => {
        const currentIndex = activeIndexRef.current;
        if (targetIndex < 0 || targetIndex >= sectionsConfig.length) return;
        if (targetIndex === currentIndex) return;

        // Cancel any pending transition
        if (isTransitioning.current) {
            finishTransition();
        }

        // Immediately set all sections to correct state with no transitions
        sectionsConfig.forEach((_, i) => {
            const node = getNode(i);
            if (node) {
                node.classList.add('instant-transition');
                node.classList.remove('dolly-transitioning-in', 'dolly-transitioning-out', 'dolly-active', 'dolly-ahead', 'dolly-behind');

                if (i < targetIndex) {
                    node.classList.add('dolly-behind');
                } else if (i === targetIndex) {
                    node.classList.add('dolly-active');
                } else {
                    node.classList.add('dolly-ahead');
                }
            }
        });

        // Update state
        setActiveIndex(targetIndex);
        activeIndexRef.current = targetIndex;
        lastTransitionTime.current = Date.now();

        // Update header visibility
        const globalHeader = document.getElementById('global-header-container');
        const headerNav = document.querySelector('.header-nav');
        if (targetIndex === 0) {
            if (globalHeader) globalHeader.classList.add('hidden-on-hero');
            if (headerNav) {
                headerNav.classList.remove('hidden');
                headerNav.style.opacity = '1';
                headerNav.style.pointerEvents = 'auto';
            }
        } else {
            if (globalHeader) globalHeader.classList.remove('hidden-on-hero');
            if (headerNav) {
                headerNav.classList.add('hidden');
                headerNav.style.opacity = '0';
                headerNav.style.pointerEvents = 'none';
            }
        }

        // Re-enable transitions after a frame
        requestAnimationFrame(() => {
            sectionsConfig.forEach((_, i) => {
                const node = getNode(i);
                if (node) node.classList.remove('instant-transition');
            });
        });
    }, [sectionsConfig.length]);

    const _performDollyZoom = useCallback((targetIndex) => {
        const currentIndex = activeIndexRef.current;
        if (targetIndex < 0 || targetIndex >= sectionsConfig.length) return;
        if (targetIndex === currentIndex) return;

        // If already transitioning, queue is ignored - don't force complete
        // This prevents the "skip" issue when scrolling rapidly
        if (isTransitioning.current) {
            return; // Simply ignore - let current transition complete
        }

        const currentSection = getNode(currentIndex);
        const targetSection = getNode(targetIndex);

        // CRITICAL: Guard against null sections to prevent blank page
        if (!currentSection || !targetSection) {
            console.warn('ScrollController: Section not found, skipping transition');
            return;
        }

        isTransitioning.current = true;
        document.documentElement.classList.add('dolly-transitioning'); // global class

        const isZoomingIn = targetIndex > currentIndex;

        // Reset logic for specific sections when ENTERING
        const targetRef = getRef(targetIndex);
        if (targetRef && targetRef.reset) {
            targetRef.reset(isZoomingIn); // true = from top (start), false = from bottom (end)
        }

        // Toggle Global Header & Nav Visibility
        const globalHeader = document.getElementById('global-header-container');
        const headerNav = document.querySelector('.header-nav');

        if (targetIndex === 0) {
            // Hero Section: Show standard Nav, Hide Global Header
            if (globalHeader) globalHeader.classList.add('hidden-on-hero');
            if (headerNav) {
                headerNav.classList.remove('hidden');
                headerNav.style.opacity = '1';
                headerNav.style.pointerEvents = 'auto';
            }
        } else {
            // Other Sections: Hide standard Nav, Show Global Header
            if (globalHeader) globalHeader.classList.remove('hidden-on-hero');
            if (headerNav) {
                headerNav.classList.add('hidden');
                headerNav.style.opacity = '0';
                headerNav.style.pointerEvents = 'none';
            }
        }

        setActiveIndex(targetIndex); // React State update (triggers Nav update)

        // Classes
        if (isZoomingIn) {
            currentSection.classList.remove('dolly-active');
            currentSection.classList.add('dolly-transitioning-out');

            targetSection.classList.remove('dolly-ahead');
            targetSection.classList.add('dolly-transitioning-in');

            transitionTimerRef.current = setTimeout(() => {
                currentSection.classList.remove('dolly-transitioning-out');
                currentSection.classList.add('dolly-behind');

                targetSection.classList.remove('dolly-transitioning-in');
                targetSection.classList.add('dolly-active');

                finishTransition();
            }, 500); // Reduced from 700ms for snappier feel
        } else {
            currentSection.classList.remove('dolly-active');
            currentSection.classList.add('dolly-transitioning-in');

            targetSection.classList.remove('dolly-behind');
            targetSection.classList.add('dolly-transitioning-out');

            transitionTimerRef.current = setTimeout(() => {
                currentSection.classList.remove('dolly-transitioning-in');
                currentSection.classList.add('dolly-ahead');

                targetSection.classList.remove('dolly-transitioning-out');
                targetSection.classList.add('dolly-active');

                finishTransition();
            }, 500); // Reduced from 700ms for snappier feel
        }
    }, [sectionsConfig.length]);

    const finishTransition = () => {
        if (transitionTimerRef.current) {
            clearTimeout(transitionTimerRef.current);
            transitionTimerRef.current = null;
        }
        isTransitioning.current = false;
        lastTransitionTime.current = Date.now();
        document.documentElement.classList.remove('dolly-transitioning');
    };

    // FADE-IN ANIMATION TRIGGER LOGIC
    useEffect(() => {
        const activeSection = getNode(activeIndex);
        if (!activeSection) return;

        // Find all fade-in elements in CURRENT section and make them visible immediately
        const fadeElements = activeSection.querySelectorAll('.fade-in');
        fadeElements.forEach(el => el.classList.add('visible'));

        // Cleanup: remove visible from other sections
        sectionRefs.current.forEach((ref, i) => {
            if (i === activeIndex) return;
            const node = ref?.el || ref;
            if (node) {
                const hiddenFades = node.querySelectorAll('.fade-in');
                hiddenFades.forEach(el => el.classList.remove('visible'));
            }
        });
    }, [activeIndex]);

    // Event Listeners - use refs to avoid stale closures
    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            const now = Date.now();
            
            // Block scroll during transitions or cooldown
            if (isTransitioning.current || (now - lastTransitionTime.current < TRANSITION_COOLDOWN)) {
                scrollAccumulatorRef.current = 0;
                lastScrollDirectionRef.current = 0;
                if (scrollDebounceTimerRef.current) {
                    clearTimeout(scrollDebounceTimerRef.current);
                    scrollDebounceTimerRef.current = null;
                }
                return;
            }
            
            // Block scroll accumulation during internal section scrolling
            if (internalScrollActiveRef.current) {
                scrollAccumulatorRef.current = 0;
                lastScrollDirectionRef.current = 0;
                if (scrollDebounceTimerRef.current) {
                    clearTimeout(scrollDebounceTimerRef.current);
                    scrollDebounceTimerRef.current = null;
                }
                return;
            }

            // Determine scroll direction: 1 for down, -1 for up
            const currentDirection = e.deltaY > 0 ? 1 : -1;
            
            // If direction changed from last scroll, completely reset accumulator
            if (lastScrollDirectionRef.current !== 0 && currentDirection !== lastScrollDirectionRef.current) {
                scrollAccumulatorRef.current = 0;
                if (scrollDebounceTimerRef.current) {
                    clearTimeout(scrollDebounceTimerRef.current);
                }
            }
            
            // Update last direction
            lastScrollDirectionRef.current = currentDirection;

            // Accumulate scroll in current direction
            scrollAccumulatorRef.current += e.deltaY;

            // Check if threshold reached
            if (Math.abs(scrollAccumulatorRef.current) >= scrollThreshold) {
                const currentIdx = activeIndexRef.current;
                // Use the SIGN of the accumulator, not the direction variable
                // This ensures we use the actual accumulated direction
                const navigationDirection = scrollAccumulatorRef.current > 0 ? 1 : -1;
                
                // Reset accumulator and direction BEFORE calling to prevent double-triggers
                scrollAccumulatorRef.current = 0;
                lastScrollDirectionRef.current = 0;
                
                // Clear any pending debounce timer
                if (scrollDebounceTimerRef.current) {
                    clearTimeout(scrollDebounceTimerRef.current);
                    scrollDebounceTimerRef.current = null;
                }
                
                // Navigate
                dollyZoomToSection(currentIdx + navigationDirection);
                return; // Exit early after navigation
            }

            // Reset accumulator after 250ms of no scrolling (increased for stability)
            if (scrollDebounceTimerRef.current) {
                clearTimeout(scrollDebounceTimerRef.current);
            }
            scrollDebounceTimerRef.current = setTimeout(() => { 
                scrollAccumulatorRef.current = 0;
                lastScrollDirectionRef.current = 0;
                scrollDebounceTimerRef.current = null;
            }, 250);
        };

        const handleKey = (e) => {
            const now = Date.now();
            if (isTransitioning.current || (now - lastTransitionTime.current < TRANSITION_COOLDOWN)) return;
            if (internalScrollActiveRef.current) return; // Block during internal scroll

            const currentIdx = activeIndexRef.current;
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                dollyZoomToSection(currentIdx + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                dollyZoomToSection(currentIdx - 1);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKey);

        // Mobile Touch Support
        let touchStartY = 0;
        let touchStartTime = 0;
        const SWIPE_THRESHOLD = 50;
        const SWIPE_VELOCITY_THRESHOLD = 0.3;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        };

        const handleTouchEnd = (e) => {
            const now = Date.now();
            if (isTransitioning.current || (now - lastTransitionTime.current < TRANSITION_COOLDOWN)) return;
            if (internalScrollActiveRef.current) return; // Block during internal scroll

            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            const deltaTime = now - touchStartTime;
            const velocity = Math.abs(deltaY) / deltaTime;

            const currentIdx = activeIndexRef.current;
            if (Math.abs(deltaY) > SWIPE_THRESHOLD && velocity > SWIPE_VELOCITY_THRESHOLD) {
                if (deltaY > 0) {
                    // Swipe Up - Go to next section
                    dollyZoomToSection(currentIdx + 1);
                } else {
                    // Swipe Down - Go to previous section
                    dollyZoomToSection(currentIdx - 1);
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [dollyZoomToSection]); // Now using refs, so no need to rebind on activeIndex change

    return (
        <>
            {sectionsConfig.map(({ id, Comp }, i) => (
                <Comp key={id} ref={el => sectionRefs.current[i] = el} />
            ))}

            {/* VERTICAL NAV (Names) */}
            <div className={`vertical-nav ${activeIndex === 0 ? 'hidden' : ''}`}>
                {sectionsConfig.map((s, i) => {
                    // Map IDs to friendly names
                    const names = {
                        'hero': 'HOME',
                        'about': 'ABOUT',
                        'techfest': 'TECHFEST',
                        'techfest-events': 'TECH EVENTS',
                        'cultural': 'CULTURAL',
                        'cultural-events': 'CULT EVENTS',
                        'sponsors': 'SPONSORS',
                        'history': 'GALLERY',
                        'team': 'OUR TEAM',
                        'countdown': 'LAUNCH',
                        'contact': 'CONTACT'
                    };
                    const name = names[s.id] || s.id.toUpperCase();

                    return (
                        <div
                            key={i}
                            className={`vertical-nav-item ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => dollyZoomToSection(i, true)}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>

            {activeIndex === 0 && (
                null
            )}

            {/* Mobile Navigation */}
            <button
                className={`mobile-nav-toggle ${mobileNavOpen ? 'active' : ''}`}
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Toggle navigation menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div
                className={`mobile-nav-overlay ${mobileNavOpen ? 'visible' : ''}`}
                onClick={() => setMobileNavOpen(false)}
            ></div>

            <nav className={`mobile-nav-drawer ${mobileNavOpen ? 'open' : ''}`}>
                {sectionsConfig.map((s, i) => {
                    const names = {
                        'hero': 'Home',
                        'about': 'About Us',
                        'techfest': 'TechFest',
                        'techfest-events': 'Tech Events',
                        'cultural': 'Cultural Fest',
                        'cultural-events': 'Cultural Events',
                        'sponsors': 'Sponsors',
                        'history': 'Gallery',
                        'team': 'Our Team',
                        'countdown': 'Launch',
                        'contact': 'Contact'
                    };
                    const name = names[s.id] || s.id;

                    return (
                        <a
                            key={i}
                            className={`nav-item ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => {
                                dollyZoomToSection(i, true);
                                setMobileNavOpen(false);
                            }}
                        >
                            {name}
                        </a>
                    );
                })}
            </nav>
        </>
    );
};

export default ScrollController;
