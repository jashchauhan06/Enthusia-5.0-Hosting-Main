const ChallengeCard = ({ challenge }) => {
    const { id, number, title, tags, description, difficulty, timeLimit, image, scrollHint } = challenge;

    const renderDifficultyBars = () => {
        const bars = [];
        for (let i = 0; i < 6; i++) {
            bars.push(
                <span key={i} className={i < difficulty ? 'filled' : ''}></span>
            );
        }
        return bars;
    };

    return (
        <section className="challenge-page" id={`challenge${id}`} data-challenge={id}>
            <div className="challenge-bg">
                <img
                    src={image}
                    alt={title}
                    className="challenge-bg-img"
                    loading={id === 1 ? 'eager' : 'lazy'}
                />
                <div className="challenge-bg-overlay"></div>
            </div>
            <div className="challenge-content">
                <div className="challenge-number-big">{number}</div>
                <div className="challenge-info">
                    <h2 className="challenge-title">{title}</h2>
                    <div className="challenge-tags">
                        {tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>
                    <p className="challenge-description">{description}</p>
                    <div className="challenge-meta">
                        <div className="meta-item">
                            <span className="meta-label">DIFFICULTY</span>
                            <div className="difficulty-bar">
                                {renderDifficultyBars()}
                            </div>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">TIME LIMIT</span>
                            <span className="meta-value">{timeLimit}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="challenge-scroll-hint">
                <span>{scrollHint}</span>
                <div className="scroll-arrow">↓</div>
            </div>
        </section>
    );
};

export default ChallengeCard;
