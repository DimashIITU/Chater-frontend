import React from 'react';
import { createPortal } from 'react-dom';

interface ChatPortalProps {
  children: React.ReactNode;
}

const ChatPortal: React.FC<ChatPortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState<boolean>();
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.querySelector('#chatPortal')) : null;
};

export default ChatPortal;
