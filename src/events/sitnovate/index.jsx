// Wrapper to load the standalone SITNovate project
import EventWrapper from '../../components/EventWrapper';

export default function SITNovateWrapper() {
    return (
        <EventWrapper
            src="/sitnovate-app/index.html"
            title="SITNOVATE 2.0 | 24HR Hackathon - ENTHUSIA 5.0"
            bgColor="#1a0d2e"
            allowScroll={true}
            buttonPosition="original"
            buttonTheme="golden"
        />
    );
}