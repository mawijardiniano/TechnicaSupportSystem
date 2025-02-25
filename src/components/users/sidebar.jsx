"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  FilePlus,
  FileInput,
  FileOutput,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const activeClasses = "bg-blue-200 text-blue-700";
  const baseClasses = "flex items-center gap-2 p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700";

  return (
    <div className="flex flex-col overflow-hidden">
      <nav>
        <ul className="p-6 space-y-4">
          <li>
            <Link href="/users/dashboard" className={`${baseClasses} ${pathname === "/admin/dashboard" ? activeClasses : ""}`}>
              <HomeIcon size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/users/dashboard/submit" className={`${baseClasses} ${pathname === "/admin/add" ? activeClasses : ""}`}>
              <FilePlus size={20} />Submit Reports
            </Link>
          </li>
          <li>
            <Link href="/admin/incoming" className={`${baseClasses} ${pathname === "/admin/incoming" ? activeClasses : ""}`}>
              <FileInput size={20} /> Report History
            </Link>
          </li>


          <li>
            <button className="flex items-center gap-2 w-full text-left p-2 rounded-md transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700">
              <LogOut size={20} /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
