import { useCallback, useState } from "react";
import { Upload, Camera } from "lucide-react";

interface UploadBeforeProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBefore({ onFileSelect }: UploadBeforeProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  // 텍스트 상수
  const TEXTS = {
    uploadTitle: "사진이나 동영상을 업로드하세요",
    uploadDescription: "파일을 드래그하거나 클릭해서 업로드",
    selectFile: "파일 선택"
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
      file.type.startsWith('image/') || file.type.startsWith('video/')
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
        <div className="bg-gradient-hero p-4 rounded-xl">
          <Upload className="w-8 h-8 text-white" />
        </div>

        <div className="text-center">
          <h3 className="korean-bold text-lg mb-2">
            {TEXTS.uploadTitle}
          </h3>
          <p className="text-muted korean text-sm leading-relaxed">
            {TEXTS.uploadDescription}
          </p>
        </div>

        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <button className="btn-primary korean-bold">
          <Camera className="w-4 h-4 mr-2 inline" />
          {TEXTS.selectFile}
        </button>
      </div>
    </div>
  );
}
