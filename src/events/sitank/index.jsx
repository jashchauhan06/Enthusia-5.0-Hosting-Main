// Wrapper to load the standalone SITank project
import EventWrapper from '../../components/EventWrapper';

export default function SITankWrapper() {
    return (
        <EventWrapper
            src="/sitank-app/index.html"
            title="SITank 2.0 | The Big Bull of Tech - ENTHUSIA 5.0"
            bgColor="#120f0d"
            allowScroll={true}
            buttonTheme="beige"
        />
    );
}