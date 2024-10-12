"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { RxLockClosed } from "react-icons/rx";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

import { MdOutlineMailOutline } from "react-icons/md";
import { LoginModel } from "@/features/auth/types";
import { useTranslation } from "@/i18n/client";
import { NAMESPACE_OPTIONS } from "@/i18n/settings";
import Logo from "../../../../../public/images/logo_white.svg";
import { request } from "http";

type LoginFormComponentProps = {
  requestError: string | null;
  onSubmit: SubmitHandler<LoginModel>;
  errors: FieldErrors<LoginModel>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<LoginModel, undefined>;
  register: UseFormRegister<LoginModel>;
};

export const ForgotPasswordForm: React.FC<LoginFormComponentProps> = ({
  requestError,
  onSubmit,
  errors,
  showPassword,
  setShowPassword,
  handleSubmit,
  register,
}) => {
  // const { t: loginT } = useTranslation(NAMESPACE_OPTIONS.auth);

  return (
    <>
      <div className="flex justify-center items-center bg-[#0F172A] h-[calc(100vh-56px)] w-full lg:w-1/2">
        <div className="w-[450px] pc:w-[580px] flex flex-col justify-center items-center">
          <div className="mb-6 lg:mb-16">
            <Image
              src={Logo}
              alt="Logo"
              className="h-[50px] lg:h-[87px] w-auto"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[90%]">
            <div className="flex flex-col gap-[15px] lg:gap-[40px]">
              <div>
                <div className="flex items-center border-transparent border-b-[#475569] border ">
                  <MdOutlineMailOutline className=" text-gray-400" size={24} />
                  <input
                    type="text"
                    id="email"
                    style={{ border: "none", boxShadow: "none" }}
                    className={`w-full bg-transparent caret-white text-white placeholder:text-gray-400 placeholder:text-[17px] ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "invalid email address",
                      },
                    })}
                    placeholder="Email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs pl-3 pt-3">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#2563EB] rounded-[10px] text-white text-xl w-full lg:px-[180px] pc:px-[216px] py-[10px] lg:py-[14px] mt-10 lg:mt-16"
            >
              reset password
            </button>
          </form>
          <Link
            href="/auth/register"
            className="text-sm text-white mt-4 py-[2px] border-transparent border-b-gray-400 border block lg:hidden"
          >
            会員登録
          </Link>
        </div>
        <p className="absolute bottom-[16px] lg:bottom-[23px] right-[26px] text-[13px] text-[#CBD5E1]">
          ©2023 MEMBERS Inc.
        </p>
      </div>
    </>
  );
};
