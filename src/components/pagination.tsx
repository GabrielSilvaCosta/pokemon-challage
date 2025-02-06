import React from "react";
import { PaginationProps } from "../@types/pokemon";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-4 py-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition duration-200"
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition duration-200`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition duration-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
