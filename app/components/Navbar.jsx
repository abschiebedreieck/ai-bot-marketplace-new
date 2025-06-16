export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center fixed w-full z-50 shadow-md">
      <div className="text-2xl font-bold">AI Bot Marketplace</div>
      <div className="flex space-x-6">
        <a href="/marketplace" className="hover:text-gray-400">Marketplace</a>
        <a href="/login" className="hover:text-gray-400">Login</a>
        <a href="/dashboard" className="hover:text-gray-400">Dashboard</a>
      </div>
    </nav>
  )
}
