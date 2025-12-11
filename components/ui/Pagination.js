import Link from 'next/link';

export default function Pagination({ currentPage }) {
  return (
    <div className="flex items-center justify-center gap-6 mt-12">
      <Link 
        href={`/players?page=${Math.max(1, currentPage - 1)}`}
        className={`px-6 py-3 bg-white rounded-xl border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
      >
        ← Previous
      </Link>
      
      <span className="text-gray-600 font-medium px-4 py-2">
        Page {currentPage}
      </span>
      
      <Link 
        href={`/players?page=${currentPage + 1}`}
        className="px-6 py-3 bg-white rounded-xl border-2 border-gray-200 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50"
      >
        Next →
      </Link>
    </div>
  );
}