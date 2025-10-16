'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // 광고가 이미 로드되었거나, 요소가 없으면 중단
    if (isAdLoaded.current || !adRef.current) return;

    try {
      // ins 요소에 data-adsbygoogle-status 속성이 있는지 확인
      const adElement = adRef.current;
      const isAlreadyFilled = adElement.getAttribute('data-adsbygoogle-status');

      if (!isAlreadyFilled) {
        // @ts-expect-error - adsbygoogle is dynamically loaded by Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1510173979053173"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

