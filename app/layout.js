import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Basketbol - NBA 2K Inspired Stats',
  description: 'NBA statistics with 2K-style card interface',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <div className="relative min-h-screen">
          {/* Background effects */}
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-[-2]"></div>
          <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=2070')] opacity-5 bg-cover z-[-1]"></div>
          
          {/* Simple Navbar */}
          <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">🏀</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                      Basketbol
                    </h1>
                    <p className="text-xs text-gray-400">NBA 2K Inspired</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center space-x-4">
                  <a href="/" className="text-gray-300 hover:text-white px-3 py-2">Home</a>
                  <a href="/players" className="text-gray-300 hover:text-white px-3 py-2">Players</a>
                  <a href="/standings" className="text-gray-300 hover:text-white px-3 py-2">Standings</a>
                  <a href="/scores" className="text-gray-300 hover:text-white px-3 py-2">Scores</a>
                  <a href="/news" className="text-gray-300 hover:text-white px-3 py-2">News</a>
                </div>
                
                <button className="md:hidden p-2">
                  <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                  <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                  <div className="w-6 h-0.5 bg-white"></div>
                </button>
              </div>
            </div>
          </nav>
          
          <main>{children}</main>
          
          {/* Simple Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 mt-12">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <p className="text-gray-400">© 2024 Basketbol - NBA 2K Inspired Stats</p>
                <p className="text-gray-500 text-sm mt-2">Data provided by ESPN API & Ball Don't Lie API</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}