import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: IPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex bg-gray-50 px-2 gap-2 py-1 rounded-md">
      <button
        className={`bg-white rounded-full w-8 h-8 flex items-center justify-center ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-2 py-1  rounded-full w-8 h-8 ${currentPage === index + 1 ? "bg-green-500 text-white cursor-not-allowed" : "bg-gray-200 cursor-pointer"}`}
          disabled={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`bg-white rounded-full w-8 h-8 flex items-center justify-center ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)
        }
      >
        <ChevronRight />
      </button>
    </div>
  );
}
