import React from "react";

function useModal() {
  const [modal, setModal] = React.useState({
    visible: false,
    message: "",
  });

  const showModal = React.useCallback((message) => {
    setModal({ visible: true, message });
  }, []);

  const closeModal = React.useCallback(() => {
    setModal({ visible: false, message: "" });
  }, []);

  return { modal, showModal, closeModal };
}

export default useModal;
