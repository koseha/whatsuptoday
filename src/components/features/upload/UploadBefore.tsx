import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface UploadBeforeProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBefore({ onFileSelect }: UploadBeforeProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  // 텍스트 상수
  const TEXTS = {
    uploadTitle: "얼굴 사진을 선택하세요",
    uploadDescription: "이미지 파일을 드래그하거나 클릭해서 선택",
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file =>
      file.type.startsWith('image/')
    );

    if (validFile) {
      onFileSelect(validFile);
    }
  }, [onFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`upload-area cursor-pointer ${isDragOver ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => {
        const input = document.getElementById('file-upload') as HTMLInputElement;
        input?.click();
      }}
    >
      <div className="flex flex-col items-center space-y-4">
        <Upload className="w-16 h-16 text-primary mx-auto mb-4 upload-icon-bounce" />

        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">
            {TEXTS.uploadTitle}
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            {TEXTS.uploadDescription}
          </p>
        </div>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
