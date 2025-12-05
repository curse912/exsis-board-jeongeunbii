import type React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { dummyPosts } from "../data/dummyPosts";
import BoardWriteForm, { type BoardWriteFormValues } from "../component/boardWrite/BoardWriteForm";


const BoardWritePage: React.FC = () => {

    const navigate = useNavigate();

    const categories = useMemo(() => {
        const set = new Set<string>();
        dummyPosts.forEach((p) => set.add(p.category));
        return Array.from(set);
    },[]);

    const handleSubmit = (values: BoardWriteFormValues) => {
        console.log("작성 폼 값",values);
        alert("글 작서이 완료 되었습니다.");
        
        navigate("/");
    };

    const handleCancel = () => {
        const ok = window.confirm("작성중인 내용을 취소하시겠습니까?");
        if (!ok) return;
        navigate(-1);
    };
    return (
        <div>
            <h2>글 작성</h2>
            <BoardWriteForm
                categories={categories}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default BoardWritePage;