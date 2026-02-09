import { motion, useScroll, useTransform } from "framer-motion";
import {
  SmartImage,
  MARQUEE_DATA,
  STUDENT_DATA,
  JURY_DATA,
  StockTicker,
  HeroVideoBackground,
  FilmGrain,
  MarketWatchSection,
  FAQSection,
  PosterSection,
} from "./shared";
import { useState, useEffect } from "react";

// ============================================================================
// HOOKS
// ============================================================================

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
}

// ============================================================================
// DESKTOP COMPONENT
// ============================================================================

const SITankDesktop = () => {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative w-full min-h-screen bg-[#120f0d] text-[#e8d5b5] font-serif overflow-hidden selection:bg-[#d4b483] selection:text-black">
      <FilmGrain />

      {/* HERO SECTION WITH CUSTOM VIDEO BACKGROUND */}
      <div className="relative min-h-screen flex flex-col pt-0 overflow-hidden">
        <HeroVideoBackground />
        <StockTicker speed={25} />

        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 px-4">
          <motion.div style={{ y: textY }}>
            <div className="mb-4 inline-block border border-[#d4b483] px-4 py-1 text-xs font-mono tracking-[0.3em] uppercase bg-[#2c241b]/80 backdrop-blur-sm">
              The Big Bull of Tech
            </div>

            <h1 className="text-[12vw] leading-[0.8] font-bold text-[#d4b483] drop-shadow-[4px_4px_0px_#5c4d3c] mb-6 tracking-tighter">
              SITank <span className="text-[12vw]">2.0</span>
            </h1>
          </motion.div>
        </div>

        <StockTicker direction="right" speed={30} />
      </div>

      <MarketWatchSection />


      <div className="relative z-20 bg-[#120f0d] border-t border-[#5c4d3c]">
        <div className="max-w-[1400px] mx-auto px-8 py-32">
          {/* JURY PANEL */}
          <div className="flex flex-col mb-40">
            <h2 className="text-center text-5xl font-bold text-[#d4b483] tracking-tighter mb-16">
              Jury Panel for SITank 2.0
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {JURY_DATA.map((jury, i) => (
                <div
                  key={i}
                  className="bg-[#1a1612] p-8 border border-[#5c4d3c] shadow-[10px_10px_0px_#2c241b] relative hover:bg-[#201c18] transition-colors flex flex-col h-full"
                >
                  {/* Featured Badge for Pitch to Get Rich participants */}
                  {(jury.name.includes("Rohit Chinchanikar") || jury.name.includes("Abhishek Sharma")) && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transform rotate-12 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] border-2 border-red-800">
                      ⭐ Featured in Pitch to Get Rich
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-6 flex-grow">
                    {/* Photo */}
                    <div className="flex-shrink-0">
                      <div className="w-48 h-48 bg-[#2c241b] border-4 border-[#d4b483] overflow-hidden flex items-center justify-center">
                        {jury.image ? (
                          <SmartImage
                            src={jury.image}
                            alt={jury.name}
                            fit="cover"
                            className="w-full h-full"
                            disableEffects
                          />
                        ) : (
                          <span className="text-6xl font-bold text-[#d4b483]">
                            {jury.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-[#d4b483] mb-1 min-h-[2.5rem] flex items-center">
                        {jury.name}
                      </h3>
                      <p className="text-xs text-[#d4b483] font-mono mb-3 uppercase tracking-wider border-b border-[#5c4d3c] pb-2 min-h-[3rem] flex items-center">
                        {jury.title}
                      </p>
                      <p className="text-sm text-[#a89070] leading-relaxed font-mono mb-4 text-justify flex-grow">
                        {jury.bio}
                      </p>

                      {/* Social Buttons */}
                      <div className="flex gap-4 mt-auto">
                        {jury.linkedin && (
                          <a
                            href={jury.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-6 py-3 bg-[#0077b5] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#005885] transition-all duration-300 border-2 border-[#0077b5] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                          >
                            <span className="relative z-10">LinkedIn</span>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Events under SITank 2.0 */}
          <div id="events" className="mb-40">
            <p className="text-center text-5xl font-bold text-[#d4b483] tracking-tighter mb-10">
              Events under SITank 2.0
            </p>
            <div className="grid md:grid-cols-2 gap-12 mx-20">
              <div className="bg-[#1a1612] p-10 border border-[#5c4d3c] shadow-[10px_10px_0px_#2c241b] relative flex flex-col">
                <h2 className="text-4xl font-bold mb-2 text-[#d4b483] uppercase tracking-widest border-b border-[#5c4d3c] pb-4 whitespace-nowrap">
                  Dalal Street
                </h2>
                <p className="text-xl font-mono mb-6 italic">
                  <span className="bg-[#d4b483] text-[#120f0d] px-2 py-1">(Pitch to Win)</span>
                </p>
                <div className="text-lg text-[#a89070] leading-relaxed font-mono mb-6 flex-grow">
                  <ul className="flex gap-2 flex-col list-disc pl-5">
                    <li>Investment Opportunity</li>
                    <li>Potential Seed Funding</li>
                    <li>Participation Certificate</li>
                    <li>Incubation Assistance</li>
                    <li>Mentoring and networking opportunity</li>
                  </ul>
                </div>

                {/* Pitch Template Section */}
                <div className="mb-6 bg-gradient-to-br from-[#2c241b] to-[#1a1612] p-6 border-2 border-[#d4b483] relative overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.5)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#d4b483] to-transparent"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-[#d4b483] mb-4 uppercase tracking-wider font-mono border-b-2 border-[#d4b483] pb-3 flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="8" y="12" width="8" height="2" fill="#120f0d" />
                        <rect x="8" y="16" width="8" height="2" fill="#120f0d" />
                      </svg>
                      Pitch Deck Presentation Template
                    </h3>
                    <div className="bg-[#1a1612] p-4 rounded border border-[#5c4d3c] shadow-inner">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[#d4b483] font-mono text-sm font-bold uppercase tracking-wider">Available Now</span>
                      </div>
                      <div className="space-y-2">
                        <a
                          href="https://docs.google.com/document/d/1p26_TSDH5ePrqzfLbAomqmx_tWJ9xGuB/edit?usp=sharing&ouid=110885176152714970567&rtpof=true&sd=true"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-[#a89070] hover:text-[#d4b483] transition-all duration-300 font-mono text-base leading-relaxed p-3 bg-[#2c241b] rounded border border-[#5c4d3c] hover:border-[#d4b483] hover:shadow-[4px_4px_0px_rgba(212,180,131,0.3)]"
                        >
                          <svg className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span className="flex-1">View Template</span>
                          <span className="text-[#d4b483] group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                        <a
                          href="https://docs.google.com/document/d/1p26_TSDH5ePrqzfLbAomqmx_tWJ9xGuB/export?format=docx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 text-[#a89070] hover:text-[#d4b483] transition-all duration-300 font-mono text-base leading-relaxed p-3 bg-[#2c241b] rounded border border-[#5c4d3c] hover:border-[#d4b483] hover:shadow-[4px_4px_0px_rgba(212,180,131,0.3)]"
                        >
                          <svg className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                          </svg>
                          <span className="flex-1">Download Template</span>
                          <span className="text-[#d4b483] group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://unstop.com/p/the-dalal-street-enthusia-50-symbiosis-institute-of-technology-nagpur-1633407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-[#d4b483] text-[#120f0d] font-mono font-bold uppercase tracking-widest hover:bg-[#c2a270] transition-all duration-300 border-2 border-[#d4b483] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] whitespace-nowrap inline-block text-center"
                >
                  Register Now
                </a>
              </div>
              <div className="bg-[#1a1612] p-10 border border-[#5c4d3c] shadow-[10px_10px_0px_#2c241b] relative flex flex-col">
                <h2 className="text-3xl font-bold mb-2 text-[#d4b483] uppercase tracking-widest border-b border-[#5c4d3c] pb-4 whitespace-nowrap">
                  The Boardroom Battle
                </h2>
                <p className="text-xl font-mono mb-6 italic">
                  <span className="bg-[#d4b483] text-[#120f0d] px-2 py-1">(Ideathon)</span>
                </p>
                <div className="text-lg text-[#a89070] leading-relaxed font-mono mb-6 flex-grow">
                  <ul className="flex gap-2 flex-col list-disc pl-5">
                    <li>Build solutions for realworld problem statements</li>
                    <li>Convert ideas into Minimum Viable Products</li>
                    <li>Compete on innovation + execution</li>
                    <li>Learn how startups are actually built</li>
                  </ul>
                </div>
                {/* Problem Statements Section */}
                <div className="mb-6 bg-gradient-to-br from-[#2c241b] to-[#1a1612] p-6 border-2 border-[#d4b483] relative overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,0.5)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#d4b483] to-transparent"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-[#d4b483] mb-4 uppercase tracking-wider font-mono border-b-2 border-[#d4b483] pb-3 flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="8" y="12" width="8" height="2" fill="#120f0d" />
                        <rect x="8" y="16" width="8" height="2" fill="#120f0d" />
                      </svg>
                      Problem Statements
                    </h3>
                    <div className="bg-[#1a1612] p-4 rounded border border-[#5c4d3c] shadow-inner">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[#d4b483] font-mono text-sm font-bold uppercase tracking-wider">Available Now</span>
                      </div>
                      <a
                        href="https://drive.google.com/drive/folders/1RxdLbIw8zekfkaVHBSkidO1xcerwLSqB?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-[#a89070] hover:text-[#d4b483] transition-all duration-300 font-mono text-base leading-relaxed p-3 bg-[#2c241b] rounded border border-[#5c4d3c] hover:border-[#d4b483] hover:shadow-[4px_4px_0px_rgba(212,180,131,0.3)]"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📁</span>
                        <span className="flex-1">Click here to View Problem Statements</span>
                        <span className="text-[#d4b483] group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  href="https://unstop.com/competitions/the-boardroom-battle-enthusia-50-symbiosis-institute-of-technology-nagpur-1632127"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-[#d4b483] text-[#120f0d] font-mono font-bold uppercase tracking-widest hover:bg-[#c2a270] transition-all duration-300 border-2 border-[#d4b483] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] whitespace-nowrap inline-block text-center"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>


          {/* IN COLLABORATION WITH */}
          <div className="mb-40">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#d4b483] tracking-tighter">
                In Collaboration with
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="bg-[#1a1612] p-8 border-2 border-[#d4b483] shadow-[8px_8px_0px_#2c241b] relative group hover:shadow-[12px_12px_0px_#2c241b] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video bg-[#2c241b] border border-[#5c4d3c] flex items-center justify-center mb-4">
                  <SmartImage
                    src="./images/sponsor/Harrier.webp"
                    alt="Harrier Information Systems"
                    fit="contain"
                    className="w-full h-full p-4"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#d4b483] text-center font-mono">
                  Harrier Information Systems<br />Pvt. Ltd.
                </h3>
              </div>
              <div className="bg-[#1a1612] p-8 border-2 border-[#d4b483] shadow-[8px_8px_0px_#2c241b] relative group hover:shadow-[12px_12px_0px_#2c241b] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video bg-[#2c241b] border border-[#5c4d3c] flex items-center justify-center mb-4">
                  <SmartImage
                    src="./images/sponsor/Incubein Foundation.webp"
                    alt="INCUBEIN FOUNDATION"
                    fit="contain"
                    className="w-full h-full p-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#d4b483] text-center font-mono">
                  INCUBEIN FOUNDATION
                </h3>
              </div>
              <div className="bg-[#1a1612] p-8 border-2 border-[#d4b483] shadow-[8px_8px_0px_#2c241b] relative group hover:shadow-[12px_12px_0px_#2c241b] hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-video bg-[#2c241b] border border-[#5c4d3c] flex items-center justify-center mb-4">
                  <SmartImage
                    src="./images/sponsor/insterra.webp"
                    alt="Pragmatyc Pvt. Ltd."
                    fit="contain"
                    className="w-full h-full p-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#d4b483] text-center font-mono">
                  Insterra by Pragmatyc Global Pvt. Ltd.
                </h3>
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS MARQUEE */}
          <div className="mb-40 overflow-hidden">
            <h2 className="text-center text-5xl font-bold mb-4 text-[#d4b483] uppercase tracking-tighter">
              Event Highlights
            </h2>

            <div className="w-full relative border-y-4 border-[#2c241b] bg-black py-8 min-h-[300px]">
              <div
                className="flex gap-8 will-change-transform"
                style={{
                  width: 'max-content',
                  animation: 'scroll 30s linear infinite',
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
              >
                {MARQUEE_DATA.map((img, idx) => (
                  <div
                    key={`highlight-${idx}-${img.index}`}
                    className="relative w-80 aspect-[4/3] bg-white p-2 flex-shrink-0"
                    style={{ boxShadow: '5px 5px 15px rgba(0,0,0,0.5)' }}
                  >
                    <div className="h-full w-full relative overflow-hidden bg-[#2c241b] border border-[#5c4d3c]">
                      <img
                        src={`./images/sitank/${img.index}.${img.ext}`}
                        alt={`Event Highlight ${img.index}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        style={{ transform: 'translateZ(0)' }}
                      />
                    </div>
                    <div
                      className="absolute -top-3 left-1/2 w-24 h-8 bg-[#d4b483]"
                      style={{
                        transform: 'translateX(-50%) rotate(1deg)',
                        opacity: 0.8
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 left-0 h-full w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #120f0d, transparent)' }}></div>
              <div className="absolute top-0 right-0 h-full w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #120f0d, transparent)' }}></div>

              <style dangerouslySetInnerHTML={{
                __html: `
                  @keyframes scroll {
                    0% {
                      transform: translateX(0) translateZ(0);
                    }
                    100% {
                      transform: translateX(-50%) translateZ(0);
                    }
                  }
                `
              }} />
            </div>
          </div>

          {/* TEAM */}
          <div className="mb-40">
            <h2 className="text-center text-5xl font-bold mb-16 text-[#d4b483] uppercase tracking-tighter">
              Our Team
            </h2>
            <div className="flex flex-wrap justify-center gap-10 mb-20">
              {STUDENT_DATA.map((f, i) => (
                <div
                  key={i}
                  className="w-80 bg-[#e8d5b5] text-[#120f0d] p-6 shadow-[8px_8px_0px_#5c4d3c] border-2 border-[#120f0d] text-center"
                >
                  <div className="w-full h-64 mx-auto bg-[#120f0d] border-4 border-[#120f0d] overflow-hidden flex items-center justify-center text-4xl font-bold text-[#d4b483] mb-4">
                    {f.image ? (
                      <SmartImage
                        src={f.image}
                        alt={f.name}
                        fit="cover"
                        className="w-full h-full"
                        disableEffects
                      />
                    ) : (
                      f.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-lg font-bold uppercase">{f.name}</h3>
                  <p className="text-xs font-mono font-bold mt-1 uppercase border-t border-black pt-2">
                    {f.role}
                  </p>
                  <p className="text-sm font-mono mt-2 text-[#120f0d]/80">
                    {f.phone}
                  </p>
                  <p className="text-[10px] font-mono mt-1 text-[#120f0d]/70">
                    {f.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <FAQSection />

          {/* POSTER */}
          <PosterSection />


          {/* CONTACT US */}
          <div className="py-20 border-t border-[#5c4d3c]">
            <h2 className="text-6xl font-bold text-[#d4b483] mb-4 tracking-tighter text-center font-serif">
              GET IN TOUCH
            </h2>
            <p className="text-center text-[#a89070] font-mono text-sm mb-16 tracking-widest">
              WE'D LOVE TO HEAR FROM YOU
            </p>

            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Left Side - Contact Info */}
              <div className="space-y-10">
                {/* Location */}
                <a
                  href="https://maps.app.goo.gl/y2X4JBUimM2TxSU99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 items-start group cursor-pointer"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-[#d4b483]/20 border-2 border-[#d4b483] flex items-center justify-center text-[#d4b483] group-hover:bg-[#d4b483]/30 transition-colors">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-sm font-bold text-[#d4b483] mb-2 uppercase tracking-widest font-mono">
                      Location
                    </h3>
                    <p className="text-[#a89070] group-hover:text-[#d4b483] transition-colors leading-relaxed font-serif">
                      Symbiosis Institute of Technology
                      <br />
                      Nagpur, Maharashtra, India
                    </p>
                  </div>
                </a>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#d4b483]/20 border-2 border-[#d4b483] flex items-center justify-center text-[#d4b483]">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-sm font-bold text-[#d4b483] mb-2 uppercase tracking-widest font-mono">
                      Email
                    </h3>
                    <a
                      href="mailto:ecell@sitnagpur.siu.edu.in"
                      className="text-[#a89070] hover:text-[#d4b483] transition-colors font-serif break-all"
                    >
                      ecell@sitnagpur.siu.edu.in
                    </a>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#d4b483]/20 border-2 border-[#d4b483] flex items-center justify-center text-[#d4b483]">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-sm font-bold text-[#d4b483] mb-2 uppercase tracking-widest font-mono">
                      Connect
                    </h3>
                    <div className="text-[#a89070] space-y-1">
                      <p><span className="font-serif">Krutik Gajbhiye:</span> <span className="font-sans">+91 9960225056</span></p>
                      <p><span className="font-serif">Tanay Kothari:</span> <span className="font-sans">+91 9975578363</span></p>
                      <p><span className="font-serif">Ojas Charjan:</span> <span className="font-sans">+91 9529319989</span></p>
                      <p><span className="font-serif">Kunjal Pise:</span> <span className="font-sans">+91 7709728775</span></p>
                      <p><span className="font-serif">Varun Mundhada:</span> <span className="font-sans">+91 9347355900</span></p>
                      <p><span className="font-serif">Parth Tiwaskar:</span> <span className="font-sans">+91 91123 74118</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-[#1a1612] p-10 border border-[#d4b483]">
                <form
                  action="https://formsubmit.co/ecell@sitnagpur.siu.edu.in"
                  method="POST"
                  className="space-y-6"
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission - SITank 2.0" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value="https://sitank-2-0.vercel.app/" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        required
                        className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject..."
                      required
                      className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Write your message here..."
                      required
                      className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#d4b483] text-[#120f0d] font-mono font-bold uppercase tracking-widest hover:bg-[#c2a270] transition-all duration-300 border-2 border-[#d4b483] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    ✉ Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// ============================================================================
// MOBILE COMPONENT
// ============================================================================

const SITankMobile = () => {
  return (
    <section className="relative min-h-screen bg-[#120f0d] text-[#e8d5b5] font-serif overflow-hidden selection:bg-[#d4b483] selection:text-black">
      <FilmGrain />

      {/* MOBILE HERO WITH VIDEO BG */}
      <div className="relative min-h-screen flex flex-col pt-0 overflow-hidden">
        <HeroVideoBackground />
        <StockTicker speed={15} />

        <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 px-6">
          <div className="mb-4 inline-block border border-[#d4b483] px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase bg-[#2c241b]/80 backdrop-blur-sm">
            The Big Bull of Tech
          </div>

          <h1 className="text-[18vw] leading-[0.8] font-bold text-[#d4b483] drop-shadow-[4px_4px_0px_#5c4d3c] mb-8 tracking-tighter whitespace-nowrap">
            SITank <span className="text-[18vw]">2.0</span>
          </h1>
        </div>

        <StockTicker direction="right" speed={20} />
      </div>

      <MarketWatchSection />

      <div className="relative z-20 bg-[#120f0d] border-t border-[#5c4d3c]">
        <div className="px-4 py-16">

          {/* Highlights (Mobile Marquee) */}
          <div className="mb-12 -mx-4 overflow-hidden">
            <h2 className="text-2xl font-bold text-[#d4b483] mb-6 font-mono border-l-4 border-green-500 pl-3 ml-4">Event Highlights</h2>
            <div className="bg-black py-6 border-y-2 border-[#2c241b] min-h-[200px] relative">
              <div
                className="flex gap-4 will-change-transform"
                style={{
                  width: 'max-content',
                  animation: 'scroll 20s linear infinite',
                  transform: 'translateZ(0)', // Force hardware acceleration
                }}
              >
                {MARQUEE_DATA.map((img, idx) => (
                  <div
                    key={`mobile-highlight-${idx}-${img.index}`}
                    className="w-64 aspect-video bg-white p-1 flex-shrink-0"
                    style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}
                  >
                    <div className="h-full w-full bg-[#2c241b] border border-[#5c4d3c] relative overflow-hidden">
                      <img
                        src={`./images/sitank/${img.index}.${img.ext}`}
                        alt={`Event Highlight ${img.index}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        style={{ transform: 'translateZ(0)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <style dangerouslySetInnerHTML={{
                __html: `
                                @keyframes scroll {
                                    0% {
                                        transform: translateX(0) translateZ(0);
                                    }
                                    100% {
                                        transform: translateX(-50%) translateZ(0);
                                    }
                                }
                            `
              }} />
            </div>
          </div>


          {/* JURY PANEL */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#d4b483] mb-6 font-mono border-l-4 border-yellow-500 pl-3">Jury Panel</h2>
            <div className="space-y-6">
              {JURY_DATA.map((jury, i) => (
                <div key={i} className="bg-[#1a1612] p-6 border border-[#5c4d3c] shadow-[8px_8px_0px_#2c241b] relative">
                  {/* Featured Badge for Pitch to Get Rich participants */}
                  {(jury.name.includes("Rohit Chinchanikar") || jury.name.includes("Abhishek Sharma")) && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transform rotate-12 shadow-[3px_3px_0px_rgba(0,0,0,0.8)] border-2 border-red-800">
                      ⭐ Featured in Pitch to Get Rich
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-32 h-32 bg-[#2c241b] border-4 border-[#d4b483] overflow-hidden flex items-center justify-center mb-3">
                      {jury.image ? (
                        <SmartImage src={jury.image} alt={jury.name} fit="cover" className="w-full h-full" disableEffects />
                      ) : (
                        <span className="text-4xl font-bold text-[#d4b483]">{jury.name.charAt(0)}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#d4b483]">{jury.name}</h3>
                    <p className="text-xs text-[#d4b483] font-mono uppercase tracking-wider mt-1">{jury.title}</p>
                  </div>
                  <p className="text-sm text-[#a89070] leading-relaxed font-mono mb-4 text-justify min-h-[200px]">{jury.bio}</p>
                  <div className="flex gap-3 justify-center">
                    {jury.linkedin && (
                      <a
                        href={jury.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#0077b5] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#005885] transition-all border-2 border-[#0077b5] shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events under SITank 2.0 */}
          <div id="events-mobile" className="mb-12">
            <h2 className="text-2xl font-bold text-[#d4b483] mb-6 font-mono border-l-4 border-blue-500 pl-3">Events under SITank 2.0</h2>
            <div className="space-y-6">
              <div className="bg-[#1a1612] p-6 border border-[#5c4d3c] shadow-[8px_8px_0px_#2c241b]">
                <h3 className="text-2xl font-bold mb-2 text-[#d4b483] uppercase tracking-widest border-b border-[#5c4d3c] pb-3">Dalal Street</h3>
                <p className="text-lg text-[#a89070] font-mono mb-4 italic">(Pitch to Win)</p>
                <div className="text-base text-[#a89070] leading-relaxed font-mono mb-4">
                  <ul className="flex gap-2 flex-col list-disc pl-5">
                    <li>Investment Opportunity</li>
                    <li>Potential Seed Funding</li>
                    <li>Participation Certificate</li>
                    <li>Incubation Assistance</li>
                    <li>Mentoring and networking opportunity</li>
                  </ul>
                </div>

                {/* Pitch Template Section */}
                <div className="mb-4 bg-gradient-to-br from-[#2c241b] to-[#1a1612] p-4 border-2 border-[#d4b483] relative overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#d4b483] to-transparent"></div>

                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-[#d4b483] mb-3 uppercase tracking-wider font-mono border-b-2 border-[#d4b483] pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="8" y="12" width="8" height="2" fill="#120f0d" />
                        <rect x="8" y="16" width="8" height="2" fill="#120f0d" />
                      </svg>
                      Pitch Template
                    </h4>
                    <div className="bg-[#1a1612] p-3 rounded border border-[#5c4d3c] shadow-inner">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[#d4b483] font-mono text-xs font-bold uppercase tracking-wider">Available Now</span>
                      </div>
                      <div className="space-y-2">
                        <a
                          href="https://docs.google.com/document/d/1p26_TSDH5ePrqzfLbAomqmx_tWJ9xGuB/edit?usp=sharing&ouid=110885176152714970567&rtpof=true&sd=true"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 text-[#a89070] hover:text-[#d4b483] transition-all duration-300 font-mono text-sm leading-relaxed p-2 bg-[#2c241b] rounded border border-[#5c4d3c] hover:border-[#d4b483] hover:shadow-[3px_3px_0px_rgba(212,180,131,0.3)]"
                        >
                          <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span className="flex-1">View Template</span>
                          <span className="text-[#d4b483] group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                        <a
                          href="https://docs.google.com/document/d/1p26_TSDH5ePrqzfLbAomqmx_tWJ9xGuB/export?format=docx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2 text-[#a89070] hover:text-[#d4b483] transition-all duration-300 font-mono text-sm leading-relaxed p-2 bg-[#2c241b] rounded border border-[#5c4d3c] hover:border-[#d4b483] hover:shadow-[3px_3px_0px_rgba(212,180,131,0.3)]"
                        >
                          <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                          </svg>
                          <span className="flex-1">Download</span>
                          <span className="text-[#d4b483] group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://unstop.com/p/the-dalal-street-enthusia-50-symbiosis-institute-of-technology-nagpur-1633407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-[#d4b483] text-[#120f0d] font-mono font-bold uppercase tracking-widest hover:bg-[#c2a270] transition-all border-2 border-[#d4b483] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] inline-block text-center"
                >
                  Register Now
                </a>
              </div>

              <div className="bg-[#1a1612] p-6 border border-[#5c4d3c] shadow-[8px_8px_0px_#2c241b]">
                <h3 className="text-2xl font-bold mb-2 text-[#d4b483] uppercase tracking-widest border-b border-[#5c4d3c] pb-3">The Boardroom Battle</h3>
                <p className="text-lg text-[#a89070] font-mono mb-4 italic">(Ideathon)</p>
                <div className="text-base text-[#a89070] leading-relaxed font-mono mb-4">
                  <ul className="flex gap-2 flex-col list-disc pl-5">
                    <li>Build solutions for realworld problem statements</li>
                    <li>Convert ideas into Minimum Viable Products</li>
                    <li>Compete on innovation + execution</li>
                    <li>Learn how startups are actually built</li>
                  </ul>
                </div>

                {/* Problem Statements Section */}
                <div className="mb-4 bg-gradient-to-br from-[#2c241b] to-[#1a1612] p-4 border-2 border-[#d4b483] relative overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#d4b483] to-transparent"></div>

                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-[#d4b483] mb-3 uppercase tracking-wider font-mono border-b-2 border-[#d4b483] pb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
                        <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="8" y="12" width="8" height="2" fill="#120f0d" />
                        <rect x="8" y="16" width="8" height="2" fill="#120f0d" />
                      </svg>
                      Problem Statements
                    </h4>
                    <div className="bg-[#1a1612] p-3 rounded border border-[#5c4d3c] shadow-inner">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[#d4b483] font-mono text-xs font-bold uppercase tracking-wider">Available Now</span>
                      </div>
                      <a
                        href="https://drive.google.com/drive/folders/1RxdLbIw8zekfkaVHBSkidO1xcerwLSqB?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-[#a89070] hover:text-[#d4b483] transition-all duration-300 font-mono text-sm leading-relaxed p-2 bg-[#2c241b] rounded border border-[#5c4d3c] hover:border-[#d4b483] hover:shadow-[3px_3px_0px_rgba(212,180,131,0.3)]"
                      >
                        <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        <span className="flex-1">Download Statements</span>
                        <span className="text-[#d4b483] group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="https://unstop.com/competitions/the-boardroom-battle-enthusia-50-symbiosis-institute-of-technology-nagpur-1632127"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-[#d4b483] text-[#120f0d] font-mono font-bold uppercase tracking-widest hover:bg-[#c2a270] transition-all border-2 border-[#d4b483] shadow-[4px_4px_0px_rgba(0,0,0,0.8)] inline-block text-center"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>


          {/* IN COLLABORATION WITH */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#d4b483] tracking-tighter">In Collaboration with</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1a1612] p-6 border-2 border-[#d4b483] shadow-[6px_6px_0px_#2c241b]">
                <div className="aspect-video bg-[#2c241b] border border-[#5c4d3c] flex items-center justify-center mb-3">
                  <SmartImage src="./images/sponsor/Harrier.webp" alt="Harrier Information Systems" fit="contain" className="w-full h-full p-4" />
                </div>
                <h3 className="text-base font-bold text-[#d4b483] text-center font-mono">Harrier Information Systems<br />Pvt. Ltd.</h3>
              </div>
              <div className="bg-[#1a1612] p-6 border-2 border-[#d4b483] shadow-[6px_6px_0px_#2c241b]">
                <div className="aspect-video bg-[#2c241b] border border-[#5c4d3c] flex items-center justify-center mb-3">
                  <SmartImage src="./images/sponsor/Incubein Foundation.webp" alt="INCUBEIN FOUNDATION" fit="contain" className="w-full h-full p-4" />
                </div>
                <h3 className="text-base font-bold text-[#d4b483] text-center font-mono">INCUBEIN FOUNDATION</h3>
              </div>
              <div className="bg-[#1a1612] p-6 border-2 border-[#d4b483] shadow-[6px_6px_0px_#2c241b]">
                <div className="aspect-video bg-[#2c241b] border border-[#5c4d3c] flex items-center justify-center mb-3">
                  <SmartImage src="./images/sponsor/insterra.webp" alt="Insterra by Pragmatyc Global Pvt. Ltd." fit="contain" className="w-full h-full p-4" />
                </div>
                <h3 className="text-base font-bold text-[#d4b483] text-center font-mono">Insterra by Pragmatyc Global Pvt. Ltd.</h3>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#d4b483] mb-6 font-mono border-l-4 border-red-500 pl-3">Our Team</h2>
            <div className="space-y-3">
              {STUDENT_DATA.map((f, i) => (
                <div key={i} className="bg-[#e8d5b5] text-[#120f0d] p-4 shadow-[6px_6px_0px_#5c4d3c] border-2 border-[#120f0d] flex items-center gap-4">
                  <div className="w-24 h-24 bg-[#120f0d] border-4 border-[#120f0d] overflow-hidden flex items-center justify-center text-2xl font-bold text-[#d4b483] flex-shrink-0">
                    {f.image ? (
                      <SmartImage src={f.image} alt={f.name} fit="cover" className="w-full h-full" disableEffects />
                    ) : (
                      f.name.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold uppercase">{f.name}</h3>
                    <p className="text-xs font-mono font-bold mt-1 uppercase">{f.role}</p>
                    <p className="text-xs font-mono mt-1 text-[#120f0d]/80">{f.phone}</p>
                    <p className="text-[9px] font-mono mt-1 text-[#120f0d]/70 break-all leading-tight">{f.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <FAQSection />
          </div>

          {/* POSTER */}
          <div className="mb-12">
            <PosterSection />
          </div>

          {/* CONTACT US */}
          <div className="py-12 border-t border-[#5c4d3c]">
            <h2 className="text-3xl font-bold text-[#d4b483] mb-3 tracking-tighter text-center font-serif">GET IN TOUCH</h2>
            <p className="text-center text-[#a89070] font-mono text-xs mb-8 tracking-widest">WE'D LOVE TO HEAR FROM YOU</p>

            <div className="space-y-8">
              {/* Contact Info */}
              <div className="space-y-6">
                {/* Location */}
                <a
                  href="https://maps.app.goo.gl/y2X4JBUimM2TxSU99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-start group cursor-pointer bg-[#1a1612] p-4 border border-[#5c4d3c]"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#d4b483]/20 border-2 border-[#d4b483] flex items-center justify-center text-[#d4b483]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xs font-bold text-[#d4b483] mb-1 uppercase tracking-widest font-mono">Location</h3>
                    <p className="text-sm text-[#a89070] group-hover:text-[#d4b483] transition-colors leading-relaxed font-serif">
                      Symbiosis Institute of Technology<br />
                      Nagpur, Maharashtra, India
                    </p>
                  </div>
                </a>

                {/* Email */}
                <div className="flex gap-3 items-start bg-[#1a1612] p-4 border border-[#5c4d3c]">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#d4b483]/20 border-2 border-[#d4b483] flex items-center justify-center text-[#d4b483]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xs font-bold text-[#d4b483] mb-1 uppercase tracking-widest font-mono">Email</h3>
                    <a
                      href="mailto:ecell@sitnagpur.siu.edu.in"
                      className="text-sm text-[#a89070] hover:text-[#d4b483] transition-colors font-serif break-all"
                    >
                      ecell@sitnagpur.siu.edu.in
                    </a>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex gap-3 items-start bg-[#1a1612] p-4 border border-[#5c4d3c]">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#d4b483]/20 border-2 border-[#d4b483] flex items-center justify-center text-[#d4b483]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xs font-bold text-[#d4b483] mb-1 uppercase tracking-widest font-mono">Connect</h3>
                    <div className="text-sm text-[#a89070] space-y-1">
                      <p><span className="font-serif">Krutik Gajbhiye:</span> <span className="font-sans">+91 9960225056</span></p>
                      <p><span className="font-serif">Tanay Kothari:</span> <span className="font-sans">+91 9975578363</span></p>
                      <p><span className="font-serif">Ojas Charjan:</span> <span className="font-sans">+91 9529319989</span></p>
                      <p><span className="font-serif">Kunjal Pise:</span> <span className="font-sans">+91 7709728775</span></p>
                      <p><span className="font-serif">Varun Mundhada:</span> <span className="font-sans">+91 9347355900</span></p>
                      <p><span className="font-serif">Parth Tiwaskar:</span> <span className="font-sans">+91 91123 74118</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#1a1612] p-6 border border-[#d4b483]">
                <form
                  action="https://formsubmit.co/ecell@sitnagpur.siu.edu.in"
                  method="POST"
                  className="space-y-4"
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission - SITank 2.0" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value="https://sitank-2-0.vercel.app/" />

                  <div>
                    <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      required
                      className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject..."
                      required
                      className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#d4b483] font-mono uppercase tracking-wider mb-2">Your Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="Write your message here..."
                      required
                      className="w-full bg-transparent border-b-2 border-[#5c4d3c] px-0 py-2 text-[#e8d5b5] font-serif focus:border-[#d4b483] focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#d4b483] text-[#120f0d] font-mono font-bold uppercase tracking-widest hover:bg-[#c2a270] transition-all border-2 border-[#d4b483] shadow-[4px_4px_0px_rgba(0,0,0,0.8)]"
                  >
                    ✉ Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN EXPORT - Responsive Component
// ============================================================================

export const SITank = () => {
  const { isMobile } = useBreakpoint();

  return isMobile ? <SITankMobile /> : <SITankDesktop />;
};
