import { PostProvider } from "@/context/post_context";

const PostLayout = async({children}: Readonly<{children: React.ReactNode}>) => {
    return(
        <PostProvider>
            {children}
        </PostProvider>
    )
}

export default PostLayout;