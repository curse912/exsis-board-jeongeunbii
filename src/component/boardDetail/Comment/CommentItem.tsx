import React from "react";
import type { Comment } from "../../../data/dummyPosts";
import cItem from './CommentItem.module.css';

type CommentItemProps = {
    comment : Comment;
    currentUser: string;
    onDelete: (id: number) => void;
    onReport: (id: number) => void;
}
const CommentItem: React.FC<CommentItemProps> = ({
    comment, currentUser, onDelete, onReport
}) => {
    const isAuthor = comment.author === currentUser;
    return(
        <li className={cItem.item}>
            <div className={cItem.profile} />
            <div className={cItem.itemArea}>
                <div className={cItem.row1}>
                    <span className={cItem.author}>{comment.author}</span>
                    <div className={cItem.Btns}>
                        <button
                            type="button"
                            className={cItem.actionBtn}
                            onClick={() => onReport(comment.id)}
                        >
                        신고
                        </button>

                        {isAuthor && (
                            <button
                                type="button"
                                className={`${cItem.actionBtn} ${cItem.danger}`}
                                onClick={() => onDelete(comment.id)}
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </div>

                <div className={cItem.row2}>
                    <div className={cItem.content}>{comment.content}</div>
                    <span className={cItem.createdAt}>{comment.createdAt}</span>
                </div>
            </div>
        </li>
    );
};

export default CommentItem;