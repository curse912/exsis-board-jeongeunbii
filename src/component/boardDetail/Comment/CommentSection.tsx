import React, { useMemo, useState } from "react";
import { dummyComments, type Comment } from "../../../data/dummyPosts";
import section from './CommentSection.module.css';
import CommentForm from "./CommentFrom";
import CommentList from "./CommentList";
import { CURRENT_USER } from "../../../data/currentUser";

type CommentSectionProps = {
    postId : number;
}

export type CommentSortOption = "latest" | "thread";

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const currentUser = CURRENT_USER.userId;
    const [comments, setComments] = useState<Comment[]> (
        dummyComments.filter((c) => c.postId === postId)
    );
    const [commnetClose, setCommnetClose] = useState<boolean>(false);
    
    const sortedComments = useMemo(
        () =>
            [...comments].sort(
                (a, b) =>
                new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()
            ),
        [comments]
    );

    // 핸들러    
    const handleSubmitComment = (content: string) => {
        if(!content.trim()) return;

        const newId = comments.length > 0 ? 
            Math.max(...comments.map((c) => c.id)) + 1 : 1;

        const now = new Date();
        const format = `${now.getFullYear()}
            -${String( now.getMonth() + 1).padStart(2, "0")}
            -${String(now.getDate()).padStart( 2, "0")} 
            ${String(now.getHours()).padStart(2, "0")} : 
            ${String( now.getMinutes()).padStart(2, "0")}`;

        const newComment : Comment = {
            id: newId,
            postId,
            author: currentUser,
            content,
            createdAt: format,
        };

        setComments((prev) => [...prev, newComment]);
    }

    const handleDeleteComment = (id:number) => {
        const target = comments.find((c) => c.id === id);
        if(!target) return;
        if(target.author !== currentUser){
            alert("작성자만 댓글을 삭제할 수 있습니다.");
            return;
        }
        const ok = window.confirm("이 댓글을 삭제하시겠습니까?");
        if(!ok) return;

        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    const handleReportComment = (id: number) =>{
        alert(`댓글 ID: ${id} 신고 기능 예정`);
    };

    const handleToggleComments = () => {
        setCommnetClose((prev) => !prev);
    };

    const totalCount = comments.length;

    return (
        <section className={section.section}>
            <div className={section.headerRow}>
                <h2 className={section.title}>댓글 {totalCount}</h2>

                <div className={section.tools}>
                    <button type="button" className={section.closeBtn} onClick={handleToggleComments}>
                        {commnetClose? "댓글 펼치기▼" : "댓글 접기▲"}
                    </button>
                </div>
            </div>
            {!commnetClose && (
                <>
                    {/* 댓글 작성 */}
                    <CommentForm
                        onSubmit={handleSubmitComment}
                        placeholder="댓글을 입력해 주세요."
                    />

                    {/* 댓글 리스트 */}
                    <CommentList
                        comments={sortedComments}
                        currentUser={currentUser}
                        onDelete={handleDeleteComment}
                        onReport={handleReportComment}
                    />
                </>
            )}

        </section>
    );
};

export default CommentSection;