import Sidebar from "@/components/sidebar/Sidebar";
import { Container } from "react-bootstrap";
import VideosCatData from "@/components/category/VideosCatData";

const VideosLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <VideosCatData />
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            {children}
                        </article>
                        <aside className="sidebar_column">
                            {/* <Sidebar /> */}
                        </aside>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default VideosLayout;