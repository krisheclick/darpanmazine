import EventsIndex from "@/components/magazine/Index";
import ReadMoreSlider from "@/components/readmore/ReadMore";
import Sidebar from "@/components/sidebar/Sidebar";
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
                            <Sidebar />
                        </aside>
                    </div>
                </Container>
            </div>
            <ReadMoreSlider/>
        </>
    );
};

export default EventsMainPage;
