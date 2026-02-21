import React from 'react'

interface IBaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  isCentered?: boolean;
}

export default function BaseDialog({ isOpen, onClose, children, closeOnOverlayClick = true, isCentered = false }: IBaseDialogProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 base-dialog flex justify-center z-50 ${isCentered ? "items-center" : ""}`} 
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div className={`bg-white p-4 rounded-md base-dialog-body ${isCentered ? "" : "mt-4 m-auto"}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
