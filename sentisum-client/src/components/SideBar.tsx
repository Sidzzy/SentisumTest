import React from 'react';
import { GridIcon, ListIcon, PageIcon, UserIcon } from '../icons';

const SideBar: React.FC = () => {
  return (
    <div className="h-screen w-20 bg-white text-gray-800 flex flex-col items-center shadow-lg sticky">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-extrabold text-indigo-600">S</h2>
      </div>

      {/* Sidebar Menu */}
      <ul className="flex-1 mt-6 space-y-6">
        {/* Functional Icon */}
        <li className="group flex justify-center items-center w-12 h-12 bg-indigo-100 rounded-lg cursor-pointer">
          <GridIcon className="w-6 h-6 text-indigo-600" />
        </li>

        {/* Non-functional Icons */}
        <li className="group flex justify-center items-center w-12 h-12 hover:bg-gray-100 rounded-lg cursor-not-allowed">
          <ListIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-400" />
        </li>
        <li className="group flex justify-center items-center w-12 h-12 hover:bg-gray-100 rounded-lg cursor-not-allowed">
          <PageIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-400" />
        </li>
      </ul>

      {/* Logout (Non-functional) */}
      <div className="border-t border-gray-200 p-4">
        <li className="group flex justify-center items-center w-12 h-12 hover:bg-red-100 rounded-lg cursor-not-allowed">
          <UserIcon className="w-6 h-6 text-gray-400 group-hover:text-gray-400" />
        </li>
      </div>
    </div>
  );
};

export default SideBar;
