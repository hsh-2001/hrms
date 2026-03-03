interface BaseHeaderProps {
  headerTitle: string;
  children?: React.ReactNode;
}

export default function BaseHeader({ headerTitle, children }: BaseHeaderProps) {
  return (
    <div className="w-full px-2">
      <div className="w-full p-4 bg-black/5 rounded-[20px] my-2 flex justify-between items-center">
        <div className="px-4 py-2 bg-gray-50 rounded-sm">
          <span className="text-gray-800 text-lg">{headerTitle}</span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
