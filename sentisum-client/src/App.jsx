import Dashboard from './components/Dashboard';
import './App.css';
import AppSidebar from './components/SideBar';

function App() {
  return (
    <div className="flex h-screen bg-white">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;