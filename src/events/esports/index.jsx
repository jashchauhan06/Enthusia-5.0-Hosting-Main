// Wrapper to load the standalone ESPORTS project
import EventWrapper from '../../components/EventWrapper';

export default function EsportsWrapper() {
    return (
        <EventWrapper
            src="/esports-app/index.html"
            title="ESPORTS | Gaming Tournament - ENTHUSIA 5.0"
            bgColor="#0a0a0f"
            allowScroll={true}
            buttonPosition="original"
            buttonTheme="red"
        />
    );
}