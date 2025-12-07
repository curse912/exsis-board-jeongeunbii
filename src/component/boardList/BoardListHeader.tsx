import list from './BoardList.module.css';

type BoardListHeaderProps = {
    categories : string[];
    selectedCategory : string;
    onChangeCategory : (category:string) => void;
};

const BoardListHeader: React.FC<BoardListHeaderProps> = ({
        categories,
        selectedCategory,
        onChangeCategory,
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
        </div>
    );
};

export default BoardListHeader;