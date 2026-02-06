import React, { useState } from "react";
import { motion } from "framer-motion";

// --- UTILITIES ---

export const SmartImage = ({
  src,
  alt,
  className,
  fit = "cover",
  disableEffects = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
  disableEffects?: boolean;
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (retryCount < 2) {
      // Retry loading the image up to 2 times
      setRetryCount(prev => prev + 1);
      setError(false);
      setLoaded(false);
      // Force reload by adding timestamp
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      img.src = `${src}?retry=${retryCount + 1}`;
    } else {
      setError(true);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#1a1612] w-full h-full ${className || ""}`}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c241b] via-[#3d3228] to-[#2c241b] animate-[shimmer_2s_infinite] z-10">
          <style>{`
            @keyframes shimmer {
              0% {
                background-position: -1000px 0;
              }
              100% {
                background-position: 1000px 0;
              }
            }
          `}</style>
        </div>
      )}
      
      {/* Error state with retry button */}
      {error && (
        <div className="absolute inset-0 bg-[#2c241b] flex flex-col items-center justify-center text-[#d4b483] z-20">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-xs font-mono mb-2">Image failed to load</div>
            <button 
              onClick={() => {
                setError(false);
                setRetryCount(0);
                setLoaded(false);
              }}
              className="text-xs bg-[#d4b483] text-[#120f0d] px-2 py-1 font-mono hover:bg-[#c2a270] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* 90s TV Scanline Effect Overlay - disabled for performance in marquee */}
      {!disableEffects && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay"></div>
      )}

      <img
        src={retryCount > 0 ? `${src}?retry=${retryCount}` : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full ${disableEffects ? "" : "sepia-[.3] contrast-125 hover:sepia-0"} ${
          fit === "contain" ? "object-contain p-2" : "object-cover"
        } ${loaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}
        loading="lazy"
      />
      {!disableEffects && (
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-10"></div>
      )}
    </div>
  );
};

// --- DATA ---
const HIGHLIGHTS_DATA = [
  { index: 1, ext: "webp" },
  { index: 2, ext: "webp" },
  { index: 3, ext: "webp" },
  { index: 4, ext: "webp" },
  { index: 5, ext: "webp" },
];
export const MARQUEE_DATA = [...HIGHLIGHTS_DATA, ...HIGHLIGHTS_DATA];

export const STUDENT_DATA = [
  {
    name: "Sunidhi Haware",
    role: "President (SRC)",
    image: "/images/team/Sunidhi.webp",
    email: "haware.vijaykumar.btech2023@sitnagpur.siu.edu.in",
  },
  {
    name: "Prathmesh Raipurkar",
    role: "Vice President (SRC)",
    image: "/images/team/Prathmesh.webp",
    email: "prathmesh.raipurkar.batch2024@sitnagpur.siu.edu.in",
  },
  {
    name: "Harsh Kumar",
    role: "Sponsorship",
    image: "/images/team/harsh.webp",
    email: "harsh.kumar.batch2024@sitnagpur.siu.edu.in",
  },
  {
    name: "Jash Chauhan",
    role: "Web Development Team Lead",
    image: "/images/team/Jash.webp",
    email: "jash.chauhan.batch2024@sitnagpur.siu.edu.in",
  },
  { name: "Soumya Mishra", 
    role: "Web Developer", 
    image: "/images/team/Soumya.webp",
    email: "soumya.mishra.batch2025@sitnagpur.siu.edu.in",
  },
  {
    name: "Krutik Gajbhiye",
    role: "Event Coordinator",
    image: "/images/team/Krutik Gajbhiye.webp",
    phone: "+91 99602 25056",
    email: "krutik.gajbhiye.btech2023@sitnagpur.siu.edu.in",
  },
  {
    name: "Tanay Kothari",
    role: "Event Coordinator",
    image: "/images/team/Tanay Kothari.webp",
    phone: "+91 99755 78363",
    email: "tanay.kothari.btech2023@sitnagpur.siu.edu.in",
  },
  { name: "Ojas Charjan", 
    role: "Event Coordinator", 
    image: "/images/team/Ojas.webp",
    phone: "+91 95293 19989",
    email: "charjan.abhijit.btech2023@sitnagpur.siu.edu.in",
  },
  {
    name: "Kunjal Pise",
    role: "Event Coordinator",
    image: "/images/team/Kunjal Pise.webp",
    phone: "+91 77097 28775",
    email: "kunjal.pise.btech2023@sitnagpur.siu.edu.in",
  },
  {
    name: "Varun Mundhada",
    role: "Event Coordinator",
    image: "/images/team/Varun Mundhada.webp",
    phone: "+91 93473 55900",
    email: "vaun.mundhada.btech2023@sitnagpur.siu.edu.in",
  },
  {
    name: "Parth Tiwaskar",
    role: "Event Coordinator",
    image: "/images/team/Parth Tiwaskar.webp",
    phone: "+91 9112374118",
    email: "parth.tiwaskar.batch2024@sitnagpur.siu.edu.in",
  },
];

export const JURY_DATA = [
  {
    name: "Mr. Amit Badiyani",
    title: "founder and Managing Director of Harrier Information Systems",
    bio: "Amit Arvind Badiyani is the Founder and Managing Director of Harrier Information Systems, a Nagpur‑headquartered IT services company focused on digital transformation for global financial‑services and healthcare clients. A seasoned technology entrepreneur, he specializes in building high‑performing teams and mission‑critical software products with expertise in cloud analytics.",
    image: "/images/jury/Amit Badiyani.webp",
    linkedin: "https://www.linkedin.com/in/amitbadiyani/",
  },
  {
    name: "Mr. Abhay Deshmukh",
    title: "Director Incubein Foundation",
    bio: "Abhay Deshmukh is an Assistant Professor at Nagpur University with a strong research background in advanced energy-storage materials and polymer nanocomposites. He is a co‑inventor on multiple patents related to asymmetric supercapacitor devices and microwave treatment of polymer and polymer/CNT nano‑composites, reflecting his expertise in cutting‑edge materials science and device engineering.",
    image: "/images/jury/Abhay Deshmukh.webp",
    linkedin: "https://www.linkedin.com/in/abhaydeshmukh/",
  },
  {
    name: "Mr. Rohit Chinchanikar",
    title: "Founder & CEO Vardistore",
    bio: "Rohit Chinchanikar is the founder of Vardi Store, India’s first military upcycling brand that transforms decommissioned defence uniforms into sustainable fashion and everyday products. With a background in impact‑driven businesses, he uses Vardi to blend patriotism, circular design, and support for veterans, and has showcased the brand’s purpose‑led story on platforms such as “Pitch to Get Rich.”",
    image: "/images/jury/Rohit Chinchanikar.webp",
    linkedin: "https://www.linkedin.com/in/rohit-chinchanikar-a7b3a0158/",
  },
  {
    name: "Mr. Akash Singh",
    title: "Vice President – Product Strategy and Growth at Pragmatyc",
    bio: "Akash Singh is the Vice President – Product Strategy and Growth at Pragmatyc, he leads initiatives at the intersection of product innovation, market strategy, and scalable growth. With over 16 years of experience across education, research, and policy analysis, he has helped build and scale EdTech platforms and content-driven startups in India.",
    image: "/images/jury/Akash Singh.webp",
    linkedin: "https://www.linkedin.com/in/aakash-singh-58479b96/",
  },
];

// --- THEMED COMPONENTS ---

// Stock Ticker
export const StockTicker = ({
  direction = "left",
  speed = 20,
}: {
  direction?: "left" | "right";
  speed?: number;
}) => (
  <div className="w-full overflow-hidden bg-[#2c241b] border-y border-[#5c4d3c] py-2 relative z-30">
    <motion.div
      className="flex whitespace-nowrap gap-12 font-mono text-sm tracking-widest text-[#d4b483]"
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <span>
            SITank 2.0 <span className="text-green-500">▲ ₹472.00</span>
          </span>
          <span>
            ROI <span className="text-green-500">▲ 100%</span>
          </span>
          <span>
            RISK <span className="text-red-500">▼ 0.00</span>
          </span>
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

// --- NEW COMPONENT: HERO VIDEO BACKGROUND ---
export const HeroVideoBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* 1. The Background Image */}
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat scale-105"
      style={{
        backgroundImage: "url('/images/bg.webp')",
        filter: "grayscale(100%) sepia(80%) contrast(1.2) brightness(0.6)",
      }}
    ></div>

    {/* 2. Texture Overlays for that "1992" Look */}
    <div className="absolute inset-0 bg-[#120f0d]/70 mix-blend-multiply"></div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-40"></div>
    <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
  </div>
);

