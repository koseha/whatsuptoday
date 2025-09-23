import { useCallback, useState } from "react";
import { Upload, Camera, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

const UploadArea = ({ onFileUpload }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

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
      onFileUpload(validFile);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={cn(
          "upload-area",
          isDragOver && "active"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-hero p-4 rounded-xl">
            <Upload className="w-8 h-8 text-white" />
          </div>

          <div className="text-center">
            <h3 className="korean-bold text-lg mb-2">
              사진이나 동영상을 업로드하세요
            </h3>
            <p className="text-muted korean text-sm leading-relaxed">
              파일을 드래그하거나 클릭해서 업로드
            </p>
          </div>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />

          <label
            htmlFor="file-upload"
            className="btn-primary cursor-pointer korean-bold"
          >
            <Camera className="w-4 h-4 mr-2" />
            파일 선택
          </label>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="surface-card p-4">
        <h4 className="korean-bold text-sm mb-3 text-center">지원 형식</h4>
        <div className="flex justify-center space-x-6 text-xs korean">
          <div className="flex items-center text-muted">
            <Camera className="w-4 h-4 mr-1" />
            JPG, PNG, WEBP
          </div>
          <div className="flex items-center text-muted">
            <Video className="w-4 h-4 mr-1" />
            MP4, WebM
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;