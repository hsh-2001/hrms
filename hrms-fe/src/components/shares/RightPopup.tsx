interface IPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function RightPopup({ isOpen, onClose, children }: IPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 right-0 top-0 h-screen w-full bg-black/20 overflow-hidden"
      onClick={(e) => {
        onClose();
        e.stopPropagation();
      }}
    >
      <main className="w-full h-full flex justify-end right-popup">
        {children}
      </main>
    </div>
  );
}
