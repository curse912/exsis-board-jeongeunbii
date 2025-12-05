import React, { useMemo, useState } from "react";
import { dummyComments, type Comment } from "../../../data/dummyPosts";
import section from './CommentSection.module.css';
import CommentForm from "./CommentFrom";
import CommentList from "./CommentList";

type CommentSectionProps = {
    postId : number;
}

export type CommentSortOption = "latest" | "thread";

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const currentUser = "user1";

    const [comments, setComments] = useState<Comment[]> (
        dummyComments.filter((c) => c.postId === postId)
    );

    const [sortOption, setsortOption] = useState<CommentSortOption>("latest");
    const [replyTargetId, setreplyTargetId] = useState<number | null> (null);

    const handleChangeSort = (value: CommentSortOption) => {
        setsortOption(value);
    };

    const handleSubmitComment = (content: string, parentId?: number) => {
        if(!content.trim()) return;

        const newId = comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1;

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
            ...(parentId ? {parentId} : {})
        };

        setComments((prev) => [...prev, newComment]);
        setreplyTargetId(null);
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

    const handleReplyClick = (id: number) => {
        setreplyTargetId((prev) => (prev === id? null : id));
    }

    const sortedComments = useMemo(() => {
        if(sortOption === "latest"){
            return [...comments].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
        }
        
        const roots = comments.filter((c) => !c.parentId)
            .sort(
                (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        const children = comments.filter((c) => !!c.parentId);
        const result : Comment[] = [];

        roots.forEach((root) => {
            result.push(root);
            const replies = children.filter((c) => c.parentId === root.id)
                .sort(
                    (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            result.push(...replies);
        });

        return result;
    },[comments, sortOption]);

    const totalCount = comments.length;

    return (
        <section className={section.section}>
            <div className={section.headerRow}>
                <h2 className={section.title}>댓글 {totalCount}</h2>

                <div className={section.tools}>
                    <select className={section.sortSelect}
                        value={sortOption}
                        onChange={(e) =>
                        handleChangeSort(e.target.value as CommentSortOption)
                        }
                    >
                        <option value="latest">최신순</option>
                        <option value="thread">답글순</option>
                    </select>
                </div>
            </div>

            {/* 댓글 작성 */}
            <CommentForm
                onSubmit={handleSubmitComment}
                placeholder="댓글을 입력해 주세요."
            />

            {/* 댓글 리스트 */}
            <CommentList
                comments={sortedComments}
                currentUser={currentUser}
                onReplyClick={handleReplyClick}
                onDelete={handleDeleteComment}
                onReport={handleReportComment}
                replyTargetId={replyTargetId}
            />

            {/* 대댓글 작성 폼 */}
            {replyTargetId && (
                <div className={section.replyFormWrapper}>
                <CommentForm
                    onSubmit={(content) =>
                        handleSubmitComment(content, replyTargetId || undefined)
                    }
                    placeholder="답글을 입력해 주세요."
                    isReply
                />
                </div>
            )}
        </section>
    );
};

export default CommentSection;