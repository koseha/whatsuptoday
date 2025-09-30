import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mb-14 text-center text-sm">
      {/* 모바일: 3열 x 2행 그리드 with |, 데스크톱: 한 줄 with | */}
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 mb-4 text-xs">
        <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
          소개
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/project" className="text-muted-foreground hover:text-foreground transition-colors">
          프로젝트
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
          FAQ
        </Link>
        <span className="text-muted-foreground md:inline">|</span>
        <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
          개인정보 처리방침
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
          이용 약관
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
          연락처
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <Image
          src="/favicon.svg"
          alt="What's Up Today"
          width={16}
          height={16}
          className="w-4 h-4 opacity-60"
        />
        <p>© 2025 koseha. All rights reserved.</p>
      </div>
    </footer>
  );
}
