import type React from "react";
import type { Post } from "../../data/dummyPosts";
import list from './BoardList.module.css';
import PostItem from "./PostItem";
import type { SortOption } from "./BoardList";

type PostListProps = {
    posts: Post[];
    onClickPost: (id:number) => void;

    sortOption : SortOption;
    onChangeSort : (sort: SortOption) => void;
    onClickWrite : () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onClickPost, sortOption, onChangeSort, onClickWrite }) => {
    if(posts.length === 0){
        return (
            <div className={list.empty}>
                게시글이 존재하지 않습니다.
            </div>
        );
    }

    return(
        <div className={list.listArea}>
            <div className={list.rightArea}>
                <div className={list.sortArea}>
                    <button
                        type="button"
                        className={
                            sortOption === "latest"
                            ? `${list.sortButton} ${list.sortButtonActive}`
                            : list.sortButton
                        }
                        onClick={() => onChangeSort("latest")}
                    >
                        최신순
                    </button>
                    <button
                        type="button"
                        className={
                            sortOption === "likes"
                            ? `${list.sortButton} ${list.sortButtonActive}`
                            : list.sortButton
                        }
                        onClick={() => onChangeSort("likes")}
                    >
                        좋아요순
                    </button>
                </div>

                <button
                    type="button"
                    className={list.writeButton}
                    onClick={onClickWrite}
                >
                    글 작성하기
                </button>
            </div>
            <ul className={list.list}>
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} onClick={() => onClickPost(post.id)} />
                ))}
            </ul>
        </div>
    );
   
};

export default PostList;