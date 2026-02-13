import { EventsProvider } from "@/context/events_context";
import { PostProvider } from "@/context/post_context";

const EventsLayout = async({children}: Readonly<{children: React.ReactNode}>) => {
    return(
        <PostProvider>
            <EventsProvider>
                {children}
            </EventsProvider>
        </PostProvider>
    )
}

export default EventsLayout;
