import Image from "next/image";

interface ImageDisplayProps {
  fileUrl: string;
}

export default function ImageDisplay({ fileUrl }: ImageDisplayProps) {
  return (
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
  );
}
