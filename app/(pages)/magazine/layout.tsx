import { PostProvider } from "@/context/post_context";
import { Container } from "react-bootstrap";

const MagazineLayout = async(
    {children}: Readonly<{children: React.ReactNode}>
) => {
    return(
        <PostProvider>
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            {children}
                        </article>
                        <aside className="sidebar_column">

                        </aside>
                    </div>
                </Container>
            </div>
        </PostProvider>
    )
}

export default MagazineLayout;