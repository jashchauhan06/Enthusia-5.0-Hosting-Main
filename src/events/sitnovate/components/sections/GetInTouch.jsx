import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Ornate Frame SVG Component (Consistent with other sections) ---
const OrnateFrame = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
            <linearGradient id="goldGradientContact" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#f4e4b8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#b8860b" stopOpacity="0.1" />
            </linearGradient>
        </defs>

        {/* Simplified Frame Border */}
        <path
            d="M 50,50 L 1550,50 L 1550,850 L 50,850 Z"
            fill="none"
            stroke="url(#goldGradientContact)"
            strokeWidth="1"
            opacity="0.3"
        />

        {/* Corner Accents */}
        <path d="M 50,150 L 50,50 L 150,50" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 1550,150 L 1550,50 L 1450,50" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 50,750 L 50,850 L 150,850" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 1550,750 L 1550,850 L 1450,850" stroke="#d4af37" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
);

// --- Icons (SVGs) ---
const Icons = {
    Location: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Email: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    Phone: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
        </svg>
    ),
    Instagram: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    ),
    Linkedin: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
    Twitter: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 14.6-5.5-4.6 1.5-7.9 3.2-6.9-.8-3.3-2-5-4.2-5.3L6.4 1" />
        </svg>
    ),
    Discord: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <path d="M7.5 7.5c3.5-1 5.5-1 9 0 1.5 5.5 1.5 10 0 13.5-3.5 1-5.5 1-9 0-1.5-3.5-1.5-8 0-13.5z" />
        </svg>
    ),
    Send: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="22" x2="11" y1="2" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    ),
    Check: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
};

