import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline';
import { useKeycloak } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
  const { kc } = useKeycloak();

  if (!kc || !kc.tokenParsed) { return <div></div>; }
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [firstName, setFirstName] = useState(kc.tokenParsed.given_name || kc.tokenParsed.preferred_username || '');
  const [lastName, setLastName] = useState(kc.tokenParsed.family_name || '');
  const preferred_username = kc.tokenParsed.preferred_username;

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const openDialog = () => {
    setShowDialog(true);
    setShowDropdown(false);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleLogout = () => {
    kc.logout();
  };

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  return (
    <div className="flex flex-col absolute w-full h-full">
      <header className="flex bg-gray-800 text-white p-4 w-full left-0 sticky top-0 z-50">
        <div className="flex-1"></div>
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
            <div className="right-0 mt-40 w-48 bg-white text-gray-800 border border-gray-300 shadow-lg rounded-lg">
              <ul>
                <li>
                  <button 
                    onClick={openDialog} 
                    className="block px-4 py-2 hover:bg-gray-100 w-full"
                  >
                    Perfil
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full px-4 py-2 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-1 max-w-full">
        <aside className="bg-white p-4 w-48 fixed top-16 left-0 h-full overflow-y-auto border-2">
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
              <span>Demo Keycloak</span>
            </Link>
          </nav>
        </aside>
      </div>
      <main className="bg-slate-100 ml-48 p-4 h-screen max-w-full relative">
        <Outlet />
      </main>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-80"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-4">Editar Perfil</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input 
                    type="text" 
                    value={firstName} 
                    className="border border-gray-300 p-2 rounded-md w-full"
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={handleLastNameChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={kc.tokenParsed.email} 
                    className="border border-gray-300 p-2 rounded-md w-full"
                    readOnly 
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={closeDialog} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Fechar
                  </button>
                  <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
