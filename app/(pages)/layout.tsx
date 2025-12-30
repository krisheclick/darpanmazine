import Sidebar from "@/components/sidebar/Sidebar";
import ReadMoreSlider from "@/components/readmore/ReadMore";
import { Container } from "react-bootstrap";
import "./innerGlobal.css";
import { InnerLayoutProvider } from "@/context/inner_context";

const InnerLayout = async (
    { children }: Readonly<{
        children: React.ReactNode;
    }>
) => {
    return (
        <InnerLayoutProvider>
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            {children}
                        </article>
                        <aside className="sidebar_column">
                            <Sidebar />
                        </aside>
                    </div>
                </Container>
            </div>
            <ReadMoreSlider />
        </InnerLayoutProvider>
    )
}

export default InnerLayout;