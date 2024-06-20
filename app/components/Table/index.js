"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FilterPopupComp from "../FilterPopupComp";

const Table = ({ data, headers }) => {
  const [selectedHeaders, setSelectedHeaders] = useState(
    headers.map((header) => header.key)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  //   const [itemsPerPage, setItemsPerPage] = useState(9);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.querySelector(".popup");
      if (popup && !popup.contains(event.target)) {
        setIsPopupOpen(false);
        setIsFilterPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopupOpen, setIsFilterPopupOpen]);

  const handleHeaderToggle = (headerKey) => {
    if (selectedHeaders.includes(headerKey)) {
      setSelectedHeaders(selectedHeaders.filter((key) => key !== headerKey));
    } else {
      setSelectedHeaders([...selectedHeaders, headerKey]);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedItems([]);
    } else {
      const allItems = data
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item) => item.id);
      setSelectedItems(allItems);
    }
    setIsSelectAll(!isSelectAll);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`text-[12px] rounded ${
            currentPage === i
              ? "px-3 py-1 border-[1px] border-gray-200 text-black"
              : "text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between">
        <button
          className="my-4 p-2 bg-[#F1F5F9] text-black rounded-md flex items-center h-[32px] w-[102px]"
          onClick={() => setIsFilterPopupOpen(true)}
        >
          <Image
            src="/assets/icons/filter.svg"
            alt="add"
            width={16}
            height={16}
            className="mr-1 font-medium"
          />
          <span className="text-[12px] font-medium">Add Filter</span>
        </button>
        <div className="flex gap-2">
          <div className="flex border-[1px] border-gray-200 px-2 rounded-md my-4 h-[32px]">
            <Image
              src="/assets/icons/search.svg"
              alt="add"
              width={14}
              height={14}
              className="mr-2 font-bold"
            />
            <input
              type="text"
              placeholder="Search client"
              className="h-[30px] text-sm focus:outline-none"
            />
          </div>
          <Image
            src="/assets/icons/icon-button.svg"
            alt="add"
            width={32}
            height={32}
            className="mr-3 font-bold"
          />
          <button onClick={() => setIsPopupOpen(true)}>
            <Image
              src="/assets/icons/columns.svg"
              alt="add"
              width={16}
              height={16}
              className="mr-4 font-bold"
            />
          </button>
          <Image
            src="/assets/icons/download.svg"
            alt="add"
            width={17}
            height={17}
            className="font-bold"
          />
        </div>
      </div>
      <div className=" border-[1px] border-gray-200 rounded-lg max-h-[550px] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 rounded-lg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="peer h-4 w-4 border-gray-300 rounded custom-checkbox shadow-bottom-only"
                  onChange={handleSelectAll}
                  checked={isSelectAll}
                />
              </th>
              {headers
                .filter((header) => selectedHeaders.includes(header.key))
                .map((header) => (
                  <th
                    key={header.key}
                    className="px-5 py-3 text-left text-[12px] font-medium text-gray-500 tracking-wider"
                  >
                    <div className="flex items-center">
                      <Image
                        src={header.img}
                        alt="add"
                        width={13}
                        height={13}
                        className="mr-1"
                      />
                      <span>{header.label}</span>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 border-gray-300 rounded custom-checkbox shadow-bottom-only"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleItemSelection(item.id)}
                    />
                  </td>
                  {headers
                    .filter((header) => selectedHeaders.includes(header.key))
                    .map((header) => (
                      <td
                        key={header.key}
                        className="px-6 py-4 whitespace-nowrap text-[12px] font-medium text-gray-900"
                      >
                        {item[header.key] === "Active" ? (
                          <span className="text-green-500 bg-green-100 px-2 py-1 rounded-xl flex items-center h-6 w-[4.2rem]">
                            <span className="font-bold text-lg mr-1">•</span>
                            {item[header.key]}
                          </span>
                        ) : item[header.key] === "Inactive" ? (
                          <span className="text-[#334155] bg-[#F1F5F9] px-2 py-1 rounded-xl flex items-center h-6 w-[4.5rem]">
                            <span className="font-bold first-line text-lg mr-1">
                              •
                            </span>
                            {item[header.key]}
                          </span>
                        ) : item[header.key] === "Lead" ? (
                          <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded-xl flex items-center h-6 w-[3.8rem]">
                            <span className="font-bold text-lg mr-1">•</span>
                            {item[header.key]}
                          </span>
                        ) : (
                          item[header.key]
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 justify-between mt-5 h-[3rem] items-center">
        <div className="flex text-[12px]">
          <p className="mr-2 flex items-center">
            <span className="mr-2">Displaying</span>
            <input
              type="number"
              defaultValue={8}
              className="w-12 p-1 text-center text-black  bg-gray-100 focus:outline-none rounded-md"
            />
          </p>

          <p className="text-gray-500 flex items-center">
            Out of{" "}
            <span className="text-black text-[13px] ml-1 text-center">
              {data.length}
            </span>
          </p>
        </div>
        <div className="w-[20%] flex gap-2 justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-[12px] flex items-center text-gray-800 rounded disabled:opacity-50"
          >
            <Image
              src="/assets/icons/arrow-left.svg"
              alt="add"
              width={6}
              height={6}
              className="mr-2"
            />
            <span>Previous</span>
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-[12px] flex items-center text-gray-800 rounded disabled:opacity-50"
          >
            <span>Next</span>
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="add"
              width={6}
              height={6}
              className="ml-2"
            />
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-y-0 right-10 -top-20 flex justify-end items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-80 border border-gray-200 mr-4 popup">
            <h2 className="text-[16px] text-black mb-2">Edit Columns</h2>
            <p className="text-[14px] mb-2 text-gray-500">
              Select the columns to rearrange
            </p>
            {headers.map((header) => (
              <div key={header.key} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="peer h-4 w-4 border-gray-300 rounded mr-2 custom-checkbox"
                  checked={selectedHeaders.includes(header.key)}
                  onChange={() => handleHeaderToggle(header.key)}
                />
                <label className="text-[14px] border border-gray-200 rounded-md px-2 py-1 w-full">
                  {header.label}
                </label>
              </div>
            ))}
            <div className="flex justify-between">
              <button
                className="mt-4 px-4 py-1 bg-white text-black border border-gray-200 rounded-md"
                onClick={() => setIsPopupOpen(false)}
              >
                Reset to Default
              </button>
              <button
                className="mt-4 px-4 py-1 bg-black text-white rounded w-[120px]"
                onClick={() => setIsPopupOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      {isFilterPopupOpen && (
        <div className="fixed inset-y-0 -top-14 flex items-center">
          <div className="overflow-auto rounded-lg shadow-lg border border-gray-200 popup bg-blue-100">
            <FilterPopupComp />
            <div className="flex justify-end border-t-[1px] border-gray-200 bg-white p-2 text-[14px]">
              <button
                className="px-4 mr-3 py-1 bg-[#F4F4F5] text-black rounded-md h-[36px]"
                onClick={() => setIsFilterPopupOpen(false)}
              >
                Reset to Default
              </button>
              <button
                className="px-5 py-1 bg-black text-white rounded h-[36px]"
                onClick={() => setIsFilterPopupOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
