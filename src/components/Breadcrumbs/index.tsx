import { Breadcrumb as FBBreadcrumbs, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export type BreadcrumbsProps = { item: { label: string; href?: string } };

export const Breadcrumbs = ({ item }: BreadcrumbsProps) => {
  return (
    <FBBreadcrumbs
      aria-label="members breadcrumb "
      className="bg-slate-100 text-sm py-3.5 md:pl-64 fixed top-[74px] w-screen z-20"
    >
      <BreadcrumbItem href="#" className="text-white">
        <HiHome className="" />
        <span className="uppercase ml-3">Home</span>
      </BreadcrumbItem>
      {item && (
        <BreadcrumbItem href={item.href} className=" text-sm">
          <span className="">{item.label}</span>
        </BreadcrumbItem>
      )}
    </FBBreadcrumbs>
  );
};
