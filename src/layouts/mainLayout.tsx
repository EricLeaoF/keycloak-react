import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline';
import { useKeycloak } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { kc } = useKeycloak();
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showDialog, setShowDialog] = useState(false);

  // const navigate

  if (!kc || !kc.tokenParsed) {
    return <div></div>;
  }

  const preferred_username = kc.tokenParsed.preferred_username;

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <header className="fixed flex bg-gray-800 text-white p-4 w-full top-0 left-0 z-10">
        <div className="flex-1">
          {/* Espaço reservado para outros elementos no cabeçalho */}
        </div>
        <div className="flex items-center relative">
          <button 
            onClick={toggleDropdown} 
            className="flex items-center space-x-2 text-white focus:outline-none"
          >
            <span>{preferred_username}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-48 w-50 bg-white text-gray-800 border border-gray-300 shadow-lg rounded-lg">
              <ul>
                <li>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Perfil</Link>
                </li>
                <li>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Configurações</Link>
                </li>
                <li>
                  <button className="block w-full px-4 py-2 hover:bg-gray-100">Sair</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-1 pt-16 overflow-hidden">
        <aside className="bg-white p-4 w-48 fixed top-16 left-0 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-8">
            <Link to="/" className="flex flex-col items-center space-x-2 text-gray-700 hover:text-gray-900">
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <Link to="/access" className="flex flex-col items-center space-x-2 text-gray-700 hover:text-gray-900">
              <UserIcon className="h-6 w-6" />
              <span>Acessos</span>
            </Link>
            <Link to="/demokc" className="flex flex-col items-center space-x-2 text-gray-700 hover:text-gray-900">
              <CogIcon className="h-6 w-6" />
              <span>Ajustes</span>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 ml-48 p-4 overflow-auto mainPage">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
