import { BusinessContextProvider } from "@/context/business_context";
import { PostProvider } from "@/context/post_context";
import ReadMoreSlider from "@/components/readmore/ReadMore"
import Sidebar from "@/components/sidebar/Sidebar"
import { Container } from "react-bootstrap"

const BusinessLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <PostProvider>
            <BusinessContextProvider>
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
            </BusinessContextProvider>
        </PostProvider>
    )
}
export default BusinessLayout;