import type React from "react";
import { useState } from "react";
import form from "./CommentForm.module.css";


type CommentFormProps = {
    onSubmit: (content: string) => void;
    placeholder?: string;
};

const CommentForm: React.FC<CommentFormProps> = ({
    onSubmit, placeholder = "댓글을 입력해 주세요."
}) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!content.trim()) return;
        onSubmit(content);
        setContent("");
    };
    
    return (
        <form className={form.form} onSubmit={handleSubmit}>
            <textarea
                className={form.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                rows={3}
            />
            <button type="submit" className={form.submitBtn}>
                등록
            </button>
        </form>
    );
};

export default CommentForm;