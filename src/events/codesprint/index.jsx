// Wrapper to load the standalone CodeSprint project
import EventWrapper from '../../components/EventWrapper';

export default function CodeSprintWrapper() {
    return (
        <EventWrapper
            src="/codesprint-app/index.html"
            title="CODE SPRINT 2.0 | Programming Contest - ENTHUSIA 5.0"
            bgColor="#0a0a0a"
            allowScroll={true}
            buttonPosition="original"
            buttonTheme="red"
        />
    );
}