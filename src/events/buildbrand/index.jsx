// Wrapper to load the standalone BuildBrand project
import EventWrapper from '../../components/EventWrapper';

export default function BuildBrandWrapper() {
    return (
        <EventWrapper
            src="/buildbrand-app/index.html"
            title="BuildBrand | Brand Building Competition - ENTHUSIA 5.0"
            bgColor="#0a0a0f"
            allowScroll={true}
            buttonPosition="original"
            buttonTheme="blue"
        />
    );
}