import type React from "react";
import { dummyComments, dummyPosts, type Post } from "../../data/dummyPosts";
import { useState } from "react";
import detail from "./BoardDetail.module.css";
import CommentSection from "./Comment/CommentSection";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER } from "../../data/currentUser";
import CategoryCss from "../common/CategoryCss";
import { iconImg } from "../../assets/images";

type BoardDetailProps = {
    post: Post;
}
const BoardDetail: React.FC<BoardDetailProps> = ({ post }) => {
    const navigate = useNavigate();

    const [likeCount, setLikeCount] = useState<number>(post.likes);
    const [dislikeCount, setdislikeCount] = useState<number>(0);

    const currentUser = CURRENT_USER.userId;
    const isAuthor = currentUser === post.author;

    //핸들러
    const handleLike = () => {
        setLikeCount((prev) => prev + 1);
    };
    const handleDislike = () => {
        setdislikeCount((prev) => prev + 1);
    };
    const handleClickDelete = () => {
        if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

        const index = dummyPosts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
            dummyPosts.splice(index, 1);
        }

        for (let i = dummyComments.length - 1; i >= 0; i--) {
            if (dummyComments[i].postId === post.id) {
                dummyComments.splice(i, 1);
            }
        }

        alert("게시글이 삭제되었습니다.");
        navigate("/");
    };
    const handleList = () => {
        navigate("/");
    }

    // 예정사항
    const handleClickEdit = () => {
        alert("수정페이지 이동 예정");
    }
    const handleClickShare = () => {
        alert("공유 기능 예정");
    };
    const handleClickReport = () => {
        alert("신고 모달/페이지는 예정");
    };

    const isCommentBlocked = !!post.commentBlocked;

    return (
        <>
            <div className={detail.topActionRow}>
                <button
                    type="button"
                    className={detail.listBtn}
                    onClick={handleList}
                >
                    ← 목록으로
                </button>
            </div>
            <div className={detail.detailWrapper}>
                {/* 헤더 */}
                <header className={detail.header}>
                    <div className={detail.titleArea}>
                        <CategoryCss category={post.category} />
                        <h1 className={detail.title}>{post.title}</h1>
                        <span className={detail.author}>{post.author}</span>
                    </div>
                    <div className={detail.row}>
                        <span> {post.createdAt} </span>
                        <div className={detail.infoArea}>
                            조회수 <span className={detail.item}>{post.views}</span> |
                            좋아요 <span className={detail.item}>5</span> |
                            댓글 <span className={detail.item}>{post.commentsCount}</span>
                        </div>
                    </div>
                </header>

                {/* 공유 + 신고 */}
                <section className={detail.section1}>
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
                    {/* 작성자 버튼 : 수정/삭제 */}
                    {isAuthor && (
                        <section className={detail.author}>
                            <button
                                type="button"
                                className={detail.editBtn}
                                onClick={handleClickEdit}
                            >
                                수정하기
                            </button>
                            <button
                                type="button"
                                className={detail.deleteBtn}
                                onClick={handleClickDelete}
                            >
                                삭제하기
                            </button>
                        </section>
                    )}
                </section>

                {/* 본문+이미지 */}
                <section className={detail.section2}>
                    <div className={detail.contentText}>
                        {post.content.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                    {post.thumbnailUrl && (
                        <div className={detail.imageWrapper}>
                            <img
                                src={post.thumbnailUrl}
                                alt={post.title}
                                className={detail.image}
                            />
                        </div>
                    )}
                </section>
                
                <section className={detail.section3}>
                    <div className={detail.reaction}>
                        <button
                            type="button"
                            className={detail.reactionBtn}
                            onClick={handleLike}
                        >
                            <span className={detail.reactionCount}>{likeCount}</span>
                            <img className={detail.reactionIcon} src={iconImg.likeDark} />
                        </button>
                        <button
                            type="button"
                            className={detail.reactionBtn}
                            onClick={handleDislike}
                        >
                            <img className={detail.reactionIcon} src={iconImg.disLikeDark} />
                            <span className={detail.reactionCount}>{dislikeCount}</span>
                        </button>
                    </div>
                </section>

                {/* 댓글 */}
                <section className={detail.section4}>
                    {isCommentBlocked ? (
                        <p className={detail.commentDescription}>
                            작성자가 댓글을 막은 게시글입니다.
                        </p>
                    ):(
                        <CommentSection postId={post.id} />
                    )}
                </section>
            </div>
        </>
    );
};
export default BoardDetail;