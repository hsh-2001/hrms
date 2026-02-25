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
      <div className={`bg-white rounded-[20px] space-y-2 p-4 base-dialog-body overflow-hidden ${isCentered ? "" : "mt-4 m-auto"}`} onClick={(e) => e.stopPropagation()}>
        <div className='w-full bg-black/5 rounded-[20px]'>
          <div className='p-2 text-center'>
            <h2 className="text-md text-gray-600">{title}</h2>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