// --- Contact Info Item Component ---
const ContactItem = ({ icon: Icon, title, lines, onClick }) => (
    <div 
        className={`flex items-start gap-5 group p-4 rounded-xl hover:bg-[#d4af37]/5 transition-colors duration-300 border border-transparent hover:border-[#d4af37]/10 ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
    >
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#0a0a12] border border-[#d4af37]/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300">
            <span className="text-[#d4af37] group-hover:text-[#ffecb3] transition-colors">
                <Icon />
            </span>
        </div>
        <div>
            <h4 className="font-cinzel text-[#d4af37] tracking-widest text-sm mb-2 uppercase opacity-80 group-hover:opacity-100 transition-opacity">{title}</h4>
            {lines.map((line, i) => (
                <p key={i} className="font-body text-[#c0c0c8] text-sm md:text-[16px] leading-relaxed group-hover:text-white transition-colors">{line}</p>
            ))}
        </div>
    </div>
);

// --- Form Input Component ---
const InputField = ({ label, name, type = "text", placeholder, isTextArea = false, required = true }) => (
    <div className="flex flex-col gap-2 group">
        <label className="font-cinzel text-[11px] text-[#d4af37] tracking-[0.2em] uppercase ml-1 opacity-70 group-focus-within:opacity-100 transition-opacity">{label}</label>
        {isTextArea ? (
            <textarea
                name={name}
                rows="4"
                placeholder={placeholder}
                required={required}
                className="w-full bg-[#05050a] border border-[#d4af37]/10 rounded-lg px-4 py-3 text-[#e0e0e0] font-body text-base placeholder-[#444] focus:outline-none focus:border-[#d4af37]/40 focus:bg-[#08080f] focus:shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all resize-none"
            />
        ) : (
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full bg-[#05050a] border border-[#d4af37]/10 rounded-lg px-4 py-3 text-[#e0e0e0] font-body text-base placeholder-[#444] focus:outline-none focus:border-[#d4af37]/40 focus:bg-[#08080f] focus:shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all"
            />
        )}
    </div>
);

export default function GetInTouch() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    const handleMouseMove = (e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const formData = new FormData(e.target);

        try {
            const response = await fetch("https://formsubmit.co/ajax/enthusia@sitnagpur.siu.edu.in", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setStatus('success');
                e.target.reset();
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section
            id="get-in-touch"
            className="w-full relative bg-[#030305] flex flex-col items-center justify-center snap-start selection:bg-[#3d2b1f] selection:text-[#d4af37] h-auto md:h-screen overflow-visible md:overflow-hidden p-0 md:p-4"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            {/* Wand Light Overlay */}
            <div className="wand-light-subtle" style={{ '--x': `${mousePosition.x}px`, '--y': `${mousePosition.y}px` }}></div>

            {/* Frame - Desktop Only */}
            <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
                <OrnateFrame />
            </div>

            {/* Background Particles (Very subtle stars) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-[#d4af37] rounded-full opacity-0"
                        style={{
                            width: Math.random() * 2 + 'px',
                            height: Math.random() * 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `twinkle ${3 + Math.random() * 4}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center py-16 px-4 md:py-24 md:px-12 border-y border-[#d4af37]/30 md:border-none my-0 md:my-0 bg-black/40 md:bg-transparent">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12 flex-shrink-0 mt-8 md:mt-12">
                    <h2 className="flex items-center justify-center gap-4 text-3xl md:text-6xl font-cinzel text-[#e0e0e0] font-medium tracking-[0.1em] drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] animate-fade-in-up">
                        GET IN TOUCH
                    </h2>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 md:mt-6 opacity-60"></div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 items-start justify-center flex-grow">

                    {/* Left Column: Contact Info */}
                    <div className="flex-1 w-full max-w-md flex flex-col justify-center space-y-4 md:space-y-6 pt-0 md:pt-4">
                        <ContactItem
                            icon={Icons.Location}
                            title="Location"
                            lines={["Symbiosis Institute of Technology", "Nagpur, Maharashtra, India"]}
                            onClick={() => window.open('https://maps.app.goo.gl/dGTgnQBC1hHf19pp8', '_blank')}
                        />
                        <ContactItem
                            icon={Icons.Email}
                            title="Email"
                            lines={["enthusia@sitnagpur.siu.edu.in"]}
                        />
                        <ContactItem
                            icon={Icons.Phone}
                            title="Connect"
                            lines={["Parth Choudhari:   +91 77218 92403" , "Sukhada Bhoyar:   +91 87677 85271", "Aarya Bhende:   +91 93220 14692"]}
                        />

                        {/* Social Links */}
                        <div className="pt-4 md:pt-8 pl-4">
                            <h4 className="font-cinzel text-[#d4af37] tracking-widest text-xs mb-4 uppercase opacity-50">Follow The Magic</h4>
                            {/* Social media buttons removed */}
                        </div>
                    </div>

                    {/* Right Column: Magically Floating Form */}
                    <div className="flex-1 w-full max-w-xl relative pb-20 md:pb-0">
                        {/* Glow effect behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-tr from-[#d4af37]/10 via-transparent to-[#d4af37]/5 rounded-2xl blur-2xl opacity-40"></div>

                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="relative bg-[#08080c]/80 border border-[#d4af37]/10 rounded-2xl p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm flex flex-col gap-4 md:gap-6"
                        >
                            {/* Hidden Config for FormSubmit */}
                            <input type="hidden" name="_subject" value="New Spell from SITNovate Website!" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_captcha" value="false" />

                            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                <div className="flex-1"><InputField name="name" label="Your Name" placeholder="Your Name" /></div>
                                <div className="flex-1"><InputField name="email" label="Your Email" type="email" placeholder="Email ID" /></div>
                            </div>

                            <InputField name="_subject_custom" label="Subject" placeholder="Evaluation Spell Request..." />
                            <InputField name="message" label="Your Message" isTextArea={true} placeholder="Write your magical message here..." />

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-3 md:py-4 mt-2 relative overflow-hidden rounded-lg group border transition-all active:scale-[0.99] ${status === 'success' ? 'border-green-500/50 bg-green-500/10' : 'border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/10'
                                    }`}
                            >
                                <span className={`relative z-10 flex items-center justify-center gap-3 font-cinzel tracking-[0.2em] font-semibold text-sm uppercase transition-colors ${status === 'success' ? 'text-green-500' : 'text-[#d4af37] group-hover:text-[#fff]'
                                    }`}>
                                    {status === 'idle' && <><Icons.Send /> Send Owl</>}
                                    {status === 'sending' && <span className="animate-pulse">Casting Spell...</span>}
                                    {status === 'success' && <><Icons.Check /> Owl Sent!</>}
                                    {status === 'error' && "Owl got lost! Try again."}
                                </span>

                                {/* Hover Fill Effect */}
                                {status === 'idle' && (
                                    <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0 ease-out"></div>
                                )}
                            </button>
                        </form>

                        {/* Spacer for bottom navigation */}
                        <div className="h-20 md:hidden"></div>
                    </div>

                </div>

                {/* Footer Links */}
                <div className="w-full mt-8 md:mt-12 pt-6 border-t border-[#d4af37]/20">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
                        <p className="text-gray-400 font-cinzel tracking-wider">
                            © 2026 Enthusia 5.0. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link 
                                to="/terms-of-use" 
                                className="text-[#d4af37] hover:text-white transition-colors duration-300 font-cinzel tracking-wider uppercase text-xs"
                            >
                                Terms of Use
                            </Link>
                            <span className="text-gray-600">|</span>
                            <Link 
                                to="/privacy-policy" 
                                className="text-[#d4af37] hover:text-white transition-colors duration-300 font-cinzel tracking-wider uppercase text-xs"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
