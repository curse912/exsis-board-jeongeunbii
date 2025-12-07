import { useMemo, useState } from "react";
import { dummyPosts, type Post } from "../../data/dummyPosts";
import list from "./BoardList.module.css";
import BoardListHeader from "./BoardListHeader";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import { BOARD_CATEGORIES } from "../../data/categories";

export type SortOption = "latest" | "likes";

const BoardList: React.FC = () => {
    const [selectedCategory, setselectedCategory] = useState<string>("전체");
    const [sortOption, setsortOption] = useState<SortOption>("latest");
    const navigate = useNavigate();

    // 카테고리 목록
    const categories = useMemo(() => {
        return ["전체", ...BOARD_CATEGORIES];
    }, []);

    // 정렬
    const sortPosts = useMemo(() => {
        let posts: Post[] = 
        selectedCategory === "전체" ? dummyPosts : dummyPosts.filter((post) => post.category === selectedCategory);

        if(sortOption === "latest"){
            posts = [...posts].sort(
                (a, b) => new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()
            );
        }else if(sortOption === "likes"){
            posts = [...posts].sort((a,b) => b.likes - a.likes);
        }

        return posts;
    },[selectedCategory, sortOption]);

    const handleClickwrite = () => {
        navigate("/write");
    };

    const handleClickDetail = (id:number) => {
        navigate(`/detail/${id}`);
    };

    return (
        <section className={list.boardSection}>
            <BoardListHeader
                categories={categories}
                selectedCategory = {selectedCategory}
                onChangeCategory = {setselectedCategory}
            />
            <PostList posts={sortPosts} onClickPost={handleClickDetail}
                sortOption = {sortOption}
                onChangeSort = {setsortOption}
                onClickWrite = {handleClickwrite}
            />
        </section>
    );
};

export default BoardList;