import { useCallback, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { type FaceAnalysisResult } from '@/hooks/useFaceAnalysis';

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const generatePhrase = async (analysisResult: FaceAnalysisResult) => {
  try {
    // 소수점 4자리로 제한
    const roundedExpressions = Object.fromEntries(
      Object.entries(analysisResult.emotions).map(([key, value]) => [key, parseFloat(value.toFixed(4))])
    );

    const { data, error } = await supabase.functions.invoke('generate', {
      body: {
        dominantEmotion: analysisResult.dominantEmotion,
        dominantScore: analysisResult.dominantScore,
        age: analysisResult.age,
        gender: analysisResult.gender,
        emotions: roundedExpressions,
        lang: "한국어"
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Supabase function error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('generatePhrase error:', error);
    throw error;
  }
};

export const usePhraseGeneration = (analysisResult: FaceAnalysisResult | null) => {
  const [generatedPhrase, setGeneratedPhrase] = useState<string>('');
  const [generatingPhase, setGeneratingPhase] = useState<'search' | 'writing'>('search');

  const handleGeneratePhrase = useCallback(async () => {
    if (!analysisResult) return;

    try {
      // 3초 후 글쓰기 애니메이션으로 전환
      setTimeout(() => {
        setGeneratingPhase('writing');
      }, 3000);

      // 실제 generatePhrase 함수 호출
      const result = await generatePhrase(analysisResult);

      // API 응답에서 문구 추출 (Edge Function이 { text: "문구" } 형태로 응답)
      const aiPhrase = result.text || "분석 결과를 생성했습니다.";
      setGeneratedPhrase(aiPhrase);

      return 'completed'; // 성공 상태 반환

    } catch (error) {
      console.error('문구 생성 오류:', error);
      // 에러 발생 시 기본 문구 사용
      const defaultPhrase = "오늘도 수고하셨어요! 💫";
      setGeneratedPhrase(defaultPhrase);
      return 'completed'; // 성공 상태로 처리
    }
  }, [analysisResult]);

  return {
    generatedPhrase,
    generatingPhase,
    setGeneratingPhase,
    handleGeneratePhrase
  };
};
