import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    graphData: [],
    ticketData: [],
    title: '',
    description: '',
    metrics: [],
  });

  const openModal = (data) => {
    setModalState({ ...data, isOpen: true });
  };

  const updateModalData = (data) => {
    setModalState((prevState) => ({ ...prevState, ...data }));
  };

  const closeModal = () => {
    setModalState((prevState) => ({ ...prevState, isOpen: false }));
  };

  return (
    <ModalContext.Provider
      value={{ modalState, openModal, closeModal, updateModalData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
