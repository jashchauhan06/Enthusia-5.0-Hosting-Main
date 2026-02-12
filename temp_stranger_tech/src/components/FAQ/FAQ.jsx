import { useState } from 'react';

const FAQItem = ({ question, answer, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="faq-question">
                <span className="faq-icon">
                    {icon}
                </span>
                <h3>{question}</h3>
                <span className="faq-toggle">{isOpen ? '-' : '+'}</span>
            </div>
            <div className="faq-answer" style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}>
                {answer}
            </div>
        </div>
    );
};

const FAQ = () => {
    return (
        <section className="faq-section" id="faq">
            <div className="section-header">
                <span className="section-tag">SEC. 007</span>
                <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
                <p className="section-subtitle">Everything you need to know before entering the Upside Down</p>
            </div>

            <div className="faq-container">
                <FAQItem
                    question="What is Stranger Tech?"
                    answer={
                        <>
                            <p>Stranger Tech is a Stranger Things–themed technical event where the Upside Down collides with code.</p>
                            <p>The event consists of <strong>5 thrilling rounds</strong>, each inspired by a season of the series, testing participants on coding, DSA, logic building, and core technical skills through fun yet challenging tasks.</p>
                            <p><em>Enter the Upside Down. Crack the code. Survive all five seasons.</em></p>
                        </>
                    }
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    }
                />

                <FAQItem
                    question="Team Formation"
                    answer={
                        <>
                            <p><strong>Team size:</strong> Exactly 3 members</p>
                            <p>Because every Hawkins-level mission needs a perfect trio.</p>
                        </>
                    }
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    }
                />

                <FAQItem
                    question="What Should You Bring?"
                    answer={
                        <>
                            <ul>
                                <li>1 laptop per team (mandatory)</li>
                                <li>Extension board</li>
                                <li>Laptop charger & charging accessories</li>
                                <li>Any other essentials to keep your laptop powered till the final battle</li>
                            </ul>
                            <p><em>Losing power is scarier than Vecna — come prepared.</em></p>
                        </>
                    }
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                    }
                />

                <FAQItem
                    question="Skills Required"
                    answer={
                        <>
                            <ul>
                                <li>Basic programming knowledge</li>
                                <li>Fundamentals of data structures & algorithms (DSA)</li>
                                <li>Logical and analytical thinking</li>
                                <li>Basic technical and problem-solving skills</li>
                            </ul>
                            <p><em>No superpowers required — strong basics and smart thinking are enough.</em></p>
                        </>
                    }
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z" />
                            <path d="M8 10c-2.21 0-4 1.79-4 4s1.79 4 4 4" />
                            <path d="M16 10c2.21 0 4 1.79 4 4s-1.79 4-4 4" />
                        </svg>
                    }
                />

                <FAQItem
                    question="Event Details"
                    answer={
                        <>
                            <p><strong>Date:</strong> 27th February 2026</p>
                            <p><strong>Venue:</strong> Symbiosis Institute of Technology, Nagpur</p>
                        </>
                    }
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    }
                />

                <FAQItem
                    question="How to Register?"
                    answer={
                        <>
                            <p>Click the <strong>"REGISTER NOW"</strong> button on the website.</p>
                            <p>You will be redirected to <strong>Unstop</strong>, where you can complete your registration for Stranger Tech.</p>
                            <p><strong>Registration Fee:</strong> ₹300/- (excluding Taxes)</p>
                            <p><em>Only the first 50 registered teams will be allowed to participate!</em></p>
                        </>
                    }
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    }
                />
            </div>

            {/* Floating lights decoration */}
            <div className="faq-lights">
                <span className="f-light"></span>
                <span className="f-light"></span>
                <span className="f-light"></span>
                <span className="f-light"></span>
                <span className="f-light"></span>
            </div>
        </section>
    );
};

export default FAQ;
