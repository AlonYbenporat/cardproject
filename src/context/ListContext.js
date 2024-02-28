import { createContext, useState } from "react";

export const ListContext = createContext();


export function ListProvider({ children }) {
  const [items, setItems] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <ListContext.Provider value={{ items, setSelectedItem, selectedItem }}>
      {children}
    </ListContext.Provider>
  );
}