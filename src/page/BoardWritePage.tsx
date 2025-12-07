import type React from "react";
import { useNavigate } from "react-router-dom";
import { dummyPosts, type Post } from "../data/dummyPosts";
import BoardWriteForm, { type BoardWriteFormValues } from "../component/boardWrite/BoardWriteForm";
import { BOARD_CATEGORIES } from "../data/categories";
import { CURRENT_USER } from "../data/currentUser";


const BoardWritePage: React.FC = () => {

    const navigate = useNavigate();

    const categories = BOARD_CATEGORIES;

    const handleSubmit = (values: BoardWriteFormValues) => {
        const newId =
        dummyPosts.length > 0
            ? Math.max(...dummyPosts.map((p) => p.id)) + 1
            : 1;

        const now = new Date();
        const formatted = `${now.getFullYear()}
            -${String( now.getMonth() + 1 ).padStart(2, "0")}
            -${String(now.getDate()).padStart( 2, "0")} 
            ${String(now.getHours()).padStart(2, "0")}
            :${String(now.getMinutes()).padStart(2, "0")}`;

        const thumbnailUrl = values.image ? URL.createObjectURL(values.image) : undefined;

        const newPost: Post = {
            id: newId,
            title: values.title,
            category: values.category,
            author: CURRENT_USER.userId,
            createdAt: formatted,
            views: 0,
            likes: 0,
            commentsCount: 0,
            content: values.content,
            commentBlocked: values.commentBlocked,
            thumbnailUrl,
        };

        dummyPosts.unshift(newPost);
        alert("글 작성이 완료되었습니다.");
        navigate(`/detail/${newId}`);
    };

    const handleCancel = () => {
        const ok = window.confirm("작성중인 내용을 취소하시겠습니까?");
        if (!ok) return;
        navigate(-1);
    };
    return (
        <div>
            <h2>글 작성</h2>
            <BoardWriteForm
                categories={categories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default BoardWritePage;