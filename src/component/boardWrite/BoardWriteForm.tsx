import type React from "react";
import { useMemo, useState } from "react";
import writeF from "./BoardWriteForm.module.css";

export type BoardWriteFormValues = {
    category: string;
    title: string;
    content: string;
    commentBlocked: boolean;
    images: File[];
};

type BoardWriteFormProps = {
    categories: string[];
    onSubmit: (values: BoardWriteFormValues) => void;
    onCancel: () => void;
}
const BoardWriteForm: React.FC<BoardWriteFormProps> = ({ categories, onSubmit, onCancel }) => {

    const [category, setCategory] = useState<string>(categories[0] ?? "");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [commentBlocked, setCommentBlocked] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);

    const previews = useMemo(
        () => images.map((file) => URL.createObjectURL(file)),[images]
    );

    const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e. target.files;
        if(!files) return;

        const newFiles = Array.from(files);
        
        if(images.length + newFiles.length > 5){
            alert("이미지는 최대 5개까지만 첨부 가능합니다.");
        }

        const availableSlots = Math.max(0, 5 - images.length);
        const filesToAdd = newFiles.slice(0, availableSlots);

        setImages((prev) => [...prev, ...filesToAdd]);

        e.target.value = "";
    };
    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_,i) => i !== index));
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

        onSubmit({ category, title, content, commentBlocked, images });
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
                    onChange={(e) => setCategory(e.target.value)}
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
                    파일 선택 (최대 5개)
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className={writeF.fileInput}
                        onChange={handleChangeFiles}
                    />
                </label>

                {images.length > 0 && (
                    <div className={writeF.previewGrid}>
                    {previews.map((src, index) => (
                        <div key={index} className={writeF.previewItem}>
                            <img
                                src={src}
                                alt={`preview-${index}`}
                                className={writeF.previewImage}
                            />
                            <button
                                type="button"
                                className={writeF.removeButton}
                                onClick={() => handleRemoveImage(index)}
                            >
                                제거
                            </button>
                        </div>
                    ))}
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