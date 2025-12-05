import type React from "react";
import type { Post } from "../../data/dummyPosts";
import list from './BoardList.module.css';
import PostItem from "./PostItem";

type PostListProps = {
    posts: Post[];
    onClickPost: (id:number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onClickPost }) => {
    if(posts.length === 0){
        return (
            <div className={list.empty}>
                게시글이 존재하지 않습니다.
            </div>
        );
    }

    return(
        <ul className={list.list}>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} onClick={() => onClickPost(post.id)} />
            ))}
        </ul>
    );
};

export default PostList;