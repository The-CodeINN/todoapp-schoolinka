import React, { useEffect, useRef, useState } from "react";
import { AddTask } from "./AddTask";

interface MobileTaskProps {
  show: boolean;
  children: React.ReactNode;
  onClose: () => void;
}
export const MobileTasks = ({ children, show, onClose }: MobileTaskProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(show);
  const modalRef = useRef<any>(null);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  const handleClickOutside = (event: React.SyntheticEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    setIsOpen(show);
  }, [show]);
  return (
    <>
      {isOpen && (
        <div className="h-screen fixed md:hidden inset-0 z-20 overflow-hidden">
          <div className="w-full bg-black/40" onClick={handleClose}></div>
          <div ref={modalRef}>{children}</div>
        </div>
      )}
    </>
  );
};
