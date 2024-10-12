import {Label } from "flowbite-react";

type InputProps = {
  lb: string;
  inputVal: string;
};
export const TextBox = ({ lb, inputVal }: InputProps) => {
  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="email1" value={lb} className="text-lg  text-slate-600" />
      </div>
      <input
        value={inputVal}
        className="mt-3 mb-5 bg-slate-100 border-none py-4 px-6 rounded-lg w-full"
      />
    </>
  );
};
