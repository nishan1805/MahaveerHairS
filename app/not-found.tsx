import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 font-display">Page Not Found</h1>
      <p className="text-gray-600 mb-6">Sorry, we could not find the page you were looking for.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#01B1EE] hover:bg-[#00A2D9] text-white font-medium rounded-lg transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
