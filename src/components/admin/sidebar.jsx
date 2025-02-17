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
            <Link href="/admin/dashboard" className={`${baseClasses} ${pathname === "/admin/dashboard" ? activeClasses : ""}`}>
              <HomeIcon size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/user_management" className={`${baseClasses} ${pathname === "/admin/outgoing" ? activeClasses : ""}`}>
              <FileOutput size={20} /> User Management
            </Link>
          </li>
          <li>
            <Link href="/admin/reports" className={`${baseClasses} ${pathname === "/admin/add" ? activeClasses : ""}`}>
              <FilePlus size={20} /> Reports
            </Link>
          </li>
          <li>
            <Link href="/admin/incoming" className={`${baseClasses} ${pathname === "/admin/incoming" ? activeClasses : ""}`}>
              <FileInput size={20} /> Report History
            </Link>
          </li>

          <li>
            <button onClick={toggleSettings} className={`${baseClasses} w-full flex justify-between`}>
              <span className="flex items-center gap-2">
                <Settings size={20} /> Settings
              </span>
              {isSettingsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isSettingsOpen && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link href="/admin/settings/add-agency" className={`${baseClasses} ${pathname === "/admin/settings/add-agency" ? activeClasses : ""}`}>
                    Add Agency
                  </Link>
                </li>
                <li>
                  <Link href="/admin/settings/add-receiver" className={`${baseClasses} ${pathname === "/admin/settings/add-receiver" ? activeClasses : ""}`}>
                    Add Receiver
                  </Link>
                </li>
              </ul>
            )}
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
