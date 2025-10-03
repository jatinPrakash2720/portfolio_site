export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard - Development</h1>
        <p className="text-xl text-gray-300 mb-8">
          This is the admin dashboard development page.
        </p>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>User management</li>
            <li>Project CRUD operations</li>
            <li>Domain configuration</li>
            <li>Analytics dashboard</li>
          </ul>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-400">
            Running on: <span className="text-blue-400">http://localhost:3002</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Admin Dashboard - Development',
  description: 'Admin dashboard for managing portfolios',
}
