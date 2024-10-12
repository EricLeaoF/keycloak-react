// src/contexts/KeycloakContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import { httpClient } from '../HttpClient';

interface KeycloakContextType {
  kc: Keycloak.KeycloakInstance | null;
}

const KeycloakContext = createContext<KeycloakContextType | undefined>(undefined);

const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [kc, setKc] = useState<Keycloak.KeycloakInstance | null>(null);
  useEffect(() => {
    const initKeycloak = async () => {
      const keycloak = new Keycloak({
        url: getEnvVar('KEYCLOAK_URL'),
        realm: getEnvVar('REALM'),
        clientId: getEnvVar('CLIENT_ID')
      });

      try {
        const auth = await keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: true,
          pkceMethod: 'S256',
        });

        if (auth) {
          setKc(keycloak);
          // Set the token in the HTTP client
          if (kc) {
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
          }
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error('Keycloak initialization failed', error);
      }
    };

    initKeycloak();
  }, []);

  return (
    <KeycloakContext.Provider value={{ kc }}>
      {children}
    </KeycloakContext.Provider>
  );
};

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (context === undefined) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  return context;
};

export { KeycloakProvider, useKeycloak };
