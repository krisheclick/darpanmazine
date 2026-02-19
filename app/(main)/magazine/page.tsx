import MagazineIndex from "@/components/magazine/Index";
import ReadMoreSlider from "@/components/readmore/ReadMore";
import Sidebar from "@/components/sidebar/Sidebar";
import { Container } from "react-bootstrap";

const MagazineMainPage = async () => {
    return (
        <>
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            <MagazineIndex />
                        </article>
                        <aside className="sidebar_column">
                            <Sidebar />
                        </aside>
                    </div>
                </Container>
            </div>
            <ReadMoreSlider />
        </>
    );
};

export default MagazineMainPage;
