import EventsIndex from "@/components/events/EventsIndex";
import ReadMoreSlider from "@/components/readmore/ReadMore";
import EventSidebar from "@/components/sidebar/EventSidebar";
import { Container } from "react-bootstrap";

const EventsMainPage = async () => {
    return (
        <>
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            {/* EventsIndex is a client component that will fetch categories + events */}
                            <EventsIndex />
                        </article>
                        <aside className="sidebar_column">
                            <EventSidebar />
                        </aside>
                    </div>
                </Container>
            </div>
            <ReadMoreSlider/>
        </>
    );
};

export default EventsMainPage;
