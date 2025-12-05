import type React from "react";
import { useState } from "react";
import form from "./CommentForm.module.css";


type CommentFormProps = {
    onSubmit: (content: string) => void;
    placeholder?: string;
    isReply?: boolean;
};

const CommentForm: React.FC<CommentFormProps> = ({
    onSubmit, placeholder = "댓글을 입력해 주세요.", isReply = false,
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
                className={`${form.textarea} ${isReply ? form.replyTextarea : ""}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                rows={isReply ? 2 : 3}
            />
            <div className={form.bottomRow}>
                <button type="submit" className={form.submitButton}>
                    {isReply ? "답글 등록" : "댓글 등록"}
                </button>
            </div>
        </form>
    );
};

export default CommentForm;