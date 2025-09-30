import Image from 'next/image';

export default function RootPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var savedLanguage = localStorage.getItem('whatsuptoday-language') || 'ko';
              window.location.replace('/' + savedLanguage + '/');
            })();
          `,
        }}
      />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/favicon.svg"
                alt="What's Up Today"
                width={64}
                height={64}
                className="w-16 h-16 animate-bounce"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
          <p className="text-gray-600">페이지를 이동하고 있습니다.</p>
        </div>
      </div>
    </>
  );
}
