import type { SortOption } from "./BoardList";
import list from './BoardList.module.css';

type BoardListHeaderProps = {
    categories : string[];
    selectedCategory : string;
    onChangeCategory : (category:string) => void;
    sortOption : SortOption;
    onChangeSort : (sort: SortOption) => void;
    onClickWrite : () => void;
};

const BoardListHeader: React.FC<BoardListHeaderProps> = ({
        categories,
        selectedCategory,
        onChangeCategory,
        sortOption,
        onChangeSort,
        onClickWrite
    }) => {
    return (
        <div className={list.headerWrapper}>
            <div className={list.leftArea}>
                <div className={list.categoryTabs}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            className={`${list.categoryTab} ${
                                selectedCategory === cat ? list.active : ""
                            }`}
                            onClick={() => onChangeCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div className={list.rightArea}>
                <select
                    className={list.sortSelect}
                    value={sortOption}
                    onChange={(e) => onChangeSort(e.target.value as SortOption)}
                >
                    <option value="latest">최신순</option>
                    <option value="likes">좋아요순</option>
                </select>

                <button
                    type="button"
                    className={list.writeButton}
                    onClick={onClickWrite}
                >
                    글 작성하기
                </button>
            </div>
        </div>
    );
};

export default BoardListHeader;