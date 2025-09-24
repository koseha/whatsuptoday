import Image from "next/image";
import BasicContainer from "../../ui/BasicContainer";
import { AnalysisStates } from "../analysis";

interface ImageUploadProps {
  fileUrl: string;
  onReset: () => void;
}

export default function ImageUpload({
  fileUrl,
  onReset
}: ImageUploadProps) {
  return (
    <BasicContainer>
      <div className="space-y-4">
        <div className="relative w-full max-w-md mx-auto">
          {/* 이미지 컨테이너 - 정사각형 비율로 고정 */}
          <div className="relative w-full aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <Image
              src={fileUrl}
              alt="업로드된 이미지"
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>

        {/* 분석 상태 관리 */}
        <AnalysisStates
          imageUrl={fileUrl}
          onReset={onReset}
        />
      </div>
    </BasicContainer>
  );
}
