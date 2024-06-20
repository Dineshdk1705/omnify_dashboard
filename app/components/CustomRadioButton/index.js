"use client";

import React from "react";

const CustomRadioButton = ({ name, label, value, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        name={name}
        id={`${name}-${value}`}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={`${name}-${value}`}
        className="relative cursor-pointer flex items-center"
      >
        <span className="w-4 h-4 inline-block mr-2 border border-gray-300 rounded-full peer-checked:border-black transition-transform duration-200 ease-in-out">
          <span className="w-2 h-2 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 ease-in-out"></span>
        </span>
        {label}
      </label>
    </div>
  );
};

export default CustomRadioButton;
