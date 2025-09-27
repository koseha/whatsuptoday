import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mb-14 text-center text-sm">
      <div className="flex justify-center gap-4 mb-2 text-xs">
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
      <p className="text-muted-foreground">© 2025 koseha. All rights reserved.</p>
    </footer>
  );
}
