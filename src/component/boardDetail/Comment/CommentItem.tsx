import React from "react";
import type { Comment } from "../../../data/dummyPosts";
import cItem from './CommentItem.module.css';

type CommentItemProps = {
    comment : Comment;
    currentUser: string;
    isReply: boolean;
    isReplyTarget: boolean;
    onReplyClick: (id: number) => void;
    onDelete: (id: number) => void;
    onReport: (id: number) => void;
}
const CommentItem: React.FC<CommentItemProps> = ({
    comment, currentUser, isReply, isReplyTarget, onReplyClick, onDelete, onReport
}) => {
    const isAuthor = comment.author === currentUser;
    return(
        <li className={`${cItem.item} ${isReply ? cItem.replyItem : ""} ${isReplyTarget ? cItem.replyTarget : ""}`}>
            <div className={cItem.topRow}>
                <span className={cItem.author}>{comment.author}</span>
                <span className={cItem.createdAt}>{comment.createdAt}</span>
            </div>
            <div className={cItem.content}>{comment.content}</div>

            <div className={cItem.actionRow}>
                <button
                    type="button"
                    className={cItem.actionButton}
                    onClick={() => onReplyClick(comment.id)}
                >
                    답글
                </button>
                
                <button
                    type="button"
                    className={cItem.actionButton}
                    onClick={() => onReport(comment.id)}
                >
                신고
                </button>

                {isAuthor && (
                    <button
                        type="button"
                        className={`${cItem.actionButton} ${cItem.danger}`}
                        onClick={() => onDelete(comment.id)}
                    >
                        삭제
                    </button>
                )}
            </div>
        </li>
    );
};

export default CommentItem;