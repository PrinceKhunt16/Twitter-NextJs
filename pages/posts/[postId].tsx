import React from "react";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import usePost from "../../hooks/usePost";
import Header from "../../components/Header";
import Form from "../../components/Form";
import PostItem from "../../components/posts/PostItem";
import CommentFeed from "../../components/posts/CommentFeed";

const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if (isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <BeatLoader color="#1095d2" />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    );
}

export default PostView;