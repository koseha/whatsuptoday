interface AnalysisResultDisplayProps {
  generatedPhrase: string;
  onRegenerate: () => void;
  onReset: () => void;
}

export default function AnalysisResultDisplay({ 
  generatedPhrase, 
  onRegenerate, 
  onReset 
}: AnalysisResultDisplayProps) {
  return (
    <div className="space-y-2">
      <p className="text-center text-green-600 font-medium">문구 생성 완료!</p>
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
        <p className="text-center text-lg font-medium text-gray-800">
          {generatedPhrase}
        </p>
      </div>
      <button
        style={{
          background: 'white',
          border: '0.5px solid hsl(245,70%,59%)',
          color: 'hsl(245,70%,59%)'
        }}
        onClick={onRegenerate}
        className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
      >
        다른 문구 생성하기
      </button>
      <button
        onClick={onReset}
        className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border-[0.5px] border-border rounded-lg hover:bg-muted cursor-pointer"
      >
        다른 사진으로 변경
      </button>
    </div>
  );
}
