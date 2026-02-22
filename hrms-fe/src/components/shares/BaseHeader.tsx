interface BaseHeaderProps {
  headerTitle: string;
  children?: React.ReactNode;
}

export default function BaseHeader({ headerTitle, children }: BaseHeaderProps) {
  return (
    <div className="w-full p-4 bg-gray-100 rounded-md my-2 flex justify-between items-center">
      <div>
        <span className="text-gray-800 text-lg">{ headerTitle }</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
