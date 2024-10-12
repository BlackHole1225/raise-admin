import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsTiktok } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import {} from "react-icons/fa";
export function FooterComponent() {
  return (
    <Footer className="mx-0 rounded-none border-none">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-12 md:grid-cols-5"></div>
        <div className=" py-6 flex justify-center border-t border-slate-300">
          <FooterCopyright
            href="#"
            by="MEMBERS™"
            year={2023}
            className="text-slate-500"
          />
        </div>
      </div>
    </Footer>
  );
}
