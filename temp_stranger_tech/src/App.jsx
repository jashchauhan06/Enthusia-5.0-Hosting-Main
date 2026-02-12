import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';

// Components
import ScrollProgress from './components/Common/ScrollProgress';
import RedCloudsBg from './components/Common/RedCloudsBg';

import RegisterButton from './components/Common/RegisterButton';
import AudioControl from './components/Common/AudioControl';
import Particles from './components/Common/Particles';
import Navbar from './components/Navbar/Navbar';
import MobileMenu from './components/Navbar/MobileMenu';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Challenges from './components/Challenges/Challenges';
import Countdown from './components/Countdown/Countdown';
import Gallery from './components/Gallery/Gallery';
import Comparison from './components/Comparison/Comparison';
import Team from './components/Team/Team';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import LoginModal from './components/Common/LoginModal';
import SectionDivider from './components/Common/SectionDivider';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Force scroll to top immediately and prevent scroll restoration
    window.history.scrollRestoration = 'manual';
    
    // Scroll to top multiple times to ensure it works
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Force scroll again after a short delay
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // Force scroll one more time after DOM is ready
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });

    // Refresh ScrollTrigger on window load
    const handleLoad = () => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 100);
      });
    };

    // Additional refresh for mobile devices after orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 500);
    };

    // Refresh on resize (debounced)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Disable animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion');
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Red Clouds Background */}
      <RedCloudsBg />



      {/* Registration Button */}
      <RegisterButton />

      {/* Audio Controls */}
      <AudioControl />

      {/* Particle Container */}
      <Particles />

      {/* Navigation */}
      <Navbar />

      {/* Mobile Fullscreen Menu Overlay */}
      <MobileMenu />

      {/* Hero Section with Image Sequence Scroll */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Challenge Pages */}
      <Challenges />

      {/* Countdown Section */}
      <Countdown />

      {/* Gallery Section */}
      <Gallery />

      {/* Section Divider */}
      <SectionDivider />

      {/* Comparison Section */}
      <Comparison />

      {/* Section Divider */}
      <SectionDivider />

      {/* Team Section */}
      <Team />

      {/* Section Divider */}
      <SectionDivider />

      {/* FAQ Section */}
      <FAQ />

      {/* Section Divider */}
      <SectionDivider />

      {/* Contact Section */}
      <Contact />

      {/* Section Divider */}
      <SectionDivider />

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal />
    </>
  );
}

export default App;
