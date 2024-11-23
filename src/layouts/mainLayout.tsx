import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useKeycloak } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Ripple } from 'primereact/ripple';

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
            <div className="right-0 mt-36 w-48 bg-white text-gray-800 border border-gray-300 shadow-lg rounded-lg absolute">
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
        <aside className="bg-white p-3 w-48 fixed top-16 left-0 h-full overflow-y-auto border-2">
          <div className="overflow-y-auto">
            <ul className="list-none m-0">
              <li>
                  <ul className="list-none p-0 m-0 overflow-hidden">
                      <li>
                        <Link to="/">
                          <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-home mr-2"></i>
                            <span className="font-medium">Dashboard</span>
                            <Ripple />
                          </a>
                        </Link>
                          
                      </li>
                      <li>
                        <Link to="/access">
                          <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-users mr-2"></i>
                              <span className="font-medium">Team</span>
                              <Ripple />
                          </a>
                        </Link>  
                      </li>
                      <li>
                        <Link to="/demokc">
                          <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                              <i className="pi pi-cog mr-2"></i>
                              <span className="font-medium">Settings</span>
                              <Ripple />
                          </a>
                        </Link>
                      </li>
                  </ul>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <main className="bg-slate-100 ml-48 p-3 h-screen max-w-full relative">
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
