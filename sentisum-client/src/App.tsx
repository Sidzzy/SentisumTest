import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import AppSidebar from './components/SideBar';

// Define the interface for the component's props (if needed in the future)
interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="flex h-screen bg-white">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
