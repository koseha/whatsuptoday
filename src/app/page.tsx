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
          <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
          <p className="text-gray-600">페이지를 이동하고 있습니다.</p>
        </div>
      </div>
    </>
  );
}
