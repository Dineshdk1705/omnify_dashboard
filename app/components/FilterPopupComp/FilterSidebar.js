"use client";

import Image from "next/image";
import { useState } from "react";
import { DatePicker } from "rsuite";
import CustomRadioButton from "../CustomRadioButton";

const options = [
  { id: 1, name: "All" },
  { id: 2, name: "Custom" },
  { id: 3, name: "Last 30 days" },
  { id: 4, name: "This month" },
  { id: 5, name: "Last month" },
  { id: 6, name: "This quarter" },
  { id: 7, name: "2 quarters ago" },
  { id: 8, name: "This Year" },
  { id: 9, name: "Last Year" },
];

const statusOptions = [
  { id: 1, name: "Show all" },
  { id: 2, name: "Public" },
  { id: 3, name: "Private" },
  { id: 4, name: "Disable" },
  { id: 5, name: "Draft" },
];

const serviceTypeOptions = [
  { id: 1, name: "Show all service type" },
  { id: 2, name: "Class" },
  { id: 3, name: "Appointment" },
  { id: 4, name: "Class pack" },
  { id: 5, name: "Membership" },
  { id: 6, name: "General items" },
];

export default function FilterSidebar() {
  const [currentTab, setCurrentTab] = useState("scheduledDate");
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedService, setSelectedService] = useState(
    "Show all service type"
  );
  const [selectedStatus, setSelectedStatus] = useState("Show all");
  const [isOpen, setIsOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedRadioOption, setSelectedRadioOption] = useState("name");

  const handleChange = (e) => {
    setSelectedRadioOption(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsServiceOpen(false);
    setIsServiceOpen(false);
  };

  const renderCurrentTabContent = () => {
    if (currentTab === "scheduledDate") {
      return (
        <>
          <div className="mb-4">
            <label className="text-[14px]">Show orders for</label>
            <div className="relative inline-block w-full">
              <div
                className="flex justify-between w-full p-2 border border-gray-200 rounded bg-white cursor-pointer mt-2 text-[14px]"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedOption}
                <Image
                  src="/assets/icons/arrow-down.svg"
                  alt="add"
                  width={12}
                  height={12}
                  className=""
                />
              </div>
              {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-[232px] overflow-y-auto">
                  {options.map((option) => (
                    <li
                      key={option.id}
                      className="p-2 flex justify-between cursor-pointer hover:bg-gray-200 text-[14px]"
                      onClick={() => handleOptionClick(option.name)}
                    >
                      <span>{option.name}</span>
                      {option.name === selectedOption && (
                        <Image
                          src="/assets/icons/tick.svg"
                          alt="add"
                          width={12}
                          height={12}
                          className=""
                        />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex">
            <div>
              <label className=" text-[14px]">From</label>
              {/* <DatePicker format="MM/dd/yyyy" /> */}
            </div>
            <div>
              <label className=" text-[14px]">To</label>
            </div>
          </div>
        </>
      );
    }
    if (currentTab === "people") {
      return (
        <div
          className="flex w-full px-2 border border-gray-200 rounded bg-gray-100 cursor-pointer mt-2 text-[14px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src="/assets/icons/search.svg"
            alt="add"
            width={12}
            height={12}
            className="mr-2"
            color="white"
          />
          <input
            type="text"
            placeholder="Search Payer or attendee name"
            className="w-full h-8 focus:outline-none text-[14px] bg-gray-100"
          />
        </div>
      );
    }
    if (currentTab === "servicesProducts") {
      return (
        <>
          <div className="flex justify-between">
            <div>
              <input
                type="radio"
                name="name"
                id="search-type"
                value="name"
                checked={selectedRadioOption === "name"}
                onChange={handleChange}
              />
              <label htmlFor="search-type">Search by name</label>
            </div>

            <div>
              <input
                type="radio"
                name="name"
                id="search-type"
                value="tags"
                checked={selectedRadioOption === "tags"}
                onChange={handleChange}
              />
              <label htmlFor="search-type">Search by tags</label>
            </div>
          </div>
          {selectedRadioOption === "name" && (
            <div
              className="flex w-full px-2 border border-gray-200 rounded bg-gray-100 cursor-pointer mt-2 text-[14px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src="/assets/icons/search.svg"
                alt="add"
                width={12}
                height={12}
                className="mr-2"
                color="white"
              />
              <input
                type="text"
                placeholder="Search Payer or attendee name"
                className="w-full h-8 focus:outline-none text-[14px] bg-gray-100"
              />
            </div>
          )}
          {selectedRadioOption === "tags" && (
            <div>
              <div className="mb-4">
                <label className="text-[14px]">Service type</label>
                <div className="relative inline-block w-full">
                  <div
                    className="flex justify-between w-full p-2 border border-gray-200 rounded bg-white cursor-pointer mt-2 text-[14px]"
                    onClick={() => {
                      setIsServiceOpen(!isServiceOpen);
                      setIsStatusOpen(false);
                    }}
                  >
                    {selectedService}
                    <Image
                      src="/assets/icons/arrow-down.svg"
                      alt="add"
                      width={12}
                      height={12}
                      className=""
                    />
                  </div>
                  {isServiceOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-[232px] overflow-y-auto">
                      {serviceTypeOptions.map((option) => (
                        <li
                          key={option.id}
                          className="p-2 flex justify-between cursor-pointer hover:bg-gray-200 text-[14px]"
                          onClick={() => {
                            setSelectedService(option.name);
                            setIsServiceOpen(false);
                          }}
                        >
                          <span>{option.name}</span>
                          {option.name === selectedService && (
                            <Image
                              src="/assets/icons/tick.svg"
                              alt="add"
                              width={12}
                              height={12}
                              className=""
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-[14px]">Status</label>
                <div className="relative inline-block w-full">
                  <div
                    className="flex justify-between w-full p-2 border border-gray-200 rounded bg-white cursor-pointer mt-2 text-[14px]"
                    onClick={() => {
                      setIsStatusOpen(!isStatusOpen);
                      setIsServiceOpen(false);
                    }}
                  >
                    {selectedStatus}
                    <Image
                      src="/assets/icons/arrow-down.svg"
                      alt="add"
                      width={12}
                      height={12}
                      className=""
                    />
                  </div>
                  {isStatusOpen && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-[232px] overflow-y-auto">
                      {statusOptions.map((option) => (
                        <li
                          key={option.id}
                          className="p-2 flex justify-between cursor-pointer hover:bg-gray-200 text-[14px]"
                          onClick={() => {
                            setSelectedStatus(option.name);
                            setIsStatusOpen(false);
                          }}
                        >
                          <span>{option.name}</span>
                          {option.name === selectedStatus && (
                            <Image
                              src="/assets/icons/tick.svg"
                              alt="add"
                              width={12}
                              height={12}
                              className=""
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div>
      <div className="flex bg-[#F8FAFC] w-[612px] h-[350px]">
        {/* Sidebar */}
        <div
          className={`bg-[#F8FAFC] text-black transition-all duration-300 flex flex-col w-[230px] border-r-[1px] border-gray-200`}
        >
          <nav className={`p-2`}>
            <ul className="flex flex-col gap-1">
              <button
                onClick={() => setCurrentTab("scheduledDate")}
                className={`${
                  currentTab === "scheduledDate"
                    ? "bg-[#E2E8F0] rounded-md"
                    : "hover:bg-white rounded-md"
                } flex items-center h-9 p-2`}
              >
                <Image
                  src="/assets/icons/calendar1.svg"
                  alt="add"
                  width={16}
                  height={16}
                  className="mr-3 font-bold"
                />
                <h3 className="text-[12px]">Scheduled Date</h3>
              </button>
              <button
                onClick={() => setCurrentTab("people")}
                className={`${
                  currentTab === "people"
                    ? "bg-[#E2E8F0] border-gray-200 rounded-md"
                    : "hover:bg-white rounded-md"
                } flex items-center h-9 p-2`}
              >
                <Image
                  src="/assets/icons/people.svg"
                  alt="add"
                  width={16}
                  height={16}
                  className="mr-3 font-bold"
                />
                <h3 className="text-[12px]">People</h3>
              </button>
              <button
                onClick={() => setCurrentTab("servicesProducts")}
                className={`${
                  currentTab === "servicesProducts"
                    ? "bg-[#E2E8F0] border-gray-200 rounded-md"
                    : "hover:bg-white rounded-md"
                } flex items-center h-9 p-2`}
              >
                <Image
                  src="/assets/icons/dashboard.svg"
                  alt="add"
                  width={16}
                  height={16}
                  className="mr-3 font-bold"
                />
                <h3 className="text-[12px]">Services / Products</h3>
              </button>
            </ul>
          </nav>
        </div>

        <main className="flex-1 p-4 bg-white rounded-lg">
          {renderCurrentTabContent()}
        </main>
      </div>
    </div>
  );
}
