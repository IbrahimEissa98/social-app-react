import { createContext, useState } from "react";

export const PagesContext = createContext();

export default function PagesContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PagesContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PagesContext.Provider>
  );
}
