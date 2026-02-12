const GoBackButton = () => {
    return (
        <a href="https://enthusia-5-0.netlify.app/#techfest-events" className="go-back-btn" id="goBackBtn">
            <div className="go-back-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </div>
            <span className="go-back-text">GO BACK</span>
            <div className="go-back-glow"></div>
        </a>
    );
};

export default GoBackButton;
