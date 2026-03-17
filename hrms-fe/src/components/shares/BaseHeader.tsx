interface BaseHeaderProps {
  headerTitle: string;
  children?: React.ReactNode;
}

export default function BaseHeader({ headerTitle, children }: BaseHeaderProps) {
  return (
    <div className="w-full px-2">
      <div className="w-full rounded-sm px-2 py-4 mb-4 mt-2 shadow-sm bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-600">{headerTitle}</h1>
          <div className="flex items-center gap-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