// Film Grain Overlay
export const FilmGrain = () => (
  <div
    className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] mix-blend-overlay"
    style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/noise.png")`,
    }}
  ></div>
);

// --- MARKET WATCH SECTION (Secondary Video) ---
export const MarketWatchSection = () => {
  return (
    <div className="relative w-full min-h-[50vh] h-auto md:h-[70vh] overflow-hidden bg-black mt-16 mb-16">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-[#2c241b] via-[#1a1612] to-[#120f0d]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d] via-transparent to-[#120f0d]"></div>
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-[280px] h-[200px] md:w-[600px] md:h-[400px] bg-[#1a1612] p-2 shadow-[20px_20px_0px_rgba(0,0,0,0.5)] border border-[#5c4d3c] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <SmartImage 
                src="/images/about_photo.webp" 
                alt="SITank Event" 
                fit="cover" 
                className="w-full h-full"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 text-white font-mono text-xs font-bold animate-pulse shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                LIVE BROADCAST
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 border border-[#d4b483] text-[#d4b483] font-mono text-xs md:text-sm">
                Event_Photo
              </div>
            </div>
          </motion.div>

          <div className="bg-[#1a1612] p-10 shadow-[10px_10px_0px_#2c241b] relative">
            <h2 className="text-4xl font-bold mb-6 text-[#d4b483] tracking-widest border-b border-[#5c4d3c] pb-4">
              About SITank 2.0
            </h2>
            <p className="text-lg text-[#a89070] leading-relaxed font-mono mb-6 text-justify">
              SITank 2.0 is the flagship startup and innovation platform of the
              Entrepreneurship Cell, SIT Nagpur. Inspired by real-world venture
              capital ecosystems, SITank empowers students to ideate, validate,
              build, and pitch startup ideas with strong market potential.
            </p>
            <p className="text-lg text-[#a89070] leading-relaxed font-mono mb-4 text-justify">
              The event features two exciting competitions:
            </p>
            <div className="space-y-3 ml-4">
              <div className="bg-[#d4b483]/10 border-l-4 border-[#d4b483] pl-4 py-2">
                <span className="text-[#FF0000] font-bold text-xl">Dalal Street (Pitch to Win)</span>
              </div>
              <div className="bg-[#d4b483]/10 border-l-4 border-[#d4b483] pl-4 py-2">
                <span className="text-[#4ade80] font-bold text-xl">The Boardroom Battle (Ideathon)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FAQ DATA ---
export const FAQ_DATA = [
  {
    question: "What is the team size for SITank 2.0?",
    answer:
      "You can participate individually or in a team of up to 4 members. Collaboration is encouraged to strengthen your idea and pitch.",
  },
  {
    question: "Is there any registration fees?",
    answer:
      "Yes, there is a registration fee of ₹472.00/- per team for each event (Dalal Street and The Boardroom Battle).",
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "Open to all students who have a knack for building products and pitching efficiently.",
  },
  {
    question: "Is SITank 2.0 an offline or online event?",
    answer:
      "SITank 2.0 is an offline pitch event conducted at Symbiosis Institute of Technology, Nagpur.",
  },
  {
    question: "What is the event format?",
    answer:
      "Dalal Street (Pitch to Win):\nRound 1 - Shortlisting of the entries will be done by *5th February, 2026*.\nRound 2 - *Only Shortlisted startups* will be eligible to participate in the final event. Only shortlisted startups will pay the fees on or before *10th February, 2026*. They will present their startup pitch deck to a panel of judges.\n\nThe Boardroom Battle (Ideathon):\nTeams build solutions and pitch their MVPs on the day of the event. They will pay the fees on or before *10th February, 2026.*",
  },
  {
    question: "Do I need a registered startup to participate?",
    answer:
      "Non-registered startups also can participate.",
  },
  {
    question: "What kind of ideas are allowed?",
    answer:
      "Innovative ideas across technology, social impact, sustainability, healthcare, fintech, agritech, etc.",
  },
  {
    question: "Will participants receive mentorship or feedback?",
    answer:
      "Yes, expert feedback and guidance will be provided by the panel.",
  },
  {
    question: "Can teams participate in both events?",
    answer:
      "Yes, teams can participate in one or both events. However, if you want to participate in both Dalal Street and The Boardroom Battle, at least one team member must be different between the two events.",
  },
];

// --- FAQ COMPONENT ---
export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-40">
      <h2 className="text-center text-5xl font-bold mb-16 text-[#d4b483] uppercase tracking-tighter">
        Market Queries
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_DATA.map((faq, i) => (
          <div
            key={i}
            className="bg-[#1a1612] border border-[#5c4d3c] overflow-hidden transition-all duration-300 hover:border-[#d4b483]"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left p-6 flex justify-between items-center text-[#e8d5b5] font-mono font-bold hover:text-[#d4b483] transition-colors"
            >
              <span>
                <span className="text-[#d4b483] mr-4">0{i + 1}.</span>
                {faq.question}
              </span>
              <span
                className={`transform transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
            <div
              className={`px-6 text-[#a89070] font-sans leading-relaxed transition-all duration-300 ease-in-out whitespace-pre-line ${openIndex === i ? "max-h-96 py-4 border-t border-[#5c4d3c]" : "max-h-0 py-0"}`}
              style={{ overflow: "hidden" }}
              dangerouslySetInnerHTML={{
                __html: faq.answer.replace(/\*(.*?)\*/g, '<strong>$1</strong>')
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- POSTER COMPONENT ---
export const PosterSection = () => (
  <div className="mb-40">
    <div className="max-w-4xl mx-auto">
      <div className="relative border-4 border-[#d4b483] bg-[#1a1612] p-4 shadow-[12px_12px_0px_#2c241b] hover:shadow-[16px_16px_0px_#2c241b] hover:-translate-y-1 transition-all duration-300">
        <div className="absolute -top-4 -left-4 bg-[#d4b483] text-[#120f0d] px-4 py-2 font-mono font-bold text-sm uppercase shadow-[4px_4px_0px_black]">
          Official Poster
        </div>
        <SmartImage
          src="/images/sitank/poster.webp"
          alt="SITank 2.0 Poster"
          fit="contain"
          className="w-full"
        />
      </div>
    </div>
  </div>
);
