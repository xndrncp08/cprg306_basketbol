export default function Footer() {
  return (
    <footer className="bg-card border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gradient">Basketbol</h3>
            <p className="text-gray-400 mt-2">NBA Statistics • Xander Rancap</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              Data provided by ESPN API & Ball Don't Lie API
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © {new Date().getFullYear()} Basketbol. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            This is a fan-made project. NBA and NBA 2K are trademarks of the National Basketball Association.
          </p>
        </div>
      </div>
    </footer>
  )
}