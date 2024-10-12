"use client";
var ls = require("local-storage");
export const setToken = (token: string): void => {
  // localStorage.setItem("member_token", token);
  ls.set("_member_admin_token", token);
};

export const getToken = (): string | null => {
  const token = ls.get("_member_admin_token");
  return token ? token : null;
};

export const deleteToken = (): void => {
  ls.remove("_member_admin_token");
};
