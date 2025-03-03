// pages/index.js
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Maintenance Platform</h1>
      <p className="mb-8">Manage interventions, equipment, and more.</p>
      <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
        Get Started
      </a>
    </div>
  );
}
