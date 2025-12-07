import type React from "react";
import { useMemo, useState } from "react";
import writeF from "./BoardWriteForm.module.css";
import type { BoardCategory } from "../../data/categories";

export type BoardWriteFormValues = {
    category: BoardCategory;
    title: string;
    content: string;
    commentBlocked: boolean;
    image: File | null;
};

type BoardWriteFormProps = {
    categories: readonly BoardCategory[];
    onSubmit: (values: BoardWriteFormValues) => void;
    onCancel: () => void;
}
const BoardWriteForm: React.FC<BoardWriteFormProps> = ({ categories, onSubmit, onCancel }) => {

    const [category, setCategory] = useState<BoardCategory>(categories[0]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [commentBlocked, setCommentBlocked] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const preview = useMemo(
        () => (image ? URL.createObjectURL(image) : null),[image]
    );

    const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
        e.target.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!category.trim()) {
            alert("카테고리를 선택해 주세요.");
            return;
        }
        if (!title.trim()) {
            alert("제목을 입력해 주세요.");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해 주세요.");
            return;
        }

        onSubmit({ category, title, content, commentBlocked, image });
    };

    return(
        <form className={writeF.form} onSubmit={handleSubmit}>

            {/* 카테고리 */}
            <div className={writeF.fieldRow}>
                <label className={writeF.label} htmlFor="category">
                    카테고리
                </label>

                <select
                    id="category"
                    className={writeF.select}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as BoardCategory)}
                >
                    <option value="" disabled>
                        카테고리를 선택해 주세요
                    </option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* 제목 */}
            <div className={writeF.fieldRow}>
                <label className={writeF.label} htmlFor="title">
                    제목
                </label>
                <input
                    id="title"
                    className={writeF.input}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해 주세요."
                />
            </div>

            {/* 내용 */}
            <div className={writeF.fieldRow}>
                <label className={writeF.label} htmlFor="content">
                    내용
                </label>
                <textarea
                    id="content"
                    className={writeF.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력해 주세요."
                    rows={10}
                />
            </div>

            {/* 이미지 첨부 */}
            <div className={writeF.fieldRow}>
                <span className={writeF.label}>이미지 첨부</span>
                <div className={writeF.imageField}>
                <label className={writeF.fileLabel}>
                    파일 선택 (1개)
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className={writeF.fileInput}
                        onChange={handleChangeFiles}
                    />
                </label>

                {preview && (
                    <div className={writeF.previewItem}>
                        <img
                            src={preview}
                            alt="preview"
                            className={writeF.previewImage}
                        />
                        <button
                            type="button"
                            className={writeF.removeButton}
                            onClick={() => setImage(null)}
                        >
                            제거
                        </button>
                    </div>
                )}
                </div>
            </div>

            {/* 댓글 막기 */}
            <div className={writeF.fieldRow}>
                <span className={writeF.label}>댓글 설정</span>
                <label className={writeF.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={commentBlocked}
                    onChange={(e) => setCommentBlocked(e.target.checked)}
                />
                이 게시글에 댓글 쓰기 막기
                </label>
            </div>

            {/* 버튼 영역 */}
            <div className={writeF.buttonRow}>
                <button
                    type="button"
                    className={writeF.cancelButton}
                    onClick={onCancel}
                >
                    작성 취소
                </button>
                <button type="submit" className={writeF.submitButton}>
                    작성 완료
                </button>
            </div>
        </form>
    );
}

export default BoardWriteForm;