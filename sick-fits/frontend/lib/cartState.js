import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

function CartStateProvider({ children }) {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  function toggleCart() {
    setCartIsOpen(!cartIsOpen);
  }

  function openCart() {
    setCartIsOpen(true);
  }

  function closeCart() {
    setCartIsOpen(false);
  }

  return (
    <LocalStateContext.Provider
      value={{ cartIsOpen, setCartIsOpen, toggleCart, openCart, closeCart }}
    >
      {children}
    </LocalStateContext.Provider>
  );
}

function useCart() {
  const allState = useContext(LocalStateContext);
  return allState;
}

export { CartStateProvider, useCart };
