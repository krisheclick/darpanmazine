import { Container } from "react-bootstrap";
import PhotosCatData from "@/components/category/PhotosCatData";
import PhotosAds from "@/components/photos/ads/Ads";
import { PhotosContextProvider } from "@/context/photos_context";

const PhotosLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <PhotosContextProvider>
            <PhotosCatData />
            <div className="mainLayout">
                <Container>
                    <div className="columnRow">
                        <article className="content_column">
                            {children}
                        </article>
                        <aside className="sidebar_column">
                            <PhotosAds />
                        </aside>
                    </div>
                </Container>
            </div>
        </PhotosContextProvider>
    )
}

export default PhotosLayout;