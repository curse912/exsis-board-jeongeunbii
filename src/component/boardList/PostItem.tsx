import type { Post } from "../../data/dummyPosts";
import list from './BoardList.module.css';

type PostItemProps = {
    post: Post;
    onClick: () => void;
};

const PostItem: React.FC<PostItemProps> = ({post, onClick}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };
    
    return(
        <li className={list.item} onClick={onClick} role="button"
         tabIndex={0} onKeyDown={handleKeyDown}>
            {post.thumbnailUrl && (
                <div className={list.thumbnailWrapper}>
                <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className={list.thumbnail}
                />
                </div>
            )}

            <div className={list.content}>
                <div className={list.topRow}>
                    <span className={list.category}>{post.category}</span>
                    <span className={list.meta}>
                        {post.author} · {post.createdAt}
                    </span>
                </div>

                <div className={list.titleRow}>
                    <span className={list.title}>{post.title}</span>
                </div>

                <div className={list.bottomRow}>
                    <span className={list.stat}>조회 {post.views}</span>
                    <span className={list.stat}>좋아요 {post.likes}</span>
                    <span className={list.stat}>댓글 {post.commentsCount}</span>
                </div>
            </div>
        </li>
    );
};

export default PostItem;
