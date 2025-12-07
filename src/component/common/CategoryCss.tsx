import type { BoardCategory } from "../../data/categories";
import css from "./CategoryCss.module.css";

type CategoryCssProps = {
    category: BoardCategory;
    className?:string;
}
const CategoryCss: React.FC<CategoryCssProps> = ({category, className=""}) => {
    let categoryClass = "";

    switch(category) {
        case "공지" : categoryClass = css.notice; break;
        case "자유": categoryClass = css.free; break;
        case "공포": categoryClass = css.horror; break;
        case "유머": categoryClass = css.humor; break;
        case "잡담": categoryClass = css.chat; break;
        default: categoryClass = css.all;
    }

    return (
        <span className={`${css.badge} ${categoryClass} ${className}`}>
        {category}
        </span>
    )
}

export default CategoryCss;
