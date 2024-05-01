function Sidebar() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-gray-800">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 bg-gray-900">
          <img src="logo.png" alt="Logo" className="h-8" />
        </div>
        {/* Sidebar Links */}
        <nav className="flex flex-col flex-1 px-2 py-4 space-y-2">
          <a
            href="#"
            className="px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
          >
            Orders
          </a>
          <a
            href="#"
            className="px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
          >
            Products
          </a>
          <a
            href="#"
            className="px-4 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
          >
            Customers
          </a>
        </nav>
        {/* Logout */}
        <div className="flex items-center justify-center py-4 bg-gray-900">
          <a href="#" className="text-gray-300 hover:text-white">
            Logout
          </a>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4">{/* Content Here */}</div>
    </div>
  );
}

export default Sidebar;
