"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const GoalManagementHeader: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6 bg-linear-to-r from-[#0F1F1F] to-[#132626]">
      {/* Left: Title and Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h1 className="m-0 text-white font-bold leading-none text-xl">
          Goal Management & Creation
        </h1>
        <p className="m-0 text-[#4e8a96] text-xs">
          Manage your goals in detail and create new savings targets with powerful tools
        </p>
      </div>

      {/* Right: Back Button */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#08c1c1] text-[#6a9fae] hover:text-[#5de0e0] hover:border-[#5de0e0] transition-colors no-underline bg-transparent w-full sm:w-auto text-sm"
      >
        <ArrowLeft size={16} />
        <span className="font-medium">Back to Overview</span>
      </Link>
    </header>
  );
};

export default GoalManagementHeader;