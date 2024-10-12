"use client";

import React, { useEffect, useState } from "react";

import { useTranslation } from "@/i18n/client";
import { LANGUAGE_OPTIONS, NAMESPACE_OPTIONS } from "@/i18n/settings";
import { SubmitHandler, useForm } from "react-hook-form";

import { resetPassWord } from "@/features/auth/api/login";
import { LoginModel, User, ResetPasswordParam } from "@/features/auth/types";
// import { LoginFormComponent } from "./sign.form";
import {
  getTokenCookie,
  setTokenCookie,
  AUTHORIZATION_TOKEN_EXPIRATION,
  AUTHRIZATION_TOKEN_WITHOUT_AUTO_LOGIN,
} from "@/libs/cookie";
import { useRouter } from "next/navigation";
import { useSetAuthContext } from "@/contexts/authContext";
import { ForgotPasswordForm } from "./index.form";

export const ForgotPasswordContainer: React.FC = () => {
  const { setUser } = useSetAuthContext();
  const router = useRouter();
  const [requestError, setRequestError] = useState<string | null>(null);
  const cookie = getTokenCookie();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (cookie) router.push("/");
    if (!cookie) setUser(undefined);
  }, [setUser, cookie, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>();

  const onSubmit: SubmitHandler<LoginModel> = async (
    credentials: ResetPasswordParam
  ) => {
    try {
      // const res = await resetPassWord(credentials);
      // const user = new User(res.data.data);
      // setUser(user);
      // setTokenCookie(res.data.meta.token);
      // router.push("/");
    } catch (error: any) {
      setRequestError(error.response.data.message);
    }
  };

  return (
    <>
      <ForgotPasswordForm
        requestError={requestError}
        onSubmit={onSubmit}
        errors={errors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleSubmit={handleSubmit}
        register={register}
      />
    </>
  );
};

export default ForgotPasswordContainer;
