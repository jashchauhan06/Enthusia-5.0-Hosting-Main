const LoginModal = () => {
    return (
        <div className="modal" id="loginModal">
            {/* Upside Down Particles */}
            <div className="modal-particles">
                <span className="modal-particle"></span>
                <span className="modal-particle"></span>
                <span className="modal-particle"></span>
                <span className="modal-particle"></span>
                <span className="modal-particle"></span>
                <span className="modal-particle"></span>
            </div>

            <div className="modal-content">
                {/* Christmas Lights at top */}
                <div className="modal-lights">
                    <span className="m-light red"></span>
                    <span className="m-light yellow"></span>
                    <span className="m-light blue"></span>
                    <span className="m-light green"></span>
                    <span className="m-light red"></span>
                    <span className="m-light yellow"></span>
                    <span className="m-light blue"></span>
                </div>

                {/* Vines decoration */}
                <div className="modal-vines">
                    <div className="m-vine v1"></div>
                    <div className="m-vine v2"></div>
                    <div className="m-vine v3"></div>
                </div>

                <button className="modal-close" id="modalClose">×</button>

                {/* Eleven's number */}
                <div className="modal-eleven">011</div>

                <h2 className="modal-title">
                    <span className="title-line">ENTER THE</span>
                    <span className="title-upside">UPSIDE DOWN</span>
                </h2>

                <p className="modal-subtitle">"Friends don't lie."</p>

                <form className="modal-form">
                    <div className="input-wrapper">
                        <span className="input-icon">👤</span>
                        <input type="text" placeholder="TEAM NAME" required />
                        <div className="input-glow"></div>
                    </div>
                    <div className="input-wrapper">
                        <span className="input-icon">📧</span>
                        <input type="email" placeholder="EMAIL" required />
                        <div className="input-glow"></div>
                    </div>
                    <div className="input-wrapper">
                        <span className="input-icon">🔑</span>
                        <input type="password" placeholder="ACCESS CODE" required />
                        <div className="input-glow"></div>
                    </div>
                    <button type="submit" className="modal-submit">
                        <span className="btn-text">ENTER THE GATE</span>
                        <div className="btn-portal"></div>
                    </button>
                </form>

                <p className="modal-hint">No access code? <a href="#">Contact Hawkins Lab</a></p>

                {/* Bottom decoration */}
                <div className="modal-demogorgon"></div>
            </div>
        </div>
    );
};

export default LoginModal;
