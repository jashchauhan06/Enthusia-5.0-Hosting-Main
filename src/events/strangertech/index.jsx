// Wrapper to load the standalone Stranger-Tech project
import EventWrapper from '../../components/EventWrapper';

export default function StrangerTechWrapper() {
    return (
        <EventWrapper
            src="/strangertech-app/index.html"
            title="STRANGER TECH | Tech Hunt - ENTHUSIA 5.0"
            bgColor="#0d0d0d"
            allowScroll={true}
            buttonPosition="lower"
            buttonTheme="redish"
        />
    );
}