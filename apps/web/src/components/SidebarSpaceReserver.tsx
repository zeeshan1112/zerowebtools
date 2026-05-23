"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function SidebarSpaceReserver() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedPinned = localStorage.getItem("zeelancebox_sidebar_pinned");
        if (savedPinned !== null) {
          setPinned(JSON.parse(savedPinned));
        }
      } catch (_) {}
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("zeelancebox_storage_update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("zeelancebox_storage_update", handleStorageChange);
    };
  }, []);

  return (
    <div 
      className="hidden md:block h-screen shrink-0 relative transition-all duration-300 ease-in-out"
      style={{ width: pinned ? 260 : 68 }}
    >
      <Sidebar />
    </div>
  );
}
