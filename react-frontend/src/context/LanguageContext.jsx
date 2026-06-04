'use client';
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [isGujarati, setIsGujarati] = useState(false);

  return (
    <LanguageContext.Provider value={{ isGujarati, setIsGujarati }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
