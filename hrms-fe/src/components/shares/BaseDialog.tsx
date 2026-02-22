import React from 'react'

interface IBaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  title?: string;
  isCentered?: boolean;
}

export default function BaseDialog({ isOpen, onClose, children, closeOnOverlayClick = true, title = 'Dialog', isCentered = false }: IBaseDialogProps) {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 base-dialog flex justify-center z-50 ${isCentered ? "items-center" : ""}`} 
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div className={`bg-white rounded-md base-dialog-body overflow-hidden ${isCentered ? "" : "mt-4 m-auto"}`} onClick={(e) => e.stopPropagation()}>
        <div className='w-full bg-gray-100'>
          <div className='p-4'>
            <h2 className="text-lg text-gray-600">{title}</h2>
          </div>
          <div className="border-t border-gray-300"></div>
        </div>
        <div className='p-4'>
          {children}
        </div>
      </div>
    </div>
  )
}
