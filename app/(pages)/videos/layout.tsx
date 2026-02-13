import { Container } from "react-bootstrap";
import VideosCatData from "@/components/category/VideosCatData";
import { VideoContextProvider } from "@/context/video_context";
import VideosAds from "@/components/videos/ads/Ads";

const VideosLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <VideosCatData />
            <VideoContextProvider>
                <div className="mainLayout">
                    <Container>
                        <div className="columnRow">
                            <article className="content_column">
                                {children}
                            </article>
                            <aside className="sidebar_column">
                                <VideosAds />
                            </aside>
                        </div>
                    </Container>
                </div>
            </VideoContextProvider>
        </>
    )
}

export default VideosLayout;