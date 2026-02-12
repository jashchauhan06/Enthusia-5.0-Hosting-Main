import ChallengeCard from './ChallengeCard';

const challengesData = [
    {
        id: 1,
        number: '01',
        title: 'THE VANISHING',
        tags: ['SIGNALS', 'ENCODING', 'CRYPTOGRAPHY'],
        description: 'Will is trapped in the Upside Down and can only communicate through distorted signals. Decode hidden messages using logic and number systems.',
        difficulty: 4,
        timeLimit: '45 MIN',
        image: `${import.meta.env.BASE_URL}Challenges Photos/Challenge 1 (1).webp`,
        scrollHint: 'SCROLL FOR NEXT CHALLENGE'
    },
    {
        id: 2,
        number: '02',
        title: 'THE MIND FLAYER',
        tags: ['NETWORKS', 'GRAPHS', 'ALGORITHMS'],
        description: 'The Mind Flayer spreads through underground tunnels. Analyze networks, trace paths, and employ algorithmic reasoning to stop the infection.',
        difficulty: 5,
        timeLimit: '60 MIN',
        image: `${import.meta.env.BASE_URL}Challenges Photos/Challenge 2.webp`,
        scrollHint: 'SCROLL FOR NEXT CHALLENGE'
    },
    {
        id: 3,
        number: '03',
        title: 'THE STARCOURT SIGNAL',
        tags: ['DEBUGGING', 'REVERSE ENGINEERING', 'CODE'],
        description: 'A secret transmission from Starcourt Mall. Find and fix the logical flaw in the code to gain access to the Russian base.',
        difficulty: 5,
        timeLimit: '50 MIN',
        image: `${import.meta.env.BASE_URL}Challenges Photos/Challenge 3.webp`,
        scrollHint: 'SCROLL FOR NEXT CHALLENGE'
    },
    {
        id: 4,
        number: '04',
        title: 'THE CURSE OF VECNA',
        tags: ['OS', 'FILE SYSTEMS', 'CLI'],
        description: 'Vecna has trapped a teammate in a trance. Navigate deep file systems, uncover hidden files, and retrieve the secret to save them.',
        difficulty: 6,
        timeLimit: '75 MIN',
        image: `${import.meta.env.BASE_URL}Challenges Photos/Challenge 4.webp`,
        scrollHint: 'SCROLL FOR NEXT CHALLENGE'
    },
    {
        id: 5,
        number: '05',
        title: 'THE FINAL WAR',
        tags: ['INTEGRATION', 'DEPLOYMENT', 'PROTOTYPING'],
        description: 'The barrier between worlds is collapsing. Fix, integrate, and deploy a working system under pressure to seal the rift and win.',
        difficulty: 6,
        timeLimit: '90 MIN',
        image: `${import.meta.env.BASE_URL}Challenges Photos/Challenge 5.webp`,
        scrollHint: 'CONTINUE TO PRIZES'
    }
];

const Challenges = () => {
    return (
        <div className="challenges-wrapper" id="rounds">
            {challengesData.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
    );
};

export default Challenges;
