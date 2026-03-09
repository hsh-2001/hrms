interface IPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function RightPopup({ isOpen, onClose, children }: IPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-1000 flex justify-end right-0 top-0 h-screen w-full bg-black/20 overflow-hidden"
      onClick={(e) => {
        onClose();
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
}
