import type React from "react";
import { useParams } from "react-router-dom";
import { dummyPosts } from "../data/dummyPosts";
import BoardDetail from "../component/boardDetail/BoardDetail";

const BoardDetailPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const postId = Number(id);

    const post = dummyPosts.find((p) => p.id === postId);
    if(!post) {
        return(
            <div>
                <h2>게시글을 찾을 수 없습니다.</h2>
                <p>이미 삭제되었거나 존재하지 않는 게시글 입니다.</p>
            </div>
        );
    }
    return (
        <BoardDetail post={post} />
    );
};

export default BoardDetailPage;