"use client";

import React from "react";
import { useAuthContext } from "@/contexts/authContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export type breadcrumbProps = { label: string; href: string };
export const Layout = ({
  children,
  breadcrumb,
}: Readonly<{
  children: React.ReactNode;
  breadcrumb: breadcrumbProps;
}>) => {
  const { user } = useAuthContext();
  return (
    <>
      <Header />
      {/* <Breadcrumbs item={breadcrumb} /> */}
      <div className="flex items-start">
        <Sidebar />
        <main className="relative h-full w-full overflow-y-auto dark:bg-gray-900 lg:ml-64 lg:mt-[70px] bg-[#eef2f6] h-[calc(100vh-68px)] ">
          <div className="m-5">
            <div className="roundes-lg p-5 text-lg text-slate-900 bg-white my-5 font-bold">
              {breadcrumb.label}
            </div>
            <div className="p-5 bg-white">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
};
