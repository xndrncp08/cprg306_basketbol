import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Basketbol - NBA 2K Inspired Stats',
  description: 'NBA statistics with 2K-style card interface',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark text-white`}>
        <div className="relative min-h-screen">
          {/* Background effects */}
          <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-[-2]"></div>
          <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=2070')] opacity-5 bg-cover z-[-1]"></div>
          
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}