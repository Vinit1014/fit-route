import "./App.css"
import Tracker from "./components/Tracker"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            FitRoute Lite 
          </h1>
          <p className="text-gray-600 text-lg">Track your adventures in real-time</p>
        </div>
        <Tracker />
      </div>
    </div>
  )
}

export default App
