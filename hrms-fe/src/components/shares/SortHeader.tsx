import { MoveUp, MoveDown, ArrowUpDown } from "lucide-react";

interface ISortableHeaderProps {
  label: string;
  sortKey: string;
  activedSortKey?: string;
  currentSort: "DESC" | "ASC";
  onSort: (key: string, order: "ASC" | "DESC") => void;
  setSortOrder: (order: "ASC" | "DESC") => void;
}

const SortableHeader = ({
  label,
  sortKey,
  activedSortKey,
  currentSort,
  onSort,
  setSortOrder,
}: ISortableHeaderProps) => {
  const isActive = activedSortKey === sortKey;

  const handleSort = () => {
    const newSort = isActive && currentSort === "ASC" ? "DESC" : "ASC";
    setSortOrder(newSort);
    onSort(sortKey, newSort);
  };

  const renderIcon = () => {
    if (!isActive) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return currentSort === "DESC" ? (
      <MoveUp size={16} />
    ) : (
      <MoveDown size={16} />
    );
  };

  return (
    <button
      onClick={handleSort}
      className={`flex items-center gap-2 hover:text-green-600 transition-colors ${isActive ? "text-green-600" : "text-gray-800"}`}
    >
      {label}
      {renderIcon()}
    </button>
  );
};

export default SortableHeader;