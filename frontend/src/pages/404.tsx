export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <a href="/" className="bg-white text-primary px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition inline-block">
          Go Home
        </a>
      </div>
    </div>
  );
}
