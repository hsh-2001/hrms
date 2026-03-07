import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPaginationProps {
  total_page: number;
  page: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  total_page,
  page,
  onPageChange,
}: IPaginationProps) {

  return (
    <div className="flex bg-gray-50 px-2 gap-2 py-1 rounded-md">
      <button
        className={`bg-white rounded-full w-8 h-8 flex items-center justify-center ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={page === 1}
        onClick={() => onPageChange(page > 1 ? page - 1 : 1)}
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: total_page }, (_, index) => (
        <button
          key={index}
          className={`px-2 py-1  rounded-full w-8 h-8 ${page === index + 1 ? "bg-green-500 text-white cursor-not-allowed" : "bg-gray-200 cursor-pointer"}`}
          disabled={page === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`bg-white rounded-full w-8 h-8 flex items-center justify-center ${page === total_page ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={page === total_page}
        onClick={() =>
          onPageChange(page < total_page ? page + 1 : total_page)
        }
      >
        <ChevronRight />
      </button>
    </div>
  );
}
