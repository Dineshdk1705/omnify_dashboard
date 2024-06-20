"use client";

import { useState } from "react";

import Popup from "./Popup";
import FilterSidebar from "./FilterSidebar";

const Layout = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="flex h-[350px] w-[612px]">
      <FilterSidebar />
      <div className="flex">{children}</div>
    </div>
  );
};

export default Layout;
