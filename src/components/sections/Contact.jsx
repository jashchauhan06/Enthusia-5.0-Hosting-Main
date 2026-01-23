import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { MapPin, Mail, Phone, Send, Linkedin, Instagram, Globe } from 'lucide-react';

const Contact = forwardRef((props, ref) => {
    const sectionRef = useRef(null);

    useImperativeHandle(ref, () => ({
        next: () => false, // Last section, can't go next
        prev: () => false, // Let controller handle prev
        isFinished: () => true, // Always "done" so we can leave easily
        isAtStart: () => true,
        reset: () => { },
        type: 'CONTACT',
        el: sectionRef.current
    }));

    return (
        <section className="contact-section section" id="contact" ref={sectionRef}>
            <style>{`
                .info-item-link {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    text-decoration: none;
                    color: inherit;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0.5rem;
                    border-radius: 8px;
                    margin: -0.5rem;
                }
                
                .info-item-link:hover {
                    background: rgba(139, 92, 246, 0.1);
                    transform: translateX(5px);
                }
                
                .info-item-link:hover .info-icon {
                    color: #8b5cf6;
                    transform: scale(1.1);
                }
                
                .info-item-link:hover .info-text h3 {
                    color: #8b5cf6;
                }
                
                /* Make only descriptive text pure white, keep headings original color */
                .info-text p {
                    color: #ffffff !important;
                }
                
                .contact-form input,
                .contact-form textarea {
                    color: #ffffff !important;
                }
                
                .contact-form input::placeholder,
                .contact-form textarea::placeholder {
                    color: rgba(255, 255, 255, 0.6) !important;
                }
            `}</style>
            <div className="contact-container">
                <h2 className="section-title contact-title">GET IN TOUCH</h2>

                <div className="contact-content">
                    {/* Left Side: Info */}
                    <div className="contact-info">
                        <div className="info-item">
                            <a href="https://maps.app.goo.gl/RzmZxh7TqUT14pte9" target="_blank" rel="noopener noreferrer" className="info-item-link">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <div className="info-text">
                                    <h3>LOCATION</h3>
                                    <p>Symbiosis Institute of Technology</p>
                                    <p>Nagpur, Maharashtra, India</p>
                                </div>
                            </a>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <div className="info-text">
                                <h3>EMAIL</h3>
                                <p>enthusia@sitnagpur.siu.edu.in</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <Phone size={24} />
                            </div>
                            <div className="info-text">
                                <h3>CONNECT</h3>
                                <p>Sunidhi Haware - +91 84591 27073</p>
                                <p>Prathmesh Raipurkar - +91 70200 35636</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>FOLLOW THE SIGNAL</h3>
                            <div className="social-icons">
                                <a href="https://www.instagram.com/symbiosis_sit_nagpur/?hl=en" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
                                <a href="https://www.linkedin.com/school/symbiosis-institute-of-technology-nagpur-maharashtra/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
                                <a href="https://sitnagpur.edu.in/" target="_blank" rel="noopener noreferrer" className="social-icon"><Globe size={20} /></a>
                            </div>
                        </div>

                        {/* Mini Map */}
                        <div className="contact-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1860!2d79.1599375!3d21.1265625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c75403d77b61%3A0xb5552439e81b172d!2sSymbiosis%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1705180000000"
                                width="100%"
                                height="120"
                                style={{ border: 0, borderRadius: '8px', filter: 'grayscale(80%) invert(90%) contrast(90%)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="SIT Nagpur Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" action="https://formsubmit.co/enthusia@sitnagpur.siu.edu.in" method="POST">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>YOUR NAME</label>
                                    <div className="input-wrapper">
                                        <input type="text" name="name" placeholder="Enter your name" required />
                                        <div className="input-line"></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>YOUR EMAIL</label>
                                    <div className="input-wrapper">
                                        <input type="email" name="email" placeholder="Enter your email" required />
                                        <div className="input-line"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>SUBJECT</label>
                                <div className="input-wrapper">
                                    <input type="text" name="subject" placeholder="Evaluation Request..." required />
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>YOUR MESSAGE</label>
                                <div className="input-wrapper">
                                    <textarea name="message" placeholder="Write your message here..." required></textarea>
                                    <div className="input-line"></div>
                                </div>
                            </div>

                            <button type="submit" className="cyber-button">
                                <span>TRANSMIT DATA</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="cyber-grid-overlay"></div>
        </section>
    );
});

export default Contact;
