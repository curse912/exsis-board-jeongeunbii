import type React from "react";
import cList from "./CommentList.module.css";
import type { Comment } from "../../../data/dummyPosts"; 
import CommentItem from "./CommentItem";

type CommentListProps = {
    comments : Comment[];
    currentUser: string;
    replyTargetId: number | null;
    onReplyClick: (id: number) => void;
    onDelete: (id: number) => void;
    onReport: (id: number) => void;
};

const CommentList: React.FC<CommentListProps> = ({
    comments, currentUser,replyTargetId, onReplyClick, onDelete, onReport
}) => {
    if(comments.length === 0){
        return <div className={cList.empty}>댓글이 존재하지 않습니다.</div>;
    }
    
    return (
        <ul className={cList.list}>
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    isReply={!!comment.parentId}
                    isReplyTarget={replyTargetId === comment.id}
                    onReplyClick={onReplyClick}
                    onDelete={onDelete}
                    onReport={onReport}
                />
            ))}
        </ul>
    );
};

export default CommentList;