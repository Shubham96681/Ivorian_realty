import { useState } from 'react';

export const useComingSoon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Feature Coming Soon",
    message: "This feature is currently under development and will be available soon!"
  });

  const showComingSoon = (title, message) => {
    setModalContent({ title, message });
    setIsOpen(true);
  };

  const hideComingSoon = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    modalContent,
    showComingSoon,
    hideComingSoon
  };
};
