"use client";
import type { FC } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar, MegaMenu, Button, Avatar } from "flowbite-react";
import { useTranslation } from "@/i18n/client";
import { LANGUAGE_OPTIONS, NAMESPACE_OPTIONS } from "@/i18n/settings";
import Logo from "../../../public/images/logo.svg";
import { useAuthContext } from "@/contexts/authContext";
import { deleteTokenCookie } from "@/libs/cookie";
const Header: FC = function () {
  const { t: commonT } = useTranslation(
    LANGUAGE_OPTIONS.JAPANESE,
    NAMESPACE_OPTIONS.common
  );
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {}, [user]);

  const signOut = () => {
    deleteTokenCookie();
    router.push("/login");
  };

  return (
    <Navbar
      fluid
      className="fixed top-0 w-screen border-b border-slate-200"
    >
      <div className="w-full p-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/" className="mx-10">
              <Image alt="" src={Logo} className="mr-3 h-6 sm:h-8" />
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <Navbar.Collapse>
                <Navbar>
                  <MegaMenu.Dropdown
                    toggle={
                      <>
                        {"avatar"}
                        {/* <Image
                          src={user.avatar}
                          alt="avatar of Jese"
                          width="40"
                          height="40"
                        /> */}
                      </>
                    }
                  >
                    <ul className="">
                      <div className="space-y-4 p-4">
                        {/* <li>
                          <a
                            href={`/user-profile`}
                            className="hover:text-primary-600 dark:hover:text-primary-500 hover:cursor-pointer"
                          >
                            profile
                          </a>
                        </li> */}
                        <li>
                          <span
                            className="hover:text-primary-600 dark:hover:text-primary-500 hover:cursor-pointer"
                            onClick={signOut}
                          >
                            sign out
                          </span>
                        </li>
                      </div>
                    </ul>
                  </MegaMenu.Dropdown>
                </Navbar>
              </Navbar.Collapse>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
