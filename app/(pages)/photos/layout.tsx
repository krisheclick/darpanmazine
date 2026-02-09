import Sidebar from "@/components/sidebar/Sidebar";
import { Container } from "react-bootstrap";
import PhotosCatData from "@/components/category/PhotosCatData";

const PhotosLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <PhotosCatData />
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

export default PhotosLayout;