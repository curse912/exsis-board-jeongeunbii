import type React from "react";
import type { Post } from "../../data/dummyPosts";
import { useState } from "react";
import detail from "./BoardDetail.module.css";
import CommentSection from "./Comment/CommentSection";

type BoardDetailProps = {
    post: Post;
}
const BoardDetail: React.FC<BoardDetailProps> = ({ post }) => {
    const [likeCount, setLikeCount] = useState<number>(post.likes);
    const [dislikeCount, setdislikeCount] = useState<number>(0);

    // 임의 유저
    const currentUser = 'user1';
    const isAuthor = currentUser === post.author;

    const handleLike = () => {
        setLikeCount((prev) => prev + 1);
    };

    const handleDislike = () => {
        setdislikeCount((prev) => prev + 1);
    };

    const handleClickEdit = () => {
        alert("수정페이지 이동 예정");
    }
    const handleClickDelete = () => {
        const ok = window.confirm("이 게시글을 삭제하겠습니까?");
        if (ok) {
            alert("게시글 삭제 예정");
        }
    };
    
    const handleClickShare = () => {
        alert("공유 기능 예정");
    };

    const handleClickReport = () => {
        alert("신고 모달/페이지는 추후 구현 예정입니다.");
    };

    const isCommentBlocked = !!post.commentBlocked;

    return (
        <div className={detail.detailWrapper}>
            {/* 헤더 */}
            <header className={detail.header}>
                <div className={detail.category}>{post.category}</div>
                <h1 className={detail.title}>{post.title}</h1>

                <div className={detail.row}>
                    <span className={detail.item}>작성자 {post.author}</span>
                    <span className={detail.divider}>•</span>
                    <span className={detail.item}>{post.createdAt}</span>
                    <span className={detail.divider}>•</span>
                    <span className={detail.item}>{post.views}</span>
                    <span className={detail.divider}>•</span>
                    <span className={detail.item}>댓글 {post.commentsCount}</span>
                </div>
            </header>

            {/* 좋아요/싫어요 + 공유 + 신고 */}
            <section className={detail.section1}>
                <div className={detail.reaction}>
                    <button
                        type="button"
                        className={detail.reactionBtn}
                        onClick={handleLike}
                    >
                        👍 
                        <span className={detail.reactionText}>좋아요</span>
                        <span className={detail.reactionCount}>{likeCount}</span>
                    </button>
                    <button
                        type="button"
                        className={detail.reactionButton}
                        onClick={handleDislike}
                    >
                        👎 
                        <span className={detail.reactionText}>싫어요</span>
                        <span className={detail.reactionCount}>{dislikeCount}</span>
                    </button>
                </div>

                <div className={detail.utilGroup}>
                    <button
                        type="button"
                        className={detail.textBtn}
                        onClick={handleClickShare}
                    >
                        공유하기
                    </button>
                    <button
                        type="button"
                        className={detail.textBtn}
                        onClick={handleClickReport}
                    >
                        신고하기
                    </button>
                </div>
            </section>

            {/* 본문+이미지 */}
            <section className={detail.section2}>
                {post.thumbnailUrl && (
                    <div className={detail.imageWrapper}>
                        <img
                            src={post.thumbnailUrl}
                            alt={post.title}
                            className={detail.image}
                        />
                    </div>
                )}

                <div className={detail.contentText}>
                    {post.content.split("\n").map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </section>
            
            {/* 작성자 버튼 : 수정/삭제 */}
            {isAuthor && (
                <section className={detail.author}>
                    <button
                        type="button"
                        className={detail.secondaryBtn}
                        onClick={handleClickEdit}
                    >
                        수정하기
                    </button>
                    <button
                        type="button"
                        className={detail.dangerBtn}
                        onClick={handleClickDelete}
                    >
                        삭제하기
                    </button>
                </section>
            )}

            {/* 댓글 */}
            <section className={detail.section3}>
                <h2 className={detail.commentTitle}>댓글 {post.commentsCount}</h2>
                {isCommentBlocked ? (
                    <p className={detail.commentDescription}>
                        작성자가 댓글을 막은 게시글입니다.
                    </p>
                ):(
                    <CommentSection postId={post.id} />
                )}
            </section>
        </div>
    );
};
export default BoardDetail;